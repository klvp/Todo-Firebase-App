/** @format */
import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Alert, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { Output } from "./Output";
import { PopupModal } from "./PopupModal";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [t, setT] = useState({});
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const ranEffect = useRef(true);

  const todosCollectionRef = collection(db, currentUser.email);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addTodo = (event) => {
    event.preventDefault();
    addDoc(todosCollectionRef, {
      todo: input,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        setInput("");
      })
      .catch((err) => {
        alert(err.message);
      });
    setInput("");

    // let q = query(
    //   collection(db, "users"),
    //   where("user", "==", currentUser.email)
    // );
    // let user;
    // onSnapshot(q, (snapshot) => {
    //   user = snapshot.docs.map((doc) => doc.id);
    //   user = user[0];
    // });
    // console.log(user);
    // addDoc(collection(db, `users/${user[0]}/todos`), {
    //   todo: input,
    //   timestamp: serverTimestamp(),
    // })
    //   .then(() => {
    //     setInput("");
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
    // setInput("");
  };

  // when apps load listen to the database and fetch new todos as they get added/removed
  const getTodos = async () => {
    const q = query(todosCollectionRef, orderBy("timestamp", "desc"));

    await onSnapshot(q, (res) => {
      setTodos(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const updateTodo = (id) => {
    const docToUpdate = doc(db, currentUser.email, id);
    updateDoc(docToUpdate, { todo: value, updatedAt: serverTimestamp() })
      .then(() => {
        setValue("");
        setShowModal(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteTodo = (id) => {
    const docToDelete = doc(db, currentUser.email, id);
    deleteDoc(docToDelete).catch((err) => alert(err.message));
  };

  useEffect(() => {
    if (!ranEffect.current) {
      getTodos();
    }

    return () => {
      ranEffect.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    setError("");
    try {
      setTodos([]);
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Logout");
      setTimeout(() => {
        setError("");
      }, 1500);
    }
  }

  async function handleUpdateProfile() {
    window.location.href = "/update-profile";
  }

  async function handleUpdateEmail() {
    localStorage.setItem("todos", JSON.stringify(todos));

    window.location.href = "/update-email";
  }

  if (localStorage.getItem("email")) {
    let email = localStorage.getItem("email");
    localStorage.removeItem("email");
    const data = JSON.parse(localStorage.getItem("todos"));
    localStorage.removeItem("todos");
    console.log(data);
    data.map((doc) => {
      return addDoc(collection(db, currentUser.email), {
        todo: doc.todo,
        timestamp: serverTimestamp(),
      });
    });
    data.map((item) => {
      return deleteDoc(doc(db, email, item.id));
    });
  }

  return (
    <div className="App">
      <div className="d-flex my-1">
        <h3 className="mx-auto text-center">
          {" "}
          React 🚀 + Firebase 🔥 ToDo App
        </h3>

        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleUpdateProfile}>Update Password</MenuItem>
            <MenuItem onClick={handleUpdateEmail}>Update Email</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <form onSubmit={addTodo} className="mb-3">
        {error && <Alert variant="error">{error}</Alert>}
        <TextField
          label="✔️ Enter Todo"
          required
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />{" "}
        <br /> <br />
        <Button variant="outlined" disabled={!input} type="submit">
          Add Task
        </Button>
      </form>

      <PopupModal
        showModal={showModal}
        setShowModal={setShowModal}
        setValue={setValue}
        value={value}
        t={t}
        updateTodo={updateTodo}
      />

      <Output
        todos={todos}
        setShowModal={setShowModal}
        setT={setT}
        setValue={setValue}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default Home;

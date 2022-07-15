/** @format */

import React from "react";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function Todos({ todo }) {
  const deleteTodo = (id) => {
    const docToDelete = doc(db, "todos", id);
    console.log(docToDelete);
    deleteDoc(docToDelete)
      .then(() => console.log("deteled"))
      .catch((err) => alert(err.message));
  };
  return (
    <ListItemText
      sx={{ textAlign: "left", fontSize: "1rem" }}
      primary={
        <>
          {todo.todo}
          <IconButton>
            <EditIcon
              color="secondary"
              fontSize="small"
              style={{ margin: "1rem" }}
            />
          </IconButton>
          <IconButton onClick={() => deleteTodo(todo.id)}>
            <DeleteIcon
              color="error"
              fontSize="small"
              style={{ margin: "1rem" }}
            />
          </IconButton>
        </>
      }
      size="large"
    />
  );
}

export default Todos;

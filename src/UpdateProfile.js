/** @format */

import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function UpdateProfile() {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { updatepassword, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    let promises = [];

    setError("");
    setLoading(true);

    if (passwordRef.current.value) {
      promises.push(updatepassword(passwordRef.current.value));
    }

    // if (emailRef.current.value !== currentUser.email) {
    //   localStorage.setItem("email", currentUser.email);
    //   promises.push(updateemail(emailRef.current.value));
    // }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update Profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ maxWidth: "35rem" }} className="w-100">
        <Card.Body>
          <h2 className="text-center">Update Password</h2>
          {error && <Alert variant="danger"> {error} </Alert>}
          <h6 className="text-center">{currentUser.email}</h6>
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group> */}
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control required type="password" ref={confirmPasswordRef} />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Update
            </Button>
          </Form>
          <div className="w-100 text-center mt-4">
            <Link to="/">Cancel</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UpdateProfile;

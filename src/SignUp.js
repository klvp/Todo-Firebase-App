/** @format */

import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await addDoc(collection(db, emailRef.current.value), {
        todo: "use this app daily",
        timestamp: serverTimestamp(),
      });
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
    navigate("/login");
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ maxWidth: "35rem" }} className="w-100">
        <Card.Body>
          <h2 className="text-center">Sign Up</h2>
          {error && <Alert variant="danger"> {error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control required type="passowrd" ref={confirmPasswordRef} />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-4">
            Already have an Account ? <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignUp;

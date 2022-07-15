/** @format */

import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ maxWidth: "35rem" }} className="w-100">
        <Card.Body>
          <h2 className="text-center">Log In</h2>
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

            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-4">
            Don't have an Account ? <Link to="/register">Register</Link>
          </div>
          <div className="w-100 text-center mt-4">
            Forgot Password ? <Link to="/forgot-password">Reset </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;

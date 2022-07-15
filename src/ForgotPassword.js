/** @format */

import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your registered email to Reset Password");
    } catch {
      setError("Failed to Reset Password");
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
          <h2 className="text-center">Forgot Password</h2>
          {message && <Alert variant="success"> {message} </Alert>}
          {error && <Alert variant="danger"> {error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" ref={emailRef} />
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Reset
            </Button>
          </Form>
          <div className="w-100 text-center mt-4">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ForgotPassword;

/** @format */

import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

function Register() {
  const [data, setData] = useState({ email: "", password: "" });

  function handleInput(event) {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    setData({ email: "", password: "" });
  }
  return (
    <div className="container d-flex justify-content-center align-items-center mt-4">
      <form
        onSubmit={handleSubmit}
        style={{ width: "20rem" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h1 className="text-center">Register</h1>
        <hr />
        <TextField
          label="Email...."
          name="email"
          required
          onChange={(event) => handleInput(event)}
          type="email"
          value={data.email}
          style={{ width: "100%" }}
        />{" "}
        <br /> <br />
        <TextField
          name="password"
          label="Password...."
          required
          onChange={(event) => handleInput(event)}
          type="password"
          style={{ width: "100%" }}
          value={data.password}
        />
        <br /> <br />
        <Button variant="outlined" type="submit" className="">
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;

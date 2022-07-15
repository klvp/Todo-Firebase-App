/** @format */
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
// import Register from "./Register";
import SignUp from "./SignUp";
import Login from "./Login";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import UpdateEmail from "./UpdateEmail";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route
          exact
          path="/update-profile"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/update-email"
          element={
            <PrivateRoute>
              <UpdateEmail />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;

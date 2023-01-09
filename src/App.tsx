import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { state } = useAuth();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={state.user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!state.user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!state.user ? <Signup /> : <Navigate to="/signup" />}
        />
      </Routes>
    </div>
  );
};

export default App;

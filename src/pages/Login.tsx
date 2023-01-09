import React, { useState } from "react";
import { Authentication, ErrorProps } from "../interfaces/interfaces";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const defaultCreds = { email: "", password: "" };
  const [credentials, setCredentials] = useState<Authentication>(defaultCreds);
  const [error, setError] = useState<ErrorProps>({ error: false, msg: "" });

  const { email, password } = credentials;
  const { dispatch } = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({ error: false, msg: "" });

    if (!email || !password) {
      return setError({ error: true, msg: "Email and password required" });
    }

    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      return setError({ error: true, msg: json.error });
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "login", payload: json });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center section">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {error?.msg && (
          <div
            className={`alert rounded-5 ${
              error?.error ? "alert-danger" : "alert-teal"
            }`}
          >
            {error?.msg}
          </div>
        )}
        <div className="card shadow rounded-4">
          <div className="card-body">
            <div className="card-title text-center fw-semibold fs-2">Login</div>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  value={email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  value={password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 shadow-sm mb-3"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

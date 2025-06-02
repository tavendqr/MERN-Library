import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "../product.js";
import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useBookStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await login({ username, password });

    if (result.success) {
      if (result.role === "admin") {
        navigate("/main-admin");
      } else {
        navigate("/main");
      }
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
};

export default LoginPage;
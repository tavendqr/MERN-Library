
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "../product.js";

const SignUpPage = () => {
  const navigate = useNavigate();
  const signup = useBookStore((state) => state.signup);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role user
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await signup({ username, password, role });

    if (result.success) {
      setSuccess("User created successfully! You can now log in.");
      setTimeout(() => navigate("/"), 2000);
    } else {
      setError(result.message || "Sign up failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} className="signup-form">
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select><br />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    
        <button onClick={() => navigate("/")}>Login</button>
 
    </div>
  );
};

export default SignUpPage;

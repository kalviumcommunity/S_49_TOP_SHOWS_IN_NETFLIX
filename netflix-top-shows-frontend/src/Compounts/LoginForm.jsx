// LoginForm.js
import React, { useState } from "react";
import './Login.css'; 


function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform authentication here (e.g., validate username and password)
    // For simplicity, assume authentication is successful if both fields are non-empty
    if (username && password) {
      onLogin(); // Call the onLogin function passed from the parent component
    }
  };

  return (
    <div className="login-form">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginForm;

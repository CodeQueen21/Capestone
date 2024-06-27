import { useState, useEffect } from "react";
import { fetchUser } from "../ajaxHelpers";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken, token, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Could not fetch user details");
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      setError(error.message);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userData = { email, password };
      const result = await fetchUser(userData);
      if (!result.token) {
        const errorMessage =
          "The email or password you entered does not match our records";
        throw Error(errorMessage);
      }
      setToken(result.token);
      fetchUserDetails();
      alert("You are successfully logged in!");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div id="loginForm">
        <h2>Log In</h2>
        {error && <p>{error}</p>}
        <form id="login" onSubmit={handleSubmit}>
          <label>
            Email:{" "}
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:{""}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
      <div id="register-container">
        <h3>Not a member?</h3>
        <button onClick={() => navigate(`/users`)}>Register here</button>
      </div>
    </>
  );
}

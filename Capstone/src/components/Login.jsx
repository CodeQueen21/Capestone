import { useState } from "react";
import { fetchUser } from "../ajaxHelpers";
// import { Register } from "/Register";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        {/* <Register setToken={setToken} /> */}
      </div>
    </>
  );
}

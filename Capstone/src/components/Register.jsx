import { useState } from "react";
import { createUser } from "../ajaxHelpers";

export default function Register({ setToken }) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("false");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const condition =
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !email ||
        !password ||
        password.length < 8;
      if (condition) {
        const errorMessage =
          "Please make sure you filled out all requested info and that your password is at least 8 characters long";
        throw Error(errorMessage);
      }
      const userData = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        isAdmin: isAdmin,
      };
      const result = await createUser(userData);
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <div id="registerForm">
        <h2>Registration</h2>
        {error && <p>{error}</p>}
        <form id="register" onSubmit={handleSubmit}>
          <label>
            First Name:{" "}
            <input
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label>
            Last Name:{" "}
            <input
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <label>
            Phone number:{" "}
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <label>
            Email:{" "}
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";

export default function Account({ userToken }) {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Could not fetch user details");
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      SetError(error.message);
    }
  };
  useEffect(() => {
    if (userToken) {
      fetchUserDetails();
    }
  }, [userToken]);

  if (!userToken) {
    return <p className="errorMessage">Please log in to view this page.</p>;
  }

  if (error) {
    return <p>error: {error}</p>;
  }

  if (!user) {
    return <p className="errorMessage">this user does not exist</p>;
  }
  return (
    <>
      <div id="account">
        <h2>Account Details</h2>
        <p>
          <span>Firstname: </span>
          {user.firstname}
        </p>
        <p>
          <span>Lastname: </span>
          {user.lastname}
        </p>
        <p>
          <span>Phone Number: </span>
          {user.phonenumber}
        </p>
        <p>
          <span>Email: </span>
          {user.email}
        </p>
      </div>
    </>
  );
}

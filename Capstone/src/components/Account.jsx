import { useEffect, useState } from "react";

export default function Account({ user }) {
  if (!user) {
    return <p className="errorMessage">Please log in to view this page.</p>;
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

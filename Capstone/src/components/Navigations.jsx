import { Link } from "react-router-dom";

export default function Navigations() {
  return (
    <div id="navbar">
      <div id="links">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/foodItems">
          Menu
        </Link>
        <Link className="link">Account</Link>
        <Link className="link">Login</Link>
      </div>
      <div id="search">
        <input type="text" placeholder="Search.." />
      </div>
    </div>
  );
}

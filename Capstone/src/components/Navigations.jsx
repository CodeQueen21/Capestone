import { Link } from "react-router-dom";

export default function Navigations(props) {
  return (
    <div id="navbar">
      <div id="links">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/foodItems">
          Menu
        </Link>
        {props.isLoggedIn ? (
          <Link className="link" to="/me">
            Account
          </Link>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
        <Link className="link" to="">
          Cart
        </Link>
      </div>
    </div>
  );
}

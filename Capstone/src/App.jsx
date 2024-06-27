import { useEffect, useState } from "react";
import { fetchFoodItems } from "./ajaxHelpers";
import { Routes, Route } from "react-router-dom";
import Navigations from "./components/Navigations";

import Home from "./components/Home";
import Menu from "./components/Menu";
import MenuItem from "./components/MenuItem";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import Cart from "./components/Cart";

function App() {
  const [token, setToken] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState("");

  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState([]);

  async function fetchItems() {
    setFoodItems(await fetchFoodItems());
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Navigations isLoggedIn={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foodItems" element={<Menu foodItems={foodItems} />} />

        <Route
          path="/foodItems/:id"
          element={<MenuItem cart={cart} setCart={setCart} isLoggedIn={user} />}
        />
        <Route path="/users" element={<Register setToken={setToken} />} />
        <Route
          path="/login"
          element={
            <Login setToken={setToken} token={token} setUser={setUser} />
          }
        />
        <Route
          path="/me"
          element={
            <Account userToken={userToken} user={user} setUser={setUser} />
          }
        />
        <Route
          path="cart"
          element={<Cart user={user} cart={cart} setCart={setCart} />}
        />
      </Routes>
    </>
  );
}
export default App;

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
  const [userItem, setUserItem] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  // console.log(foodItem);
  console.log(user);
  async function fetchItems() {
    setFoodItems(await fetchFoodItems());
  }
  // console.log(user);
  // console.log(token);
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Navigations isLoggedIn={user} />
      {/* <Register setToken={setToken} />
      <Login setToken={setToken} /> */}
      {/* <Account token={token} /> */}
      {/* <Menu foodItems={foodItems} /> */}
      {/* <Cart userToken={userToken} user={user} setUser={setUser} /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foodItems" element={<Menu foodItems={foodItems} />} />
        <Route
          path="/foodItems/:id"
          element={
            <MenuItem
              userToken={userToken}
              setUserItem={setUserItem}
              user={user}
              setUser={setUser}
              userItem={userItem}
            />
          }
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
          element={
            <Cart
              userToken={userToken}
              user={user}
              setUser={setUser}
              userItem={userItem}
            />
          }
        />
      </Routes>
    </>
  );
}
export default App;

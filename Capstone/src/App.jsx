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

function App() {
  const [token, setToken] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  async function fetchItems() {
    setFoodItems(await fetchFoodItems());
  }
  // console.log(token);
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Navigations isLoggedIn={userToken} />
      {/* <Register setToken={setToken} />
      <Login setToken={setToken} /> */}
      {/* <Account token={token} /> */}
      {/* <Menu foodItems={foodItems} /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foodItems" element={<Menu foodItems={foodItems} />} />
        <Route
          path="/foodItems/:id"
          element={<MenuItem userToken={userToken} />}
        />
        <Route path="/users" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login setUserToken={setUserToken} />} />
        <Route path="/me" element={<Account userToken={userToken} />} />
      </Routes>
    </>
  );
}
export default App;

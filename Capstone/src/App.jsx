import { useEffect, useState } from "react";
import { fetchFoodItems } from "./ajaxHelpers";
import { Routes, Route } from "react-router-dom";
import Navigations from "./components/Navigations";
import Home from "./components/Home";
import Menu from "./components/Menu";
import MenuItem from "./components/MenuItem";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  async function fetchItems() {
    setFoodItems(await fetchFoodItems());
  }
  console.log(token);
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Navigations />
      <Register setToken={setToken} />
      {/* <Menu foodItems={foodItems} /> */}
      {/* <Home /> */}
      <Login setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foodItems" element={<Menu foodItems={foodItems} />} />
        <Route path="/foodItems/:id" element={<MenuItem />} />
        <Route path="/users/me" element={<Login setToken={setToken} />} />
      </Routes>
    </>
  );
}
export default App;

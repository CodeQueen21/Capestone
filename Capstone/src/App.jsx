import { useEffect, useState } from "react";
import { fetchFoodItems } from "./ajaxHelpers";
import { Routes, Route } from "react-router-dom";
import Navigations from "./components/Navigations";
import Home from "./components/Home";
import Menu from "./components/Menu";
import MenuItem from "./components/MenuItem";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  // console.log(token);
  async function fetchItems() {
    setFoodItems(await fetchFoodItems());
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Navigations />
      {/* <Register setToken={setToken} />*/}
      {/* <Menu foodItems={foodItems} /> */}
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foodItems" element={<Menu foodItems={foodItems} />} />
        <Route path="/foodItems/:id" element={<MenuItem />} />
      </Routes>
    </>
  );
}
export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { fetchFoodItems } from "./ajaxHelpers";
import { Routes, Route } from "react-router-dom";
import Navigations from "./components/Navigations";
import Home from "./components/Home";
import Menu from "./components/Menu";
import MenuItem from "./components/MenuItem";

function App() {
  const [foodItems, setFoodItems] = useState([]);

  async function fetchItems() {
    setFoodItems(await fetchFoodItems());
  }

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <>
      <Navigations />
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

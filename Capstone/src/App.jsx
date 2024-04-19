import { useEffect, useState } from "react";
import "./App.css";
import { fetchFoodItems } from "./ajaxHelpers";
import Home from "./components/Home";
import Menu from "./components/Menu";

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
      <Menu foodItems={foodItems} />
    </>
  );
}
export default App;

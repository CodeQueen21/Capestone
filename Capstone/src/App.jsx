import { useState } from "react";
import "./App.css";
import { fetchFoodItems } from "./ajaxHelpers";
import Home from "./components/Home";

function App() {
  const [foodItems, setFoodItems] = useState(null);

  async function fetchItems() {
    setFoodItems(await fetchFoodItems());
    console.log(foodItems);
  }
  fetchItems();
  return (
    <>
      <Home />
    </>
  );
}
export default App;

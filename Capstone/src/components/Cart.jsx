import { useState, useEffect } from "react";
import { fetchUserFoodItems } from "../ajaxHelpers";

export default function Cart() {
  const [userItems, setUserItems] = useState([]);

  async function fetchUserItems() {
    setUserItems(await fetchUserFoodItems());
  }

  useEffect(() => {
    fetchUserItems();
  }, []);
  console.log(userItems);
}

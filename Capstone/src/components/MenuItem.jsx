import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleFoodItem } from "../ajaxHelpers";

export default function MenuItem() {
  const [foodItem, setFoodItem] = useState(null);
  const { id } = useParams();
  async function fetchFoodItem() {
    try {
      const result = await fetchSingleFoodItem(id);
      setFoodItem(result);
      console.log(foodItem);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFoodItem();
  }, []);

  return (
    <div>
      {foodItem && (
        <div id="foodItem">
          <h2>{foodItem.name}</h2>
          <img src={foodItem.image} />
          <p>
            <span>Description: </span> {foodItem.description}
          </p>
          <p>
            <span>Price: </span>${foodItem.price}
          </p>
          <button>Add to Cart</button>
        </div>
      )}
    </div>
  );
}

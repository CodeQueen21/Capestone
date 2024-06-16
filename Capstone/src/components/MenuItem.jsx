import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleFoodItem } from "../ajaxHelpers";

export default function MenuItem({ cart, setCart }) {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState("");
  let answer;
  async function fetchFoodItem() {
    try {
      const result = await fetchSingleFoodItem(id);
      setFoodItem(result);
    } catch (error) {
      console.log(error);
    }
  }

  function cartChecker() {
    cart.map((item) => {
      if (item.id === id) {
        return (answer = "Yes");
      } else {
        return (answer = "No");
      }
    });
  }

  const handleClick = (e) => {
    e.preventDefault();
    cartChecker();

    if (answer === "Yes") {
      setCart((cart) =>
        cart.map((item) =>
          foodItem.id === item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      cart.push({
        id: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        quantity: foodItem.quantity,
      });
    }
    alert("Item added to cart!");
  };

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

          <button onClick={handleClick}>Add to Cart</button>
        </div>
      )}
    </div>
  );
}

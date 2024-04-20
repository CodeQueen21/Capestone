import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({ foodItems }) {
  const [foodList, setFoodList] = useState(foodItems);
  const [searchPrase, setSearchPhrase] = useState("");
  const navigate = useNavigate();

  const search = (event) => {
    const matchedFoodItems = foodItems.filter((foodItem) => {
      return `${foodItem.name} ${foodItem.category} ${foodItem.price}`
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFoodList(matchedFoodItems);
    setSearchPhrase(event.target.value);
  };

  return (
    <div id="menu-catalog">
      <div id="search-container">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchPrase}
          onChange={search}
        />
      </div>
      <h1>Menu</h1>
      <div id="menu">
        {foodList &&
          foodList.map((foodItem) => {
            return (
              <div className="foodItem" key={foodItem.id}>
                <h4>{foodItem.name}</h4>
                <img src={foodItem.image} />
                <p>
                  <span>Price: </span>${foodItem.price}
                </p>
                <div>
                  <button onClick={() => navigate(`/foodItems/${foodItem.id}`)}>
                    Details
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

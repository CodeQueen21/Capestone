import userData from "./components/Register";

async function fetchFoodItems() {
  try {
    const response = await fetch("http://localhost:3000/api/foodItems");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

const fetchSingleFoodItem = async (foodItemId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/foodItems/${foodItemId}`
    );
    console.log("response: ", response);
    if (!response.ok) {
      console.log("API error", response.status);
      return;
    }

    const result = await response.json();
    console.log(foodItemId);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

const createUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { fetchFoodItems, fetchSingleFoodItem, createUser };

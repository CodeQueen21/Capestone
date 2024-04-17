async function fetchFoodItems() {
  try {
    const response = await fetch("http://localhost:3000/api/foodItems");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

export { fetchFoodItems };

export default function Menu({ foodItems }) {
  return (
    <div id="menu-cataloge">
      <h1>Menu</h1>
      <div id="menu">
        {foodItems &&
          foodItems.map((foodItem) => {
            return (
              <div className="foodItem" key={foodItem.id}>
                <h4>{foodItem.name}</h4>
                <img src={foodItem.image} />
                <div>
                  <button>Details</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

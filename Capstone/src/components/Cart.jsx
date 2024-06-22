//Renders items in cart. User should be able to update qty of each item and also remove an item. The total of all items should be reflected and the user should be able to clear entire cart

export default function Cart({ user, cart, setCart }) {
  let total = 0;

  if (!user) {
    return <p className="errorMessage">Please log in to view this page.</p>;
  }

  function orderTotal() {
    let totalPrice = 0;
    let prices = [];
    for (let i = 0; i < cart.length; i++) {
      totalPrice = cart[i].price * cart[i].quantity;
      prices.push(totalPrice);
    }
    prices.forEach((num) => {
      total += num;
    });
    return total;
  }

  orderTotal();

  function removeItem(deleteItem) {
    const newCart = cart.filter((item) => item.name !== deleteItem.name);
    return newCart;
  }

  function removeAllItems() {
    const emptyCart = cart.filter((item) => item === true);
    return emptyCart;
  }

  function handelIncrement(itemId) {
    setCart((cart) =>
      cart.map((item) =>
        itemId === item.id
          ? { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) }
          : item
      )
    );
  }

  function handelDecrement(itemId) {
    setCart((cart) =>
      cart.map((item) =>
        itemId === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
  }

  return (
    <>
      <div id="cart-container">
        <h1 id="cart-title">My items</h1>
        {}{" "}
        {cart.length ? (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total price</th>
              </tr>
            </thead>
            {cart &&
              cart.map((item, i) => {
                return (
                  <tbody className="item" key={i}>
                    <tr>
                      <td>
                        {item.name}
                        <button
                          className="remove"
                          onClick={() => {
                            setCart(removeItem(item));
                          }}
                        >
                          remove
                        </button>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div id="quantity-container">
                          <button
                            className="qty-button"
                            id="minus"
                            onClick={() => handelDecrement(item.id)}
                          >
                            -
                          </button>
                          <div id="display">{item.quantity}</div>
                          <button
                            className="qty-button"
                            id="plus"
                            onClick={() => handelIncrement(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        ) : (
          <p>There are no items in your cart</p>
        )}
        <div id="clear-btn">
          <button
            onClick={() => {
              setCart(removeAllItems());
            }}
          >
            Clear Order
          </button>
        </div>
        <div id="total">
          <p>Your Total: ${total}</p>
        </div>
      </div>
    </>
  );
}

//Renders items in cart. User should be able to update qty of each item and remove an item. The total of all items should be reflected

import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";

export default function Cart({ user, cart, setCart, foodItems }) {
  const [error, setError] = useState("");
  let total = 0;

  // if (!user) {
  //   return <p className="errorMessage">Please log in to view this page.</p>;
  // }
  // console.log(cart);

  // function isCartEmpty() {
  //   for (let i = 0; i < cart.length; i++) {
  //     console.log(cart.length)
  //   }
  // }

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
                      <td>{item.quantity}</td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        ) : (
          <p>There are no items in your cart</p>
        )}
        <div id="total">
          <p>Your Total: ${total}</p>
        </div>
      </div>
    </>
  );
}

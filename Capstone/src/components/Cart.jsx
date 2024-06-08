//Renders items in cart. User should be able to update qty of each item and remove an item. The total of all items should be reflected

import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";

export default function Cart({ user, cart, setCart, foodItems }) {
  const [error, setError] = useState("");
  // if (!user) {
  //   return <p className="errorMessage">Please log in to view this page.</p>;
  // }
  // console.log(cart);

  function itemTotal() {
    // for (let i = 0; i < cart.length; i++) {
    //   console.log(cart[i].price * cart[i].quantity);
    // }
    //   setCart((cart) =>
    //     cart.map((item) =>
    //       item ? { ...item, price: item.price * item.quantity } : item
    //     )
    //   );
  }

  function orderTotal() {
    let sum = 0;
    let totalPrice = 0;
    let prices = [];
    for (let i = 0; i < cart.length; i++) {
      // prices.push(cart[i].price);
      totalPrice = cart[i].price * cart[i].quantity;
      prices.push(totalPrice);
    }
    console.log(prices);
    // prices.forEach((num) => {
    //   sum += num;
    // });
    // return sum;
  }
  // let sum = orderTotal();
  // orderTotal();
  // console.log(sum);

  return (
    <>
      <div id="cart-container">
        <h1 id="cart-title">My items</h1>

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
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price * item.quantity}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>

        <div id="total">
          <p>Total: $</p>
        </div>
      </div>
    </>
  );
}

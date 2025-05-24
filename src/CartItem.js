import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem, selectTotalQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(selectTotalQuantity);
  useEffect(() => {
  console.log("Updated totalQuantity:", totalQuantity);
}, [totalQuantity]);
console.log("Final span content:", document.querySelector(".total_cart_amount")?.textContent);

  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity(item.name, item.quantity + 1));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(item.name, item.quantity - 1));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div className="cart-icon-container">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 256 256"
    className="cart-image"
    aria-label="Cart Icon"
  >
    <path d="M6 6h15l-2 10H8L6 6zm3 10a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"/>
  </svg>

  {/* Ensure totalQuantity is correctly displayed */}
  <span className="total_cart_amount">{totalQuantity ?? "ERROR: Undefined"}</span>

</div>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
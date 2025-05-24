import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';
import { selectTotalQuantity } from './CartSlice';

const App = () => {
  const [showProductList, setShowProductList] = useState(false);
  const totalQuantity = useSelector(selectTotalQuantity);

  useEffect(() => {
    console.log("Total Quantity Updated in Redux:", totalQuantity);
  }, [totalQuantity]); // Logs whenever totalQuantity updates

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>

      {/* Cart Icon with Total Quantity */}
<div className="cart-icon-container" style={{ position: "relative" }}>
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

  {/* REMOVE the condition so it always renders */}
  <span className="total_cart_amount">{totalQuantity || 0}</span>
</div>
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <ProductList onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
};

export default App;
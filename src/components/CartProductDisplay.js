import React, { PropTypes } from 'react';

const CartProductDisplay = ({ id, name, price, description, handleRemoveFromCart, getCount }) => {

  return (
    <div className="card">
      <div className="card-image">
        <img className="img-responsive" src="/img/trans.png" />
        <span className="card-title">{name} {`(${getCount(id)})`}</span>
      </div>
      <div className="card-content">
        <div className="product-display">
          <p className="product-decription">{description}</p>
          <h4 className="product-price">${price}</h4>
        </div>
      </div>
      <div className="card-action">
        <button onClick={() => handleRemoveFromCart(id)}>Remove from Cart</button>
      </div>
    </div>
  );
};

CartProductDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  getCount: PropTypes.func.isRequired
};

export default CartProductDisplay;

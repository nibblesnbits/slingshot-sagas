import React, { PropTypes } from 'react';

const CartProductDisplay = ({ id, name, description, handleRemoveFromCart }) => {

  return (
    <div className="card">
      <div className="card-image">
        <img className="img-responsive" src="/img/trans.png" />
        <span className="card-title">{name}</span>
      </div>
      <div className="card-content">
        <div className="product-display">
          <p className="product-decription">{description}</p>
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
};

export default CartProductDisplay;

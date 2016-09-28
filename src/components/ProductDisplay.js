import React, { PropTypes } from 'react';

const ProductDisplay = ({ id, name, price, description, handleAddToCart }) => {

  return (
    <div className="card">
      <div className="card-image">
        <img className="img-responsive" src="/img/trans.png" />
        <span className="card-title">{name}</span>
      </div>
      <div className="card-content">
        <div className="product-display">
          <p className="product-decription">{description}</p>
          <h4 className="product-price">${price}</h4>
        </div>
      </div>
      <div className="card-action">
        <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      </div>
    </div>
  );
};

ProductDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default ProductDisplay;

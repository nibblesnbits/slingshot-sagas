import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ProductDisplay = ({name, price, description}) => {

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
        <Link to={`/cart?productId=`}>Add to Cart</Link>
      </div>
  </div>
  );
};

ProductDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductDisplay;

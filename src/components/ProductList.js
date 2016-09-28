import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProductDisplay from './ProductDisplay'; // eslint-disable-line import/no-named-as-default
import * as cartActions from '../actions/cartActions';
import { makeGetAndSortProducts } from '../selectors/productSelectors';

export class ProductList extends Component {

  render() {
    const { products, addToCart } = this.props;

    return (
      <div>
        {products.map((product) => {
          return (<ProductDisplay handleAddToCart={id => addToCart(id)} key={product.id} {...product} />);
        })}
      </div>
    );
  }
}


const makeMapStateToProps = () => {
  const getAndSortProducts = makeGetAndSortProducts();
  const mapStateToProps = (state) => {
    const products = getAndSortProducts(state);
    return {
      products
    };
  };
  return mapStateToProps;
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default connect(makeMapStateToProps, { ...cartActions })(ProductList);

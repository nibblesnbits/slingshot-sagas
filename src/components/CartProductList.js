import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CartProductDisplay from './CartProductDisplay'; // eslint-disable-line import/no-named-as-default
import * as cartActions from '../actions/cartActions';
import { makeGetAndSortCartProducts } from '../selectors/productSelectors';

export class CartProductList extends Component {

  getCount(id) {
    const { cart } = this.props;
    const item = cart.filter(c => c.id === id);
    return item.length ? item[0].count : 0;
  }

  render() {
    const { products, removeFromCart } = this.props;
    return (
      <div>
        {products.map((product) => {
          return (<CartProductDisplay
            key={product.id} {...product}
            handleRemoveFromCart={id => removeFromCart(id)}
            getCount={(id) => this.getCount(id)} />);
        })}
      </div>
    );
  }
}


const makeMapStateToProps = () => {
  const getAndSortProducts = makeGetAndSortCartProducts();
  const mapStateToProps = (state) => {
    const products = getAndSortProducts(state);
    console.log(products.length);
    const cart = state.cart.items;
    return {
      products,
      cart
    };
  };
  return mapStateToProps;
};

CartProductList.propTypes = {
  products: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired
};

export default connect(makeMapStateToProps, { ...cartActions })(CartProductList);

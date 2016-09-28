import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CartProductDisplay from './CartProductDisplay'; // eslint-disable-line import/no-named-as-default
import * as cartActions from '../actions/cartActions';
import { makeGetAndSortProducts } from '../selectors/productSelectors';

export class CartProductList extends Component {

  componentWillMount() {
    const { cart, getCartItems } = this.props;
    getCartItems(cart.map(p => p.id));
  }

  render() {
    const { products, removeFromCart } = this.props;

    return (
      <div>
        {products.map((product) => {
          return (<CartProductDisplay handleRemoveFromCart={id => removeFromCart(id)} key={product.id} {...product} />);
        })}
      </div>
    );
  }
}


const makeMapStateToProps = () => {
  const getAndSortProducts = makeGetAndSortProducts();
  const mapStateToProps = (state) => {
    const products = getAndSortProducts(state);
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
  getCartItems: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired
};

export default connect(makeMapStateToProps, { ...cartActions })(CartProductList);

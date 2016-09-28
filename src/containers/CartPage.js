import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CartProductList from '../components/CartProductList'; // eslint-disable-line import/no-named-as-default
import CartSummary from '../components/CartSummary'; // eslint-disable-line import/no-named-as-default
import * as cartActions from '../actions/cartActions';

export class CartPage extends Component {


  componentWillMount() {
    const { cart, getCartItems } = this.props;
    getCartItems(cart.map(p => p.id));
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <CartProductList />
          </div>
          <div className="col-md-3 cart-sidebar">
            <CartSummary />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.items
  };
}

CartPage.propTypes = {
  removeFromCart: PropTypes.func.isRequired,
  getCartItems: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired
};

export default connect(mapStateToProps, { ...cartActions })(CartPage);

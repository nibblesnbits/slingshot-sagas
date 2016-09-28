import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../actions/cartActions';
import { makeGetCartTotal } from '../selectors/cartSelectors';

export class CartSummary extends Component {

  render() {
    const { total } = this.props;

    return (
      <div>
        <h3>Order Total</h3>
        <table className="table">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>${total.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>${(total*.07).toFixed(2)}</td>
            </tr>
            <tr className="order-total">
              <td>Total</td>
              <td>${(total*1.07).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const getCartTotal = makeGetCartTotal();
  const mapStateToProps = (state) => {
    const total = getCartTotal(state);
    return {
      total
    };
  };
  return mapStateToProps;
};

CartSummary.propTypes = {
  total: PropTypes.number.isRequired
};

export default connect(makeMapStateToProps, { ...cartActions })(CartSummary);

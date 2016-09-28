import React, { Component } from 'react';
import CartProductList from '../components/CartProductList'; // eslint-disable-line import/no-named-as-default

export default class CartPage extends Component {

  render() {
    return (
      <div>
        <div className="container">
          <CartProductList />
        </div>
      </div>
    );
  }
}

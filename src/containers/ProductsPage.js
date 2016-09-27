import React, { Component } from 'react';
import ProductList from '../components/ProductList'; // eslint-disable-line import/no-named-as-default

export default class ProductsPage extends Component {

  render() {
    return (
      <div>
        <div className="container">
          <ProductList />
        </div>
      </div>
    );
  }
}

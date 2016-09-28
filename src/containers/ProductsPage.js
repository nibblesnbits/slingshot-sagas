import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProductList from '../components/ProductList'; // eslint-disable-line import/no-named-as-default
import * as productActions from '../actions/productActions';

export class ProductsPage extends Component {

  componentWillMount() {
    const { getAllProducts } = this.props;
    getAllProducts();
  }

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

ProductsPage.propTypes = {
  getAllProducts: PropTypes.func.isRequired
};

export default connect(null, { ...productActions })(ProductsPage);

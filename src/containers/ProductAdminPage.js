import React, { Component } from 'react';
import ProductTable from '../components/ProductTable'; // eslint-disable-line import/no-named-as-default
import EditProductModal from '../components/EditProductModal'; // eslint-disable-line import/no-named-as-default
import AuthGuard from '../components/AuthGuard'; // eslint-disable-line import/no-named-as-default

export default class ProductsPage extends Component {

  render() {
    return (
      <div>
        <div className="container">
          <AuthGuard requireRoles={["admin"]} redirectTo="/products" />
          <ProductTable />
          <EditProductModal />
        </div>
      </div>
    );
  }
}

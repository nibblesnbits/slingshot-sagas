import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProductTableRow from './ProductTableRow'; // eslint-disable-line import/no-named-as-default
import * as actions from '../actions/productActions';
import { makeGetAndSortProducts } from '../selectors/productSelectors';

export class ProductTable extends Component {

  componentWillMount() {
    const { getAllProducts } = this.props;
    getAllProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (<ProductTableRow key={product.id} product={product} />);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}


const makeMapStateToProps = () => {
  const getAndSortProducts = makeGetAndSortProducts();
  return (state) => {
    const products = getAndSortProducts(state);
    return {
      products
    };
  };
};

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

export default connect(makeMapStateToProps, { ...actions })(ProductTable);

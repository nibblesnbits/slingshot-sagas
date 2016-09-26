import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import Product from './Product';
import * as actions from '../actions/productActions';
import { makeGetAndSortProducts } from '../selectors/productSelectors';

export class ProductList extends Component {

  componentWillMount() {
    const { getAllProducts } = this.props;
    getAllProducts();
  }

  onDeleteClick(e, product) {
    e.preventDefault();
    this.props.deleteProduct(product.id);
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
              return (
                <tr key={product.id}>
                  <td className="product-name">{product.name}</td>
                  <td className="product-price">{product.price}</td>
                  <td className="product-price"><a href="" onClick={e => this.onDeleteClick(e, product)}><i className="fa fa-trash" /></a></td>
                </tr>);
            })}
          </tbody>
        </table>
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
  getAllProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

export default connect(makeMapStateToProps, { ...actions })(ProductList);

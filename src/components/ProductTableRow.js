import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import * as actions from '../actions/productActions';

export class ProductTableRow extends Component {

  onDeleteClick(e, product) {
    e.preventDefault();
    this.props.deleteProduct(product.id);
  }

  onEditClick(e, product) {
    e.preventDefault();
    this.props.showEditModal(product);
  }

  render() {
    const { product } = this.props;
    return (
    <tr>
      <td className="product-name">{product.name}</td>
      <td className="product-price">{product.price}</td>
      <td className="product-price">
        <DropdownButton id={`edit-dropdown-${product.id}`} title="Actions">
          <MenuItem eventKey="1" onClick={e => this.onDeleteClick(e, product)}>
            <i className="fa fa-trash" />&nbsp;Delete
          </MenuItem>
          <MenuItem eventKey="2" onClick={e => this.onEditClick(e, product)}>
            <i className="fa fa-pencil-square-o" />&nbsp;Edit
          </MenuItem>
        </DropdownButton>
      </td>
    </tr>
    );
  }
}

ProductTableRow.propTypes = {
  product: PropTypes.object.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  showEditModal: PropTypes.func.isRequired
};

export default connect(()=>{ return {}; }, { ...actions })(ProductTableRow);

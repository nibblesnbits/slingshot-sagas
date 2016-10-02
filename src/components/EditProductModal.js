import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/productActions';
import EditProductForm from './EditProductForm';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

export class EditProductModal extends Component {

  constructor() {
    super();
    this.saveClick = this.saveClick.bind(this);
  }

  submitForm(product) {
    const { closeEditModal, updateProduct } = this.props;

    updateProduct(product);
    closeEditModal();
  }

  saveClick() {
    this.editForm.getWrappedInstance().submit();
  }

  render() {
    const { modalOpen, closeEditModal } = this.props;

    return (
      <Modal show={modalOpen} bsSize="lg" aria-labelledby="contained-modal-title-sm" id="edit-product-modal">
        <Modal.Header>
          <Modal.Title id="contained-modal-title-sm">Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProductForm ref={f => this.editForm = f} onSubmit={product => this.submitForm(product)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary edit-modal-save" onClick={this.saveClick}>Save</Button>
          <Button className="btn btn-warning edit-modal-close" onClick={() => closeEditModal()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditProductModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  closeEditModal: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired
};

export function mapStateToProps(state) {
  return { ...state.products.editing };
}

export default connect(mapStateToProps, { ...actions })(EditProductModal);

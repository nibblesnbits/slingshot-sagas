import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const EditProductForm = ({handleSubmit}) => {

  return (
    <form onSubmit={handleSubmit}>
      <Field name="id" component="hidden" type="number" id="edit-product-id" />
      <div className="form-group">
        <label htmlFor="edit-product-name">Name</label>
        <Field name="name" component="input" type="text" className="form-control" id="edit-product-name" placeholder="Name" />
      </div>
      <div className="form-group">
        <label htmlFor="edit-product-price">Price</label>
        <Field name="price" component="input" type="number" className="form-control" id="edit-product-price" placeholder="0.00" />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

EditProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { product } = state.products.editing;
  return {
    initialValues: { ...product }
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(
  reduxForm({
    form: 'edit-product'
  })(EditProductForm));

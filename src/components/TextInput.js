import React, { Component, PropTypes } from 'react';

export default class TextInput extends Component {

  render() {
    const { inputId, value, placeholder } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={inputId}>Email address</label>
        <input id={inputId} value={value} type="text" className="form-control" placeholder={placeholder} />
      </div>
    );
  }
}

TextInput.propTypes = {
  inputId: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

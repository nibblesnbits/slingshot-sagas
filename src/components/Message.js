import React, { Component, PropTypes } from 'react';

export default class Message extends Component {

  render() {
    const { title, text, className, hidden, hide } = this.props;
    return (
      <div className={`${hidden ? 'fadeOut' : ''}`}>
        <div className={`alert alert-${className} alert-dismissible`} role="alert">
          <button onClick={() => hide()} type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          {title && <strong>{title}</strong>}&emsp;{text}
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
};

import React, { Component, PropTypes } from 'react';

const iconMap = {
  danger: 'exclamation-circle',
  info: 'info-circle',
  success: 'check',
  warning: 'exclamation-triangle'
};

export default class Message extends Component {

  render() {
    const { title, text, className, hidden, hide } = this.props;
    const icon = iconMap[className];
    return (
      <div className={`${hidden ? 'animated fadeOut' : ''}`}>
        <div className={`alert alert-${className} alert-dismissible`} role="alert">
          <button onClick={() => hide()} type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          {icon && <i className={`fa fa-${icon}`} aria-hidden="true" />}
          {title && <strong>&emsp;{title}</strong>}&emsp;{text}
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
};

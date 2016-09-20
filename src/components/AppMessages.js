import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/app';

export class AppMessages extends Component {

  componentDidMount() {
    const { showToast } = this.props;
    showToast('', 'Loaded', 'success', 2000);
  }

  shouldComponentUpdate(nextProps) {
    const { text, hidden } = this.props;
    return text !== nextProps.text || hidden !== nextProps.hidden;
  }

  render() {
    const { hidden, title, text, className, hideMessage } = this.props;
    return (
      <div id="notificationArea">
        <div className={`alert alert-${className} alert-dismissible ${hidden ? 'hide' : ''}`} role="alert">
          <button onClick={() => hideMessage()} type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          {title && <strong>{title}</strong>}&emsp;{text}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { title, text, hidden, className } = state.app.message;
  return {
    title,
    text,
    hidden,
    className,
  };
}

AppMessages.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  showToast: PropTypes.func.isRequired,
  hideMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {...actions})(AppMessages);

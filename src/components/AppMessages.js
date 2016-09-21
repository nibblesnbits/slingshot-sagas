import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import * as actions from '../actions/app';

export class AppMessages extends Component {

  componentDidMount() {
    const { showToast } = this.props;
    showToast('', 'Loaded', 'success', 2000);
  }

  render() {
    const { messages, hideMessage } = this.props;
    return (
      <div id="notificationArea">
        {messages.map((message, i) => {
          return (<Message key={i} hide={() => hideMessage(i)} {...message} />);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.app.messages
  };
}

AppMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  showToast: PropTypes.func.isRequired,
  hideMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {...actions})(AppMessages);

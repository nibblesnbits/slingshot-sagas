import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import * as actions from '../actions/app';

export class AppMessages extends Component {

  render() {
    const { messages, removeMessage } = this.props;
    return (
      <div id="notificationArea">
        {messages.map((message) => {
          return (<Message key={message.id} hide={() => removeMessage(message.id)} {...message} />);
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
  removeMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { ...actions })(AppMessages);

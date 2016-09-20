import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class Login extends Component {

  handleClick(_event) {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = { username: username.value.trim(), password: password.value };
    this.props.onLoginClick(creds);
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        <input type="text" ref="username" className="form-control" style={{ marginRight: '5px' }} placeholder="Username"/>
        <input type="password" ref="password" className="form-control" style={{ marginRight: '5px' }} placeholder="Password"/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          {isFetching ? 'Logging in...' : 'Login'}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isFetching } = state.auth;
  return {
    isFetching,
  };
}


Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Login);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export class AuthGuard extends Component {

  componentWillMount() {
    const { token, push, redirectTo } = this.props;
    if (!token) {
      push(redirectTo || '/');
    }
  }

  render() {
    return (<div className="route-guard"/>);
  }
}

AuthGuard.propTypes = {
  token: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  redirectTo: PropTypes.string
};

function mapStateToProps(state) {
  const { username, token } = state.auth;

  return {
    username,
    token
  };
}

export default connect(mapStateToProps, { push })(AuthGuard);

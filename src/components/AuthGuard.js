import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import decode from 'jwt-decode';
import * as actions from '../actions/auth';

export class AuthGuard extends Component {

  componentWillMount() {
    const { token, requireLogin, redirectTo, allowedRoles } = this.props;
    if (!token) {
      return requireLogin(redirectTo);
    }
    if (allowedRoles) {
      const tokenPayload = decode(token);
      if (!tokenPayload.roles) {
      return requireLogin(redirectTo);
      }
      const matches = tokenPayload.roles.filter(r => {
        return allowedRoles.indexOf(r) > -1;
      });
      if (matches.length < 1) {
      return requireLogin(redirectTo);
      }
    }
  }

  render() {
    return (<div className="route-guard"/>);
  }
}

AuthGuard.propTypes = {
  token: PropTypes.string.isRequired,
  requireLogin: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
  allowedRoles: PropTypes.array
};

export function mapStateToProps(state) {
  const { username, token } = state.auth;

  return {
    username,
    token
  };
}

export default connect(mapStateToProps, { ...actions })(AuthGuard);

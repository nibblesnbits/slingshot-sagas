import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { parseJwt } from '../util/jwtParser';

export class AuthGuard extends Component {

  componentWillMount() {
    const { token, push, redirectTo, allowedRoles } = this.props;
    if (!token) {
      return push(redirectTo);
    }
    if (allowedRoles) {
      const tokenPayload = parseJwt(token).payload;
      if (!tokenPayload.roles) {
        return push(redirectTo);
      }
      const matches = tokenPayload.roles.filter(r => {
        return allowedRoles.indexOf(r) > -1;
      });
      if (matches.length < 1) {
        return push(redirectTo);
      }
    }
  }

  render() {
    return (<div className="route-guard"/>);
  }
}

AuthGuard.propTypes = {
  token: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
  allowedRoles: PropTypes.array
};

function mapStateToProps(state) {
  const { username, token } = state.auth;

  return {
    username,
    token
  };
}

export default connect(mapStateToProps, { push })(AuthGuard);

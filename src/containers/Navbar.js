import React, { Component, PropTypes } from 'react';
import Login from '../components/Login'; // eslint-disable-line import/no-named-as-default
import Logout from '../components/Logout'; // eslint-disable-line import/no-named-as-default
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';

export class Navbar extends Component {

  render() {
    const { isAuthenticated, logout, login } = this.props;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Quotes App</a>
          <div className="navbar-form">

            {!isAuthenticated &&
              <Login
                onLoginClick={creds => login(creds)}
                />
            }

            {isAuthenticated &&
              <Logout onLogoutClick={() => logout()} />
            }

          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.auth;
  return {
    isAuthenticated,
  };
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { ...authActions })(Navbar);

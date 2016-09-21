import React, { Component, PropTypes } from 'react';
import Login from '../components/Login'; // eslint-disable-line import/no-named-as-default
import Logout from '../components/Logout'; // eslint-disable-line import/no-named-as-default
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import { Link } from 'react-router';

export class Navbar extends Component {

  render() {
    const { isAuthenticated, logout, login } = this.props;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">React-Sagas</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="about">About</Link></li>
            </ul>
            <div className="navbar-form navbar-right">
              {!isAuthenticated &&
                <Login onLoginClick={creds => login(creds)} />
              }

              {isAuthenticated &&
                <Logout onLogoutClick={() => logout()} />
              }
            </div>
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

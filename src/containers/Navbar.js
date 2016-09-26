import React, { Component, PropTypes } from 'react';
import Login from '../components/Login'; // eslint-disable-line import/no-named-as-default
import Logout from '../components/Logout'; // eslint-disable-line import/no-named-as-default
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';
import { IndexLink, Link } from 'react-router';

export class Navbar extends Component {

  render() {
    const { username, isAuthenticated, logout, login } = this.props;
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
            <IndexLink to="/" className="navbar-brand" activeClassName="active">React-Sagas</IndexLink>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="products">Products</Link></li>
          </ul>

          <div className="collapse navbar-collapse">
            <div className="navbar-form navbar-right">
              {!isAuthenticated &&
                <Login onLoginClick={creds => login(creds)} />
              }

              {isAuthenticated &&
                <ul className="nav navbar-nav">
                  <li><Link to="profile">{username}</Link></li>
                  <div className="navbar-form navbar-left">
                    <Logout onLogoutClick={() => logout()} />
                  </div>
                </ul>
              }
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export function mapStateToProps(state) {
  const { isAuthenticated, username } = state.auth;
  return {
    isAuthenticated,
    username
  };
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { ...authActions })(Navbar);

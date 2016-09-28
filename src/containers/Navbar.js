import React, { Component, PropTypes } from 'react';
import Login from '../components/Login'; // eslint-disable-line import/no-named-as-default
import Logout from '../components/Logout'; // eslint-disable-line import/no-named-as-default
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';
import { IndexLink, Link } from 'react-router';

export class Navbar extends Component {

  render() {
    const { username, isAuthenticated, isAdmin, logout, login, cartCount } = this.props;
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
            <IndexLink to="/" className="navbar-brand" activeClassName="active">Slingshot-Sagas</IndexLink>
          </div>

          <div className="collapse navbar-collapse">

            <ul className="nav navbar-nav">
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart ({cartCount})</Link></li>
            </ul>

            <div className="navbar-form navbar-right">
              {!isAuthenticated &&
                <Login onLoginClick={creds => login(creds)} />
              }

              {isAuthenticated &&
                <ul className="nav navbar-nav">
                  {isAdmin && <li><Link to="/products/admin">Administration</Link></li>}
                  <li><Link to="/profile">{username}</Link></li>
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
  const { token, username, roles } = state.auth;
  const { items } = state.cart;
  return {
    isAuthenticated: !!token,
    username,
    isAdmin: roles.indexOf('admin') > -1,
    cartCount: items.length
  };
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  cartCount: PropTypes.number.isRequired
};

export default connect(mapStateToProps, { ...authActions })(Navbar);

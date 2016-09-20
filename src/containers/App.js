import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppMessages from '../components/AppMessages'; // eslint-disable-line import/no-named-as-default
import * as authActions from '../actions/auth';

export class App extends Component {

  componentDidMount() {
    this.props.checkCreds();
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
        <AppMessages />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  checkCreds: PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    children: ownProps.children
  };
}

export default connect(mapStateToProps, { ...authActions })(App);

import React, { Component, PropTypes } from 'react';
import AppMessages from './AppMessages'; // eslint-disable-line import/no-named-as-default

class App extends Component {

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
  children: PropTypes.element
};

export default App;

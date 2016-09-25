import React, { Component } from 'react';
import { connect } from 'react-redux';

export class HomePage extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <div className="container">
        <p>Hello.</p>
        </div>
      </div>
    );
  }
}

export default connect()(HomePage);

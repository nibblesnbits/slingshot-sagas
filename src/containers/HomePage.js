import React, { Component } from 'react';
import { connect } from 'react-redux';

export class HomePage extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <h1>Slingshot Sagas</h1>
            <p className="lead">Slingshot Sagas is a demo application for demonstrating an approach to rapid development of React/Redux applications.</p>
            <p><a target="_blank" href="https://github.com/nibblesnbits/slingshot-sagas" className="btn btn-primary btn-large">Learn more »</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(HomePage);

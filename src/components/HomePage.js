import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar'; // eslint-disable-line import/no-named-as-default
import Quotes from './Quotes'; // eslint-disable-line import/no-named-as-default
import * as quoteActions from '../actions/quotes';
import * as appActions from '../actions/app';

export class HomePage extends Component {

  componentDidMount() {
    this.props.fetchQuote();
  }

  render() {
    const { quote, isFetching, isAuthenticated, isSecretQuote, fetchQuote, fetchSecretQuote } = this.props;
    return (
      <div>
        <Navbar />
        <div className="container">
          <Quotes
            onQuoteClick={() => fetchQuote()}
            onSecretQuoteClick={() => fetchSecretQuote()}
            isAuthenticated={isAuthenticated}
            quote={quote}
            isSecretQuote={isSecretQuote}
            isFetching={isFetching}
          />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  quote: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  isSecretQuote: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchQuote: PropTypes.func.isRequired,
  fetchSecretQuote: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { quotes, auth } = state;
  const { quote, authenticated, isFetching } = quotes;
  const { isAuthenticated } = auth;

  return {
    quote,
    isFetching,
    isSecretQuote: authenticated,
    isAuthenticated
  };
}

export default connect(mapStateToProps, { ...appActions, ...quoteActions })(HomePage);

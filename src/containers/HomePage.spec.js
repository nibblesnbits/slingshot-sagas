import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mapStateToProps, HomePage } from './HomePage';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';

chai.use(sinonChai);

describe('<HomePage />', () => {

  it('should call fetchQuote() on mount', () => {
    const props = {
      quote: 'test',
      isAuthenticated: false,
      isSecretQuote: false,
      isFetching: false,
      fetchQuote: sinon.spy(),
      fetchSecretQuote: sinon.spy()
    };
    const store = createStore(rootReducer, initialState);

    mount(
      <Provider store={store}>
          <HomePage {...props} />
      </Provider>
    );

    expect(props.fetchQuote.calledOnce).to.equal(true);
  });

  it('should call fetchQuote() on quote button click()', () => {
    const props = {
      quote: 'test',
      isAuthenticated: false,
      isSecretQuote: false,
      isFetching: false,
      fetchQuote: sinon.spy(),
      fetchSecretQuote: sinon.spy()
    };
    const store = createStore(rootReducer, initialState);

    const wrapper = mount(
      <Provider store={store}>
          <HomePage {...props} />
      </Provider>
    );

    const quoteButton = wrapper.find('.quote-button');
    expect(quoteButton.length).to.equal(1);

    quoteButton.simulate('click');

    expect(props.fetchQuote.callCount).to.equal(2);
  });

  it('should call fetchSecretQuote() on secret quote button click()', () => {
    const props = {
      quote: 'test',
      isAuthenticated: true,
      isSecretQuote: false,
      isFetching: false,
      fetchQuote: sinon.spy(),
      fetchSecretQuote: sinon.spy()
    };
    const store = createStore(rootReducer, initialState);

    const wrapper = mount(
      <Provider store={store}>
          <HomePage {...props} />
      </Provider>
    );

    const quoteButton = wrapper.find('.secret-quote-button');
    expect(quoteButton.length).to.equal(1);

    quoteButton.simulate('click');

    expect(props.fetchSecretQuote.calledOnce).to.equal(true);
  });

  describe('mapStateToProps', () => {
    it('should return valid props', () => {
      const state = {
        auth: {
          isAuthenticated: true,
          token: 'test'
        },
        quotes: {
          quote: 'test',
          authenticated: true,
          isFetching: false
        }
      };

      const result = mapStateToProps(state);

      expect(result).to.deep.equal({
        quote: state.quotes.quote,
        isFetching: state.quotes.isFetching,
        isSecretQuote: state.quotes.authenticated,
        isAuthenticated: state.auth.isAuthenticated
      });
    });
  });
});

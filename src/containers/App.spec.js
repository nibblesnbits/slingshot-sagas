import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mapStateToProps, App } from './App';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';

chai.use(sinonChai);

describe('<App />', () => {

  it('should call checkCreds() on mount', () => {
    const props = {
      children: (<div />),
      checkCreds: sinon.spy(),
        initCart: sinon.spy()
    };
    const store = createStore(rootReducer, initialState);

    mount(
      <Provider store={store}>
          <App {...props} />
      </Provider>
    );

    expect(props.checkCreds.calledOnce).to.equal(true);
  });

  describe('mapStateToProps', () => {
    it('should return valid props', () => {
      const props = {
        children: (<div />),
        checkCreds: sinon.spy(),
        initCart: sinon.spy()
      };
      const state = {
        children: {}
      };

      const result = mapStateToProps(state, props);

      expect(result.children).to.deep.equal(props.children);
    });
  });
});

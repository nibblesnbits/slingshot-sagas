import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mapStateToProps, Login } from './Login';

chai.use(sinonChai);

describe('<Login />', () => {
  it('should call onLoginClick() on button click', () => {
    const props = {
      onLoginClick: sinon.spy(),
      isFetching: false
    };

    const wrapper = mount(<Login {...props} />);

    const loginButton = wrapper.find('button');

    expect(loginButton.length).to.equal(1);
    loginButton.simulate('click');

    expect(props.onLoginClick.calledOnce).to.equal(true);
  });

  it('should call onLoginClick() on form submit', () => {
    const props = {
      onLoginClick: sinon.spy(),
      isFetching: false
    };

    const wrapper = mount(<Login {...props} />);

    wrapper.simulate('submit');

    expect(props.onLoginClick.calledOnce).to.equal(true);
  });

  describe('mapStateToProps', () => {
    it('should return valid props', () => {
      const state = {
        auth: {
          isFetching: true
        }
      };

      const result = mapStateToProps(state);

      expect(result).to.deep.equal(state.auth);
    });
  });
});

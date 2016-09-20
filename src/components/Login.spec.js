import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Login } from './Login';

chai.use(sinonChai);

describe('<Login />', () => {
  it('should call onLoginClick() on button click', () => {
    const props = {
      onLoginClick: sinon.spy()
    };

    const wrapper = mount(<Login {...props} />);

    const loginButton = wrapper.find('button');

    expect(loginButton.length).to.equal(1);
    loginButton.simulate('click');

    expect(props.onLoginClick.calledOnce).to.equal(true);
  });
});

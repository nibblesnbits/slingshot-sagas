import React from 'react';
import { shallow  } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Logout } from './Logout';

chai.use(sinonChai);

describe('<Logout />', () => {

  it('should call onLogoutClick() on button click', () => {
    const props = {
      onLogoutClick: sinon.spy()
    };

    const wrapper = shallow(<Logout {...props} />);

    wrapper.simulate('click');

    expect(props.onLogoutClick.calledOnce).to.equal(true);
  });
});

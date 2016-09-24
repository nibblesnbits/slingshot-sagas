import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Message from './Message';

chai.use(sinonChai);

describe('<Message />', () => {

  it('should hide alert when hidden=true', () => {
    const props = {
      title: 'test',
      text: 'test',
      className: 'test',
      hidden: true,
      hide: sinon.spy()
    };

    const wrapper = shallow(<Message {...props} />);

    const alert = wrapper.find('.fadeOut');

    expect(alert.length, `${alert.length} hidden alerts found`).to.equal(1);
  });

  it('should show alert when hidden=false', () => {
    const props = {
      title: 'test',
      text: 'test',
      className: 'test',
      hidden: false,
      hide: sinon.spy()
    };

    const wrapper = shallow(<Message {...props} />);

    const alert = wrapper.find('.fadeOut');

    expect(alert.length, `${alert.length} hidden alerts found`).to.equal(0);
  });

  it('should call hide() on button click', () => {
    const props = {
      title: 'test',
      text: 'test',
      className: 'test',
      hidden: false,
      hide: sinon.spy()
    };

    const wrapper = shallow(<Message {...props} />);

    const button = wrapper.find('button');
    button.simulate('click');

    expect(props.hide.calledOnce).to.be.true;
  });

  it('should show title only when provided', () => {
    const props = {
      text: 'test',
      className: 'test',
      hidden: false,
      hide: sinon.spy()
    };

    const wrapper = shallow(<Message {...props} />);

    const title = wrapper.find('strong');

    expect(title.length).to.be.equal(0);
  });
});

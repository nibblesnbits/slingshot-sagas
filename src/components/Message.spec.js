import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Message from './Message';

describe('<Message />', () => {

  it('should hide alert when hidden=true', () => {
    const props = {
      title: 'test',
      text: 'test',
      className: 'test',
      hidden: true
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
      hidden: false
    };

    const wrapper = shallow(<Message {...props} />);

    const alert = wrapper.find('.fadeOut');

    expect(alert.length, `${alert.length} hidden alerts found`).to.equal(0);
  });
});

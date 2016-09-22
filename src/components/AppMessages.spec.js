import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { AppMessages } from './AppMessages';

describe('<AppMessages />', () => {

  it('should display an alert for each message', () => {
    const props = {
      showToast: () => null,
      removeMessage: () => null,
      messages: [{
        title: 'test',
        text: 'test',
        className: 'test',
        hidden: true,
        id: 'test',
      }]
    };

    const wrapper = mount(<AppMessages {...props} />);

    const messages = wrapper.find('.alert');

    expect(messages.length).to.equal(props.messages.length);
  });
});

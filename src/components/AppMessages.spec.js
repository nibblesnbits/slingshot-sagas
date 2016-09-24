import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { AppMessages } from './AppMessages';
import * as actions from '../actions/app';

chai.use(sinonChai);

describe('<AppMessages />', () => {

  it('should display an alert for each message', () => {
    const props = {
      showToast: sinon.spy(),
      removeMessage: sinon.spy(),
      messages: [actions.showMessage('test','test','test')]
    };

    const wrapper = mount(<AppMessages {...props} />);

    const messages = wrapper.find('.alert');

    expect(messages.length).to.equal(props.messages.length);
  });

  it('should call removeMessage on close button click', () => {
    const message = actions.showMessage('test','test','test');
    const props = {
      showToast: sinon.spy(),
      removeMessage: sinon.spy(),
      messages: [message]
    };

    const wrapper = mount(<AppMessages {...props} />);

    const closeButton = wrapper.find('.close');
    expect(closeButton.length).to.equal(1);

    closeButton.simulate('click');

    expect(props.removeMessage.calledOnce).to.be.true;
  });

  it('should display a toast on mount', () => {
    const props = {
      showToast: sinon.spy(),
      removeMessage: sinon.spy(),
      messages: []
    };

    mount(<AppMessages {...props} />);

    expect(props.showToast.calledOnce).to.be.true;
  });
});

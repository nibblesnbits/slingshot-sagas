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
      showToast: () => null,
      removeMessage: () => null,
      messages: [actions.showMessage('test','test','test')]
    };

    const wrapper = mount(<AppMessages {...props} />);

    const messages = wrapper.find('.alert');

    expect(messages.length).to.equal(props.messages.length);
  });

  it('should display a toast on mount', () => {
    const props = {
      showToast: sinon.spy(),
      removeMessage: () => null,
      messages: []
    };

    mount(<AppMessages {...props} />);

    expect(props.showToast.calledOnce).to.be.true;
  });
});

import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { AppMessages } from './AppMessages';

chai.use(sinonChai);

describe('<AppMessages />', () => {

  it('should call hideMessage() on close button click', () => {
    const props = {
      title: 'test',
      text: 'test',
      className: 'test',
      hidden: true,
      showToast: sinon.spy(),
      hideMessage: sinon.spy()
    };

    const wrapper = mount(<AppMessages {...props} />);

    const closeButton = wrapper.find('.close');

    expect(closeButton.length).to.equal(1);
    closeButton.simulate('click');

    expect(props.hideMessage.calledOnce).to.equal(true);
  });

  it('should call showToast() on mount', () => {
    const props = {
      title: 'test',
      text: 'test',
      className: 'test',
      hidden: true,
      showToast: sinon.spy(),
      hideMessage: sinon.spy()
    };

    mount(<AppMessages {...props} />);

    expect(props.showToast.calledOnce).to.equal(true);
  });
});

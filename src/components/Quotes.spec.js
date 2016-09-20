import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Quotes } from './Quotes';

chai.use(sinonChai);

describe('<Quotes />', () => {

  it('should call onQuoteClick() on quote button click', () => {
    const props = {
      isFetching: false,
      onQuoteClick: sinon.spy(),
      onSecretQuoteClick: sinon.spy(),
      isAuthenticated: false,
      quote: 'test',
      isSecretQuote: false
    };

    const wrapper = mount(<Quotes {...props} />);

    const button = wrapper.find('button').first();
    expect(button.length).to.be.equal(1);
    button.simulate('click');

    expect(props.onQuoteClick.calledOnce).to.equal(true);
  });

  it('should call onSecretQuoteClick() on secret quote button click', () => {
    const props = {
      isFetching: false,
      onQuoteClick: sinon.spy(),
      onSecretQuoteClick: sinon.spy(),
      isAuthenticated: true,
      quote: 'test',
      isSecretQuote: false
    };

    const wrapper = mount(<Quotes {...props} />);

    const button = wrapper.find('button').last();
    expect(button.hasClass('btn-warning'), 'button should have "btn-warning" class').to.be.true;
    button.simulate('click');

    expect(props.onSecretQuoteClick.calledOnce, 'onSecretQuoteClick should be called once').to.be.true;
  });
});

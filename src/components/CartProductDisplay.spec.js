import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import CartProductDisplay from './CartProductDisplay';

chai.use(sinonChai);

describe('<CartProductDisplay />', () => {

  it('should call handleRemoveFromCart() on button click', () => {
    const props = {
      id: 0,
      price: 0,
      name: 'test',
      description: 'test',
      getCount: () => 0,
      handleRemoveFromCart: sinon.spy()
    };

    const wrapper = mount(<CartProductDisplay {...props} />);

    const button = wrapper.find('.card-action button');

    button.simulate('click');

    expect(props.handleRemoveFromCart.calledOnce).to.be.true;
  });
});

import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ProductDisplay from './ProductDisplay';

chai.use(sinonChai);

describe('<ProductDisplay />', () => {

  it('should total cart', () => {
    const props = {
      id: 1,
      price: 1,
      name: 'test',
      description: 'test',
      handleAddToCart: () => null
    };

    const wrapper = mount(<ProductDisplay {...props} />);

    const total = wrapper.find('.product-price');

    expect(total.text()).to.equal("$1.00");
  });

  it('should call handleAddToCart on button click', () => {
    const props = {
      id: 1,
      price: 1,
      name: 'test',
      description: 'test',
      handleAddToCart: sinon.spy()
    };

    const wrapper = mount(<ProductDisplay {...props} />);

    const button = wrapper.find('.card-action button');
    expect(button.length).to.equal(1);

    button.simulate('click');

    expect(props.handleAddToCart.calledOnce).to.equal(true);
  });
});

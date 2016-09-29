import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { CartSummary } from './CartSummary';

describe('<CartSummary />', () => {

  it('should total cart', () => {
    const props = {
      total: 1
    };

    const wrapper = mount(<CartSummary {...props} />);

    const total = wrapper.find('.cart-subtotal');

    expect(total.text()).to.equal("$1.00");
  });
});

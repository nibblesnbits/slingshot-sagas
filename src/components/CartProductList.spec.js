import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { CartProductList } from './CartProductList'; // eslint-disable-line import/no-named-as-default

describe('<CartProductList />', () => {

  it('should render a CartProductDisplay for each product', () => {
    const props = {
      removeFromCart: () => null,
      products: [{
        id: 0,
        name: 'test',
        price: 0,
        description: 'test'
      }],
      cart: []
    };

    const wrapper = mount(<CartProductList {...props} />);
    const displays = wrapper.find('CartProductDisplay');

    expect(displays.length).to.equal(props.products.length);
  });
});

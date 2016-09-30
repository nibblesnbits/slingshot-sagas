import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { ProductList } from './ProductList';

describe('<ProductList />', () => {

  it('should render a ProductDisplay for each product', () => {
    const props = {
      products: [{
        id: 1,
        price: 1,
        name: 'test',
        description: 'test',
      }],
      addToCart: () => null
    };

    const wrapper = mount(<ProductList {...props} />);

    const productDisplays = wrapper.find('ProductDisplay');

    expect(productDisplays.length).to.equal(props.products.length);
  });
});

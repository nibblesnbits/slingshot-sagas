import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { ProductTableRow } from './ProductTableRow';

chai.use(sinonChai);

describe('<ProductTableRow />', () => {

  before(() => {
    sinon.spy(ProductTableRow.prototype, 'onDeleteClick');
    sinon.spy(ProductTableRow.prototype, 'onEditClick');
  });

  let props;
  beforeEach(() => {
    props = {
      product: {
        id: 1,
        name: 'test',
        price: 1
      },
      deleteProduct: sinon.spy(),
      showEditModal: sinon.spy()
    };
  });

  it('call deleteProduct when delete button is clicked', () => {

    const wrapper = mount(<table><tbody><ProductTableRow {...props} /></tbody></table>);

    const button = wrapper.find('a').first();
    expect(button.length).to.equal(1);

    button.simulate('click');

    expect(ProductTableRow.prototype.onDeleteClick.calledOnce).to.equal(true);
    expect(props.deleteProduct.calledOnce).to.equal(true);
  });

  it('call showEditModal when edit button is clicked', () => {

    const wrapper = mount(<table><tbody><ProductTableRow {...props} /></tbody></table>);

    const button = wrapper.find('a').last();
    expect(button.length).to.equal(1);

    button.simulate('click');

    expect(ProductTableRow.prototype.onEditClick.calledOnce).to.equal(true);
    expect(props.showEditModal.calledOnce).to.equal(true);
  });
});

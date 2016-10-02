import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { EditProductModal } from './EditProductModal';

chai.use(sinonChai);

describe('<EditProductModal />', (done) => {

  it('should call closeEditModal on close click', () => {

    const props = {
      modalOpen: true,
      closeEditModal: sinon.spy(),
      updateProduct: sinon.spy()
    };

    const wrapper = mount(<EditProductModal />);

    setTimeout(() => {
      const modal = wrapper.find('EditProductModal');
      expect(modal.length).to.equal(1);

      const button = modal.find('button');
      expect(button.length).to.equal(1);

      button.simulate('click');

      expect(props.closeEditModal.calledOnce).to.equal(true);

      done();
    }, 50);
  });
});

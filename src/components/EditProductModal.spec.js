// import React from 'react';
// import { mount } from 'enzyme';
// import chai, {expect} from 'chai';
// import { createStore } from 'redux';
// import rootReducer from '../reducers/rootReducer';
// import initialState from '../reducers/initialState';
// import { Provider } from 'react-redux';
// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';
// import ConnectedEditProductModal, { EditProductModal } from './EditProductModal';
// // import * as types from '../constants/actionTypes';
// import * as actions from '../actions/productActions';

// chai.use(sinonChai);

// describe('<EditProductModal />', () => {

//   describe('with redux', () => {

//     let store;
//     beforeEach((done) => {
//       store = createStore(rootReducer, initialState);
//       const unsubscribe = store.subscribe(() => {
//         unsubscribe();
//         done();
//       });
//       store.dispatch(actions.showEditModal({
//         id: 1,
//         name: 'test',
//         description: 'test',
//         price: 1
//       }));
//     });

//     it('should call onSubmit on form submit', (done) => {

//       const wrapper = mount(
//         <Provider store={store}>
//           <ConnectedEditProductModal />
//         </Provider>
//       );

//       setTimeout(() => {

//         const modal = wrapper.find('EditProductModal');
//         expect(modal.length).to.equal(1);

//         console.log('');
//         console.log('');
//         console.log(wrapper.instance());
//         console.log('');
//         console.log('');
//         // console.log(ConnectedEditProductModal);
//         console.log('');
//         console.log('');
//         // console.log(modal.html());
//         // const updateSpy = sinon.spy(modal.props(), 'updateProduct');
//         // const closeSpy = sinon.spy(modal.props(), 'closeEditModal');

//         const button = modal.find('.edit-modal-save');
//         expect(button.length).to.equal(1);

//         // const nameField = form.find('input').first();
//         // expect(nameField.length).to.equal(1);

//         // nameField.simulate('change', { target: {value: 'name2' } });

//         const unsubscribe = store.subscribe(() => {
//           expect(updateSpy.calledOnce).to.equal(true);
//           expect(closeSpy.calledOnce).to.equal(true);
//           updateSpy.restore();
//           closeSpy.restore();
//           unsubscribe();
//           done();
//         });

//         button.simulate('click');
//       }, 0);
//     });
//   });

//   // describe('without redux', () => {
//   //   it('should call closeEditModal on close click', () => {

//   //     const props = {
//   //       modalOpen: true,
//   //       closeEditModal: sinon.spy(),
//   //       updateProduct: sinon.spy()
//   //     };

//   //     const wrapper = mount(<EditProductModal {...props} />);

//   //     setTimeout(() => {
//   //       const modal = wrapper.find('EditProductModal');
//   //       expect(modal.length).to.equal(1);

//   //       const button = modal.find('button');
//   //       expect(button.length).to.equal(1);

//   //       button.simulate('click');

//   //       expect(props.closeEditModal.calledOnce).to.equal(true);

//   //       done();
//   //     }, 50);
//   //   });
//   // });
// });

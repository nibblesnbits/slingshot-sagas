import jsonLocalStorage from './jsonLocalStorage';
import { expect } from 'chai';

function createMockStore() {
    const store = {};
    store.setItem = function (key, val) {
      this[key] = val;
    };

    store.getItem = function (key) {
      return this[key];
    };

    return store;
}

global.localStorage = createMockStore();

describe('jsonCartLocalStorage', () => {
  it('should return json for getItem', () => {
    jsonLocalStorage.setItem('test', {});

    const contents = jsonLocalStorage.getItem('test');

    expect(typeof(contents)).to.equal("object");
  });
});

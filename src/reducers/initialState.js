export default {
  app: {
    messages: []
  },
  auth: {
    token: '',
    username: '',
    roles: [],
    isFetching: false,
    isAuthenticated: false
  },
  products: {
    list: [],
    filter: '',
    sortBy: 'name',
    editing: {
      modalOpen: false,
      product: {
        name: '',
        price: 0
      }
    }
  },
  cart: {
    items: []
  }
};

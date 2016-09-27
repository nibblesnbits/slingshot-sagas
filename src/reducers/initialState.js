export default {
  app: {
    messages: []
  },
  auth: {
    token: '',
    username: '',
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
  }
};

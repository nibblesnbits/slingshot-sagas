import { getItem } from '../util/storage';
import * as keys from '../constants/storageKeys';

const token = getItem(keys.ACCESS_TOKEN) || '';

export default {
  app: {
    message: {
      title: '',
      text: '',
      hidden: true,
      className: 'info'
    }
  },
  auth: {
    token: token,
    isFetching: false,
    isAuthenticated: typeof(token) !== "undefined"
  },
  quotes: {
    isFetching: false,
    quote: '',
    authenticated: false
  }
};

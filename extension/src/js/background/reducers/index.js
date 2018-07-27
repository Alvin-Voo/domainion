import {combineReducers} from 'redux';

import store from './store';
import account from './account';

export default combineReducers({
  store,
  account
});

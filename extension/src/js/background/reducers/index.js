import {combineReducers} from 'redux';

import utils from './utils';
import account from './account';
import popupstate from './popup/state';

export default combineReducers({
  utils,
  account,
  popupstate
});

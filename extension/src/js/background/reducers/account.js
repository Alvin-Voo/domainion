import * as types from '../actions/types';
import merge from 'lodash/merge'; //no full build please

const initialState = {
  accountholder:'',
  exists:false,
  domainowner:'',
  hostname:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.STORE_WEB3_ACCOUNT_PAGE_INFO:
      console.log('store web3 ');
      console.log(action.payload);
      return {...state,...action.payload};//shallow copying is fine
    default:
      return state;
  }
};

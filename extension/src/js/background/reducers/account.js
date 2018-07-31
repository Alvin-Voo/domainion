import * as types from '../actions/types';

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
      return {...state, ...action.payload};
    default:
      return state;
  }
};

import * as types from '../actions/types';

const initialState = {
  popup_command : '',
  popup_payload : ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.BGLOG:
      console.log(action.payload);
      return state;
    case types.INIT:
    case types.JOIN:
    case types.ATTACK:
      return {...state, popup_command:action.type, popup_payload:action.payload}
    case types.RESET_STORE:
      return {...state, ...initialState}
    default:
      return state;
  }
};

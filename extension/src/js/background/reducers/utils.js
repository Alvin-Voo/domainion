import * as types from '../actions/types';

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.BGLOG:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};

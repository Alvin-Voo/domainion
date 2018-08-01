import * as types from 'js/background/actions/types';
import merge from 'lodash/merge'; //no full build please
//TODO: this state need to presist and rehydrated after the browser is closed and opend again
const initialState={}
//address:{
//  url:{currentState, error}, --> state and error that is bound to page
//  url1:{..} --> each url has its own state and error
//  url2:{..}
//  url..
//  status:''--> anything that is one time only, or NOT bound to page, like joining
//  error:'' -->error that is NOT bound to page, like join error
//}
//currentState is mutually exclusive, i.e. can only ONE state at a time, joining means you cannot attack..

export default(state = initialState, action)=>{
  switch(action.type){
    case types.JOINING:
      console.log('webstore joining');
    case types.JOIN_SUCCESS:
      console.log('webstore joined success');
    case types.JOIN_FAIL:
      console.log('webstore joined failed');
      console.log(action.payload);
      return {...state, ...action.payload};//shallow copying is OK for obj first level
    case types.ATTACKING:
      console.log('webstore attacking');
    case types.ATTACK_SUCCESS:
      console.log('webstore attack success');
    case types.ATTACK_FAIL:
      console.log('webstore attack fail');
      const newState = merge({},state,action.payload);
      console.log(newState);
      return newState;
    case types.ERROR:
      return {...state, ...action.payload};
    case types.ERROR_CLEAR:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

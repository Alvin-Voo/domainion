import * as types from 'js/background/actions/types';

const initialState={}
//address:{
//  url:{currentState}, --> state or anything bound to page
//  status:''--> anything that is one time only, or NOT bound to page, like joining
//  error: '' --> right now every error due to user actions is saved here
//}
//currentState is mutually exclusive, i.e. can only ONE state at a time, joining means you cannot attack..

export default(state = initialState, action)=>{
  switch(action.type){
    case types.JOINING:
      console.log('webstore joining');
      console.log(action.payload);
      return {...state, ...action.payload};
    case types.JOIN_SUCCESS:
      console.log('webstore joined success');
      console.log(action.payload);
      return {...state, ...action.payload};
    case types.JOIN_FAIL:
      console.log('webstore joined failed');
      console.log(action.payload);
      return {...state, ...action.payload};
    case types.ATTACKING:
      console.log('webstore attacking');
      console.log(action.payload);
      return {...state, ...action.payload};
    case types.ATTACK_SUCCESS:
      console.log('webstore attack success');
      console.log(action.payload);
      return {...state, ...action.payload};
    case types.ATTACK_FAIL:
      console.log('webstore attack success');
      console.log(action.payload);
      return {...state, ...action.payload};
    case types.ERROR:
      return {...state, ...action.payload};
    case types.ERROR_CLEAR:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

//if currently joining, disable all other buttons at ANY hostname, after joined, disable join button
//if currently attacking, attack button is loading at current hostname but available at other hostname
//for current testing purpose, attack button would still be available even though during cooldown period

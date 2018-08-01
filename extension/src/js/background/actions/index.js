import * as types from './types';

export function bglog(msg){
  return{
    type: types.BGLOG,
    payload: msg
  }
}

export function store_web3_account_page_info(payload){
  return{
    type: types.STORE_WEB3_ACCOUNT_PAGE_INFO,
    payload
  }
}

export function joining(accountholder){
  let payloadVal = {};
  payloadVal[accountholder] = {status: types.JOINING,error:''};

  return{
    type: types.JOINING,
    payload: payloadVal
  }
}

export function join_success({accountholder}){
  let payloadVal = {};
  payloadVal[accountholder] = {status: types.JOIN_SUCCESS,error:''};

  return{
    type: types.JOIN_SUCCESS,
    payload: payloadVal
  }
}

export function join_fail({accountholder, error}){
  let payloadVal = {};
  payloadVal[accountholder] = {status: types.JOIN_FAIL, error: `JOIN FAIL>${error}`};

  return{
    type: types.JOIN_FAIL,
    payload: payloadVal
  }
}

export function attacking(hostname,accountholder){//attack which domain
  let payloadVal = {};
  payloadVal[accountholder]={[hostname]:{currentState: types.ATTACKING,error:''}};

  return{
    type: types.ATTACKING,
    payload: payloadVal
  }
}

export function attack_success({accountholder, hostname}){
  let payloadVal = {};
  payloadVal[accountholder] = {[hostname]:{currentState: types.ATTACK_SUCCESS,error:''}};

  return{
    type: types.ATTACK_SUCCESS,
    payload: payloadVal
  }
}

export function attack_fail({accountholder, hostname, error}){
  let payloadVal = {};
  payloadVal[accountholder] = {[hostname]:{currentState: types.ATTACK_FAIL,error:`ATTACK FAIL>${error}`}};

  return{
    type: types.ATTACK_FAIL,
    payload: payloadVal
  }
}

export function error_clear({accountholder}){
  let payloadVal = {};
  payloadVal[accountholder] = {error:''}
  return{
    type: types.ERROR_CLEAR,
    payload: payloadVal
  }
}

export function error_out(error){
  return{
    type: types.ERROR,
    payload: error
  }
}

export function reset_store(){
  return{
    type: types.RESET_STORE
  }
}

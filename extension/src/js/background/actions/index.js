import * as types from './types';

export function bglog(msg){
  return{
    type: types.BGLOG,
    payload: msg
  }
}

export function init(){
  return{
    type: types.INIT
  }
}

export function store_web3_account_page_info(payload){
  return{
    type: types.STORE_WEB3_ACCOUNT_PAGE_INFO,
    payload
  }
}

export function join(){
  return{
    type: types.JOIN
  }
}

export function attack(payload){//attack who/
  return{
    type: types.ATTACK,
    payload
  }
}

export function resetStore(){
  return{
    type: types.RESET_STORE
  }
}

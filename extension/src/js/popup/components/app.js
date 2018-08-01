import React, {Component} from 'react';
import { Header, Button, Container } from 'semantic-ui-react'
import {connect} from 'react-redux';
import * as actions from 'js/background/actions';
import * as types from 'js/background/actions/types';
import {parseHostname} from 'js/common/utils';

class App extends Component{

  state={};

  componentDidMount(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: types.INIT});
    });
  }

  onJoin=(event)=>{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {//so 'this' points to class
     chrome.tabs.sendMessage(tabs[0].id, {type: types.JOIN});
     //set join button state to loading
     this.props.joining(this.props.account.accountholder);
   });
  }

  onAttack=(event)=>{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const {hostname,accountholder} = this.props.account
      this.props.bglog(accountholder+'attacking '+hostname);
      chrome.tabs.sendMessage(tabs[0].id, {type: types.ATTACK, hostname});
      //set attack button state to loading
      this.props.attacking(hostname,accountholder);
    });
  }

  showInfo=()=>{
    const {accountholder,exists} = this.props.account;
    if(!accountholder){
      return 'Please login to your MetaMask.';
    }else{
      if(exists){
        return `Welcome back! ${accountholder}.`;
      }
    }
    return 'Are you new here? Press the \'Join!\' button to start playing!';
  }

  showOwnershipInfo=()=>{
    const {accountholder,domainowner,hostname} = this.props.account;
    if(!accountholder) return;
    if(!domainowner||parseInt(domainowner)===0){
      return `${hostname} is NOT owned by anyone yet!`;
    }else if(parseInt(domainowner)>0){
      if(accountholder===domainowner) {
        return `${hostname} is owned by you!`;
      }
      else return `${hostname} is owned by ${domainowner}.`;
    }
  }

  isJoinDisabled=()=>{
    return !this.props.account.accountholder || this.props.account.exists || this.isJoinLoading();
  }

  isJoinLoading=()=>{
    const popupstate = this.props.popupstate[this.props.account.accountholder];
    // this.props.bglog('popupstate');
    // this.props.bglog(popupstate);
    if(popupstate){
      return popupstate.status === types.JOINING;
    }

    return false;
  }

  isAttackDisabled=()=>{
    //if user not exist, disable this
    //if join button is loading, disable this
    return !this.props.account.exists || this.isJoinLoading() || this.isAttackLoading();
  }

  isAttackLoading=()=>{
    const popupstate = this.props.popupstate[this.props.account.accountholder];
    // this.props.bglog('popupstate');
    // this.props.bglog(popupstate);
    if(popupstate&&popupstate[this.props.account.hostname]){//make sure don't access undefined of undefined
      return popupstate[this.props.account.hostname].currentState === types.ATTACKING;
    }

    return false;
  }

  showError=()=>{
    const popupstate = this.props.popupstate[this.props.account.accountholder];
    if(popupstate){
      if(popupstate.error) return popupstate.error;
      if(popupstate[this.props.account.hostname]&&popupstate[this.props.account.hostname].error)
      return popupstate[this.props.account.hostname].error;
    }
  }

  render(){
    return(
      <Container style={{margin:'5px'}}>
       <Header as='h2'>Welcome to Domainion!</Header>
       <p>{this.showInfo()}</p>
       <hr/>
       <p>{this.showOwnershipInfo()}</p>
       <p style={{color:'red', fontSize:'0.8em'}}>{this.showError()}</p>
       <hr/>
       <Button primary onClick={this.onJoin} disabled={this.isJoinDisabled()} loading={this.isJoinLoading()}>Join!</Button>
       <Button color='google plus' onClick={this.onAttack} disabled={this.isAttackDisabled()} loading={this.isAttackLoading()}>Attack!</Button>
      </Container>
    );
  }
}

const mapStateToProps = ({account,popupstate}) => {
  return {
    account,
    popupstate
  };
};

export default connect(mapStateToProps,actions)(App);

import React, {Component} from 'react';
import { Header, Button, Container } from 'semantic-ui-react'
import {connect} from 'react-redux';
import * as actions from 'js/background/actions';
import {parseHostname} from 'js/common/utils';


class App extends Component{

  state={
    join_button_loading:false,
    attack_button_loading:false
  };

  componentDidMount(){
    this.props.init();
  }

  onJoin=(event)=>{
    this.props.bglog("YAY Join!");
    this.props.join();
  }

  onAttack=(event)=>{
    this.props.bglog("YAY Attack!");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const hostname = parseHostname(tabs[0].url);
      this.props.bglog('attacking '+hostname);
      this.props.attack(hostname);
    });
  }

  showInfo=()=>{
    const {accountholder,exists,domainowner} = this.props.account;
    if(!accountholder){
      return 'Please login to your MetaMask.';
    }else{
      if(exists){
        return `Welcome back! ${accountholder}.`;
      }
    }

    return 'Are you new here? Press the \'Join!\' button to start playing!';
  }

  render(){
    return(
      <Container style={{margin:'5px'}}>
       <Header as='h2'>Welcome to Domainion!</Header>
       <p>{this.showInfo()}</p>
       <hr/>
       <p>info</p>
       <hr/>
       <Button primary onClick={this.onJoin} disabled={this.props.account.exists}>Join!</Button>
       <Button color='google plus' onClick={this.onAttack}>Attack!</Button>
      </Container>
    );
  }
}

const mapStateToProps = ({account}) => {
  return {
    account
  };
};

export default connect(mapStateToProps,actions)(App);

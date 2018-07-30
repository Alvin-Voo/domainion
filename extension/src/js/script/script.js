//console logs to web page
import Web3 from 'web3';
import Domainion from '../../../../ethereum/build/GamePlay';
//deployed address in Rinkeby Testnet
const address = '0x0BD7AeF78D112123Bde12E158FDB1DBF0cab004A';
let accounts;


if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){

  web3 = new Web3(window.web3.currentProvider);
  const domainion = new web3.eth.Contract(
    JSON.parse(Domainion.interface),
    address
  );

  //event listeners
  document.addEventListener('INIT',async(e)=>{
    console.log('script: INIT');

    accounts = await web3.eth.getAccounts();
    let exists = false;
    let domainowner;
    console.log(accounts[0]);

    if(accounts[0]){
      //check whether this is an existing player
      try{
        const ret = await domainion.methods.getMyInfo().call({
          from: accounts[0]
        });
        // const pastattackevents = await domainion.getPastEvents("NewCapturedDomain", { fromBlock: 2683508, toBlock: "latest" });
        console.log(ret);
        // console.log(pastattackevents);
        //get player for this domain
        console.log(window.location.hostname);
        try{
          const {playerAddress} =  await domainion.methods.getDomainInfo(window.location.hostname).call()

          if(playerAddress){
            console.log("this domain owner is "+playerAddress);
            domainowner = playerAddress
          }
        }catch(e){
          //means this domain is not registered yet
        }

        // if(playerAddress===accounts[0]) {
        //   domainowner = 'This domain is owned by you!';
        // }else if(!owner_addr){
        //   domainowner = 'This domain is NOT owned by anyone yet!';
        // }else{
        //   domainowner = `This domain is owned by ${owner_addr}`;
        // }
        // console.log(domainowner);
        if(ret)exists = true;

      }catch(e){
        console.log(e.message);
        exists = false;
      }
    }
    document.dispatchEvent(new CustomEvent('WEB3_ACCOUNT_PAGE_INFO',
      {
        detail:{
          accountholder: accounts[0],
          exists,
          domainowner,
          url: window.location.hostname
        }
      }
    ))
  })

  document.addEventListener('CREATE_PLAYER', async(e) => {
    console.log('script: CREATE_PLAYER');

    try{
      await domainion.methods.createPlayer().send({
        from: accounts[0]
      });
      console.log('script: PLAYER_CREATED');
      document.dispatchEvent(new CustomerEvent('WEB3_PLAYER_CREATED'));
    }catch(e){
      console.log(e.message);
      console.log('script: PLAYER_NOT_CREATED');
      document.dispatchEvent(new CustomerEvent('WEB3_PLAYER_NOT_CREATED',
      {
        detail:{
          error: e.message
        }
      }));
    }
  });

  document.addEventListener('ATTACK_DOMAIN', async(e)=>{
    console.log('script: ATTACK_DOMAIN');

    try{
      if(!e.detail)throw('URL is undefined or empty!');
      await domainion.methods.attackDomain(e.detail).send({
        from: accounts[0]
      }).on('receipt', function(receipt){
        console.log('receipt');
        console.log(receipt);
        if(receipt.gasUsed>0){
          //transaction successful

          //stop loading
        }
      });
    }catch(e){
      console.log(e);
      //transaction unsuccesful
      //stop loading
    }
  })



}

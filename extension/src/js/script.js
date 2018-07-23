//console logs to web page
import Web3 from 'web3';
import Domainion from '../../../ethereum/build/Domainion.json';
//deployed address in Rinkeby Testnet
const address = '0x3a9C8A5EC9117bb2967003C7e192C73C946D67e7';
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
        // console.log(ret);
        // console.log(pastattackevents);
        //get player for this domain
        // console.log(window.location.hostname);
        const owner_addr = await domainion.methods.getPlayerByDomain(window.location.hostname).call();
        if(owner_addr===accounts[0]) {
          domainowner = 'This domain is owned by you!';
        }else if(!owner_addr){
          domainowner = 'This domain is NOT owned by anyone yet!';
        }else{
          domainowner = `This domain is owned by ${owner_addr}`;
        }
        console.log(owner_addr);
        console.log(domainowner);
        if(ret)exists = true;

      }catch(e){
        console.log(e);
        exists = false;
      }
    }
    document.dispatchEvent(new CustomEvent('WEB3_ACCOUNT_PAGE_INFO',
      {
        detail:{
          account: accounts[0],
          exists,
          domainowner
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
    }catch(e){
      console.log(e);
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

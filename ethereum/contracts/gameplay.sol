pragma solidity ^0.4.24;

import "./players.sol";

contract GamePlay is Players{

    function _captureNewDomain(string url, uint32 prodRate, uint16 atkMul, uint16 defMul, uint8 siteRating) internal{
        uint id = domains.push(Domain({url:url, readyTime: uint32(now + cooldownTime),productionRate:prodRate,attackMultiplier:atkMul,defenseMultiplier:defMul,siteRating:siteRating}));

        domainToPlayer[id] = msg.sender;
        domainUrl[url] = id;

        Player storage p = players[playerInfo[msg.sender]-1];
        p.domainCount++;

        emit NewCapturedDomain(id,url,msg.sender);
    }

    function _captureExistingDomain(uint id) internal{
        if(domainToPlayer[id]!=address(0)){
            Player storage origP = players[playerInfo[domainToPlayer[id]]-1];
            origP.domainCount--;
        }

        domainToPlayer[id] = msg.sender;

        Player storage p = players[playerInfo[msg.sender]-1];
        p.domainCount++;

        emit NewCapturedDomain(id,domains[id-1].url,msg.sender);
    }

    function _triggerCooldown(Domain storage domain) internal {
        domain.readyTime = uint32(now + cooldownTime);
    }

    function _isReady(Domain storage domain) internal view returns (bool) {
        return (domain.readyTime <= now);
    }

    function attackDomain(string url) public{
        require(playerInfo[msg.sender]>0);
        if(domainUrl[url]>0){
            Domain storage d = domains[domainUrl[url]-1];
            require(_isReady(d));
            _captureExistingDomain(domainUrl[url]);
            _triggerCooldown(d);
        }
        if(domainUrl[url]==0){
            _captureNewDomain(url,1000,1199,1199,100);
        }
    }
}

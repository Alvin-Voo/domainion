pragma solidity ^0.4.24;

contract Domainion{

    event NewCapturedDomain(uint domainId, string url, address player);

    uint cooldownTime = 20 seconds;

    struct Domain{
        string url;
        uint32 readyTime;
        uint32 productionRate;
        uint16 attackMultiplier;
        uint16 defenseMultiplier;
        uint8 siteRating;
    }

    struct Player{
        uint minionCount;
        uint32 domainCount;
        uint8 attackRating;
        uint8 defenseRating;
    }

    Domain[] public domains;
    Player[] public players;

    mapping(uint => address) public domainToPlayer;
    mapping(string => uint) domainUrl;//mapped to domains id
    mapping(address => uint) playerInfo;//mapped to players id

    function _captureNewDomain(string url, uint32 prodRate, uint16 atkMul, uint16 defMul, uint8 siteRating) internal{
        uint id = domains.push(Domain({url:url, readyTime: uint32(now + cooldownTime),productionRate:prodRate,attackMultiplier:atkMul,defenseMultiplier:defMul,siteRating:siteRating}));

        domainToPlayer[id] = msg.sender;
        domainUrl[url] = id;

        Player storage p = players[playerInfo[msg.sender]-1];
        p.domainCount++;

        emit NewCapturedDomain(id,url,msg.sender);
    }

    function _captureExistingDomain(uint id) internal{
        //reduce the original owner domain count
        Player storage origP = players[playerInfo[domainToPlayer[id]]-1];
        origP.domainCount--;

        //overwrite the ownership
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
        //need to check this is existing player - this player should have id > 0
        require(playerInfo[msg.sender]>0);

        //if the domain ALREADY exist
        //check is it ready to be captured again
        if(domainUrl[url]>0){
            Domain storage d = domains[domainUrl[url]-1];
            require(_isReady(d));

            _captureExistingDomain(domainUrl[url]);

            _triggerCooldown(d);

        }

        //if the domain DOES NOT exist yet
        if(domainUrl[url]==0){
            //create new domain and assign owner to this player

            //some fixed values for testing
            ///@dev need a way to get these data from a dedicated API?
            _captureNewDomain(url,1000,1199,1199,100);

        }
    }

    function createPlayer() public{
        //an initial function to create player or join game - should check if player already exists
        require(playerInfo[msg.sender]==0);
        //push returns NEW LENGTH -hence id = index + 1
        uint id = players.push(Player({minionCount:1000,domainCount:0,attackRating:1,defenseRating:1}));
        playerInfo[msg.sender] = id;
    }

    function getDomainsByPlayer(address player) external view returns(uint[]){
        uint[] memory result = new uint[](players[playerInfo[player]-1].domainCount);
        uint counter = 0;
        for (uint i = 0; i <= domains.length; i++) {
            if (domainToPlayer[i] == player) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getPlayerByDomain(string url) external view returns(address){
        address playerAddr = domainToPlayer[domainUrl[url]];

        return playerAddr;
    }

    function getMyInfo() external view returns(uint minionCount, uint32 domainCount, uint8 attackRating, uint8 defenseRating){
        require(playerInfo[msg.sender]>0);//if no such player, error out

        Player memory p = players[playerInfo[msg.sender]-1];
        minionCount = p.minionCount;
        domainCount = p.domainCount;
        attackRating = p.attackRating;
        defenseRating = p.defenseRating;
    }

}

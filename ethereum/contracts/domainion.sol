pragma solidity ^0.4.24;

import "./ownable.sol";

contract Domainion is Ownable{

    event NewCapturedDomain(uint domainId, string url, address indexed playerAddress);
    event NewCreatedPlayer(uint playerId, address indexed playerAddress);

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
        address playerAddress;
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

    function getDomainInfo(string url) external view returns(address playerAddress, uint32 readyTime,uint32 productionRate, uint16 attackMultiplier, uint16 defenseMultiplier, uint8 siteRating){
        require(domainUrl[url]>0);

        Domain memory d = domains[domainUrl[url]-1];
        playerAddress = domainToPlayer[domainUrl[url]];
        readyTime = d.readyTime;
        productionRate = d.productionRate;
        attackMultiplier = d.attackMultiplier;
        defenseMultiplier = d.defenseMultiplier;
        siteRating = d.siteRating;
    }
}

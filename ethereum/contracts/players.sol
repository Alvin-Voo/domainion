pragma solidity ^0.4.24;

import "./admin.sol";

contract Players is Admin{

    function createPlayer() public{
        //an initial function to create player or join game - should check if player already exists
        //also check if player was banned
        require(playerInfo[msg.sender]==0 && bannedPlayerInfo[msg.sender]==0,"player already exists or banned");
        //push returns NEW LENGTH -hence id = index + 1
        uint id = players.push(Player({playerAddress:msg.sender,minionCount:1000,domainCount:0,attackRating:1,defenseRating:1}));
        playerInfo[msg.sender] = id;

        emit NewCreatedPlayer(id, msg.sender);
    }

    function getMyDomains() external view returns(uint[]){
        require(playerInfo[msg.sender]>0);

        uint[] memory result = new uint[](players[playerInfo[msg.sender]-1].domainCount);
        uint counter = 0;
        for (uint i = 0; i <= domains.length; i++) {
            if (domainToPlayer[i] == msg.sender) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getMyInfo() external view returns(uint minionCount, uint32 domainCount, uint8 attackRating, uint8 defenseRating){
        require(playerInfo[msg.sender]>0);//if no such player, error out

        Player memory p = players[playerInfo[msg.sender]-1];
        minionCount = p.minionCount;
        domainCount = p.domainCount;
        attackRating = p.attackRating;
        defenseRating = p.defenseRating;
    }

    function getTotalPlayersCount() external view returns(uint){
        //including removed & banned players
        return players.length;
    }

    function getTotalPlayersAddress() external view returns(address[]){
        address[] memory result = new address[](players.length);

        for (uint i=0; i<players.length; i++){
            result[i] = players[i].playerAddress;
        }

        return result;
    }

}

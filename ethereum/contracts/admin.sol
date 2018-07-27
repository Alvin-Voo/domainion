pragma solidity ^0.4.24;

import "./domainion.sol";

contract Admin is Domainion{

    struct BannedPlayer{
        address playerAddress;
        string reason;
    }

    BannedPlayer[] public bannedPlayers;

    mapping(address => uint) bannedPlayerInfo;//mapped to players id

    function _removePlayer(address player) private{
        //need to check this is existing player - this player should have id > 0
        require(playerInfo[player]>0);

        //all domains that belong to this player is set to null address
        for (uint i = 0; i <= domains.length; i++) {
            if (domainToPlayer[i] == player) {
                domainToPlayer[i]=address(0);
            }
        }

        //reset this player in players array (including struct info)
        //take note that this will leave a gap in the array
        delete players[playerInfo[player]-1];

        //reset this mapping
        delete playerInfo[player];
    }

    function removePlayer(address player) external onlyOwner{
        _removePlayer(player);
    }

    function banPlayer(address player, string reason) external onlyOwner{
        //can't ban a player twice?
        //ban and remove should be mutually exclusive, if admin remove first and ban, the function will throw
        require(bannedPlayerInfo[player]==0);

        _removePlayer(player);

        uint id = bannedPlayers.push(BannedPlayer({playerAddress:player, reason:reason}));
        bannedPlayerInfo[player] = id;

    }

    function getBannedPlayerInfo(address player) external view returns(string reason){

        BannedPlayer memory b = bannedPlayers[bannedPlayerInfo[player]-1];

        reason = b.reason;
    }

    function getBannedPlayersList() external view returns(address[]){

        address[] memory retAddress = new address[](bannedPlayers.length);

        for(uint i=0; i<bannedPlayers.length; i++){
            retAddress[i] = bannedPlayers[i].playerAddress;
        }

        return retAddress;
    }

}

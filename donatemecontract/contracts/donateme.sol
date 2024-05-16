// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract donateme {
    struct donate{
        string message;
        address sender;
        uint256 timestamp;
    }

    uint256 totalDonates;
    address payable owner;

    event donateMe(string message, address indexed sender, uint256 timestamp);
      constructor(){
        owner = payable(msg.sender);
      }

      function donateMeSome(string memory _message) public payable{
        require(msg.value>0, "insufficient value");

        totalDonates +=1;

        payable(owner).transfer(msg.value);

        emit donateMe(_message, msg.sender, block.timestamp);
      }

function getTotalDonates() view public returns (uint256) {
    return totalDonates;
}

}
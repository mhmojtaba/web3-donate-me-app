// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Donate Me Smart Contract
/// @author Mojtaba
/// @notice A simple smart contract for accepting donations with personalized messages
/// @dev This contract allows users to send donations with messages, which are then stored on-chain. The contract owner receives the donated funds, while the donation details are accessible to anyone.
contract DonateMe {

  /// @notice Represents a single donation with its attributes
  /// @param message The message accompanying the donation
  /// @param sender The address of the donor
  /// @param timestamp The timestamp when the donation was made
  struct donate{
    string message;
    address sender;
    uint256 timestamp;
  }
 
  /// @notice The address of the contract owner who receives the donations
  address payable owner;

  /// @notice The total count of donations received
  uint256 totalDonates;

  /// @notice Array to store all donations made to the contract
  donate[] public allDonates;

  /// @notice Emitted when a new donation is made
  /// @param message The message accompanying the donation
  /// @param sender The address of the donor
  /// @param timestamp The timestamp when the donation was made
  event donateMe(string message, address indexed sender, uint256 timestamp);

   /// @notice Initializes the contract, setting the owner to the deployer
  constructor(){
    owner = payable(msg.sender);
  }

  /// @notice Allows users to make donations with personalized messages
  /// @dev This function requires a minimum ETH value and emits an event upon successful donation
  /// @param _message The message accompanying the donation
  function donateMeSome(string memory _message) public payable{
    require(msg.value>0, "insufficient value");
    totalDonates +=1;
    // Transfer funds to the owner
    payable(owner).transfer(msg.value);

    allDonates.push(donate(_message, msg.sender, block.timestamp));
    emit donateMe(_message, msg.sender, block.timestamp);
  }

  /// @notice Retrieves the total number of donations made to the contract
  /// @return The count of donations
  function getTotalDonates() view public returns (uint256) {
    return totalDonates;
  }

  /// @notice Retrieves details of a specific donation by index
  /// @param _index The index of the donation to retrieve
  /// @return A tuple containing the donation message, sender address, and timestamp
  function getDonate(uint _index) public view returns (string memory,address,uint256) {
    require(_index < allDonates.length, "Index out of bounds");
    return (
      allDonates[_index].message, 
      allDonates[_index].sender, 
      allDonates[_index].timestamp
    );
  }

}
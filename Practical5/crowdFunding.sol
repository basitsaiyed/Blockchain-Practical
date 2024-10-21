// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdSource {
    address public owner;  // Owner of the contract
    uint256 public totalCollected;  // Total amount of ethers collected
    uint256 public constant targetAmount = 20 ether;  // Target amount of ethers to be collected
    uint256 public constant transferThreshold = 10 ether;  // Threshold to transfer ethers to owner
    uint256 public constant contributionAmount = 2 ether;  // Fixed amount to be contributed

    // Events to emit when contributions are made and when funds are transferred
    event ContributionReceived(address indexed contributor, uint256 amount);
    event FundsTransferred(address indexed owner, uint256 amount);

    // Modifier to restrict certain functions to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Constructor to set the owner as the deployer of the contract
    constructor() payable {
        owner = msg.sender;
    }

    // Function to contribute 2 ethers to the contract
    function contribute() public payable {
        require(msg.value == contributionAmount, "Must contribute exactly 2 ethers");
        require(totalCollected < targetAmount, "Target amount already reached");

        totalCollected += msg.value;

        emit ContributionReceived(msg.sender, msg.value);

        // If total collected amount reaches 10 ethers, transfer to owner
        if (totalCollected >= transferThreshold) {
            transferFundsToOwner();
        }
    }

    // Internal function to transfer funds to the owner
    function transferFundsToOwner() internal {
        require(totalCollected >= transferThreshold, "Insufficient funds to transfer");

        uint256 amountToTransfer = address(this).balance;

        (bool success, ) = owner.call{value: amountToTransfer}("");
        require(success, "Transfer to owner failed");

        emit FundsTransferred(owner, amountToTransfer);
    }

    // Function to check the current contract balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Fallback function to handle accidental ether transfers to the contract
    fallback() external payable {
        contribute();
    }

    // Receive function to accept ethers
    receive() external payable {
        contribute();
    }
}

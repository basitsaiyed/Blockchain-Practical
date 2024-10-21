pragma solidity ^0.8.0;

contract HostelBilling {
    address public owner;
    mapping(address => uint256) public residentialBills;
    mapping(address => uint256) public foodBills;

    event ResidentialBillGenerated(address indexed resident, uint256 amount);
    event FoodBillGenerated(address indexed resident, uint256 amount);
    event PaymentReceived(address indexed payer, uint256 amount);
    event Withdrawal(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this operation");
        _;
    }

    function generateResidentialBill(address resident, uint256 amount) public onlyOwner {
        residentialBills[resident] = amount;
        emit ResidentialBillGenerated(resident, amount);
    }

    function generateFoodBill(address resident, uint256 amount) public onlyOwner {
        foodBills[resident] = amount;
        emit FoodBillGenerated(resident, amount);
    }

    function payResidentialBill() public payable {
        require(residentialBills[msg.sender] > 0, "No residential bill to pay");
        uint256 amount = residentialBills[msg.sender];
        require(msg.value >= amount, "Insufficient funds sent");
        residentialBills[msg.sender] = 0;
        emit PaymentReceived(msg.sender, amount);
    }

    function payFoodBill() public payable {
        require(foodBills[msg.sender] > 0, "No food bill to pay");
        uint256 amount = foodBills[msg.sender];
        require(msg.value >= amount, "Insufficient funds sent");
        foodBills[msg.sender] = 0;
        emit PaymentReceived(msg.sender, amount);
    }

    // New function to allow the owner to withdraw all contract balance
    function withdrawFunds() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds to withdraw");

        (bool success, ) = owner.call{value: contractBalance}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(owner, contractBalance);
    }

    // Function to check the contract balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Fallback function to accept ether transfers directly
    receive() external payable {}
}
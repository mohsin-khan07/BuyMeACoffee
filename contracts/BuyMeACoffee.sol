// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Deployed contract address - 0x785c92d132f35aB79B3A116FFD813021fD44fA55

contract BuyMeACoffee {
    address payable owner;

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] memos;

    event NewMemo(address indexed from, uint256 timestamp, string name, string message);

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't buy a coffee with 0 eth");

        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }

    function changeOwner(address _newOwner) public onlyOwner() {
        owner = payable(_newOwner);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can change the owner's address!");
        _;
    }
}

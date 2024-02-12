// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Deployed contract address - 0x8fB41Ef8812eC578f2a5E9bf5de9dd6b96450707

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
}

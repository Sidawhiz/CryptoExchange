// SPDX-License-Identifier: MIT 
pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap{
    string public name = "EthSwap Cryptocurrency Exchange";
    Token public token;
    uint public rate = 100; // 1 wei ether = 100 tokens

    event TokenPurchased(
        address receiver,
        address token,
        uint amount, 
        uint rate
    );
    
    event TokenSold(
        address sender,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public{
        token = _token;
    }

    //buy tokens from the exchange i.e. pay ether to get tokens
	function buyToken() public payable {
		uint tokenAmount = msg.value * rate; //msg.value refers to the amount of ether sent to purchase tokens
		//check that the exchange has at least this amount of tokens
		require(token.balanceOf(address(this)) >= tokenAmount); //address(this) is the exchange's token wallet
		token.transfer(msg.sender, tokenAmount);
		//emit an event after a transfer is done
		emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
	}

    //sell tokens back to the exchange i.e. give tokens and get back ether 
	function sellToken(uint _amount) public {
		//check that the seller can sell more tokens than they have
		require(token.balanceOf(msg.sender)  >= _amount);

		uint etherAmount = _amount / rate;
		//check that the exchange has enough ether to redeem the tokens
		require(address(this).balance >= etherAmount);
		//send ether to the seller
		msg.sender.transfer(etherAmount); //this transfer is the function on the msg.sender global variable and NOT the transfer function from the ERC-20 token standard
		//transfer tokens from seller to exchange
		token.transferFrom(msg.sender, address(this), _amount);
		//emit an event after a token is sold back to the exchange
		emit TokenSold(msg.sender, address(token), _amount, rate);
	}



}
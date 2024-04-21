const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(EthSwap, token.address); //this address parameter is necessary b/c we set an argument in the constructor of this contract.
  const ethSwap = await EthSwap.deployed();

  //on deployment of the token contract, all the tokens are saved in the account 
  //of the deployer. but the tokens are needed on the cryptoexchange, so we move
  //the tokens to the account of the exchange
  await token.transfer(ethSwap.address, '1000000000000000000000000'); 
};
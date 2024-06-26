# CryptoExchange
A cryptoexchange where users can buy and sell ERC20 tokens using Ether (ETH)
# Technologies used
Solidity
Truffle 
Ganache
MetaMask
Ethers 
React 
Node JS 
# Steps to Run
1) Start the Ganache, Ganache is local blockchain
2) Ganache needs to be connected to browser. This is done using metamask by adding a network. Add network -> Add network Manually -> (Ganache, http://localhost:7545, 1337) are (name, RPC URL, Chain id) to link local blockchain to browser wallet. Web app will connect to wallet and which in turn will connect to Local Blockchain.
3) Go to Ganache Network in wallet and import account from Ganache to wallet by getting the private id from Ganache and pasting it in wallet. Now wallet has access to dummy account provided by Ganache.
# Package Installation
Run ```npm install```. This will install : 
1) Babel :- This package is used to prevent compatibility issues with older browsers (Not required in updated case)
2) Bootstrap : Front end Framework
3) React :
4) Truffle : Development framework for Etherium (Truffle is globally installed in my PC and will not install again)
5) Chai : For writing test-cases and verifying them
# Start App
1) ```truffle migrate --reset``` (deploy contracts on the network)
2) ```npm start``` (connect and access contracts on network from browser)
# References
1) DApp University : https://github.com/dappuniversity/starter_kit/tree/master
2) https://medium.com/coinmonks/solidity-lesson-28-understanding-the-erc-20-token-928758f053e1

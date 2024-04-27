import React, { Component } from 'react';
import logo from '../logo.png';
import Web3 from 'web3';
import EthSwap from '../abis/EthSwap.json'
import Token from '../abis/Token.json'
import './App.css';
import Navbar from './Navbar'
import Main from './Main'
import ExchangeStatus from './ExchangeStatus';
import backgd from '../background.avif'

class App extends Component {

  // Inbuilt function of react : gets called before render
  async componentWillMount(){
    await this.loadWeb3();
    // console.log(window.web3);
    await this.loadBlockchainData();
  }

  async loadAccountData(){
    const web = window.web3; // done to avoid typing it again and again
    await window.ethereum.enable();
    const accounts = await web.eth.getAccounts(); // get accounts array that we are connected with 
    this.setState({accountSet : accounts});
    this.setState({account : accounts[0]});
    const balance = await web.eth.getBalance(this.state.account);
    this.setState({etherium_Balance : balance});
    const networkId = await web.eth.net.getId(); // see which network metamask is connected to
    // console.log(networkId);
    const tokenData = Token.networks[networkId];
    if(tokenData){
      const token = new web.eth.Contract(Token.abi, tokenData.address);
      this.setState({token : token});
      let tokenBalance = await token.methods.balanceOf(this.state.account).call();
      this.setState({token_Balance : tokenBalance});
    }
    else{
      window.alert('Token contract not deployed to detected network');
    }
  }

  async loadExchangeData(){
    const web = window.web3;
    const networkId = await web.eth.net.getId();
    const exchange_Data = EthSwap.networks[networkId];
    if(exchange_Data){
      const ethswap = new web.eth.Contract(EthSwap.abi, exchange_Data.address);
      this.setState({exchange : ethswap});
      // console.log(ethswap);
      // CALL methods fetch information from blockchain : NO GAS required for these
      let exchangeBalance = await this.state.token.methods.balanceOf(ethswap.address).call(); // to
      // console.log(exchangeBalance.toString());
      this.setState({exchange_Balance : exchangeBalance});
      let ethSwapEtherBal = await web.eth.getBalance(exchange_Data.address);
      // console.log(ethSwapEtherBal);
      this.setState({exchange_Ether_Balance : ethSwapEtherBal});
    }
    else{
      window.alert('Token contract not deployed to detected network');
    }
  }

  async loadBlockchainData(){
    await this.loadAccountData();

    await this.loadExchangeData();

    this.setState({loading : false});
  }

  buyTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.exchange.methods.buyToken().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
      this.state.token.methods.approve(this.state.exchange.address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.state.exchange.methods.sellToken(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
      })
    })
  }


  // Upon reload states are reset automatically
  constructor(){
    super();
    this.state = {
      accountSet : {},
      account : '',
      etherium_Balance : 0,
      token : {},
      token_Balance : 0,
      exchange : {},
      exchange_Balance : 0,
      exchange_Ether_Balance : 0,
      loading : true,
    }
  }

  async loadWeb3(){
    if(window.etherium){
      window.web3 = new Web3(window.etherium);
      await window.etherium.enable();
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else{
      window.alert("Non-etherium browser detected : Use Metamast to connect browser to blockchain")
    }
  }

  // Inbuilt function of react
  render() {
    
    let screenContent;
    let exchangeContent;

    if(this.state.loading){
      screenContent = <p id="loader" className='text-center'>Page Loading ...</p>
    }
    else{
      screenContent = <Main 
      etheriumBalance={this.state.etherium_Balance} 
      tokenBalance={this.state.token_Balance}
      buyTokens = {this.buyTokens}
      sellTokens = {this.sellTokens}/>

      exchangeContent= <ExchangeStatus 
      exchange_Balance={this.state.exchange_Balance} 
      exchange_Ether_Balance={this.state.exchange_Ether_Balance} />
    }

    return (
      <div >
        <Navbar account = {this.state.account} accountSet = {this.state.accountSet}/>
        <div className="container-fluid mt-5" style={{height : '20cm', backgroundImage: `url(https://www.techopedia.com/wp-content/uploads/2023/09/blockchain_03.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',}}>
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth : '600px', backgroundColor :'transparent', marginTop: '20px'}}>
              <div className="content mr-auto ml-auto">
                {/* <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a> */}
                {/* <p>{window.web3.utils.fromWei(this.state.exchange_Balance.toString(), 'Ether')}    {window.web3.utils.fromWei(this.state.exchange_Ether_Balance.toString(), 'Ether')}</p> */}
                {screenContent}
                {exchangeContent}
                {/* <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p> */}
                {/* <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DApp Application !
                </a> */}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

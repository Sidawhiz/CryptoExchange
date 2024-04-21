import React, { Component } from 'react';
import './ExchangeStatus.css'

class ExchangeStatus extends Component {
  render() {
    const tokenBalance = parseFloat(window.web3.utils.fromWei(this.props.exchange_Balance.toString(), 'Ether'));
    const etherBalance = parseFloat(window.web3.utils.fromWei(this.props.exchange_Ether_Balance.toString(), 'Ether'));

    return (
      <div className="exchange-status">
        <h2>Exchange Status</h2>
        <div className="balance-item">
          <span className="label">Token Balance:</span>
          <progress className="balance-bar" value={tokenBalance} max={1000000}></progress>
          <span className="value">{tokenBalance}</span>
        </div>
        <div className="balance-item">
          <span className="label">Ether Balance:</span>
          <progress className="balance-bar" value={etherBalance} max={1000}></progress>
          <span className="value">{etherBalance}</span>
        </div>
      </div>
    );
  }
}

export default ExchangeStatus;

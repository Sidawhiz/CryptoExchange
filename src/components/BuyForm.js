import React, { Component } from 'react';
import EthLogo from './eth-logo.png'
import TokenLogo from './token-logo.png'

class BuyForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
		  output: '0'
		}
	}

  render() {
    return (
		<form className="mb-3" onSubmit={(event) => {
			event.preventDefault()
			let etherAmount = this.input.value.toString()
			etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
			this.props.buyTokens(etherAmount)
		}
		}
		>
			<div>
				<label className="float-left"><b>Input</b></label>
				<span className="float-right text-muted">
					Balance: {window.web3.utils.fromWei(this.props.etheriumBalance, 'Ether')}
				</span>
			</div>
			<div className="input-group mb-4">
				<input
					type="text"
					onChange={(event) => 
						{
							// console.log("Changing screen");
							const etherAmount = this.input.value.toString();
							// console.log(etherAmount);
							this.setState({ output: etherAmount * 100 })
						}
					}
					ref={(input) => { this.input = input }}
					className="form-control form-control-lg"
					placeholder="0"
					required />
				<div className="input-group-append">
					<div className="input-group-text">
						<img src={EthLogo} height='32' alt=""/>
						&nbsp;&nbsp;&nbsp; ETH
					</div>
				</div>
			</div>
			<div>
				<label className="float-left"><b>Output</b></label>
				<span className="float-right text-muted">
					Balance: {window.web3.utils.fromWei(this.props.tokenBalance.toString(), 'Ether')}
				</span>
			</div>
			<div className="input-group mb-2">
				<input
				type="text"
				className="form-control form-control-lg"
				placeholder="0"
				value={this.state.output}
				disabled
				/>
				<div className="input-group-append">
					<div className="input-group-text">
						<img src={TokenLogo} height='32' alt=""/>
						&nbsp; DApp
					</div>
				</div>
			</div>
			<div className="mb-5">
				<span className="float-left text-muted">Exchange Rate</span>
				<span className="float-right text-muted">1 ETH = 100 DApp</span>
			</div>
			<button type="submit" className="btn btn-secondary btn-block btn-lg">BUY!</button>
		</form>
    );
  }
}

export default BuyForm;
import React, { Component } from 'react';
import BuyForm  from './BuyForm';
import SellForm  from './SellForm';

class Main extends Component {

	constructor(props) {
		super(props)
		this.state = {
		  formType: 'buy'
		}
	}

  toggleFormType = () => {
    // Toggle between 'buy' and 'sell' form types
    this.setState(prevState => ({
      formType: prevState.formType === 'buy' ? 'sell' : 'buy'
    }));
  }

  render() {
	let content;
	if(this.state.formType == 'buy'){
		content = <BuyForm etheriumBalance={this.props.etheriumBalance} 
		tokenBalance={this.props.tokenBalance}
		buyTokens = {this.props.buyTokens}/>;
	}
	else if(this.state.formType == 'sell'){
		content = <SellForm etheriumBalance={this.props.etheriumBalance} 
		tokenBalance={this.props.tokenBalance}
		sellTokens = {this.props.sellTokens}/>
	}
    return (
      <div id = 'content' className='mt-2'>
		<div className="d-flex justify-content-between mb-3">
        <div className="button-group">
          <button
            className={`btn custom-btn ${this.state.formType === 'buy' ? 'active' : ''}`}
            onClick={this.toggleFormType}
            style={{ backgroundColor: this.state.formType === 'buy' ? 'yellow' : 'black', color : this.state.formType === 'buy' ? 'black' : 'white' }}
          >
            Buy
          </button>
          <button
            className={`btn custom-btn ${this.state.formType === 'sell' ? 'active' : ''}`}
            onClick={this.toggleFormType}
            style={{ backgroundColor: this.state.formType === 'sell' ? 'yellow' : 'black', color: this.state.formType === 'sell' ? 'black' : 'white' }}
          >
            Sell
          </button>
        </div>

    </div>
        <div className="card mb-4" >
			<div className="card-body">
				{content}

			</div>
		</div>
      </div>
    );
  }
}

export default Main;
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateWalletBalance, transferWalletFunds } from '../Reducers/wallet'

import '../Styles/wallet-view.css'

class WalletView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {addressToSend: ''}
    props.updateWalletBalance(props.match.params.walletId)
  }

	handleTransactionChange (event) {
    this.setState({addressToSend: event.target.value});
	}

  render() {
    return <div>
      <h2>Balance</h2>
      <div>$<span className="balance-number">{this.props.walletBalance}</span></div>
      <input id="address-input" type="text" placeholder="Address to send" onChange={this.handleTransactionChange.bind(this)}/>

      <div>
				<button id="bottom-container" onClick={() => this.props.transferWalletFunds(this.props.match.params.walletId, this.state.addressToSend, this.props.walletBalance)}>
					Transfer
				</button>
      </div>

    </div>
  }
}
const mapStateToProps = ({ wallet }) => ({
  walletBalance: wallet.walletBalance
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateWalletBalance,
      transferWalletFunds
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(WalletView)

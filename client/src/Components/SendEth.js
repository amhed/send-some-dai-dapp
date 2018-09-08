import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { refreshEthPrice, updateAmountToSend } from '../Reducers/eth-operations'

export class SendEth extends React.Component {
  constructor(props) {
    super(props)

    // Refresh ether price on load
    props.refreshEthPrice()
  }

  render() {
    const walletLimitEth = this.props.limitPerWalletEth
      ? this.props.limitPerWalletEth.toFixed(2)
      : ''

    return (
      <div className="row-middle-xs">
        <div className="col-xs-12 center">
          <div className="send-money-grid">
            <h1>Send money now</h1>

            <input type="number" className="currency-input" 
              value={this.props.ethAmount}
              onChange={(event) => this.props.updateAmountToSend(event.target.value)}
              />
            <button className="button-cta-narrow">Continue</button>

            <p className="subtitle">
              You may only spend a maximum of {walletLimitEth} ETH (${this.props.walletLimitUsd} USD)
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ ethOperations }) => ({
  limitPerWalletUsd: ethOperations.walletLimitUsd,
  limitPerWalletEth: ethOperations.walletLimitEth,
  ethAmount: ethOperations.ethAmount
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    refreshEthPrice,
    updateAmountToSend
  },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SendEth))
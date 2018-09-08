import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { refreshEthPrice, updateAmountToSend } from '../Reducers/eth-operations'
import { goToConfirmation } from '../Reducers/navigation'

export class SendEth extends React.Component {
  constructor(props) {
    super(props)

    // Refresh ether price on load
    props.refreshEthPrice()
  }

  render() {
    const walletLimitEth = this.props.walletLimitEth
      ? this.props.walletLimitEth.toFixed(2)
      : ''

    const amountValid = this.props.usdAmountToSend <= this.props.walletLimitUsd
    const inputClassName = amountValid 
      ? 'currency-input '
      : 'currency-input invalid-input'

  return (
      <div className="row-middle-xs">
        <div className="col-xs-12 center">
          <div className="send-money-grid">
            <h1>Send money now</h1>

            <input type="number"
              className={inputClassName} 
              value={this.props.usdAmountToSend}
              onChange={(event) => this.props.updateAmountToSend(event.target.value)}
              />
            
            <button className="button-cta-narrow" disabled={!amountValid}
              onClick={this.props.goToConfirmation}>
              Continue
            </button>

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
  walletLimitUsd: ethOperations.walletLimitUsd,
  walletLimitEth: ethOperations.walletLimitEth,
  ethAmountToSend: ethOperations.ethAmountToSend,
  usdAmountToSend: ethOperations.usdAmountToSend
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    refreshEthPrice,
    updateAmountToSend,
    goToConfirmation
  },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SendEth))
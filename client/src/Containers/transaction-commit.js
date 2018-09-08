import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {goToTransactionExecution} from '../Reducers/navigation'

import '../Styles/transaction-commit.css'

class TransactionCommit extends React.Component {
  render() {
    return <div>
      <div className="transaction-commit">
        <h1>Preparing to send ${this.props.usdAmountToSend}</h1>

        <ul>
          <li>We will create a new disposable wallet to send the funds</li>
          <li>Dai will be purchased from the Oasis decentralized exchange</li>
          <li>The receipient will be able to access this wallet on their phone</li>
          <li>Aproximate fees are 0.0001 ETH</li>
          <li>Aproximate exchange rate is 223 USD/ETH</li>
        </ul>

        <button className="button-cta" onClick={this.props.goToTransactionExecution}>
          I agree. Send the funds.
        </button>

        <div>&nbsp;</div>
      </div>
    </div>
  }
}

const mapStateToProps = ({ ethOperations }) => ({
  usdAmountToSend: ethOperations.usdAmountToSend
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    goToTransactionExecution
  },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionCommit)

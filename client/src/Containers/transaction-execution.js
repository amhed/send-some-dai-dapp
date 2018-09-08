import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { execute } from '../Reducers/execution'

import '../Styles/transaction-execution.css'

class Execution extends React.Component {

  constructor (props) {
    super(props)
    props.execute(props.ethAmountToSend * (Math.pow(10,18)), props.usdAmountToSend * props.daiToUsd)
  }

  render() {
    return <div>
      <div className="row-center">
        <h1>Executing operation</h1>
      </div>

      <div className="row-start">
        <div className="col-xs-offset-3 execution-list">
          <ul>
            <li className={this.props.wethApproval}>Verifying WETH is approved for exchange</li>
            <li className={this.props.wethWrapping}>Wrapping WETH</li>
            <li className={this.props.daiExchange}>Exchanging WETH for Dai</li>
            <li className={this.props.disposableWallet}>Creating disposable wallet</li>
            <li className={this.props.daiSending}>Sending Dai</li>
            <li className={this.props.finishingUp}>Finishing up</li>
          </ul>

          <div>&nbsp;</div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({ execution, ethOperations, constants }) => ({
  wethApproval: execution.wethApproval,
  wethWrapping: execution.wethWrapping,
  daiExchange: execution.daiExchange,
  disposableWallet: execution.disposableWallet,
  daiSending: execution.daiSending,
  finishingUp: execution.finishingUp,
  ethAmountToSend: ethOperations.ethAmountToSend,
  usdAmountToSend: ethOperations.usdAmountToSend,
  daiToUsd: constants.DAI_TO_USD
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      execute
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(Execution)

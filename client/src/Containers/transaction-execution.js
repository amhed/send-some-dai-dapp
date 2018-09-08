import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { approveWeth, wrapWeth } from '../Reducers/execution'

import '../Styles/transaction-execution.css'

class Execution extends React.Component {
  render() {
    if (this.props.wethApproval === 'inactive') {
      this.props.approveWeth()
    } else if (this.props.wethWrapping === 'inactive') {
      this.props.wrapWeth(100000000)
    }

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
            <li className={this.props.recipientNotification}>Notifying Recipient</li>
          </ul>

          <div>&nbsp;</div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({ execution }) => ({
  wethApproval: execution.wethApproval,
  wethWrapping: execution.wethWrapping,
  daiExchange: execution.daiExchange,
  disposableWallet: execution.disposableWallet,
  daiSending: execution.daiSending,
  recipientNotification: execution.recipientNotification
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      approveWeth,
      wrapWeth
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(Execution)

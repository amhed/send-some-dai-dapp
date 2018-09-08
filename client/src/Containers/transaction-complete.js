import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import '../Styles/transaction-complete.css'

class TransactionComplete extends React.Component {
  render() {
    const hash = 'http://www.sendsomedai.com/w/' + this.props.walletDbId

    return <div>
      <div className="row">
        <div className="col-xs-12 center">
          <div className="transaction-complete-grid">
            <h1>${this.props.usdAmountToSend} in Dai have been sent!</h1>

            <input type="text" value={hash} disabled></input>

            <p>
              Copy, text, or email this link
            </p>

            <p>
              <strong>ONLY share this link with the recipient</strong>
            </p>

            <p>
              <strong>Anyone with this link can reedem</strong>
            </p>

          </div>
        </div>
      </div>
    </div>
  }
}
const mapStateToProps = ({ execution, ethOperations }) => ({
  ethAmountToSend: ethOperations.ethAmountToSend,
  usdAmountToSend: ethOperations.usdAmountToSend,
  walletDbId: execution.walletDbId
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(TransactionComplete)

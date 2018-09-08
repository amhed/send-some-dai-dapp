import React from 'react'
import { connect } from 'react-redux'

import '../Styles/transaction-complete.css'

class TransactionComplete extends React.Component {
  render() {
    //TODO: Update email from pros
    const email = 'eduardo@sorribas.org'
    const hash = 'http://www.sendsomedai.com/u/asdidkfjaue='

    return <div>
      <div className="row">
        <div className="col-xs-12 center">
          <div className="transaction-complete-grid">
            <h1>$50 in Dai have been sent!</h1>

            <p>
              We have notified {email} about the transfer
            </p>

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

export default connect(
  null,
  null
)(TransactionComplete)

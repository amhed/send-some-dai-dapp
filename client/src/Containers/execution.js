import React from 'react'
import { connect } from 'react-redux'

import '../Styles/execution.css'

class Execution extends React.Component {
  render() {
    return <div>
      <div className="row-center">
        <h1>Executing operation</h1>
      </div>

      <div className="row-start">
        <div className="col-xs-offset-3 execution-list">
          <ul>
            <li className="active">Verifying WETH is approved for exchange</li>
            <li className="done">Wrapping WETH</li>
            <li className="error">Exchanging WETH for Dai</li>
            <li className="inactive">Creating disposable wallet</li>
            <li className="inactive">Sending Dai</li>
            <li className="inactive">Notifying Recipient</li>
          </ul>

          <div>&nbsp;</div>
        </div>
      </div>
    </div>
  }
}

export default connect(
  null,
  null
)(Execution)

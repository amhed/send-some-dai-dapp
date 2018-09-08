import React from 'react'
import { connect } from 'react-redux'

import LoggedInAccount from '../Components/LoggedInAccount'

import '../Styles/send-money.css'

const SendMoney = props => (
  <div>
    <LoggedInAccount />

    {/* TODO: Move to component */}
    <div className="row-middle-xs">
      <div className="col-xs-12 center">
        <div className="send-money-grid">
          <h1>Send money now</h1>

          <input type="text" />
          <button className="button-cta-narrow">Continue</button>

          <p className="subtitle">
            You may only spend a maximum of .23 ETH ($50 USD)
          </p>
        </div>
      </div>
    </div>
  </div>
)

// const mapStateToProps = ({ login }) => ({
//   loginRequested: login.loginRequested,
//   accountAddress: login.accountAddress
// })

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       login,
//       cancelLogin,
//       changePage: () => push('/about-us')
//     },
//     dispatch
//   )

export default connect(
  null,
  null
)(SendMoney)

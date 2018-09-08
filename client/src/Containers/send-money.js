import React from 'react'
import { connect } from 'react-redux'

import LoggedInAccount from '../Components/LoggedInAccount'

const SendMoney = props => (
  <div>
    <LoggedInAccount />
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

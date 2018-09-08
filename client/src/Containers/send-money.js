import React from 'react'
import { connect } from 'react-redux'

import LoggedInAccount from '../Components/LoggedInAccount'

import '../Styles/send-money.css'

class SendMoney extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //force return to main screen if user not logged in
    console.log(this.props.accountAddress)
    if (this.props.accountAddress == null) {
      window.location = '/'
    }
  }

  render() {
    return (<div>
      <LoggedInAccount />

      {/* TODO: Move to component */}
      <div className="row-middle-xs">
        <div className="col-xs-12 center">
          <div className="send-money-grid">
            <h1>Send money now</h1>

            <input type="number" className="currency-input"/>
            <button className="button-cta-narrow">Continue</button>

            <p className="subtitle">
              You may only spend a maximum of .23 ETH ($50 USD)
            </p>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

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

const mapStateToProps = ({ login }) => ({
  accountAddress: login.accountAddress
})

export default connect(
  mapStateToProps,
  null
)(SendMoney)

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { goToIndex } from '../Reducers/navigation'
import LoggedInAccount from '../Components/LoggedInAccount'

import '../Styles/send-money.css'

class SendMoney extends React.Component {
  componentDidMount() {
    //force return to main screen if user not logged in
    console.log(this.props.accountAddress)
    if (this.props.accountAddress == null) {
      this.props.goToIndex()
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToIndex
    },
    dispatch
  )

const mapStateToProps = ({ login }) => ({
  accountAddress: login.accountAddress
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMoney)

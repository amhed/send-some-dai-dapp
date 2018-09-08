import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { login } from '../Reducers/login'
import LoggedInAccount from '../Components/LoggedInAccount'

import '../Styles/send-money.css'

class SendMoney extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.props.accountAddress == null) {
        this.props.login()
        this.forceUpdate()
      }
    }, 200)
  }

  render() {
    return( 
      <div>
        {/* TODO: Move to component */}
        {this.props.accountAddress != null &&
          <div>
            <LoggedInAccount />

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
      }
      </div>)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)

const mapStateToProps = ({ login }) => ({
  accountAddress: login.accountAddress
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMoney))

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { login } from '../Reducers/login'
import LoggedInAccount from '../Components/LoggedInAccount'
import SendEth from '../Components/SendEth'

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
            <SendEth />
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

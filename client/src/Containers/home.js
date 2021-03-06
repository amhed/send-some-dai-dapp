import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login, cancelLogin } from '../Reducers/login'

const Home = props => (
  <div>
    <img src="/img/send-money.png" alt="All you need is ETH" />

    <div className="col-xs-12 center">
      <h1>
        Login with metamask to get started
      </h1>
    </div>

    <p>
      <button onClick={props.login} className="button-cta">
        Metamask Login
      </button>
    </p>
  </div>
)

const mapStateToProps = ({ login }) => ({
  loginRequested: login.loginRequested,
  accountAddress: login.accountAddress
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      cancelLogin
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

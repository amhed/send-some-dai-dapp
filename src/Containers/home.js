import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login, cancelLogin } from '../Reducers/login'

import sendMoneyBanner from '../Styles/Svg/send-money-banner.svg'

const Home = props => (
  <div>
    <div className="col-xs-12 center">
    </div>

    <img src={sendMoneyBanner} alt="All you need is ETH" />

    <p>
      <button onClick={props.login}>Login</button>
    </p>

    <p>
      Current State <br />
      <br />
      Login Requested: {props.loginRequested.toString()} <br />
      Account Address: {props.accountAddress}
    </p>

    {/* <p><button onClick={() => props.changePage()}>Go to about page via redux</button></p> */}
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
      cancelLogin,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

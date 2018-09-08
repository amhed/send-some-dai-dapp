import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './home'
import About from './about'
import SendMoney from './send-money'
import SignOut from './signout'

const App = props => (
  <div className="App">
    <header>
      <div className="row">
        <div className="col-xs-3">
          <a href="/">
            <div className="App-logo">{' '}</div>
          </a>
        </div>
        <div className="col-xs-9 end-xs menu-items">
          <Link to="/about" className="menu-item">About</Link>
          {props.accountAddress && 
            <Link to="/transaction-history" className="menu-item">Transaction History</Link>
          }
          {!props.accountAddress 
            ? <Link to="/" className="menu-item">Sign in</Link>
            : <Link to="/sign-out" className="menu-item">Sign out</Link>
          }
        </div>
      </div>
    </header>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sign-out" component={SignOut} />
      <Route exact path="/send" component={SendMoney} /> 
      <Route exact path="/about" component={About} /> 
    </Switch>
  </div>
)

const mapStateToProps = state => ({
  accountAddress: state.login.accountAddress
})

export default connect(
  mapStateToProps,
  null
)(App)
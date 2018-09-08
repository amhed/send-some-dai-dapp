import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './home'
import About from './about'
import SendMoney from './send-money'
import SignOut from './signout'
import TransactionCommit from './transaction-commit'
import TransactionExecution from './transaction-execution'
import TransactionComplete from './transaction-complete'

const App = props => {
  const loggedIn = !!props.accountAddress

  return (
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
            {loggedIn && 
              <Link to="/transaction-history" className="menu-item">Transaction History</Link>
            }
            {!loggedIn
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
  
        {/*loggedIn && */<Route exact path="/confirm" component={TransactionCommit} />}
        {/*loggedIn && */<Route exact path="/execution" component={TransactionExecution} /> } 
        {/*loggedIn && */<Route exact path="/complete" component={TransactionComplete} /> }
      </Switch>
    </div>
  )
}

const mapStateToProps = state => ({
  accountAddress: state.login.accountAddress
})

export default withRouter(connect(
  mapStateToProps,
  null
)(App))

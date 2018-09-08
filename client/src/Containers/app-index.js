import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// Reducers
import { networkChange } from '../Reducers/web3'

// Containers
import Home from './home'
import About from './about'
import SendMoney from './send-money'
import SignOut from './signout'
import TransactionCommit from './transaction-commit'
import TransactionExecution from './transaction-execution'
import TransactionComplete from './transaction-complete'

// Components
import NetworkCheck from '../Components/NetworkCheck'

class App extends React.Component {
  constructor(props) {
    super(props)

    // Detect current network
    const web3 = window.web3 || {}
    web3.version.getNetwork((_, networkVersion) => {
      this.props.networkChange(networkVersion)
    })

    this._setupMetamaskEventListeners(web3)
  }

  _setupMetamaskEventListeners(web3) {
    // Listener for future network changes
    // (some older versions of metamask don't refresh the screen)
    web3.currentProvider.publicConfigStore.on('update', res => {
      this.props.networkChange(res.networkVersion)
    })
  }

  render() {
    const loggedIn = !!this.props.accountAddress

    return (
      <div className="App">
        <NetworkCheck>
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
      
            {/* TODO: Uncomment!! */}
            {/*loggedIn && */<Route exact path="/confirm" component={TransactionCommit} />}
            {/*loggedIn && */<Route exact path="/execution" component={TransactionExecution} /> } 
            {/*loggedIn && */<Route exact path="/complete" component={TransactionComplete} /> }
          </Switch>  
        </NetworkCheck>    
      </div>
      )
  }
}

const mapStateToProps = state => ({
  accountAddress: state.login.accountAddress
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    networkChange
  },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App))

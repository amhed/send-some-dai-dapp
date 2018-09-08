import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './home'
import About from './about'

const App = () => (
  <div className="App">
    <header>
      <div className="row">
        <div className="col-xs-9">
          <div className="App-logo">{' '}</div>
        </div>
        <div className="col-xs-3 menu-items">
          <Link to="/about" className="menu-item">About</Link>
          <Link to="/" className="menu-item">Sign in</Link>
        </div>
      </div>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} /> 
    </main>
  </div>
)

export default App
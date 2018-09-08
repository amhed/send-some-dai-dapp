import React from 'react'
import { connect } from 'react-redux'

class LoggedInAccount extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <div className="col-xs-12 center">
        <h1>
          Logged as {this.props.accountAddress}
        </h1>
      </div>
    </div>)
  }
}

const mapStateToProps = ({ login }) => ({
  accountAddress: login.accountAddress
})

export default connect(
  mapStateToProps,
  null
)(LoggedInAccount)

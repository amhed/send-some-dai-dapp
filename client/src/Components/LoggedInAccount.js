import React from 'react'
import { connect } from 'react-redux'

const Identicon = props => (
  <img
    style={{borderRadius: '50%', width: '40px', height: '40px'}}
    src={`https://eth.vanity.show/${props.address}`}
    alt={`Identicon of ether address ${props.address}`}
  />
)

const LoggedInAccount = props => (
  <div>
  <div className="col-xs-12 center">
    <h1>
      Logged as <Identicon address={props.accountAddress} />
    </h1>

    <h3>My public address is</h3>
    <p>
      {props.accountAddress}
    </p>

    <p>&nbsp;</p>
  </div>
</div>
)

const mapStateToProps = ({ login }) => ({
  accountAddress: login.accountAddress
})

export default connect(
  mapStateToProps,
  null
)(LoggedInAccount)

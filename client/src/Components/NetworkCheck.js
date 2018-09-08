import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const WalletLocked = () => (
  <div className="error-grid">Please unlock your wallet to access the dApp</div>
)
const IncorrectNetwork = () => (
  <div className="error-grid">You should use the Kovan test network</div>
)

const NetworkCheck = props => {
  if (!props.isUnlocked) {
    return <WalletLocked />
  }

  if (props.networkVersion != props.defaultNetworkVersion) {
    return <IncorrectNetwork />
  }

  return (<div> {props.children} </div>)
}

const mapStateToProps = ({ web3, constants }) => ({
  isUnlocked: web3.isUnlocked,
  networkVersion: web3.networkVersion,
  defaultNetworkVersion: constants.NETWORK_VERSION
})

export default connect(
  mapStateToProps, null
)(withRouter(NetworkCheck))
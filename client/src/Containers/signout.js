import React from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { cancelLogin } from '../Reducers/login'
import { goToIndex } from '../Reducers/navigation'
import '../Styles/send-money.css'

class SignOut extends React.Component {
  constructor(props) {
    super(props)

    this.props.cancelLogin()
    this.props.goToIndex()
  }

  render() {
    return <div>Signing Off...</div>
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { cancelLogin, goToIndex },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(SignOut)

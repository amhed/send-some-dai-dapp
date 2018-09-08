import React from 'react'
import blockies from 'ethereum-blockies'
import { connect } from 'react-redux'

class LoggedInAccount extends React.Component {
  constructor(props) {
    super(props)

    var icon = blockies.create({
      seed: '0xe243eb923c5089d34edc4fb82a4175b10113c139', //TODO: Change
      color: '#dfe',
      bgcolor: '#aaa',
      size: 15, // width/height of the icon in blocks, default: 8
      scale: 3, // width/height of each block in pixels, default: 4
      spotcolor: '#000'
    })
    
    document.body.appendChild(icon)
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

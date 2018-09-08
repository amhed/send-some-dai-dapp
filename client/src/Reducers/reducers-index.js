import { combineReducers } from 'redux'

import login from './login'
import web3 from './web3'
import execution from './execution'
import constants from './constants'
import ethOperations from './eth-operations'


export default combineReducers({
  login,
  ethOperations,
  constants,
  execution,
  web3
})

import { combineReducers } from 'redux'

import login from './login'
import constants from './constants'
import ethOperations from './eth-operations'

export default combineReducers({
  login,
  ethOperations,
  constants
})
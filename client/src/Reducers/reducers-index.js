import { combineReducers } from 'redux'

import login from './login'
import execution from './execution'
import constants from './constants'
import ethOperations from './eth-operations'


export default combineReducers({
  login,
  ethOperations,
  constants,
  execution
})

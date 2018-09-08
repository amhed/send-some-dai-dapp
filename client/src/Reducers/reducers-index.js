import { combineReducers } from 'redux'
import login from './login'
import execution from './execution'


export default combineReducers({
  login,
  execution
})

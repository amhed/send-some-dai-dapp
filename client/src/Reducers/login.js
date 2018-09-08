import { push } from 'react-router-redux'

export const REQUEST_LOGIN = 'login/REQUEST_LOGIN'
export const CANCEL_LOGIN = 'login/CANCEL_LOGIN'
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS'

require('../Modules/oasis-direct.js')

const initialState = {
  loginRequested: false,
  accountAddress: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        loginRequested: true,
        accountAddress: null
      }

    case CANCEL_LOGIN:
      return {
        ...state,
        loginRequested: false,
        accountAddress: null
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginRequested: false,
        accountAddress: action.accountAddress
      }

    default:
      return state
  }
}

const sign = (nonce, account) => {
  const web3 = window.web3 || {}
  return new Promise((resolve, reject) => {
    web3.personal.sign(web3.fromUtf8(nonce), account, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

export const login = () => {
  return async dispatch => {
    dispatch({
      type: REQUEST_LOGIN
    })
    try {
      const web3 = window.web3 || {}
      const account = web3.eth.accounts[0]
      const user = await fetch('/api/start-login/' + account, {credentials: 'include'}).then(x => x.json())
      if (user.loggedIn) {
        dispatch(push('/send'))
        dispatch({
          type: LOGIN_SUCCESS,
          accountAddress: account
        })
      }
      const nonce = user.nonce
      const signature = await sign(nonce, account)
      const verification = await fetch(`/api/finish-login/${account}?signature=${signature}`, {credentials: 'include'})
        .then(x => x.json())
      if (verification.loggedIn) {
        dispatch(push('/send'))
        dispatch({
          type: LOGIN_SUCCESS,
          accountAddress: account
        })
      }
    } catch (e) {
      dispatch({
        type: CANCEL_LOGIN
      })
    }
  }
}

export const cancelLogin = () => {
  return dispatch => {
    dispatch({
      type: CANCEL_LOGIN
    })

    dispatch(push('/'))
  }
}

export const REQUEST_LOGIN = 'login/REQUEST_LOGIN'
export const CANCEL_LOGIN = 'login/CANCEL_LOGIN'
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS'

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

const callApi = async () => {
  const response = await fetch('/api/hello')
  const body = await response.json()

  if (response.status !== 200) throw Error(body.message)

  return body;
}

export const login = () => {
  return async dispatch => {
    dispatch({
      type: REQUEST_LOGIN
    })

    callApi()
      .then(res => console.log(res))
      .catch(err => console.log(err))

    //TODO: generate nonce from server
    // const web3 = window.web3 || {}
    // const account = web3.eth.accounts[0]
    // const nonce = Math.floor(Math.random() * 1000).toString()

    // web3.personal.sign(web3.fromUtf8(nonce), account, (err, res) => {
    //   if (err) {
    //     dispatch({
    //       type: CANCEL_LOGIN
    //     })
    //   } else {
    //     console.log(`Success! Account ${account} logged in`)
    //     //TODO: Have to trigger call to server to verify login
    //     dispatch({
    //       type: LOGIN_SUCCESS,
    //       accountAddress: account
    //     })
    //   }
    // })
  }   
}

export const cancelLogin = () => {
  return dispatch => {
    dispatch({
      type: CANCEL_LOGIN
    })
  }
}
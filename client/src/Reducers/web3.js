const web3 = window.web3 || {}
let activeWeb3Account = web3 && web3.eth ? web3.eth.accounts : null

export const NETWORK_CHANGE = 'web3/NETWORK_CHANGE'

const initialState = {
    account: activeWeb3Account[0],
    isUnlocked: !!activeWeb3Account,
    networkVersion: ''
}

// Inject Web3 information directly on state
export default (state = initialState, action) => {
  switch(action.type){
    case NETWORK_CHANGE:
      // Don't modify state if id is the same
      if (action.networkVersion == state.networkVersion)
        return state

      return {
        ...state,
        networkVersion: action.networkVersion
      }

    default:
      return state
  }
}

export const networkChange = (networkVersion) => {
  return dispatch => {
    dispatch({
      type: NETWORK_CHANGE,
      networkVersion
    })
  }
}
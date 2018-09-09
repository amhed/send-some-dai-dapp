export const UPDATE_WALLET_BALANCE = 'wallet/REQUEST_BALANCE'
export const WALLET_FUNDS_TRANSFERRED = 'wallet/WALLET_FUNDS_TRANSFERRED'
export const WALLET_FUNDS_ERRORED = 'wallet/WALLET_FUNDS_ERRORED'

const initialState = {
  walletBalance: 0,
  transferStatus: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_WALLET_BALANCE:
      return {
        ...state,
        walletBalance: action.balance
      }

    case WALLET_FUNDS_TRANSFERRED:
      return {
        ...state,
        transferStatus: 'done'
      }

    case WALLET_FUNDS_ERRORED:
      return {
        ...state,
        transferStatus: 'error'
      }

    default:
      return state
  }
}

export const updateWalletBalance = walletId => {
  return async dispatch => {
    const balance = await fetch(`/api/balance/${walletId}`).then(x => x.json()).then(b => b.balance)
    dispatch({
      type: UPDATE_WALLET_BALANCE,
      balance
    })
  }
}

export const transferWalletFunds = (walletId, dest, amount) => {
  return async dispatch => {
    try {
      const transfer = await fetch(`/api/send-to/${walletId}/${dest}/${amount}`).then(x => x.json())
      if (transfer.transactionHash) dispatch({ type: WALLET_FUNDS_TRANSFERRED })
    } catch (e) {
      dispatch({ type: WALLET_FUNDS_ERRORED })
    }
  }
}

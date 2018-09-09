export const UPDATE_WALLET_BALANCE = 'wallet/REQUEST_BALANCE'

const initialState = {
  walletBalance: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_WALLET_BALANCE:
      return {
        ...state,
        walletBalance: action.balance
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
    const transfer = await fetch(`/api/send-to/${walletId}/${dest}/${amount}`).then(x => x.json())
    console.log(transfer)
  }
}

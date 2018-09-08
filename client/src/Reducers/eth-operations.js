import { getEtherPrice } from '../Modules/coinmarketcap'

export const REFRESH_ETH_PRICE = 'REFRESH_ETH_PRICE'
export const UPDATE_AMOUNT_TO_SEND = 'UPDATE_AMOUNT_TO_SEND'

const initialState = {
  walletLimitUsd: 60,
  walletLimitEth: null,
  ethAmountToSend: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case REFRESH_ETH_PRICE:
      return {
        ...state,
        walletLimitEth: action.price
      }

    case UPDATE_AMOUNT_TO_SEND:
      return {
        ...state,
        ethAmountToSend: action.ethAmount
      }

    default:
      return state
  }
}

export const refreshEthPrice = () => {
  return async dispatch => {
    const price = await getEtherPrice()
    dispatch({
      type: REFRESH_ETH_PRICE,
      price
    })
  }
}

export const updateAmountToSend = (ethAmount) => {
  return async dispatch => {
    dispatch({
      type: UPDATE_AMOUNT_TO_SEND,
      ethAmount
    })
  }
}
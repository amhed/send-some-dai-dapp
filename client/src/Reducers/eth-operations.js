import { getEtherPrice } from '../Modules/coinmarketcap'

export const REFRESH_ETH_PRICE = 'ethops/REFRESH_ETH_PRICE'
export const UPDATE_AMOUNT_TO_SEND = 'ethops/UPDATE_AMOUNT_TO_SEND'

const initialState = {
  walletLimitUsd: 60,
  walletLimitEth: null,
  ethPrice: null,
  ethAmountToSend: 0,
  usdAmountToSend: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case REFRESH_ETH_PRICE:
      return {
        ...state,
        ethPrice: action.price,
        walletLimitEth: state.walletLimitUsd / action.price
      }

    case UPDATE_AMOUNT_TO_SEND:
      return {
        ...state,
        usdAmountToSend: action.usdAmount,
        ethAmountToSend: action.usdAmount / state.ethPrice
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

export const updateAmountToSend = (usdAmount) => {
  return async dispatch => {
    dispatch({
      type: UPDATE_AMOUNT_TO_SEND,
      usdAmount
    })
  }
}
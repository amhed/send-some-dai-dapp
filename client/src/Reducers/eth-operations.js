import { getEtherPrice } from '../Modules/coinmarketcap'

export const REFRESH_ETH_PRICE = 'REFRESH_ETH_PRICE'

const initialState = {
  walletLimitUsd: 60,
  walletLimitEth: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case REFRESH_ETH_PRICE:
      return {
        ...state,
        walletLimitEth: action.price
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
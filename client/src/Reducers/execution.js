import oasis from '../Modules/oasis-direct.js'

export const WETH_APPROVAL_STARTED = 'execution/WETH_APPROVAL_STARTED'
export const WETH_APPROVAL_ERRORED = 'execution/WETH_APPROVAL_ERRORED'
export const WETH_APPROVED = 'execution/WETH_APPROVED'
export const WETH_WRAPPING_STARTED = 'execution/WETH_WRAPPING_ERRORED'
export const WETH_WRAPPING_ERRORED = 'execution/WETH_WRAPPING_ERRORED'
export const WETH_WRAPPED = 'execution/WETH_WRAPPED'
export const DAI_EXCHANGE_STARTED = 'execution/DAI_EXCHANGE_STARTED'
export const DAI_EXCHANGE_ERRORED = 'execution/DAI_EXCHANGE_ERRORED'
export const DAI_EXCHANGED = 'execution/DAI_EXCHANGED'
export const DISPOSABLE_WALLET_CREATION_STARTED = 'execution/DISPOSABLE_WALLET_CREATION_STARTED'
export const DISPOSABLE_WALLET_CREATION_ERRORED = 'execution/DISPOSABLE_WALLET_CREATION_ERRORED'
export const DISPOSABLE_WALLET_CREATED = 'execution/DISPOSABLE_WALLET_CREATED'
export const DAI_SENDING_STARTED = 'execution/DAI_SENDING_STARTED'
export const DAI_SENDING_ERRORED = 'execution/DAI_SENDING_ERRORED'
export const DAI_SENT = 'execution/DAI_SENT'

const initialState = {
  wethApproval: 'inactive',
  wethWrapping: 'inactive',
  daiExchange: 'inactive',
  disposableWallet: 'inactive',
  daiSending: 'inactive',
  recipientNotification: 'inactive'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case WETH_APPROVED:
      return {
        ...state,
        wethApproval: 'done'
      }

    case WETH_APPROVAL_STARTED:
      return {
        ...state,
        wethApproval: 'active'
      }

    case WETH_APPROVAL_ERRORED:
      return {
        ...state,
        wethApproval: 'error'
      }

    case WETH_WRAPPING_STARTED:
      return {
        ...state,
        wethWrapping: 'active'
      }

    case WETH_WRAPPED:
      return {
        ...state,
        wethWrapping: 'done'
      }

    case WETH_WRAPPING_ERRORED:
      return {
        ...state,
        wethWrapping: 'error'
      }

    case DAI_EXCHANGE_STARTED:
      return {
        ...state,
        daiExchange: 'active'
      }

    case DAI_EXCHANGE_ERRORED:
      return {
        ...state,
        daiExchange: 'error'

      }

    case DAI_EXCHANGED:
      return {
        ...state,
        daiExchange: 'done'
      }

    case DISPOSABLE_WALLET_CREATION_STARTED:
      return {
        ...state,
        disposableWallet: 'active'
      }

    case DISPOSABLE_WALLET_CREATION_ERRORED:
      return {
        ...state,
        disposableWallet: 'error'
      }

    case DISPOSABLE_WALLET_CREATED:
      return {
        ...state,
        disposableWallet: 'done'
      }

    case DAI_SENDING_STARTED:
      return {
        ...state,
        daiSending: 'active'
      }

    case DAI_SENDING_ERRORED:
      return {
        ...state,
        daiSending: 'error'
      }

    case DAI_SENT:
      return {
        ...state,
        daiSending: 'done'
      }

    default:
      return state
  }
}

export const execute = (ethAmount, usdAmount) => {
  console.log('amounts', ethAmount, usdAmount)
  return dispatch => {
    dispatch({ type: WETH_APPROVAL_STARTED })

    oasis.checkApproval((err, approval) => {
      if (err) return dispatch({ type: WETH_APPROVAL_ERRORED })
      if (approval) dispatch({ type: WETH_APPROVED })
      dispatch({ type: WETH_WRAPPING_STARTED })
      oasis.buyWeth(ethAmount, onbuy)
    })

    function onbuy (err) {
      if (err) return dispatch({ type: WETH_WRAPPING_ERRORED })
      dispatch({ type: WETH_WRAPPED })
      dispatch({ type: DAI_EXCHANGE_STARTED })
      oasis.buyDai(usdAmount, onbuydai)
    }

    function onbuydai (err) {
      if (err) return dispatch({ type: DAI_EXCHANGE_ERRORED })
      dispatch({ type: DAI_EXCHANGED })
      dispatch({ type: DISPOSABLE_WALLET_CREATION_STARTED})
      fetch('/api/create-disposable-wallet')
        .then(x => x.json())
        .catch(oncreatewallet)
        .then(x => oncreatewallet(null, x))
    }

    function oncreatewallet (err, wallet) {
      if (err) return dispatch({ type: DISPOSABLE_WALLET_CREATION_ERRORED })
      dispatch({ type: DISPOSABLE_WALLET_CREATED})
      dispatch({ type: DAI_SENDING_STARTED})
      console.log(wallet)
      oasis.transferDai(wallet.address, usdAmount, ontransfer)
    }

    function ontransfer (err) {
      if (err) dispatch({ type: DAI_SENDING_ERRORED})
      dispatch({ type: DAI_SENT})
    }
  }
}

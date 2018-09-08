import oasis from '../Modules/oasis-direct.js'

export const WETH_APPROVAL_STARTED = 'counter/WETH_APPROVAL_STARTED'
export const WETH_APPROVAL_ERRORED = 'counter/WETH_APPROVAL_ERRORED'
export const WETH_APPROVED = 'counter/WETH_APPROVED'
export const WETH_WRAPPING_STARTED = 'counter/WETH_WRAPPING_ERRORED'
export const WETH_WRAPPING_ERRORED = 'counter/WETH_WRAPPING_ERRORED'
export const WETH_WRAPPED = 'counter/WETH_APPROVED'
export const EXECUTE_NEXT = 'counter/EXECUTE_NEXT'

const initialState = {
  wethApproval: 'inactive',
  wethWrapping: 'inactive',
  daiExchange: 'inactive',
  disposableWallet: 'inactive',
  daiSending: 'inactive',
  recipientNotification: 'inactive',
  operationOrder: ['approveWeth', 'wrapWeth']
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

    default:
      return state
  }
}

export const approveWeth = () => {
  return dispatch => {
    dispatch({ type: WETH_APPROVAL_STARTED })

    oasis.checkApproval((err, approval) => {
      if (err) return dispatch({ type: WETH_APPROVAL_ERRORED })
      if (approval) return dispatch({ type: WETH_APPROVED })
    })
  }
}

export const wrapWeth = amount => {
  return dispatch => {
    dispatch({ type: WETH_WRAPPING_STARTED })

    oasis.buyWeth(amount, (err) => {
      if (err) return dispatch({ type: WETH_WRAPPING_ERRORED })
      dispatch({ type: WETH_WRAPPED })
    })
  }
}

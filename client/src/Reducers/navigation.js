import { push } from 'react-router-redux'

export const goToIndex = () => {
  return dispatch => {
    dispatch(push('/'))
  }
}

export const goToConfirmation = () => {
  return dispatch => {
    dispatch(push('/confirm'))
  }
}

export const goToTransactionExecution = () => {
  return dispatch => {
    dispatch(push('/execution'))
  }
}

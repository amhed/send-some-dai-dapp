import { push } from 'react-router-redux'

export const goToIndex = () => {
  return dispatch => {
    dispatch(push('/'))
  }
}
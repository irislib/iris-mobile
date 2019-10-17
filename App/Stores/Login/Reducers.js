/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { LoginTypes } from './Actions'

export const logOut = (state) => {
  // TODO: log out gun
  return {
    ...state,
    privateKey: null,
  }
}

export const logInWithKey = (state, { key }) => {
  return {
    ...state,
    privateKey: JSON.parse(key),
  }
}

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [LoginTypes.LOG_IN_WITH_KEY]: logInWithKey,
  [LoginTypes.LOG_OUT]: logOut,
})

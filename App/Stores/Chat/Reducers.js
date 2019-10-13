/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ChatTypes } from './Actions'

export const gotChat = (state, { chat }) => {
  const o = {};
  o[chat.key] = chat;
  return Object.assign({}, state, o);
}

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [ChatTypes.GOT_CHAT]: gotChat,
})

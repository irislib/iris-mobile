import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as ExampleReducer } from './Example/Reducers'
import { reducer as ChatReducer } from './Chat/Reducers'
import { reducer as LoginReducer } from './Login/Reducers'

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
     example: ExampleReducer,
     chat: ChatReducer,
     login: LoginReducer,
  })

  return configureStore(rootReducer, rootSaga)
}

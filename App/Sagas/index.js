import { takeLatest, all } from 'redux-saga/effects'
import { ExampleTypes } from 'App/Stores/Example/Actions'
import { LoginTypes } from 'App/Stores/Login/Actions'
import { ChatTypes } from 'App/Stores/Chat/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { fetchUser } from './ExampleSaga'
import { createUser } from './CreateUserSaga'
import { startup } from './StartupSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(ExampleTypes.FETCH_USER, fetchUser),
    takeLatest(LoginTypes.LOG_IN_AS_NEW_USER, createUser),
    takeLatest(LoginTypes.LOG_IN_WITH_KEY, createUser),
  ])
}

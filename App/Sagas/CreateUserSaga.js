import { take, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import LoginActions from 'App/Stores/Login/Actions'
import ChatActions from 'App/Stores/Chat/Actions'
import { Key } from 'iris-lib'
import gun from 'App/Services/GunService'
import iris, { login } from 'App/Services/IrisService'
import navigation from 'App/Services/NavigationService'

function getChats() {
  return eventChannel(emitter => {
    gun.user().get('chat').map().once((data, key) => {
      const chat = {name: key.substr(0,10) + '...', key}
      // chat.identity = iris.get('keyID', key)
      emitter(chat)
    })
    return () => {} // TODO: should return an unsubscribe function
  })
}

export function* createUser(action) {
  let key;
  if (!action.key) {
    key = yield call(Key.generate)
  } else {
    key = JSON.parse(action.key);
  }
  gun.user().auth(key)
  yield call(login, gun, key)
  navigation.navigate('ChatListScreen')
  const chan = yield call(getChats)
  while (true) {
    const chat = yield take(chan)
    yield put(ChatActions.gotChat(chat))
  }
}

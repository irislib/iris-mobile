import keypair from '../privateKey.json';
import gun from './GunService';
import { Chat } from 'iris-lib';
import AsyncStorage from '@react-native-community/async-storage';

export const session = {};

export const login = (gun, keypair, name) => {
  session.gun = gun
  session.keypair = keypair
  session.user = gun.user()
  session.user.auth(keypair)
  if (name) {
    session.user.get('profile').get('name').put(name)
  }
  AsyncStorage.setItem('iris_keypair', JSON.stringify(keypair))
}

export const isValidKey = (key) => {
  return (!!(typeof key === `object` && key.pub && key.epub && key.priv && key.epriv))
}

export const logout = () => {
  AsyncStorage.removeItem('iris_keypair')
  session.keypair = null
  session.user = null
}

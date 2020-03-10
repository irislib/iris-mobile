import keypair from '../privateKey.json';
import gun from './GunService';
import { Chat } from 'iris-lib';
import AsyncStorage from '@react-native-community/async-storage';

export const session = {};

export const login = (gun, keypair, profile) => {
  AsyncStorage.setItem('iris_keypair', JSON.stringify(keypair))
  session.gun = gun
  session.keypair = keypair
  session.user = gun.user()
  session.user.auth(keypair)
  if (profile) {
    session.user.get('profile').put(profile)
  }
}

export const logout = () => {
  AsyncStorage.removeItem('iris_keypair')
  session.keypair = null
  session.user = null
}

import keypair from '../privateKey.json';
import gun from './GunService';
import { Chat } from 'iris-lib';

export const session = {};

export const login = (gun, keypair, profile) => {
  session.gun = gun
  session.keypair = keypair
  session.user = gun.user()
  session.user.auth(keypair)
  if (profile) {
    session.user.get('profile').put(profile)
  }
}

import keypair from '../privateKey.json';
import gun from './GunService';
import { Chat } from 'iris-lib';

const opt = {};

export const login = (gun, keypair, profile) => {
  opt.gun = gun
  opt.keypair = keypair
  opt.user = gun.user()
  opt.user.auth(keypair)
  if (profile) {
    opt.user.get('profile').put(profile)
  }
}

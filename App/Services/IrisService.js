import keypair from '../privateKey.json';
import gun from './GunService';
import { Index } from 'iris-lib';

let irisInstance;

export const login = (gun, keypair, self) => {
  irisInstance = new Index({gun, keypair, self})
  return irisInstance.ready
}
export const logout = () => irisInstance = null
export const iris = () => { return irisInstance }

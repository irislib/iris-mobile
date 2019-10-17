import keypair from '../privateKey.json';
import gun from './GunService';
import Iris from 'iris-lib';

let iris;

export const login = (gun, keypair, self) => {
  iris = new Iris.Index({gun, keypair, self})
  return iris.ready
}
export const logout = () => iris = null
export default iris;

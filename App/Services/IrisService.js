import keypair from '../privateKey.json';
import gun from './GunService';
import Iris from 'iris-lib';

const iris = new Iris.Index({gun, keypair});

export default iris;

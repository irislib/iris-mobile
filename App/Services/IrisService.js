import keypair from '../privateKey.json';
import gun from './GunService';

const iris = new Iris.Index({gun, keypair});

export default iris;

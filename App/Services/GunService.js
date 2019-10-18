import {Gun, SEA} from 'gun';
import GunOpen from 'gun/lib/open';
import GunLoad from 'gun/lib/load';

const gun = new Gun(['https://gun-us.herokuapp.com/gun']);

export default gun;

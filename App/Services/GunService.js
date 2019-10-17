import {Gun, SEA} from 'gun';
import GunOpen from 'gun/lib/open';

const gun = new Gun(['https://gun-us.herokuapp.com/gun']);

export default gun;

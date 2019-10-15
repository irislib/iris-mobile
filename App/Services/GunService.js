import {Gun, SEA} from 'gun';
import GunOpen from 'gun/lib/open';
import PrivKey from 'App/privateKey.json';

const gun = new Gun(['http://localhost:8765/gun', 'https://gun-us.herokuapp.com/gun']);
const user = gun.user();
user.auth(PrivKey);

export default gun;

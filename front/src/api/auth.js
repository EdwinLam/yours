import Util from '../libs/util';

export default {
    login (phone,password) {
        return Util.ajax.post('/auth/login', {phone:phone,password:password});
    }
}
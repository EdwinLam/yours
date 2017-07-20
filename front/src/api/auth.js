import Util from '../libs/util';

export default {
    login (name,password,cb,errorCb) {
        return Util.ajax.post('/auth/login', {name:name,password:password});
    }
}
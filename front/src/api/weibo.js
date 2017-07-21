import Util from '../libs/util';

export default {
    getUserInfo (code) {
        return Util.ajax.get('/weibo/getUserInfo', {params:{code:code}});
    }
}
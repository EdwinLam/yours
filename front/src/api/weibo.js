import Util from '../libs/util';

export default {
    ssoLogin (code) {
        return Util.ajax.get('/weibo/ssoLogin', {params:{code:code}});
    }
}
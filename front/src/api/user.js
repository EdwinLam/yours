import Util from '../libs/util';

export default {
    queryUserByPage (pageNo,pageSize) {
        return Util.ajax.get('/api/user/queryUserByPage', {params:{pageNo:pageNo,pageSize:pageSize}});
    },
    create(name,phone,password){
        return Util.ajax.post('/api/user/create', {name:name,password:password,phone:phone});

    }
}
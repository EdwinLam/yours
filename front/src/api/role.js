import Util from '../libs/util';

export default {
    queryByPage (pageNo,pageSize) {
        return Util.ajax.get('/api/role/queryByPage', {params:{pageNo:pageNo,pageSize:pageSize}});
    },
    create(name,phone,password){
        return Util.ajax.post('/api/role/create', {name:name,password:password,phone:phone});
    },
    delete(id){
        return Util.ajax.delete('/api/role/'+id)
    }
}
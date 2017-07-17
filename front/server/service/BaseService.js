const DBUtil=require("../util/DBUtil");
class BaseService{
    constructor(path){
        this.UserDao=DBUtil.getDao(path);

    }
    async findAll() {
        return  await this.UserDao.findAll();
    }
}
module.exports =BaseService;
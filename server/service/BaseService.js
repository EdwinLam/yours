const DBUtil=require("../util/DBUtil");
class BaseService{
    constructor(path){
        this.UserDao=DBUtil.getDao(path);
    }
    async findAll() {
        return  await this.UserDao.findAll();
    }
    async findAndCount(findOptions){
        return await this.UserDao.findAndCount(findOptions);
    }
}
module.exports =BaseService;
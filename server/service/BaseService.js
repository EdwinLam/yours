const DBUtil=require("../util/DBUtil");
class BaseService{
    constructor(path){
        this.UserDao=DBUtil.getDao(path);
    }
    async findAll() {
        return  await this.UserDao.findAll();
    }
    async findOne(option){
        return await this.UserDao.findOne(option);
    }
    async create(values){
        values.updatedAt=new Date().getTime();
        values.createdAt=new Date().getTime();
        return  await this.UserDao.create(values,{});
    }
    async queryByPage(option){
        let result=await this.UserDao.findAndCount({
            where: option.where?option.where:{},
            limit: option.pageSize,
            offset: ((option.pageNo-1)*option.pageSize)
        });
        result.pageNo=option.pageNo;
        result.pageSize=option.pageSize;
        return result;
    }
    async destroy(id){
        return  await this.UserDao.destroy({where:{id:id}});
    }
}
module.exports =BaseService;
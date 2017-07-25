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

    async queryByPage(ctx){
        let pageNo=parseInt(ctx.query.pageNo)||1;
        let pageSize=parseInt(ctx.query.pageSize)||10;
        delete ctx.query.pageNo
        delete ctx.query.pageSize
        let result=await this.UserDao.findAndCount({
            where: ctx.query,
            limit: pageSize,
            offset: (pageNo-1)*pageSize
        });
        result.pageNo=pageNo;
        result.pageSize=pageSize;
        ctx.body=this.createResult(true,"成功获取",result)
    }
    async destroy(ctx){
        return  await this.UserDao.destroy({where:{id:ctx.params.id}});
    }
    createResult(success,message,data){
        return {
            success:success,
            message:message,
            values:data==null?{}:data
        }
    }
}
module.exports =BaseService;
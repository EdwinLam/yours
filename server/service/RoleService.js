const BaseService = require('./BaseService')

class UserService extends BaseService {
  constructor () {
    super('ys_role')
  }
  /**
   * 分页查询数据
   * @param {number} phone 电话号码
   */
  async queryByPage (ctx) {
    let pageNo = parseInt(ctx.query.pageNo) || 1
    let pageSize = parseInt(ctx.query.pageSize) || 10
    delete ctx.query.pageNo
    delete ctx.query.pageSize
    let result = await this.Dao.findAndCount({
      where: ctx.query,
      limit: pageSize,
      offset: (pageNo - 1) * pageSize
    })
    result.pageNo = pageNo
    result.pageSize = pageSize
    ctx.body = this.createResult({success: true, message: '成功获取', values: result})
  }
  /*
   * 删除角色
   * @param {Number} id 唯一id
   */
  async destroy (ctx) {
    const count = await this.Dao.destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = this.createResult({success: isSuccess, message: message})
  }
}
module.exports = new UserService()

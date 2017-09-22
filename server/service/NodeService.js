const BaseService = require('./BaseService')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')

class NodeService extends BaseService {
  constructor () {
    super('ys_node')
  }

  /**
   * 新建
   * @param {String} pCode 父分组Code 根目录为0
   * @param {String} pName 父分组名称
   * @param {name} password 角色名称
   */
  async create (ctx) {
    const pCode = ctx.request.body.pCode
    const name = ctx.request.body.name
    if (StringUtil.isNull(name)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    const item = await this.Dao.findOne({where: {pCode,name}})
    const isExists = item != null
    if (!isExists) {
      ctx.body =await this.baseCreate(ctx.request.body)
    } else {
      const message ='该节点下已存在' + name + '的节点'
      ctx.body = SystemUtil.createResult({success: false, message: message})
    }
  }

  /*
   * 更新分组
   * @param {Number} id 唯一id
   * @param {String} name 用户名
   */
  async update (ctx) {
    const name = ctx.request.body.name
    const id = ctx.params.id
    const updatedAt = new Date().getTime()
    if (StringUtil.isNull(name)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await this.Dao.update({name,updatedAt}, {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }
}
module.exports = new NodeService()

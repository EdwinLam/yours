const BaseService = require('./BaseService')
const StringUtil = require('../util/StringUtil.js')
const SystemUtil = require('../util/SystemUtil.js')
const _ = require('lodash');

const uuidv1 = require('uuid/v1')

class UserService extends BaseService {
  constructor () {
    super('ys_role')
  }
  /**
   * 分页查询数据
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
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
    ctx.body = SystemUtil.createResult({success: true, message: '成功获取', values: result})
  }

  /**
   * 获取角色树状数据
   */
  async queryRoleTree(ctx){
    let result = await this.Dao.findAll()
    let hash = {}
    let filterSourceData = []
    let list = []
    result.forEach(function(item){
      let el = item.dataValues
      el.children = []
      el=_.merge({expand:true,selected:false,title:el.name},el)
      filterSourceData.push(el)
      hash[el.code] = el
    })
    filterSourceData.forEach(function(el){
      let parentEl = hash[el.pCode]
      if(parentEl) {
        parentEl.children.push(el)
      }else{
        list.push(el)
      }
    })
    if(list.length)
      list[0].selected = true
    ctx.body = SystemUtil.createResult({success: true, message: '成功获取', values: list})
  }



  /**
   * 新建角色
   * @param {String} pCode 父角色Code 根目录为0
   * @param {String} pName 父角色名称
   * @param {name} password 角色名称
   */
  async createRole (ctx) {
    const pCode = ctx.request.body.pCode
    const pName = ctx.request.body.pName
    const name = ctx.request.body.name
    if (StringUtil.someNull([name])) {
      ctx.body = SystemUtil.createResult({success: false, message: '角色名不能为空'})
    }
    const roleInfo = await this.Dao.findOne({where: {pCode,name}})
    const isExistsRole = roleInfo != null
    if (!isExistsRole) {
      const message = '新建角色' + name + '成功'
      const createdAt = new Date().getTime()
      const updatedAt = new Date().getTime()
      const status = 1
      const code = uuidv1()
      const value = await this.Dao.create({
        pCode,pName,name,createdAt,updatedAt,status,code
      })
      ctx.body = SystemUtil.createResult({success: true, message: message, values: value})
    } else {
      const message = pName+'已存在' + name + '角色'
      ctx.body = SystemUtil.createResult({success: false, message: message})
    }
  }

  /*
   * 更新用户
   * @param {Number} id 唯一id
   * @param {String} name 用户名
   */
  async updateUser (ctx) {
    const nickname = ctx.request.body.nickname
    const id = ctx.params.id
    const updatedAt = new Date().getTime()
    if (StringUtil.isNull(nickname)) {
      ctx.body = SystemUtil.createResult({success: false, message: '名称不能为空'})
    }
    await this.Dao.update({nickname,updatedAt}, {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /*
   * 删除用户
   * @param {Number} id 唯一id
   */
  async destroy (ctx) {
    const count = await this.Dao.destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }

  async getUserInfo (ctx) {
    let  userInfo = await this.Dao.findOne({where: {id: ctx.state.user.id}})
    ctx.body =SystemUtil.createResult({success: true, message: '获取成功', values:{
      userInfo:userInfo
    }})
  }
}
module.exports = new UserService()

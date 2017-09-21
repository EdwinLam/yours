const DBUtil = require('../util/DBUtil')
const SystemUtil = require('../util/SystemUtil.js')
const _ = require('lodash')

class BaseService {
  constructor (path) {
    if (path) { this.Dao = DBUtil.getDao(path) }
  }
  /**
   * 分页查询数据
   * @param {pageNo} 当前页
   * @param {pageNo} 总页数
   */
  async queryPage (ctx) {
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
  /*
   * 删除
   * @param {Number} id 唯一id
   */
  async destroy (ctx) {
    const count = await this.Dao.destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }

  /*
   * 获取树状结构
   * @param {Number} id 唯一id
   */
  async queryTree(ctx){
    let result = await this.Dao.findAll()
    let hash = {}
    let filterSourceData = []
    let list = []
    result.forEach(function(item){
      let el = item.dataValues
      el.children = []
      el=_.merge({expand:true,selected:false,title:el.name,value:el.code,label:el.name},el)
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
 }
module.exports = BaseService

const router = require('koa-router')()
const UserService = require('../service/UserService')
const RoleService = require('../service/RoleService')
const _ = require('lodash')

/* 公用基础接口 */
router.get('/:module/queryPage', (ctx) => require('../service/'+ _.upperFirst(ctx.params.module)+'Service').queryPage(ctx)) // 分页查询用户信息
router.del('/:module/:id', (ctx) => require('../service/'+ _.upperFirst(ctx.params.module)+'Service').destroy(ctx)) // 删除指定id数据
router.get('/:module/queryTree', (ctx) => require('../service/'+ _.upperFirst(ctx.params.module)+'Service').queryTree(ctx))// 树状数据


/* 用户相关接口 */
router.get('/user/isExistPhone', (ctx) => UserService.isExistPhone(ctx))// 判断号码是否存在
router.post('/user/create', (ctx) => UserService.createUser(ctx))// 创建用户
router.post('/user/:id', (ctx) => UserService.updateUser(ctx))// 更新用户
router.get('/user/getUserInfo', (ctx) => UserService.getUserInfo(ctx))// 获取登录用户信息

/* 角色相关接口 */
router.post('/role/create', (ctx) => RoleService.createRole(ctx))// 创建角色
router.post('/role/:id', (ctx) => UserService.updateUser(ctx))// 更新用户

module.exports = router

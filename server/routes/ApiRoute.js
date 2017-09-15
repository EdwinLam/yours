const router = require('koa-router')()
const UserService = require('../service/UserService')
const RoleService = require('../service/RoleService')

/* 用户相关接口 */
router.get('/user/queryByPage', (ctx) => UserService.queryByPage(ctx))// 分页查询用户信息
router.get('/user/isExistPhone', (ctx) => UserService.isExistPhone(ctx))// 分页查询用户信息
router.post('/user/create', (ctx) => UserService.createUser(ctx))// 创建用户
router.del('/user/:id', (ctx) => UserService.destroy(ctx))// 删除用户
router.post('/user/:id', (ctx) => UserService.updateUser(ctx))// 更新用户
router.get('/user/getUserInfo', (ctx) => UserService.getUserInfo(ctx))// 获取登录用户信息

/* 角色相关接口 */
router.get('/role/queryByPage', (ctx) => RoleService.queryByPage(ctx))// 分页查询角色信息
router.post('/role/create', (ctx) => RoleService.createUser(ctx))// 创建角色
router.del('/role/:id', (ctx) => RoleService.destroy(ctx))// 删除角色
module.exports = router

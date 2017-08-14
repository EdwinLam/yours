const BaseService =require('./BaseService');
const StringUtil=require('../util/StringUtil.js');
const jwt=require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const SystemConfig = require('../config/SystemConfig')

class UserService extends BaseService{
    constructor() {
        super('../models/ys_role')
    }

}
module.exports=new UserService();
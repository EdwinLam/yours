const DBUtil = require('../util/DBUtil')
class BaseService {
  constructor (path) {
    if (path) { this.Dao = DBUtil.getDao(path) }
  }
}
module.exports = BaseService

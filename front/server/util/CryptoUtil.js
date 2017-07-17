const crypto = require('crypto');
class CryptoUtil{
    constructor() {
        this.MD5_SUFFXIE="panda"
    }
    static md5(str){
        let md5Obj = crypto.createHash('md5');
        md5Obj.update(str);
        return md5Obj.digest('hex');
    }
}
module.exports= CryptoUtil;
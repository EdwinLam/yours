import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

util.formatDate =function(timeStamp) {
    let date=new Date(parseInt(timeStamp));
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}

const ajaxUrl = env === 'development' ?
    'http://localhost:3000' :
    env === 'production' ?
    'http://localhost:3000' :
    'http://localhost:3000';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default util;
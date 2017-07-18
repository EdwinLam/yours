import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

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
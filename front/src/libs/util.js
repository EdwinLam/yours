import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://localhost:3030' :
    env === 'production' ?
    'http://localhost:3030' :
    'http://localhost:3030';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.ajax.get("/authorize").then(response => {
    console.log(response)
    // success callback
}, response => {
    console.log(response)

    // error callback
})

export default util;
import request from './request.js'
import utils from './utils.js';

const api = {};
const storeBase = '/store';

// 首页接口
api.home={};
api.home.goodsList = data => request.get(`${storeBase}/index`, data);

export default api;
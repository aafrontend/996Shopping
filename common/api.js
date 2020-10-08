import request from './request.js'
import utils from './utils.js';

const api = {};
const storeBase = '/store';
const userBase = '';

// 首页接口
api.home={};
api.home.goodsList = data => request.get(`${storeBase}/index`, data);

// 用户接口
api.user={};
api.user.register = data => request.post(`${userBase}/sign_up`, data);
api.user.login = data => request.post(`${userBase}/sign_in`, data);

// 店铺接口
api.store={};

export default api;
import Vue from 'vue';
import App from './App';
// 弹出框
import DialogBox from './components/DialogBox/DialogBox';

import {API_URL, BASE_URL, ASSET_URL} from './env.js';
import utils from './common/utils.js';
import request from './common/request.js';
import api from './common/api.js';
import VueI18n from 'vue-i18n';
import messages from './common/lang.js';
Vue.use(VueI18n);

Vue.config.productionTip = false

// 全局组件
Vue.component('DialogBox', DialogBox);


// i18n
const i18n = new VueI18n({
  //locale: 'en-US',
  locale: 'zh-CN',
  messages 
});

App.mpType = 'app';
Vue.prototype._i18n = i18n;
Vue.prototype.$apiURL = API_URL;
Vue.prototype.$baseURL = BASE_URL;
Vue.prototype.$assetURL = ASSET_URL;
Vue.prototype.$request = request;
Vue.prototype.$api = api;
Vue.prototype.$returnURL = utils.returnURL;
Vue.prototype.$setReturnURL = utils.setReturnURL;

const app = new Vue({
	i18n,
    ...App
})
app.$mount()

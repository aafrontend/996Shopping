import {API_URL, ASSET_URL} from '../env.js';
import cookies from 'weapp-cookie';
import utils from './utils.js';
import errcode from './errcode.js';

const request = {};
request.auth = (options) => {
	try {
	    // 获取放入缓存的字段token
	    const token = uni.getStorageSync('token');
	    if (token) { // 如果存在token 配置请求头
	        options.header['Authorization'] = 'Bearer ' + token;
	    } else { // 不存在token 跳转至登录
　　　　　　　uni.clearStorageSync();
			utils.setReturnURL();
	        uni.navigateTo({
	            url: '/pages/login/login' 
	        });
	        return;
		}
	} catch (err) {
		console.log(err)
	}
	// 这里对response进行处理，
	// 401表示登录状态过期，需重新登录
	options.complete = (response) => {
		if (response.statusCode == 401) {
			uni.navigateTo({
				url: '/pages/login/login' 
			});
			return;
		}
	};
	return options;
}
request.get = (url, data, header, withAuth) => {
	return request.global(url,'GET',data,header,withAuth);
}
request.post = (url, data, header, withAuth) => {
	return request.global(url,'POST',data,header,withAuth);
}
request.put = (url, data, header, withAuth) => {
	return request.global(url,'PUT',data,header,withAuth);
}
request.delete = (url, data, header, withAuth) => {
	return request.global(url,'DELETE',data,header,withAuth);
}
request.global = (url, method, data, header, withAuth) => {
	var options = {
        method: method,
        url: API_URL + url,
        data: data,
		dataType: '',
        header: header,        
    };
	if(!options.header){
		options.header = {};
	}
	if(!options.header['Content-Type']) {
		//options.header['Content-Type']='application/json';
		options.header['Content-Type']='application/x-www-form-urlencoded';
	}
	if(!options.header['Accept']) {
		options.header['Accept']='application/json';
	}
	if(withAuth) options = request.auth(options);
    return new Promise((resolve, reject) => {
        uni.requestWithCookie(options).then((response) => {
            let [error, res] = response;
			if(res.data.Code != 1){
				switch(res.data.Code){
					case errcode.Unauthenticated:
						uni.navigateTo({
							url: '/pages/login/login' 
						});
						return;
					default:
				}
				throw response;
			}
            resolve(res.data);
        }).catch((response) => {
            let [err, res] = response;
			//if(res.Code==0)
			uni.showToast({title: res.data.Info, icon: 'none', position:'bottom'});
            reject(res.data);
        });
    });
 }
 export default request;
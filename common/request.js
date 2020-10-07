import {API_URL, ASSET_URL} from '../env.js';

const request = {};
request.auth = (options) => {
	try {
	    // 获取放入缓存的字段token
	    const token = uni.getStorageSync('token');
	    if (token) { // 如果存在token 配置请求头
	        options.header['Authorization'] = 'Bearer ' + token;
	    } else { // 不存在token 跳转至登录
　　　　　　　uni.clearStorageSync();
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
        header: header,        
    };
	if(!options.header){
		options.header = {};
	}
	if(!options.header['Content-Type']) {
		options.header['Content-Type']='application/json';
	}
	if(!options.header['Accept']) {
		options.header['Accept']='application/json';
	}
	if(withAuth) options = request.auth(options);
    return new Promise((resolve, reject) => {
		console.dir(options)
        uni.request(options).then((response) => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
            let [error, res] = response;
			if(res.data.Code != 1){
　　　　　　　　　uni.showToast({
　　　　　　　　　　　title: res.data.Info,
　　　　　　　　　　　icon: 'none'
　　　　　　　　　})
			   return
			}
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        });
    });
	/*
    return uni.request({
        url: API_URL + url,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
        if (res[1].data.status && res[1].data.code == 200) {
            return res[1];
        } 
        throw res[1].data;
    }).catch(params => {
　　　　　　switch (params.code) {
　　　　　　　　case 401:
　　　　　　　　　　uni.clearStorageSync();
　　　　　　　　　　break
　　　　　　　　default:
　　　　　　　　　　uni.showToast({
　　　　　　　　　　　　title: params.message,
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　})
　　　　　　　　　　return Promise.reject();
　　　　　　　　　　break
　　　　　　}
　　})
	*/
 }
 export default request;
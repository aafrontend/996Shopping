function buildQuery(obj) {
  const params = [];
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value !== 'undefined' || value !== null) {
      params.push([key, encodeURIComponent(value)].join('='))
    }
  });
  return '?' + params.join('&');
}

function returnURL(defaultURL){
	return uni.getStorageSync('returnURL')||defaultURL||'/';
}

function setReturnURL(returnURL){
	uni.setStorageSync('returnURL',returnURL||location.href);
}

export default {
	buildQuery:buildQuery,
	returnURL:returnURL,
	setReturnURL:setReturnURL,
};
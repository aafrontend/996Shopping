// .env.js 文件
// 不同环境访问不同的路径

// 后台接口域名
const ENV_API_URL = {
	development: 'http://www.coscms.com', //开发环境
	production: 'http://www.coscms.com', //生产环境
}

// 后台根域名
const ENV_BASE_URL = {
	development: 'https://www.coscms.com', //开发环境
	production: 'https://www.coscms.com', //生产环境
}

// 素材域名
const ENV_ASSET_URL = {
	development: 'https://www.coscms.com', //开发环境
	production: 'https://www.coscms.com', //生产环境
}

// 后台根域名
export const BASE_URL = ENV_BASE_URL[process.env.NODE_ENV || 'development'];

// 后台接口域名
export const API_URL = ENV_API_URL[process.env.NODE_ENV || 'development'];

// 素材域名
export const ASSET_URL = ENV_ASSET_URL[process.env.NODE_ENV || 'development'];

// 后台是否开通直播权限,根据情况在manifest.json中，开启注释相应组件的引入。
export const HAS_LIVE = false;

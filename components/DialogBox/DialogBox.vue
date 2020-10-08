<template>
	<view class="page-total" v-if="isShow">
		<view class="box" :class="AClass[AnIndex][AnIdx]">
			<view class="dialog-box">
				<view class="title">{{options.title}}</view>
				<view class="content" v-if="options.DialogType == 'input'">
					<input type="text" v-model="options.value" :placeholder="options.placeholder" auto-focus="true">
					<text class="iconfont icon-clear" @click.stop="onClear"></text>
				</view>
				<view class="inquiry" v-else-if="options.DialogType == 'inquiry'">
					<text>{{options.content}}</text>
				</view>
				<view class="captcha" v-else-if="options.DialogType == 'captcha'">
					<view class="content">
						<input type="text" v-model="options.value" :placeholder="options.placeholder" auto-focus="true">
						<text class="iconfont icon-clear" @click.stop="onClear"></text>
					</view>
					<view class="image" v-if="options.captcha.type == 'image'" @tap="refreshCaptcha">
						<image :src="options.captcha.url" :style="'height:'+options.captcha.height+';width:'+options.captcha.width" mode="widthFix"></image>
					</view>
					<view v-else>
						<text>unsuppored</text>
					</view>
				</view>
				<view class="operation-btn">
					<view class="btn" @click="onCancel">
						<text>取消</text>
						<text class="tag"></text>
					</view>
					<view class="btn" @click="onConfirm">
						<text class="activity">确定</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				AClass:[
					['a-fadein', 'a-fadeout'],
					['a-bouncein', 'a-bounceout'],
				],
				AnIndex: 0,
				AnIdx: 0,
				isShow: false,
				SetTime: null,
				value: '',
				// parmoise
				resolve: '',
				reject: '',
				promise: '',
				reopened: false,
				// 配置
				options:{
					// 提示标题
					title: '提示',
					// 内容
					content: '',
					// 提示内容
					placeholder: '请输入内容',
					// 提示框类型
					DialogType: 'input',
					// 动画类型
					animation: 0,
					// 验证码设置
					captcha: {
						type: 'image',
						width: '200rpx',
						height: '80rpx',
						url: '',
						id: ''
					}
				},
			};
		},
		props:{
			// 提示标题
			title: {
				type: String,
				default: '提示',
			},
			// 内容
			content: {
				type: String,
				default: '',
			},
			// 提示内容
			placeholder: {
				type: String,
				default: '请输入内容',
			},
			// 提示框类型
			DialogType: {
				type: String,
				default: 'input'
			},
			// 动画类型
			animation: {
				type: Number,
				default: 0
			}
		},
		methods:{
			// 询问框
			confirm(options) {
				this.AnIndex = options.animation||0;
				this.AnIdx = options.animation||0;
				// 提示标题
				this.options.title = options.title||'提示';
				// 内容
				this.options.content = options.content||'';
				// 提示内容
				this.options.placeholder = options.placeholder||'请输入内容';
				// 提示框类型
				this.options.DialogType = options.DialogType||'input';
				// 动画类型
				this.options.animation = options.animation||0;
				// input输入的值
				this.options.value= options.value||'';
				if(this.options.DialogType=='captcha'){
					this.options.captcha.type = options.captcha.type||'image';
					this.options.captcha.width = options.captcha.width||'200rpx';
					this.options.captcha.height = options.captcha.height||'80rpx';
					this.options.captcha.url = options.captcha.url||'';
					this.options.captcha.id = options.captcha.id||'';
				}
				this.show();
				this.promise = new Promise((resolve, reject) => {
					this.resolve = resolve;
					this.reject = reject;
				});
				return this.promise; //返回promise对象,给父级组件调用
			},
			/**
			 * 显示
			 */
			show(callback){
				if(this.isShow){
					this.isShow = false;
					this.reopened = true;
				}
				this.isShow = true;
			},
			/**
			 * 隐藏
			 */
			hide(){
				this.AnIdx = 1;
				this.SetTime = setTimeout(() => {
					if(!this.reopened) {
						this.isShow = false;
					}else{
						this.reopened = false;
					}
				}, 300);
			},
			/**
			 * 清除输入值
			 */
			onClear(){
				this.options.value = '';
			},
			/**
			 * 取消点击
			 */
			onCancel(){
				this.hide();
				this.reject({
					value: this.options.value,
					isConfirm: true,
				});
			},
			/**
			 * 确定点击
			 */
			onConfirm(){
				this.hide();
				this.resolve({
					value: this.options.value,
					isConfirm: true,
				});
			},
			refreshCaptcha(){
				var url = this.options.captcha.url.replace(/([?&])_t=[^&]+(&|$)/,'$1');
				url = url.replace(/[?&]+$/,'');
				if(url.indexOf('?')>-1){
					url+='&';
				}else{
					url+='?';
				}
				url+='_t='+Math.random();
				this.options.captcha.url = url;
				console.log('tap',this.options.captcha.url)
			}
		},
	}
</script>

<style scoped lang="scss">
	@import 'DialogBox.scss'
</style>

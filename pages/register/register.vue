<template>
  <view class="page">
    <view class="logo">
      <image src="../../static/logo.png" mode=""></image>
    </view>
    <!-- 填写区 -->
    <view class="input-info">
      <view class="info">
        <input type="text" v-model="form.name" maxlength="30" placeholder="用户名">
        <view class="more"></view>
      </view>
      <view class="info">
        <input type="tel" v-model="form.mobile" maxlength="11" placeholder="手机号">
        <view class="more"></view>
      </view>
      <view class="info">
        <input type="text" v-model="form.bindCode" maxlength="6" placeholder="请输入验证码">
        <view class="more">
          <text class="mo" v-if="waiting" v-model="waitSeconds" @click="onClickWaiting">{{waitSeconds}}秒后重试</text>
          <text class="mo" v-else-if="!waiting" @click="onSendSMS">获取验证码</text>
        </view>
      </view>
      <view class="info">
        <input :password='!isPassword' maxlength="26" v-model="form.password" placeholder="请输入密码">
        <view class="more">
          <text class="iconfont" :class="isPassword?'icon-eye-on':'icon-eye-off'" @click="isPassword = !isPassword"></text>
        </view>
      </view>
    </view>
    <!-- 按钮 -->
    <view class="btn-info">
      <view class="btn" :style="isRegister?'opacity:1':'opacity:0.4'" @click="isRegister?onRegister():''">
        <text>注册</text>
      </view>
    </view>
    <!-- 操作 -->
    <view class="operation">
      <text></text>
      <text @click="onLogin">已有账号?登录</text>
    </view>
	<!-- 提示框 -->
	<DialogBox ref="DialogBox"></DialogBox>
  </view>
</template>

<script>
import errcode from '@/common/errcode.js';
export default {
  data() {
    return {
      isPassword: false,
      isRegister: false,
	  waitSeconds: 60,
	  waiting: false,
      // 表单
      form:{
		name: '', // 用户名
        mobile: '',
		bindCode: '', // 手机绑定验证码
        password: '',
      },
    };
  },
  methods:{
    onLogin(){
      uni.redirectTo({
        url: '/pages/login/login'
      })
    },
    /**
     * 注册点击
     */
    onRegister(){
		uni.showLoading();
		this.form.repassword = this.form.password;
		this.$api.user.register(this.form).then((ret)=>{
            uni.hideLoading();
			uni.redirectTo({
				url: '/'
			})
		}).catch((res)=>{
            uni.hideLoading();
			if(res.Code==errcode.CaptchaError){
				this.form[res.Data.captchaIdent]=res.Data.captchaID;
				this.$refs['DialogBox'].confirm({
					title: '请输入验证码',
					content: '',
					DialogType: 'captcha',
					animation: 0,
					captcha:{
						url:res.Data.captchaURL,
						id:res.Data.captchaID
					}
				}).then((ret)=>{
					this.form[res.Data.captchaName]=ret.value;
					this.onRegister();
				})
				return;
			}
		});
    },
	onSendSMS(){
		var i = setInterval(()=>{
			this.waitSeconds-=1;
			if(this.waitSeconds<1){
				clearInterval(i);
				this.waiting=false;
			}
		},1000);
		this.waiting = true;
	},
	onClickWaiting(){
		uni.showToast({
			title:`请等待${this.waitSeconds}秒后再重试`,
			icon:'none',
			position:'bottom'
		})
	}
  },
  watch:{
    form:{
      handler(newValue, oldValue) {
        if(newValue.mobile && newValue.bindCode && newValue.password){
          this.isRegister = true;
        }else{
          this.isRegister = false;
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
@import 'register.scss';
</style>

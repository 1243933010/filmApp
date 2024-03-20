<template>
	<view class="profix-page-container email-verification-login-page">
		<scroll-view :scroll-y="true" :scroll-x="false" @scroll="scrollHandle" class="page-scroll">
			<customHeader :class="{'has-bg': headerBg}" style="position: fixed; top: 0; width: 100%" />
			<view class="email-verification-login-scroll page-con">
				<view class="login-tit">
					<text>Movie software</text>
				</view>

				<view class="form-container">
					<!-- TODO -->
					<label for="account">邮箱</label>
					<view class="input-con account">
						<view class="inp">
							<!-- TODO -->
							<input type="mail" name="account" v-model="formData.mail" placeholder="请输入邮箱" />
						</view>
					</view>

					<!-- TODO -->
					<label for="pwd">验证码</label>
					<view class="input-con invite-code">
						<view class="inp">
							<!-- TODO -->
							<input type="text" name="pwd" v-model="formData.captcha_code" placeholder="请输入密码" />
						</view>
						<!-- TODO -->
						<button class="invite-btn">获取验证码</button>
					</view>
					<view class="other">
						<view class="view1" @click="goPage('/pages/login/region')">
							<!-- TODO -->
							<text>邮箱注册</text>
						</view>
					</view>

					<!-- <label class="remember-me">
						<checkbox  class="radio" @change="changeRadio" value="1" checked="true" color="#FD862C" />
						{{ $t("login.radioText") }}
					</label> -->
					<view class="btn-list">
						<!-- TODO -->
						<button class="button login-btn" :disabled="!(formData.mail && formData.captcha_code)" @click="loginHandle">登录</button>
						<!-- TODO -->
						<button class="button region-btn" @click="goPage(`/pages/login/emailLogin`)">账号密码登录</button>
						<button class="button region-btn" @click="goPage(`/pages/login/index`)">手机号登录</button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import CustomHeader from "@/components/customHeader/customHeader.vue";
	import {
		$request
	} from "@/utils/request";
	import {
		setTabbar
	} from "@/utils/utils";
	export default {
		name: "邮箱邀请码登录",
		components: {
			CustomHeader,
		},
		data() {
			return {
				isCheck: true,
				timeFnc: null,
				codeText: '',
				formData: {
					email: '',
					login_type: '2',
					captcha_code: ''
				},
				headerBg: false
			};
		},
		computed:{
			codeLocale(){
				return this.$t("login.get-code");
			}
		},
		mounted() {
			this.codeText = this.$t("login.get-code");
		},
		methods: {
			scrollHandle(event) {
				const { scrollTop } = event.detail;
				if(scrollTop >= 50) {
					this.headerBg = true;
				}else {
					this.headerBg = false;
				}
			},
			handleTime() {
				if (!this.formData.email) {
					uni.showToast({
						icon: 'none',
						title: this.$t("login.input-email")
					})
					return
				}
				if (typeof this.codeText == "number") {
					return false
				}
				console.log(typeof this.codeText == "number")
				this.codeText = 60;
				this.sendEmail();
				this.timeFnc = setInterval(() => {
					this.codeText--;
					if (this.codeText == 0) {
						this.codeText = this.$t("login.get-code");
						clearInterval(this.timeFnc);
						this.timeFnc = null
					}
				}, 1000)
			},
			async sendEmail() {

				let res = await $request("sendEmail", {
					to_email: this.formData.email,
					template:'login'
				})
				console.log(res)
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
			goPage(url) {
				uni.navigateTo({
					url
				})
			},
			loginHandle() {
				if (!this.formData.email) {
					uni.showToast({
						icon: 'none',
						title: this.$t("login.input-email")
					})
					return
				}
				if (!this.formData.captcha_code) {
					uni.showToast({
						icon: 'none',
						title: this.$t("login.input-code")
					})
					return
				}
				$request("emailLogin", this.formData).then(res => {
					let {data,code,msg} = res.data;
					let {token} = data;
					if (code !== 0) {
						// 登录失败
						uni.showToast({
							title: msg,
							icon: "none",
						});

						return;
					}

					// 登录成功
					uni.setStorageSync("token", `Bearer ${token}`); // 存储token
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index",
						});
					}, 100)
				});
			},
		},
	};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.email-verification-login-page {
	.email-verification-login-scroll {
		padding-top: 300rpx;
		padding-bottom: 300rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.login-tit {
			margin-bottom: 64rpx;
			max-width: 250rpx;
			font-weight: 800;
			font-size: 60rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 1.2;
		}

		.form-container {
			width: 100%;
			min-height: 10%;
			flex-grow: 1;
			color: #fff;
			
			label {
				margin-top: 36rpx;
				line-height: 1.4;
				font-size: 30rpx;
				display: block;
			}

			.input-con {
				margin-top: 28rpx;

				.df(center, flex-start);

				.inp {
					border-radius: 10rpx;
					padding: 30rpx 34rpx;
					min-width: 10%;
					flex-grow: 1;
					.glassBg();

					input {
						line-height: 1.4;
						font-size: 30rpx;
						position: relative;
						z-index: 1;
						
						&::placeholder {
							color: #fff;
						}
					}
				}
				
				.invite-btn {
					.btn-box(10rpx, linear-gradient( 180deg, #F41B4B 0%, #ED4E49 100%));
					
					margin-left: 12rpx;
					padding: 29rpx;
				}
			}

			.other {
				padding-top: 40rpx;
				width: 100%;
				color: #1A9DB7;
				font-size: 26rpx;
				color: #fff;
				.df(center, space-between);
				
				.view1 {
					font-size: 26rpx;
					line-height: 1.4;
				}
			}

			.btn-list {
				padding-left: 30rpx;
				padding-right: 30rpx;
				margin-top: 118rpx;

				.button {
					margin-top: 30rpx;
					width: 100%;

					&.login-btn {
						.btn-box(50px, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
					}

					&.region-btn {
						.btn-box(50px, transparent);
						.glassBg();
					}
				}
			}
		}
	}
}
</style>
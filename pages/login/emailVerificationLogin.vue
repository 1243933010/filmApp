<template>
	<view class="profix-page-container login-page">
		<customHeader style="position: fixed; top: 0; width: 100%" />
		<view class="login-scroll page-scroll">
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
				<label for="pwd">邀请码</label>
				<view class="input-con invite-code">
					<view class="inp">
						<!-- TODO -->
						<input type="text" name="pwd" v-model="formData.inviteCode" placeholder="请输入密码" />
					</view>
					
				</view>
				<view class="other">
					<view class="view1" @click="goPage('/pages/login/region')">
						<!-- TODO -->
						<text>邮箱注册</text>
					</view>
					<view class="view1" @click="goPage('/pages/login/forgetEmailPassword')">
						<!-- TODO -->
						<text>忘记密码</text>
					</view>
				</view>

				<!-- <label class="remember-me">
					<checkbox  class="radio" @change="changeRadio" value="1" checked="true" color="#FD862C" />
					{{ $t("login.radioText") }}
				</label> -->
				<view class="btn-list">
					<!-- TODO -->
					<button class="button login-btn" :disabled="!(formData.mail && formData.inviteCode)" @click="loginHandle">登录</button>
					<!-- TODO -->
					<button class="button region-btn" @click="goPage(`/pages/login/index`)">账号密码登录</button>
				</view>
			</view>
		</view>
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
		components: {
			CustomHeader,
		},
		data() {
			return {
				iStatusBarHeight: 0,
				isMember: true,
				formData: {
					login_type: '0',
					mail: undefined,
					inviteCode: "",
					country_code: "+975", // 手机前缀
				},
			};
		},
		mounted() {
			console.log(uni.getLocale(), '---')
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;

			// 获取缓存里面的手机号和密码
			this.formData.mail = uni.getStorageSync("mail");

			// 在页面加载时监听返回事件
			uni.$on("getPrefix", event => {
				this.formData.country_code = "+" + event.prefix;
			});
		},
		methods: {
			goPage(url) {
				uni.navigateTo({
					url
				})
			},
			changeRadio(e) {
				console.log(e);
			},
			openpNumberPicker() {},
			loginHandle() {
				$request("login", this.formData).then(res => {
					let { data, code, msg } = res.data;
					let { token } = data;

					if (code !== 0) {
						// 登录失败
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						});

						return;
					}

					// 登录成功
					uni.setStorageSync("token", `Bearer ${token}`); // 存储token

					// 记住密码
					let {
						mobile,
						inviteCode
					} = this.formData;
					uni.setStorageSync("mail", mobile); // 存储手机号
					uni.showToast({
						title: this.$t("login.seccuss"),
						success: () => {
							uni.reLaunch({
								url: "/pages/index/index",
							});
						},
					});
				});
			},
		},
	};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.login-page {
	.login-scroll {
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
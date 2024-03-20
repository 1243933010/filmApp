<template>
	<view class="profix-page-container login-page">
		<scroll-view :scroll-y="true" :scroll-x="false" @scroll="scrollHandle" class="page-scroll">
			<!-- <customHeader style="z-index: 0" /> -->
			<customHeader :class="{'has-bg': headerBg}" style="position: fixed; top: 0; width: 100%;" />
			<view class="login-scroll page-con">
				<view class="login-tit">
					<text>Movie software</text>
				</view>

				<view class="form-container">
					<!-- TODO -->
					<label for="account">手机号</label>
					<view class="input-con account">
						<view class="prefix-con" @click="openpNumberPicker">
							<!-- 手机号前缀选择器 -->
							<view class="number-prefix" @click="goPhonePrefix">{{ formData.country_code }}</view>
							<view class="arrow"></view>
						</view>
						<view class="inp">
							<!-- TODO -->
							<input type="email" name="account" v-model="formData.mobile" placeholder="请输入手机号" />
						</view>
					</view>

					<!-- TODO -->
					<label for="pwd">密码</label>
					<view class="input-con password">
						<view class="inp">
							<!-- TODO -->
							<input type="text" name="pwd" v-model="formData.password" :password="pwdType" placeholder="请输入密码" />
						</view>
						<view class="eye-icon" :class="{ close: pwdType }" @click="handleEye"></view>
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
						<button class="button login-btn" :disabled="!(formData.mobile && formData.password)" @click="loginHandle">登录</button>
						<!-- TODO -->
						<button class="button region-btn" @click="goPage(`/pages/login/emailLogin`)">账号密码登录</button>
						<button class="button region-btn" @click="goPage(`/pages/login/emailVerificationLogin`)">邮箱登录</button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import CustomHeader from "@/components/customHeader/customHeader.vue";
import { $request } from "@/utils/request";
import { setTabbar } from "@/utils/utils";

export default {
	name: "手机号登录",
	components: {
		CustomHeader,
	},
	data() {
		return {
			iStatusBarHeight: 0,
			pwdType: true,
			isMember: true,
			formData: {
				login_type: "0",
				mobile: undefined,
				password: "",
				country_code: "+975", // 手机前缀
			},
			headerBg: false
		};
	},
	mounted() {
		console.log(uni.getLocale(), "---");
		this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;

		// 获取缓存里面的手机号和密码
		this.formData.mobile = uni.getStorageSync("mobile");
		this.formData.password = uni.getStorageSync("password");

		// 在页面加载时监听返回事件
		uni.$on("getPrefix", event => {
			this.formData.country_code = "+" + event.prefix;
		});
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
		changeRadio(e) {
			console.log(e);
		},
		openpNumberPicker() {},
		handleEye() {
			this.pwdType = !this.pwdType;
		},
		goPage(url) {
			uni.navigateTo({
				url
			})
		},
		goPhonePrefix() {
			// 去往注册页面
			uni.navigateTo({
				url: "/pages/login/phonePrefix",
			});
		},
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
				let { mobile, password } = this.formData;
				uni.setStorageSync("mobile", mobile); // 存储手机号
				this.isMember ? uni.setStorageSync("password", password) : ""; // 存储密码
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
			color: #ffffff;
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
				border-radius: 10rpx;
				padding: 30rpx 34rpx;

				.df(center, flex-start);
				.glassBg();

				.inp {
					min-width: 10%;
					flex-grow: 1;

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

				&.account {
					.prefix-con {
						margin-right: 20rpx;
						position: relative;

						.number-prefix {
							margin-right: 30rpx;
						}

						.arrow {
							width: 20rpx;
							height: 12rpx;
							background: url("../../static/img/icon/arrow.png") no-repeat center center / 100% 100%;

							position: absolute;
							right: 0;
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}

				&.password {
					.eye-icon {
						width: 29rpx;
						height: 22rpx;
						background: url("../../static/img/icon/eye.png") no-repeat center center / 100%;

						&.close {
							background-image: url("../../static/img/icon/c_eye.png");
						}
					}
				}
			}

			.other {
				padding-top: 40rpx;
				width: 100%;
				color: #1a9db7;
				font-size: 26rpx;
				.df(center, space-between);
				color: #fff;

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

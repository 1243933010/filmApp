<template>
	<view class="profix-page-container email-login-page">
		<scroll-view :scroll-y="true" :scroll-x="false" @scroll="scrollHandle" class="page-scroll">
			<!-- <customHeader style="z-index: 0" /> -->
			<customHeader :logoTag="true" :class="{'has-bg': headerBg}" style="position: fixed; top: 0; width: 100%" />
			<view class="email-login-scroll page-con">
				<view class="login-tit">
					<text>Movie software</text>
				</view>

				<view class="form-container">
					<!-- TODO -->
					<label for="account">邮箱</label>
					<view class="input-con account">
						<view class="inp">
							<!-- TODO -->
							<input type="email" name="account" v-model="formData.email" placeholder="请输入邮箱" />
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
						<button class="button login-btn" :disabled="!(formData.email && formData.password)" @click="loginHandle">登录</button>
						<!-- TODO -->
						<button class="button region-btn" @click="goPage(`/pages/login/emailVerificationLogin`)">邮箱登录</button>
						<!-- TODO -->
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
		name: "邮箱登录",
		components: {
			CustomHeader,
		},
		data() {
			return {
				iStatusBarHeight: 0,
				pwdType: true,
				isMember: true,
				formData: {
					login_type: '1',
					email: "163123456@qq.com",
					password: "123456",
				},
				headerBg: false
			};
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
			goPage(url) {
				uni.navigateTo({
					url
				})
			},
			handleEye() {
				this.pwdType = !this.pwdType;
			},
			loginHandle() {
				$request("login", this.formData).then(res => {
					let {
						data,
						code,
						msg
					} = res.data;
					let {
						token
					} = data;
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

	.email-login-page {
		.email-login-scroll {
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
					color: #1A9DB7;
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

<template>
	<view class="profix-page-container mobile-region-page">
		<scroll-view :scroll-y="true" :scroll-x="false" @scroll="scrollHandle" class="page-scroll">
			<!-- <customHeader style="z-index: 0" /> -->
			<customHeader :logoTag="true" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; width: 100%; z-index: 99;" />
			<view class="mobile-region-scroll page-con">
				<view class="login-tit">
					<text>Movie software</text>
				</view>

				<view class="form-container">
					<!-- TODO -->
					<label for="account">手机号</label>
					<view class="input-con account">
						<view class="inp">
							<!-- TODO -->
							<input type="number" name="account" v-model="formData.mobile" placeholder="请输入手机号" />
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
					
					<!-- TODO -->
					<label for="account">邀请码</label>
					<view class="input-con account">
						<view class="inp">
							<!-- TODO -->
							<input type="number" name="account" v-model="formData.invitation_code" placeholder="请输入邀请码" />
						</view>
					</view>
					
					<view class="btn-list">
						<!-- TODO -->
						<button class="button login-btn" :disabled="!(formData.mobile && formData.password && formData.invitation_code)" @click="region">注册</button>
						<!-- TODO -->
						<button class="button region-btn" @click="goPage('/pages/login/region')">
							<text>邮箱注册</text>
						</button>
						<!-- TODO -->
						<button class="button region-btn" @click="goPage(`/pages/login/emailLogin`)">
							<text>已有账号，请前往登录</text>
						</button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import CustomHeader from "@/components/customHeader/customHeader.vue";
import { $request } from "@/utils/request.js";
export default {
	name: "手机号注册",
	components: {
		CustomHeader,
	},
	data() {
		return {
			pwdType: true,
			formData: {
				register_type:'0',
				mobile: "",
				password_confirmation: "",
				invitation_code: "",
				password: "",
				country_code: "+1",
			},
			headerBg: false
		};
	},
	onLoad(e) {
		if (e.invitation_code) {
			this.formData.invitation_code = e.invitation_code;
		}
	},
	mounted() {
		// 在页面加载时监听返回事件
		uni.$on("getPrefix", event => {
			this.formData.country_code = "+" + event.prefix;
		});
	},
	methods: {
		goPage(url) {
			uni.navigateTo({
				url:`${url}?invitation_code=${this.formData.invitation_code}`,
			});
		},
		scrollHandle(event) {
			const { scrollTop } = event.detail;
			if(scrollTop >= 50) {
				this.headerBg = true;
			}else {
				this.headerBg = false;
			}
		},
		goRegion() {
			uni.navigateTo({
				url: `./region?invitation_code=${this.formData.invitation_code}`,
			});
		},
		openpNumberPicker() {},
		handleEye() {
			this.pwdType = !this.pwdType;
		},
		async region() {
			this.formData.password_confirmation = this.formData.password;
			this.formData.password_confirmation = this.formData.password;
			let data = await $request("region", this.formData);
			uni.showToast({
				icon: "none",
				title: data.data.msg,
			});
			if (data.data.code == 0) {
				uni.setStorageSync("token", `Bearer ${data.data.data.token}`);
				uni.reLaunch({
					url: "/pages/index/index",
				});
			}
		},
		regionBtn() {
			uni.reLaunch({
				url: "./index",
			});
		},
		goPhonePrefix() {
			// 去往注册页面
			uni.navigateTo({
				url: "/pages/login/phonePrefix",
			});
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.mobile-region-page {
	.mobile-region-scroll {
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
						
						& > * {
							position: relative;
							z-index: 1;
						}
					}
				}
			}
		}
	}
}
</style>

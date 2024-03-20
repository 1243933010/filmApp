<template>
	<view class="profix-page-container region-page">
		<scroll-view :scroll-y="true" :scroll-x="false" @scroll="scrollHandle" class="page-scroll">
			<!-- <customHeader style="z-index: 0" /> -->
			<customHeader :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; width: 100%" />
			<view class="region-scroll page-con">
				<view class="login-tit">
					<text>Movie software</text>
				</view>

				<view class="form-container">
					<!-- TODO -->
					<label for="account">邮箱</label>
					<view class="input-con account">
						<view class="inp">
							<!-- TODO -->
							<input type="mail" name="account" v-model="formData.email" placeholder="请输入邮箱" />
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
						<button class="invite-btn" v-if="typeof codeText == 'number'">{{ codeText }}s</button>
						<button class="invite-btn" v-if="typeof codeText == 'string'" @click="handleTime">获取邀请码</button>
					</view>

					<!-- TODO -->
					<label for="pwd">密码</label>
					<view class="input-con password">
						<view class="inp">
							<!-- TODO -->
							<input type="text" name="pwd" v-model="formData.password" :password="pwdType" placeholder="请输入密码" />
							<view class="eye-icon" :class="{ close: pwdType }" @click="handleEye"></view>
						</view>
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
						<button class="button login-btn" :disabled="!(formData.email && formData.captcha_code && formData.password)" @click="region">注册</button>
						<!-- TODO -->
						<button class="button region-btn" @click="goPage(`/pages/login/emailLogin`)">已有账号，请前往登录</button>
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
	name: "邮箱注册",
	components: {
		CustomHeader,
	},
	data() {
		return {
			pwdType: true,
			timeFnc: null,
			codeText: "",
			formData: {
				mobile: "", // 手机号
				password_confirmation: "", // 确认密码
				invitation_code: "", // 邀请码
				password: "", // 密码
			},
			headerBg: false,
		};
	},
	onLoad(e) {
		if (e.invitation_code) {
			this.formData.invitation_code = e.invitation_code;
		}
	},
	computed: {
		codeLocale() {
			return this.$t("login.get-code");
		},
	},
	mounted() {
		this.codeText = this.$t("login.get-code");
	},
	methods: {
		goPage(url) {
			uni.navigateTo({
				url,
			});
		},
		scrollHandle(event) {
			const { scrollTop } = event.detail;
			if (scrollTop >= 50) {
				this.headerBg = true;
			} else {
				this.headerBg = false;
			}
		},
		goRegion() {
			uni.navigateTo({
				url: `./mobileRegion?invitation_code=${this.formData.invitation_code}`,
			});
		},
		handleTime() {
			if (!this.formData.email) {
				uni.showToast({
					icon: "none",
					title: this.$t("login.input-email"),
				});
				return;
			}
			if (typeof this.codeText == "number") {
				return false;
			}
			console.log(typeof this.codeText == "number");
			this.codeText = 60;
			this.sendEmail();
			this.timeFnc = setInterval(() => {
				this.codeText--;
				if (this.codeText == 0) {
					this.codeText = this.$t("login.get-code");
					clearInterval(this.timeFnc);
					this.timeFnc = null;
				}
			}, 1000);
		},
		handleEye() {
			this.pwdType = !this.pwdType;
		},
		async sendEmail() {
			let res = await $request("sendEmail", {
				to_email: this.formData.email,
				template: "register",
			});
			console.log(res);
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		async region() {
			this.formData.password_confirmation = this.formData.password;
			let data = await $request("emailRegister", this.formData);
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
				url: "./emailLogin",
			});
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.region-page {
	.region-scroll {
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

				.df(center, flex-start);

				&.password {
					.eye-icon {
						width: 29rpx;
						height: 22rpx;
						background: url("../../static/img/icon/eye.png") no-repeat center center / 100%;
						position: relative;
						z-index: 1;

						&.close {
							background-image: url("../../static/img/icon/c_eye.png");
						}
					}
				}

				.inp {
					border-radius: 10rpx;
					padding: 30rpx 34rpx;
					min-width: 10%;
					flex-grow: 1;
					.df(center, flex-start);
					.glassBg();

					input {
						line-height: 1.4;
						font-size: 30rpx;
						position: relative;
						z-index: 1;
						flex-grow: 1;

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

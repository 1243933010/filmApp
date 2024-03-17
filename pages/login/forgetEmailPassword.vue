<template>
	<view class="profix-page-container region-page">
		<customHeader style="z-index: 0" />
		<customHeader style="position: fixed; top: 0; width: 100%" />
		<view class="region-scroll page-scroll">
			<view class="logo pic">
				<image src="../../static/img/logo.jpg" mode="widthFix" class="img"></image>
			</view>

			<view class="form-container">
				<view class="form-tit">PUTH GROUP</view>

				<view class="input-con password email">
					<view class="image-icon"></view>
					<view class="inp">
						<input type="text" v-model="formData.email" 
							:placeholder="$t('login.email')" />
					</view>

				</view>
				
				<view class="input-con password">
					<view class="image-icon"></view>
					<view class="inp">
						<input type="text" v-model="formData.captcha_code"  :placeholder="$t('login.code')" />
					</view>
					<!-- <view class="eye-icon" :class="{ close: pwdType }" @click="handleEye"></view> -->
					<view class="get" v-if="typeof codeText =='number'"  >{{codeText}}</view>
					<view class="get"  v-if="typeof codeText =='string'"  @click="handleTime">{{codeLocale}}</view>
				</view>

				<view class="input-con password">
					<view class="image-icon"></view>
					<view class="inp">
						<input type="text" v-model="formData.password" :password="pwdType"
							:placeholder="$t('login.pwdPlaceholder')" />
					</view>
					<view class="eye-icon" :class="{ close: pwdType }" @click="handleEye"></view>
				</view>


				<view class="btn-list">
					<button class="button login-btn" @click="region">{{ $t("login.btn1") }}</button>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CustomHeader from "@/components/customHeader/customHeader.vue";
	import {
		$request
	} from "@/utils/request.js";
	export default {
		components: {
			CustomHeader,
		},
		data() {
			return {
				pwdType: true,
				codeText: '',
				timeFnc: null,
				formData: {
					email:'',
					captcha_code:'',
					password_confirmation: "",
					old_password:'',
					password: ""
				},
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
			handleEye() {
				this.pwdType = !this.pwdType;
			},
			async region() {
				this.formData.old_password = this.formData.password;
				this.formData.password_confirmation = this.formData.password;
				let data = await $request("emailForgetPassword", this.formData);
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
					template:'forgot'
				})
				console.log(res)
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
			regionBtn() {
				uni.reLaunch({
					url: "./emailLogin",
				});
			},
		},
	};
</script>

<style lang="less">
	@import "../../static/less/variable.less";

	.region-page {
		background: url("../../static/img/bg/gradient.png") no-repeat center center / 100% 100%;
		width: 100vw;

		.region-scroll {
			height: 100%;

			.logo {
				margin: 170rpx auto 62rpx;
				border-radius: 50%;
				width: 140rpx;
			}

			.form-container {
				padding: 65rpx 45rpx;
				border-radius: 20rpx 20rpx 0 0;
				background-color: #fff;
				min-height: 10%;
				flex-grow: 1;

				.form-tit {
					margin-bottom: 32rpx;
					color: @bodyColor;
					text-align: center;
					font-size: 48rpx;
					font-weight: bold;
				}

				.input-con {
					margin-top: 40rpx;
					padding: 30rpx 28rpx;
					border-radius: 10rpx;
					background-color: #f5f7fb;
					position: relative;
					.df(center, flex-start);

					.image-icon {
						width: 35rpx;
						height: 38rpx;
						background: no-repeat center center / 100%;
					}

					.inp {
						margin-left: 25rpx;
						min-width: 10%;
						flex-grow: 1;

						input {}
					}
					.get{
						position: absolute;
						right: 0;
						top: 0;
						// width: 180rpx;
						padding:0rpx 33rpx;
						height: 100%;
						// background: red;
						background: linear-gradient(90deg, #0694B8 0%, #6BBDB4 100%);
						border-radius: 10px;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 26rpx;
						color: #FFFFFF;
					}

					&.account {
						.image-icon {
							background-image: url("../../static/img/icon/phone.png");
						}

						.prefix-con {
							position: relative;

							.number-prefix {
								margin-left: 22rpx;
								margin-right: 25rpx;
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
						.image-icon {
							background-image: url("../../static/img/icon/clock.png");
						}

						.eye-icon {
							width: 29rpx;
							height: 22rpx;
							background: url("../../static/img/icon/eye.png") no-repeat center center / 100%;

							&.close {
								background-image: url("../../static/img/icon/c_eye.png");
							}
						}
					}
					&.email {
						.image-icon {
							background-image: url("../../static/img/icon/email.png");
						}
					
						.eye-icon {
							width: 29rpx;
							height: 22rpx;
							background: url("../../static/img/icon/eye.png") no-repeat center center / 100%;
					
							&.close {
								background-image: url("../../static/img/icon/c_eye.png");
							}
						}
					}

					&.invite-code {
						.image-icon {
							background-image: url("../../static/img/icon/invite.png");
						}
					}
				}

				.remember-me {
					margin-top: 28rpx;
					color: @descColor;

					.df(center, flex-start);

					.radio {
						margin-right: 12rpx;
						transform: scale(0.7);
						font-size: @descSize;
					}
				}

				.btn-list {
					margin-top: 46rpx;

					.button {
						margin-top: 30rpx;
						padding: 32rpx 20rpx;
						width: 100%;
						font-size: @descSize;

						&.login-btn {
							border-color: #383838;
							color: #fff;
							// background-color: #383838;
							background: #383838;
						}

						border: 1px solid @descColor;
						color: #383838;
					}

					&.region-btn {}
				}
			}
		}
	}
</style>
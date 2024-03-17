<template>
	<view class="profix-page-container login-page">
		<customHeader style="z-index: 0" />
		<customHeader style="position: fixed; top: 0; width: 100%" />
		<view class="login-scroll page-scroll">
			<view class="logo pic">
				<image src="../../static/img/logo.jpg" mode="widthFix" class="img"></image>
			</view>

			<view class="form-container">
				<view class="form-tit">PUTH GROUP</view>

				<view class="input-con password email">
					<view class="image-icon"></view>
					<view class="inp">
						<input type="text" v-model="formData.email" :placeholder="$t('login.email')" />
					</view>

				</view>


				<view class="input-con password">
					<view class="image-icon"></view>
					<view class="inp">
						<input type="text" v-model="formData.captcha_code" :placeholder="$t('login.code')" />
					</view>
					<!-- <view class="get" @click="handleTime">{{codeText}}</view> -->
					<view class="get" v-if="typeof codeText =='number'"  >{{codeText}}</view>
					<view class="get"  v-if="typeof codeText =='string'"  @click="handleTime">{{codeLocale}}</view>
				</view>

				<view class="" style="display: flex;justify-content: space-between;align-items: center;">
					<!-- <view class="remember-me" @click="isCheck=!isCheck">
						<view class="no-check" v-show="!isCheck"></view>
						<image class="sure-check"  v-show="isCheck" src="../../static/img/icon/remember.png" mode="widthFix"></image>
					    <text>{{$t('login.radioText')}}</text>
					</view> -->
					<view class=""></view>
					<view class="forget-text" @click="goOther('/pages/login/forgetEmailPassword')">
						<text>{{ $t("login.forget") }}</text>
					</view>
				</view>
				<view class="btn-list">
					<button class="button login-btn" :disabled="!(formData.email && formData.captcha_code)"
						@click="loginHandle">{{ $t("login.btn1") }}</button>
					<button class="button region-btn" @click="goRegion">{{ $t("region.btn1") }}</button>
				</view>

				<view class="other">
					<view class="view1" @click="goOther('/pages/login/emailLogin')"><text>{{$t("login.logintype1")}}</text></view>
					<view class="view1" @click="goOther('/pages/login/index')"><text>{{$t("login.logintype2")}}</text></view>
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
				isCheck: true,
				timeFnc: null,
				codeText: '',
				formData: {
					email: '',
					login_type: '2',
					captcha_code: ''
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
			goOther(url) {
				uni.navigateTo({
					url
				})
			},
			goRegion() {
				// 去往注册页面
				uni.navigateTo({
					url: "/pages/login/region",
				});
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

<style lang="less">
	@import "../../static/less/variable.less";

	.login-page {
		background: url("../../static/img/bg/gradient.png") no-repeat center center / 100% 100%;

		.login-scroll {
			.logo {
				margin: 170rpx auto 62rpx;
				// border-radius: 50%;
				width: 140rpx;

				image {
					border-radius: 50%;
				}
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

				.forget-text {
					display: flex;
					flex-direction: row-reverse;
					padding-top: 30rpx;
					// width: 50%;
					display: inline-block;

					text {
						color: #1A9DB7;
						font-size: 26rpx;
					}
				}

				.remember-me {
					// width: 50%;
					display: inline-block;

					.no-check {
						width: 27rpx;
						height: 27rpx;
						box-sizing: border-box;
						border: 1px solid @descColor;
						margin-right: 12rpx;
					}

					.sure-check {
						width: 27rpx;
						margin-right: 12rpx;
					}
				}

				.other {
					padding-top: 90rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #1A9DB7;
					font-size: 26rpx;
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

					.get {
						position: absolute;
						right: 0;
						top: 0;
						// width: 180rpx;
						min-width: 100rpx;
						padding: 0rpx 33rpx;
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
							background-image: url("../../static/img/icon/yz.png");
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

							&[disabled] {
								background-color: #585858;
							}
						}

						&.region-btn {
							border: 1px solid @descColor;
							color: #383838;
						}
					}
				}
			}
		}
	}
</style>
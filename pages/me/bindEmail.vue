<template>
	<view class="profix-page-container storage-level-page">
		<hx-navbar :config="config" />
		<view class="form-container">


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
				<view class="get" @click="handleTime">{{codeText}}</view>
			</view>


			<view class="btn-list">
				<button class="button login-btn" :disabled="!(formData.email && formData.captcha_code)"
					@click="loginHandle">{{ $t("login.bindEmail") }}</button>
			</view>


		</view>

	</view>
</template>


<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request
	} from "../../utils/request";

	export default {
		components: {
			hxNavbar,
		},
		data() {
			return {
				codeText: '',
				formData: {
					email: '',
					captcha_code: ''
				},
			};
		},
		mounted() {
			this.codeText = this.$t("login.get-code");
		},
		computed: {
			config() {
				return {
					title: this.$t("login.bindEmail"),
					color: "#ffffff",
					// backgroundColor: [1, "#24bdab"],
					// 背景图片（array则为滑动切换背景图，string为单一背景图）
					// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
					backgroundImg: "../../static/img/header_tabber.png",
				};
			},
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
					template:'bind'
				})
				console.log(res)
				uni.showToast({
					icon: "none",
					title: res.data.msg,
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
				$request("emailBind", this.formData).then(res => {
					let {
						data,
						code,
						msg
					} = res.data;
					let {
						token
					} = data;
					uni.showToast({
						title: msg,
						icon: "none",
					});
					if (code !== 0) {
						// 登录失败
						
						return;
					}

					// 登录成功
					setTimeout(() => {
						uni.navigateBack({delta:1})
					}, 100)
				});
			},
		},
	}
</script>



<style lang="less" scoped>
	@import "../../static/less/variable.less";



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
</style>
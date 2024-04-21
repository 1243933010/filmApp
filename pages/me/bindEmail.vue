<template>
	<view class="profix-page-container storage-level-page">
		<scroll-view :scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="storage-level-scroll page-con">
				<view class="input-con">
					<view class="inp">
						<input type="text" v-model="formData.email" :placeholder="$t('login.email')" />
					</view>
				</view>
				<view class="input-con">
					<view class="inp">
						<input type="text" v-model="formData.captcha_code" :placeholder="$t('login.code')" />
					</view>
					<view class="get" @click="handleTime">{{ codeText }}</view>
				</view>
				<view class="btn-list">
					<button class="button" :disabled="!(formData.email && formData.captcha_code)" @click="loginHandle">{{ $t("login.bindEmail") }}</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "../../utils/request";

export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			codeText: "",
			formData: {
				email: "",
				captcha_code: "",
			},
			headerBg: false,
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
				backgroundColor: "transparent",
			};
		},
	},
	methods: {
		scrollHandle(event) {
			const { scrollTop } = event.detail;
			if (scrollTop >= 50) {
				this.headerBg = true;
			} else {
				this.headerBg = false;
			}
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
		async sendEmail() {
			let res = await $request("sendEmail", {
				to_email: this.formData.email,
				template: "bind",
			});
			console.log(res);
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		loginHandle() {
			if (!this.formData.email) {
				uni.showToast({
					icon: "none",
					title: this.$t("login.input-email"),
				});
				return;
			}
			if (!this.formData.captcha_code) {
				uni.showToast({
					icon: "none",
					title: this.$t("login.input-code"),
				});
				return;
			}
			$request("emailBind", this.formData).then(res => {
				let { data, code, msg } = res.data;
				let { token } = data;
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
					uni.navigateBack({ delta: 1 });
				}, 100);
			});
		},
	},
};
</script>

<style lang="less" scoped>
@import "@/static/less/variable.less";

.storage-level-page {
	.storage-level-scroll {
		padding-top: 120rpx;

		.input-con {
			margin-top: 28rpx;

			.df(center, flex-start);

			.inp {
				border-radius: 10rpx;
				padding: 30rpx 34rpx;
				min-width: 10%;
				flex-grow: 1;
				.df(center, flex-start);
				.glassBg(40px, 30);
				
				& > * {
					position: relative;
					z-index: 1;
				}
				
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

			.get {
				.btn-box(10rpx, linear-gradient( 180deg, #F41B4B 0%, #ED4E49 100%));
				white-space: nowrap;
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
				.btn-box(50px, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
			}
		}
	}
}
</style>

<template>
	<view class="profix-page-container fwxy-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="fwxy-scroll page-con">
				<view class="rich-box" style="margin-bottom: 40rpx">
					<rich-text :nodes="richText"></rich-text>
				</view>

				<!-- <view style="font-size: 25rpx;color: red;margin-bottom: 20rpx;">请签署协议</view> -->
				<view style="border: 1rpx dashed #555555" v-if="userInfo.is_sign === 2">
					<Signature @input="listenData" ref="sig" v-model="v"></Signature>
					<!-- <zwp-draw-pad ref="drawPad" @save="listenData" width="500" height="500" /> -->
				</view>
				<view style="border: 1rpx dashed #555555" v-if="userInfo.is_sign === 1">
					<image :src="userInfo.sign_img" mode="widthFix"></image>
				</view>
				<view class="btn-box" v-if="userInfo.is_sign == 2">
					<view class="exit" @click="startSign">
						<text>{{ $t("fwxy.btn1") }}</text>
					</view>
					<view class="agreement" @click="uploadImgFnc">
						<text>{{ $t("fwxy.btn2") }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import Signature from "@/components/sin-signature/sin-signature.vue";
import zwpDrawPad from "@/components/zwp-draw-pad/zwp-draw-pad.vue";
import { $request, url as requestUrl } from "@/utils/request.js";
export default {
	name: "服务协议",
	components: {
		hxNavbar,
		Signature,
	},
	data() {
		return {
			richText: "",
			v: "",
			userInfo: {},
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				title: "服务协议",
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	mounted() {
		this.getAgreements();
		this.getUserInfo();
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
		async startSign() {
			// let s = await this.$refs.sig.getSyncSignature();
			// console.log('组件版本', this.$refs.sig.VERSION);
			// console.log('签名数据', s);
			// this.uploadImgFnc();
			this.$refs.sig.showSignature();
		},
		async getAgreements() {
			let res = await $request("agreements", {});
			console.log(res);
			if (res.data.code === 0) {
				const modifiedHtmlString = res.data.data.user_service_agreement.replace(/<img[^>]*>/g, match => {
					return match.replace("<img", '<img style="width:100%;"');
				});
				console.log(modifiedHtmlString);
				this.richText = modifiedHtmlString;
			}
		},
		async getUserInfo() {
			let res = await $request("getUserInfo", {});
			console.log(res);
			if (res.data.code === 0) {
				this.userInfo = res.data.data;
				return;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		async uploadImgFnc() {
			console.log(this.v);
			if (!this.v) {
				uni.showToast({
					icon: "none",
					title: this.$t("app.signFirst"),
				});
				return;
			}
			let res = await $request("sign", { sign_img: this.v });
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
			if (res.data.code === 0) {
				setTimeout(() => {
					uni.navigateBack({ delta: 1 });
				}, 1500);
			}
		},
		listenData(data) {
			this.v = data;
			// this.v = this.$refs.drawPad.save().tempFilePath;
			// console.log(this.$refs.drawPad.save().tempFilePath)
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.fwxy-page {
	.page-scroll {
		background: #1E1F28;
	}
	
	.fwxy-scroll {
		padding-top: 120rpx;
		padding-bottom: 140rpx;
		
		.rich-box {
			p {
				margin-bottom: 20px;
				font-size: 24rpx;
				color: #C0C3D2;
				line-height: 1.375;
			}
			
			img {
				width: 100%;
			}
		}

		.btn-box {
			width: calc(100% - 100rpx);

			position: fixed;
			bottom: 2vh;
			left: 50%;
			transform: translateX(-50%);

			.df(center, space-between);

			.exit,
			.agreement {
				border-radius: 10rpx;
				padding: 32rpx 0;
				font-size: 24rpx;
				width: calc(50% - 40rpx);
				text-align: center;
			}

			.exit {
				color: #383838;
				background: #f0e8e8;
			}

			.agreement {
				background-color: #383838;
				// background: linear-gradient(0deg, #0694B8 0%, #6BBDB4 100%);
				color: #fff;
			}
		}
	}
}
</style>

<template>
	<view class="page">
		<view class="image-width">
			<view class="header" :style="{ paddingTop: iStatusBarHeight + 'px' }">
				<view class="header-icon" @click="openPop">
					<image src="../../static/image/logo.png" mode="widthFix"></image>
				</view>
				<view class="header-text">
					<text>{{ headerText }}</text>
				</view>
				<picker cancel-text="取消1" confirm-text="确定1" @change="bindPickerChange" :value="index" :range="array">
					<view class="header-select">
						<image class="header-select-icon" :src="imgSrc" mode="widthFix"></image>
						<view class="header-select-select"></view>
					</view>
				</picker>
			</view>
		</view>

		<uni-popup ref="popup" type="center" background-color="#fff" v-if="above">
			<view class="popup-container">
				<view class="popup-tit">{{ $t("app.name") }}</view>
				<view class="popup-content">{{ $t("aboutUs.content") }}</view>
				<view class="popup-close-btn" @click="closePop">{{ $t("app.sure") }}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { setTabbar } from "@/utils/utils.js";
export default {
	name: "customHeader",
	props: ["headerText", "above"],
	data() {
		return {
			iStatusBarHeight: 0,
			index: 0,
			array: ["English", "Francés", "Español", " اللغة العربية"],
			iconList: ["../../static/image/lang/eg.png", "../../static/image/lang/fr.png", "../../static/image/lang/es.png", "../../static/image/lang/asa.png"],
			code: ["en", "fr", "es", "ara"],
			imgSrc: "../../static/image/lang/eg.png",
			locale: { en: 0, fr: 1, es: 2, ara: 3 },
		};
	},
	mounted() {
		this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
		console.log(this.iStatusBarHeight, "系统栏高度");
		let code = uni.getLocale();
		if (code) {
			this.imgSrc = this.iconList[this.locale[code]];
		}
	},
	methods: {
		bindPickerChange: function (e) {
			this.imgSrc = this.iconList[e.detail.value];
			uni.setLocale(this.code[e.detail.value]);
			this.$i18n.locale = this.code[e.detail.value];
			setTabbar(this.$t);
			this.$emit("listenLocale");
		},
		openPop() {
			this.$refs.popup.open("center");
		},
		closePop() {
			this.$refs.popup.close();
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.page {
	width: 100%;
	transition: background-color .35s ease-in-out;
	
	&.has-bg {
		background-color: #fff;

.image-width {
	padding-top: 44rpx;
	width: 100%;
	background-color: transparent;

	.header {
		.header-select {
			.header-select-select {
				border-top-color: #000;
			}
		}
	}
}
	}
}

.image-width {
	padding-top: 44rpx;
	width: 100%;
	background-color: transparent;

	.header {
		width: calc(100% - 60rpx);
		margin: 0 auto;
		padding-bottom: 30rpx;
		color: white;
		font-weight: 600;
		font-size: 36rpx;

		/* #ifdef H5 */
		padding-top: 44rpx;
		/* #endif */

		.df(center, space-between);

		.header-icon {
			image {
				width: 68rpx;
				border-radius: 50%;
			}
		}

		.header-select {
			.df(center);

			.header-select-icon {
				width: 53rpx;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.header-select-select {
				margin-left: 15rpx;
				margin-top: 14rpx;
				border: 12rpx solid transparent;
				border-top-color: #fff;
				transition: border-color .35s ease-in-out;
			}
		}
	}
}

.popup-container {
	border-radius: 20rpx;
	padding: 30rpx 25rpx 55rpx;
	width: calc(100vw - 184rpx);

	.df(center, flex-start);
	flex-direction: column;

	.popup-tit {
		margin-bottom: 36rpx;
		text-align: center;
		font-size: @bodySize;
		color: @bodyColor;
		font-weight: bold;
	}

	.popup-content {
		color: #666;
		font-size: 24rpx;
		line-height: 1.41;
	}

	.popup-close-btn {
		margin-top: 126rpx;
		border-radius: 50rpx;
		padding: 30rpx 80rpx;
		background-color: #fd7e1f;
		color: #fff;
		font-size: 26rpx;
	}
}
</style>

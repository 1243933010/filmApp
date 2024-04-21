<template>
	<view class="profix-page-container invite-page-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="invite-page-scroll page-con">
				<view class="text-box">
					<view class="tit">Download the software</view>
					<view class="desc">Click the button below to select the appropriate version to download</view>
				</view>
				<!-- <view class="logo">
					<image src="../../static/img/logo.jpg" mode="widthFix"></image>
				</view> -->
				<view class="btn-list">
					<view class="btn-box" @click="handleUrl('ios')">
						<text>{{ $t("download.ios") }}</text>
					</view>
					<view class="btn-box" @click="handleUrl('android')">
						<text>{{ $t("download.android") }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { url } from "@/utils/request.js";
import { $request } from "@/utils/request.js";
export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			headerBg: false,
			appInfo: {},
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("join.yq2"),
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	mounted() {
		this.getInfo();
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
		getInfo() {
			uni.request({
				url: url + "/api/app_info",
				method: "GET",
				success: res => {
					if (res.data.code === 0) {
						this.appInfo = res.data.data;
					}
				},
			});
		},
		handleUrl(type) {
			// #ifdef H5
			if (type == "android") {
				window.open(this.appInfo.app_download_url.val);
			} else {
				window.open(this.appInfo.ios_app_download_url.val);
			}
			// #endif
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.invite-page-page {
	.page-scroll {
		background: #030304 url(@/static/image/pageBg1.png) no-repeat top center / cover;
	}

	.invite-page-scroll {
		padding-top: 120rpx;
		height: 100%;
		.df(center, space-between, column);
		
		.text-box {
			color: #fff;
			max-width: 450rpx;
			align-self: flex-start;
			
			.tit {
				margin-bottom: 6rpx;
				font-size: 60rpx;
				line-height: 1.4;
				font-weight: bold;
			}
			
			.desc {
				font-size: 20rpx;
				line-height: 1.3;
			}
		}
		
		.btn-list {
			width: 100%;
			
			.btn-box {
				margin-bottom: 40rpx;
				border: 1px solid #fff;
				text-align: center;
				.btn-box(50rpx, transparent);
				.glassBg(30px, 10, #2f303b);

				& > * {
					position: relative;
					z-index: 1;
				}
			}
		}
	}
}
</style>
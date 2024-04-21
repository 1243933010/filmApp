<template>
	<view class="profix-page-container activity-info-page">
		<scroll-view :scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="activity-info-scroll page-con">
				<!-- <view class="pic">
					<image src="../../static/img/activity/1.png" mode="widthFix" class="img"></image>
				</view> -->
				<view class="about-us-text">
					<rich-text :nodes="info.content"></rich-text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";

export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			info: {
				content: "",
				headerBg: false,
			},
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("activity.pageTit"),
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	onLoad(e) {
		// this.getInfo(e.id)
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
		getInfo(id) {
			this.info = uni.getStorageSync("activityInfo");
			// console.log(this.info)
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
page {
	background-color: #f5f4f9;
}

.activity-info-page {
	.activity-info-scroll {
		padding-top: 120rpx;

		.banner {
			width: 100%;
		}

		.about-us-text {
			width: 100%;

			img {
				width: 100%;
			}
			
			p {
				margin-bottom: 30rpx;
				font-size: 24rpx;
				line-height: 1.375;
				color: #C0C3D2;
			}
		}
	}
}
</style>

<template>
	<view class="profix-page-container about-us-page">
		<scroll-view :scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="about-us-scroll page-con">
				<view class="name">{{ noticesObj.name }}</view>
				<view class="synopsis">{{ noticesObj.synopsis }}</view>
				<rich-text class="content" :nodes="noticesObj.content"></rich-text>
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
			noticesObj: {},
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("notices.pageTit"),
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	mounted() {
		let noticesObj = uni.getStorageSync("notices");
		console.log(noticesObj);
		this.noticesObj = noticesObj;
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
	},
};
</script>

<style lang="less">
.about-us-page {
	.about-us-scroll {
		padding-top: 120rpx;

		.name {
			font-size: 40rpx;
			margin-bottom: 30rpx;
			text-align: center;
			font-weight: bold;
			color: #fff;
		}

		.synopsis {
			margin-bottom: 30rpx;
			font-size: 24rpx;
			line-height: 1.4;
			color: #fff;
		}

		.content {
			margin-top: 30rpx;
			font-size: 24rpx;
			line-height: 1.4;
			color: #fff;
		}
	}
}
</style>

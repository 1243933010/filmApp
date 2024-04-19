<template>
	<view class="profix-page-container about-us-page">
		<scroll-view :scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="about-us-scroll page-con">
				<!-- <view class="banner pic">
					<image src="../../static/img/banner/about_us.png" mode="widthFix" class="img"></image>
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
			info: {},
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				// TODO
				title: "关于我们",
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
			this.info = uni.getStorageSync("about");
			console.log(this.info);
		},
	},
};
</script>

<style lang="less">
.about-us-page {
	.page-scroll {
		background: #1e1f28;
	}
	
	.about-us-scroll {
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

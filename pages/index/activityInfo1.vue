<template>
	<view class="profix-page-container activity-info-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{'has-bg': headerBg}" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99;" />
			<view class="activity-info-scroll page-con">
				<view class="pic">
					<image src="../../static/img/activity/1.png" mode="widthFix" class="img"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";

export default {
	name: "平台奖励",
	components: {
		hxNavbar,
	},
	data() {
		return {
			info: {
				content: "",
			},
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("activity.pageTit"),
				color: "#ffffff",
				backgroundColor: "transparent"
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
@import "@/static/less/variable.less";

.activity-info-page {
	
	.page-scroll {
		background: #1E1F28;
	}
	
	.activity-info-scroll {
		padding: 120rpx 0 0;
		
		.pic {
			margin-right: -30rpx;
			margin-left: -30rpx;
		}
	}
}
</style>

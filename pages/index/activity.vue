<template>
	<view class="profix-page-container activity-page">
		<scroll-view :scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="activity-scroll page-con">
				<view class="list">
					<view class="item" v-for="(item, index) in list" :key="index" @click="goUrl(item)">
						<!-- <view class="item-tit">{{ $t("activity.item1")  }}</view> -->
						<view class="item-tit">{{ item.title }}</view>
						<view class="arrow-icon pic">
							<img src="@/static/img/right_arrow.png" class="img" mode="widthFix" />
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "@/utils/request";
export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			list: [],
			headerBg: false,
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
	mounted() {
		this.getActivity();
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
		async getActivity() {
			let res = await $request("activity", {});
			console.log(res);
			if (res.data.code === 0) {
				this.list = res.data.data;
			}
		},
		goUrl(item) {
			uni.setStorageSync("activityInfo", item);
			uni.navigateTo({
				url: `/pages/index/activityInfo`,
			});
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.activity-page {
	.activity-scroll {
		padding: 120rpx 0 0;
		
		.list {
			.item {
				margin-bottom: 2px;
				padding: 45rpx;
				.df(center, space-between);
				.glassBg(30px, 20, #2f303b);

				& > * {
					position: relative;
					z-index: 1;
				}

				.item-tit {
					color: #fff;
				}

				.arrow-icon {
					width: 14rpx;
				}
			}
		}
	}
}
</style>

<template>
	<view class="profix-page-container deal-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="deal-scroll page-con">
				<scroll-view scroll-y="true" class="tab-view">
					<view class="tab-list">
						<view class="tab-item" :class="{ active: checkTab === index }" v-for="(item, index) in tabList" :key="index" @click="changeTab(item, index)">{{ item.title }}</view>
					</view>
				</scroll-view>

				<view class="deal-list">
					<view class="list-item" v-for="item in dealList" :key="index">
						<view class="left">
							<view class="top">{{ item.type_txt || item.status_text }}</view>
							<view class="bottom">{{ item.updated_at || item.created_at }}</view>
						</view>
						<view class="right">{{ item.money || item.amount * 1 }}</view>
					</view>
					<!-- TODO -->
					<view class="tips">暂无内容</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "@/utils/request";
export default {
	name: "财务细节",
	components: {
		hxNavbar,
	},
	data() {
		return {
			checkTab: 0,
			dealList: [],
			dealPage: {
				page: 1,
				page_size: 20,
			},
			requestUrl: ["", "rebate", "buy_vip", "", ""],
			url: "userAccount",
			requestBool: true,
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				title: "财务细节",
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
		tabList() {
			return [
				{ title: this.$t("deal.listItem1"), label: "" },
				{ title: this.$t("deal.listItem2"), label: "rebate" },
				{ title: this.$t("deal.listItem3"), label: "buy_vip" },
				{ title: this.$t("deal.listItem4"), label: "recharge" },
				{ title: this.$t("deal.listItem5"), label: "withdraw" },
			];
		},
	},
	onReachBottom() {
		this.dealPage.page++;
		this.requestFnc(this.url, this.requestUrl[this.checkTab]);
	},
	mounted() {
		this.requestFnc(this.url, this.requestUrl[this.checkTab]);
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
		changeTab(item, index) {
			this.checkTab = index;
			this.dealPage.page = 1;
			this.dealList = [];
			// let url = 'userAccount'
			this.url = "userAccount";
			if (item.label == "recharge") {
				this.url = "rechargeIndex";
			} else if (item.label == "withdraw") {
				this.url = "withdraw_list";
			}
			this.requestFnc(this.url, item.label);
		},
		async requestFnc(url, type) {
			uni.showLoading();
			let res = await $request(url, { ...this.dealPage, change_tag: type });
			uni.hideLoading();
			console.log(res);
			if (res.data.code === 0) {
				this.dealList.push(...res.data.data.list);
			}
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.deal-page {
	.page-scroll {
		background: #1e1f28;
	}

	.deal-scroll {
		padding-top: 120rpx;

		.tab-view {
			position: fixed;
			left: 0;

			border-radius: 0 10rpx 10rpx 0;
			width: 24%;
			height: calc(100vh - 120rpx);
			// #ifdef H5
			height: calc(100vh - 120rpx);
			// #endif
			background-color: #2f303b;
			text-align: center;
			overflow: hidden;

			.tab-item {
				padding: 32rpx 0;
				font-size: 24rpx;
				color: #c0c3d2;
				line-height: 1.375;

				&.active {
					background-image: linear-gradient(to right, #f3254b 0%, #2f303b 100%);
					color: #fff;
				}
			}
		}

		.deal-list {
			margin-left: 26%;
			padding-top: 30rpx;
			padding-bottom: 1rpx;

			.list-item {
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				border: 1px solid #707070;
				padding: 30rpx 38rpx;
				background-color: #2f303b;

				.df(center, space-between);

				.left {
					margin-right: 20rpx;

					.top {
						margin-bottom: 22rpx;
						font-size: 26rpx;
						font-weight: bold;
						color: #fff;
						line-height: 1.42;
					}

					.bottom {
						font-size: 24rpx;
						color: #c0c3d2;
						line-height: 1.375;
					}
				}

				.right {
					font-size: 30rpx;
					color: #f1334a;
					font-weight: bold;
					line-height: 1.4;
				}
			}

			.tips {
				margin-top: 60rpx;
				color: #c0c3d2;
				text-align: center;
				font-size: 24rpx;
				line-height: 1.375;
			}
		}
	}
}
</style>

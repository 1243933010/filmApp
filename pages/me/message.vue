<template>
	<view>
		<hx-navbar :config="config" />
		<view class="box">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="item-top">
					<view class="item-top-title-text">
						<!-- v-if="item.is_read!==1" -->
						<!-- <view  class="radio"></view> -->
						<text class="item-top-title-text" style="font-weight: 600"> {{ item.title }}</text>
					</view>
					<view class="item-top-time"
						><text>{{ item.created_at }}</text>
					</view>
				</view>
				<view class="item-bottom"
					><text>
						<rich-text :nodes="item.content" @itemclick="btnClick"></rich-text>
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request, url as requestUrl } from "@/utils/request.js";
export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			list: [],
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("app.systemMessages"),
				color: "#ffffff",
				// backgroundColor: [1, "#24bdab"],
				// 背景图片（array则为滑动切换背景图，string为单一背景图）
				// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
				backgroundImg: "../../static/img/header_tabber.png",
			};
		},
	},
	mounted() {
		// window.btnClick = this.btnClick;
		this.getList();
	},
	methods: {
		btnClick(e) {
			// console.log("触发点击事件", e.detail.node.children[0].text);
			let url = e.detail.node.children[0].text;
			if (url) {
				// #ifdef APP
				uni.navigateTo({
					url: `/pages/index/webview?url=${url}`,
				});
				// #endif
				// #ifdef H5
				window.open(url);
				// #endif
			}
		},
		async getList() {
			let res = await $request("msgList", { page: 1, page_size: 100 });
			console.log(res);
			if (res.data.code === 0) {
				this.list = res.data.data.list;
				
				if (res.data.data.list.length === 0) {
					uni.showToast({
						icon: "none",
						title: this.$t("app.popup6"),
					});
				}
			}
		},
	},
};
</script>

<style lang="less" scoped>
page {
	background: #f5f4f9;
}
.box {
	width: 95%;
	margin: 0 auto;
	.item {
		width: 100%;
		background: white;
		border-radius: 10rpx;
		margin-bottom: 15rpx;
		// margin: 0 auto;

		.item-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			// margin-bottom: 55rpx;
			font-size: 30rpx;
			color: #333333;
			border-bottom: 1px solid #f5f4f9;
			padding: 27rpx 55rpx;
			box-sizing: border-box;
			.item-top-title-text {
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 150rpx;
			}
			.radio {
				width: 12rpx;
				height: 12rpx;
				border-radius: 50%;
				background-color: #ff4911;
				margin-right: 8rpx;
			}
		}
		.item-bottom {
			font-size: 26rpx;
			color: #333333;
			padding: 27rpx 55rpx;
			box-sizing: border-box;
		}
	}
}
</style>

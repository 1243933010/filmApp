<template>
	<view class="profix-page-container product-detail-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />

			<view class="product-detail-scroll page-con">
				<div class="max-con">
					<view class="product-img pic">
						<image :src="info.nft_img" mode="widthFix" class="img"></image>
					</view>
					<view class="product-tit">{{ info.nft_name }}</view>
					<!-- TODO -->
					<view class="product-time">${{ info.money }} - {{info.created_at}}</view>
					<view class="product-desc" v-if="info.nft_desc">{{ info.nft_desc }}</view>
					<!-- TODO -->
					<view class="go-btn" @click="goPage">进入</view>
				</div>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request, url as requestUrl } from "@/utils/request";
export default {
	name: "选择票数",
	components: {
		hxNavbar,
	},
	data() {
		return {
			productId: 1,
			info: {},
			headerBg: false,
		};
	},
	onLoad: function ({ id }) {
		this.productId = id;
		this.getDetail(id);
	},
	computed: {
		config() {
			return {
				// TODO
				title: "Pacific Rim",
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	methods: {
		goPage() {
			// return
			// if(!this.info.id) {
			// 	uni.showToast({
			// 		icon: "none",
			// 		title: "Not find ID",
			// 	});
			// 	return;
			// }
			// uni.navigateTo({
			// 	url:'/pages/index/selectSeat'
			// })
			uni.navigateTo({
				url: `/pages/index/selectSeat?class_id=${this.info.nft_class_id}&goods_id=${this.info.id}`
			});
		},
		scrollHandle(event) {
			const { scrollTop } = event.detail;
			if (scrollTop >= 50) {
				this.headerBg = true;
			} else {
				this.headerBg = false;
			}
		},
		async getDetail(id) {
			let res = await $request("nftDeail", { nft_id: id });
			// console.log(res);
			if (res.data.code === 0) {
				this.info = res.data.data;
				return;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		async subBtn() {
			let res = await $request("ordersRequest", { nft_id: this.productId, order_number: this.info.order_number });
			// console.log(res);
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
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.product-detail-page {
	.page-scroll {
		background: #1e1f28;
	}

	.product-detail-scroll {
		padding-top: 340rpx;

		.max-con {
			margin-left: auto;
			margin-right: auto;
			max-width: 80vw;

			.df(center, flex-start, column);

			.product-img {
				border-radius: 20rpx;
				width: 220rpx;
			}

			.product-tit {
				margin-top: 30rpx;
				font-size: 30rpx;
				color: #fff;
				line-height: 1.4;
				color: #fff;
				text-align: center;
			}

			.product-time {
				margin-top: 14rpx;
				font-size: 30rpx;
				color: #d32b56;
				line-height: 1.4;
				text-align: center;
			}

			.product-desc {
				margin-top: 20rpx;
				font-size: 24rpx;
				color: #c0c3d2;
				line-height: 1.375;
				text-align: center;
			}
			
			.go-btn {
				.btn-box(50rpx, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
				
				margin-top: 80rpx;
				min-width: 400rpx;
				text-align: center;
			}
		}
	}
}
</style>

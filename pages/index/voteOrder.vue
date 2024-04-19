<template>
	<view class="profix-page-container price-alert-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99">
				<template #left>
					<!-- TODO -->
					<view>结账</view>
				</template>
			</hx-navbar>

			<view class="price-alert-scroll page-con">
				<view class="film-info">
					<view class="right-text">
						<view class="time">Friday, January 26, 2024 at 1:08 a.m</view>
						<view class="name">{{ info.nft_name }} Pacific Rim</view>
						<!-- TODO -->
						<view class="address">这是表演的场地</view>
					</view>
				</view>
				<view class="product-info">
					<view class="left pic">
						<img :src="info.nft_img" mode="widthFix" class="img" />
					</view>
					<view class="right-text">
						<!-- TODO -->
						<view class="address">门票信息</view>
						<view class="address">Orchestra Stalls</view>
						<view class="date">第四排丨座位27-28</view>
						<view class="time">票面价值：每张票 50.00元</view>
					</view>
				</view>
				
				<view class="label-list">
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">门票数量</view>
						<view class="text">2张门票</view>
					</view>
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">取票方式</view>
						<view class="text">不支持取票</view>
					</view>
				</view>
				
				<view class="label-list">
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">订单总额</view>
						<view class="text red-text">101.19</view>
					</view>
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">票价</view>
						<view class="text">2张丨39.00元</view>
					</view>
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">服务费（估计数）</view>
						<view class="text">2张丨967</view>
					</view>
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">该剧院场地估计税收</view>
						<view class="text">3.86</view>
					</view>
				</view>
				
				<!-- TODO -->
				<view class="desc-text">我们的服务包括运费和增值税，价格由经销商确定，可能高于实际价值，每张票面值50.00</view>
				<view class="desc-text">如果活动按计划进行，但您的门票被取消或无法进入会场，StubHub的FanProtect@保证会为您提供保障。</view>
				
				<!-- TODO -->
				<view class="btn-box">结账</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
export default {
	name: "详情 - 3",
	components: {
		hxNavbar,
	},
	data() {
		return {
			productId: 1,
			info: {},
			headerBg: false,
			numList: 10,
		};
	},
	computed: {
		config() {
			return {
				// TODO
				title: "",
				color: "#ffffff",
				backgroundColor: "transparent",
				leftSlot: true,
			};
		},
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
	},
};
</script>

<style lang="less">
@import "../../static/less/variable.less";

.price-alert-page {
	.page-scroll {
		background: #1e1f28;
	}

	.price-alert-scroll {
		padding: 120rpx 0 0;
		
		.red-text {
			color: #EF414A !important;
		}
		
		.film-info {
			margin-bottom: 50rpx;
			border-radius: 20rpx;
			margin: 0 30rpx 38rpx 30rpx;
			
			.right-text {
				margin-bottom: 50rpx;
				padding-left: 18rpx;
				
				.time {
					margin-bottom: 10rpx;
					color: #D32B56;
					font-size: 24rpx;
					line-height: 1.1875;
				}
				
				.name {
					margin-bottom: 10rpx;
					color: #fff;
					font-size: 30rpx;
					line-height: 1.4;
					font-weight: bold;
				}
				
				.address {
					margin-bottom: 26rpx;
					color: #C0C3D2;
					font-size: 24rpx;
					line-height: 1.375;
				}
			}
		}
		
		.product-info {
			margin: 0 30rpx 38rpx 30rpx;
			border-radius: 20rpx;
			padding: 18rpx 20rpx;
			background-color: #2F303B;
			.df();
			
			.left {
				border-radius: 20rpx;
				width: 238rpx;
				min-height: 158rpx;
				background-color: #fff;
			}
			
			.right-text {
				padding-left: 20px;
				flex-grow: 1;
				
				.time,
				.date{
					margin-bottom: 10rpx;
					color: #D32B56;
					font-size: 24rpx;
					line-height: 1.1875;
				}
				
				.address {
					margin-bottom: 10rpx;
					color: #C0C3D2;
					font-size: 24rpx;
					line-height: 1.375;
				}
			}
		}
		
		.label-list {
			margin-bottom: 12px;
			border-bottom: 1px solid #2F303B;
			padding: 32rpx 24rpx 66rpx;
			
			.label-text {
				margin-top: 34rpx;
				.df(center, space-between);
				flex-wrap: wrap;
				
				.label, 
				.text{
					color: #C0C3D2;
					font-size: 24rpx;
					line-height: 1.375;
				}
				
				.red-text {
					margin-top: 8rpx;
					font-size: 48rpx;
					line-height: 1.4;
					width: 100%;
					font-weight: bold;
				}
			}
		}
		
		.desc-text {
			margin-top: 34rpx;
			padding: 0 24rpx;
			color: #C0C3D2;
			font-size: 24rpx;
			line-height: 1.375;
		}
		
		.btn-box {
			.btn-box(56px, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
			
			margin-top: 77rpx;
			text-align: center;
		}
	}
}
</style>

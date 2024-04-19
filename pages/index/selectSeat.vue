<template>
	<view class="profix-page-container select-seat-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />

			<view class="select-seat-scroll page-con">
				<view class="seat-img pic">
					<img src="" mode="widthFix" class="img" />
				</view>
				<view class="tab-list">
					<view class="tab-item red-text" style="background-color: #2F303B;">
						<view class="pic">
							<img src="@/static/image/icon/filter2.png" mode="widthFix" class="img" />
						</view>
						<!-- TODO -->
						筛选
					</view>
					<view class="tab-item">
						<view class="pic">
							<img src="@/static/image/icon/filter1.png" mode="widthFix" class="img" />
						</view>
						<!-- TODO -->
						最低价格
					</view>
				</view>
				<view class="vote-list">
					<view class="tips">
						<view class="line"></view>
						<!-- TODO -->
						<text class="text">2张门票</text>
						<view class="line"></view>
					</view>
					<view class="vote-item">
						<view class="line"></view>
						<view class="vote-info">
							<view class="cinema-name">Orchestra  Stalls</view>
							<view class="vote-position">
								<!-- TODO -->
								<view class="row-num">第6排</view>
								<!-- TODO -->
								<view class="vote-num red-text">2张票</view>
							</view>
							<!-- TODO -->
							<view class="pending red-text">正在出票...</view>
						</view>
						<view class="vote-price red-text">39.00</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request, url as requestUrl } from "@/utils/request";
export default {
	name:"详情",
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
				title: "",
				color: "#ffffff",
				backgroundColor: "transparent",
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

<style lang="less" scoped>
@import "../../static/less/variable.less";

.select-seat-page {
	.page-scroll {
		background: #1e1f28;
	}

	.select-seat-scroll {
		padding: 200rpx 0 0;
		
		.red-text {
			color: #EF414A !important;
		}

		.seat-img {
			width: 100%;
			min-height: 200rpx;
			background-color: #fff;
		}
		
		.tab-list {
			.df();
			
			.tab-item {
				flex-grow: 1;
				.df(center, center);
				
				padding-top: 30rpx;
				padding-bottom: 24rpx;
				color: #C0C3D2;
				
				.pic {
					margin-right: 8rpx;
					width: 36rpx;
				}
			}
		}
		
		.vote-list {
			padding-left: 30rpx;
			padding-right: 30rpx;
			
			.tips {
				.df(center, center);
				
				margin-top: 68rpx;
				color: #C0C3D2;
				
				.text {
					margin-left: 40rpx;
					margin-right: 40rpx;
					display: block;
				}
				
				.line {
					background-color: #2F303B;
					height: 1px;
					width: 220rpx;
				}
			}
			
			.vote-item {
				margin-top: 32rpx;
				border-radius: 20rpx;
				padding: 24rpx 50rpx 36rpx 60rpx;
				background-color: #2F303B;
				position: relative;
				overflow: hidden;
				font-size: 30rpx;
				line-height: 1.4;
				font-weight: 800;
				
				.df(center, space-between);
				
				.line {
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					width: 26rpx;
					background-color: #EE4749;
				}
				
				.vote-info {
					
					.cinema-name {
						color: #FFFFFF;
					}
					
					.vote-position {
						margin-top: 20rpx;
						.df(center);
						
						.row-num {
							color: #C0C3D2;
						}
						
						.vote-num {
							margin-left: 36rpx;
						}
					}
					
					.pending {
						margin-top: 20rpx;
					}
				}
				
				.vote-price {
					font-size: 50rpx;	
				}
			}
		}
	}
}
</style>

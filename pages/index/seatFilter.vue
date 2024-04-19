<template>
	<view class="profix-page-container seat-filter-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99">
				<template #left>
					<!-- TODO -->
					<view>筛选</view>
				</template>
			</hx-navbar>

			<view class="seat-filter-scroll page-con">
				<view class="vote-num">
					<!-- TODO -->
					<view class="tit">门票数量</view>
					<scroll-view scroll-x="true">
						<div class="num-list">
							<!-- TODO -->
							<view class="num-item custom">自定义</view>
							<view class="num-item" v-for="(item,index) in numList">{{ index + 1 }}</view>
						</div>
					</scroll-view>
				</view>
				
				<view class="price-info">
					<!-- TODO -->
					<view class="tit">每张门票的价格</view>
					<view class="price-list">
						<view class="price-item">
							<view class="left">
								<!-- TODO -->
								<view class="text">最低限额</view>
								<view class="text">183美元</view>
							</view>
							<view class="right pic">
								<img src="" />
							</view>
						</view>
						<view class="price-item">
							<view class="left">
								<!-- TODO -->
								<view class="text">最高</view>
								<view class="text">28001美元</view>
							</view>
							<view class="right pic">
								<img src="" />
							</view>
						</view>
					</view>
				</view>
				
				<view class="show-price">
					<!-- TODO -->
					<view class="left-text">显示收费价格</view>
					<view class="right-switch" @click="priceSwitch = !priceSwitch" :class="{active: priceSwitch}">
						<view class="round"></view>
					</view>
				</view>
				
				<view class="feature">
					<!-- TODO -->
					<view class="tit">特点</view>
					<view class="radio-box">
						<!-- TODO -->
						<view class="left-text">所有门票</view>
						<view class="radio" @click="allVote = !allVote" :class="{active: allVote}">
							<i class="iconfont icon-gou"></i>
						</view>
					</view>
					<view class="radio-box">
						<!-- TODO -->
						<view class="left-text">过道</view>
						<view class="radio" @click="aislecVote = !aislecVote" :class="{active: aislecVote}">
							<i class="iconfont icon-gou"></i>
						</view>
					</view>
					<view class="radio-box">
						<!-- TODO -->
						<view class="left-text">排除遮挡视线</view>
						<view class="radio" @click="excludeVote = !excludeVote" :class="{active: excludeVote}">
							<i class="iconfont icon-gou"></i>
						</view>
					</view>
				</view>
				
					<!-- TODO -->
				<view class="btn-box">应用</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request, url as requestUrl } from "@/utils/request";
export default {
	name: "筛选",
	components: {
		hxNavbar,
	},
	data() {
		return {
			productId: 1,
			info: {},
			headerBg: false,
			numList: 10,
			priceSwitch: false,
			allVote: false,
			aislecVote: false,
			excludeVote: false
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
				leftSlot: true
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

.seat-filter-page {
	.page-scroll {
		background: #1E1F28;
	}

	.seat-filter-scroll {
		padding: 120rpx 0 0;
		
		.vote-num {
			margin-bottom: 50rpx;
			
			.tit {
				margin-bottom: 26rpx;
				padding: 0 30rpx;
				color: #fff;
				font-size: 30rpx;
				line-height: 1.4;
			}
			
			.num-list {
				padding: 0 36rpx;
				width: 100%;
				
				.df();
				
				.num-item {
					margin-right: 52rpx;
					border-radius: 20rpx;
					width: 104rpx;
					height: 104rpx;
					background-color: #2F303B;
					color: #fff;
					flex-shrink: 0;
					
					.df(center, center);
					
					&.custom {
						font-size: 24rpx;
					}
				}
			}
		}
		
		.price-info {
			padding: 0 30rpx 68rpx;
			
			.tit {
				margin-bottom: 12rpx;
				color: #C0C3D2;
				font-size: 30rpx;
				line-height: 1.4;
			}
			
			.price-list {
				padding: 0 6rpx;
				
				.df(stretch, space-between);
				
				.price-item {
					border-radius: 10rpx;
					padding: 18rpx;
					width: calc(50% - 40rpx);
					background-color: #2F303B;
					
					.df();
					
					.left {
						margin-right: 30rpx;
						padding: 4rpx 0;
						
						.df(stretch, space-between, column);
						flex-grow: 1;
						
						.text {
							font-size: 24rpx;
							color: #C0C3D2;
						}
					}
					
					.right {
						border-radius: 10rpx;
						width: 103rpx;
						height: 92rpx;
						background-color: #1E1F28;
					}
				}
			}
		}
		
		.show-price {
			border-bottom: 1px solid #2F303B;
			padding: 0 30rpx 54rpx;
			
			.df(center, space-between);
			
			.left-text {
				font-size: 24rpx;
				line-height: 1.375;
				color: #C0C3D2;
			}
			
			.right-switch {
				border-radius: 50rpx;
				background: #2F303B;
				height: 32rpx;
				width: 60rpx;
				position: relative;
				transition: background .35s ease-in-out;
				
				.round {
					border-radius: 50%;
					height: 24rpx;
					width: 24rpx;
					background-color: #1E1F28;
					
					position: absolute;
					left: 4rpx;
					top: 50%;
					transform: translateY(-50%);
					transition: all .35s ease-in-out;
				}
				
				&.active {
					background: linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%);
					
					.round {
						left: calc(100% - 4rpx);
						transform: translate(-100%, -50%);
					}
				}
			}
		}
		
		.feature {
			padding: 32rpx 54rpx;
			
			.tit {
				color: #C0C3D2;
				font-size: 30rpx;
				line-height: 1.4;
			}
			
			.radio-box {
				margin-top: 35rpx;
				.df(center, space-between);
				
				.left-text {
					color: #C0C3D2;
					font-size: 24rpx;
					line-height: 1.375;
				}
				
				.radio {
					border-radius: 10rpx;
					border: 2px solid #C0C3D2;
					width: 44rpx;
					height: 44rpx;
					
					.df(center, center);
				
					&.active {
						border: none;
						background: url(@/static/image/icon/checked.png) no-repeat center center / 100%;
					}
				}
			}
		}
		
		.btn-box {
			.btn-box(@radius: 50px, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
			text-align: center;
			max-width: 400rpx;
			margin: 200rpx auto 0;
		}
	}
}
</style>

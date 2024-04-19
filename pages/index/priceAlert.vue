<template>
	<view class="profix-page-container price-alert-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99">
				<template #left>
					<!-- TODO -->
					<view>添加价格报警</view>
				</template>
			</hx-navbar>

			<view class="price-alert-scroll page-con">
				<view class="product-info">
					<view class="left pic">
						<img :src="info.nft_img" mode="widthFix" class="img" />
					</view>
					<view class="right-text">
						<!-- TODO -->
						<view class="date">2024年1月26日星期五</view>
						<view class="time">凌晨1点08分</view>
						<view class="name">{{ info.nft_name }} 电影名</view>
						<view class="address">这是表演的场地</view>
					</view>
				</view>
				
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
				
				<view class="address-choose">
					<!-- TODO -->
					<view class="tit">区域选择</view>
					<view class="btn">
						<view class="pic">
							<img src="@/static/image/icon/map.png" mode="widthFix" class="img" />
						</view>
						<!-- TODO -->
						<view class="text">带我去那里</view>
					</view>
				</view>
				
				<view class="max-price">
					<!-- TODO -->
					<view class="tit">每张票的最高价</view>
					<input type="text" class="inp-box" placeholder="Price (uss）" />
				</view>
				
				<!-- TODO -->
				<view class="tips">注：查找到票之后我们会通知你的.</view>
				
				<!-- TODO -->
				<view class="btn-box">应用</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
export default {
	name: "价格报警",
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
					color: #D32B56;
					font-size: 24rpx;
					line-height: 1.1875;
				}
				
				.time {
					margin-bottom: 10rpx;
				}
				
				.name {
					margin-bottom: 10rpx;
					color: #fff;
					font-size: 30rpx;
					line-height: 1.4;
					font-weight: bold;
				}
				
				.address {
					color: #C0C3D2;
					font-size: 24rpx;
					line-height: 1.375;
				}
			}
		}
		
		.vote-num {
			margin-bottom: 60rpx;
			
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
				
				display: flex;
				flex-direction: row;
				
				.num-item {
					margin-right: 52rpx;
					border-radius: 20rpx;
					width: 104rpx;
					height: 104rpx;
					background-color: #2F303B;
					color: #fff;
					flex-shrink: 0;
					
					display: flex;
					align-items: center;
					justify-content: center;
					
					&.custom {
						font-size: 24rpx;
					}
				}
			}
		}
		
		.address-choose {
			.df(center, space-between);
			
			margin-bottom: 32rpx;
			border-bottom: 1px solid #2F303B;
			padding: 0 40rpx 24rpx;
			
			.tit {
				color: #C0C3D2;
				font-size: 30rpx;
				line-height: 1.4;
			}
			
			.btn {
				border-radius: 10rpx;
				border: 1rpx solid #707070;
				padding: 22rpx 80rpx;
				background-color: #2F303B;
				.df(center);
				
				.pic {
					margin-right: 46rpx;
					width: 42rpx;
				}
				
				.text {
					color: #C0C3D2;
					font-size: 24rpx;
					line-height: 1.375;
				}
			}
		}
		
		.max-price {
			padding: 0 36rpx 144rpx;
			
			.tit {
				margin-bottom: 32rpx;
				padding-left: 18rpx;
				font-size: 30rpx;
				line-height: 1.4;
				color: #C0C3D2;
			}
			
			.inp-box {
				border-radius: 10rpx;
				padding: 30rpx 42rpx;
				background-color: #2F303B;
				font-size: 24rpx;
				line-height: 1.375;
				height: auto;
			}
		}
		
		.tips {
			padding: 0 72rpx 124rpx;
			font-size: 24rpx;
			line-height: 1.375;
			color: #C0C3D2;
		}
		
		.btn-box {
			.btn-box(@radius: 50px, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
			
			margin: 0 auto;
			text-align: center;
			max-width: 400rpx;
		}
	}
}
</style>

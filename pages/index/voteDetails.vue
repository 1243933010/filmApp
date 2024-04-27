<template>
	<view class="profix-page-container map-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99">
				<template #right>
					<view class="pic" style="width: 50rpx; margin-right: 20rpx;" @click="openDialog">
						<img src="@/static/image/icon/share.png" class="img" mode="widthFix" />
					</view>
				</template>
			</hx-navbar>

			<view class="map-scroll page-con">
				<view class="product-info">
					<view class="right-text">
						<view class="time">{{info.ticketInfo.formattedDateTime}}</view>
						<view class="name">{{ info.classInfo.class_name }} </view>
						<!-- TODO -->
						<!-- <view class="address">这是表演的场地</view> -->
					</view>
					<view class="left pic">
						<img :src="info.classInfo.class_img" mode="widthFix" class="img" />
					</view>
				</view>
				
				<view class="tips">
					<view class="line"></view>
					<!-- TODO -->
					<text class="text">{{info.ticketInfo.buy_num}}张门票</text>
					<view class="line"></view>
				</view>
				
				<view class="vote-item">
					<view class="line"></view>
					<view class="vote-info">
						<!-- TODO -->
						<view class="cinema-name">门票信息</view>
						<view class="vote-position">
							<!-- TODO -->
							<!-- <view class="row-num">测试1</view> -->
						</view>
						<!-- TODO -->
						<view class="pending red-text">第{{info.ticketInfo.platoon}}排丨座位{{info.ticketInfo.seat}}</view>
						<view class="pending red-text">票面价值：每张票 {{info.ticketInfo.fares}}元</view>
					</view>
					<view class="vote-price red-text">{{info.ticketInfo.fares*info.ticketInfo.buy_num}}</view>
				</view>
				
				<view class="label-list">
					<view class="label-text">
						<!-- TODO -->
						<view class="label">门票数量</view>
						<view class="text">{{info.ticketInfo.buy_num}}张门票</view>
					</view>
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">取票方式</view>
						<view class="text">即时下载 数分钟内即可下载和打印</view>
					</view>
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">小计</view>
						<view class="text red-text">0</view>
					</view>
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">票价</view>
						<view class="text">{{info.ticketInfo.buy_num}}张丨{{info.ticketInfo.fares}}元</view>
					</view>
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">服务费（估计数）</view>
						<view class="text">{{info.ticketInfo.buy_num}}张丨0</view>
					</view>
					
					<view class="label-text">
						<!-- TODO -->
						<view class="label">该剧院场地估计税收</view>
						<view class="text">0</view>
					</view>
				</view>
				
				<!-- TODO -->
				<view class="desc-text">我们的服务包括运费和增值税，价格由经销商确定，可能高于实际价值，每张票面值50.00</view>
				<view class="desc-text">如果活动按计划进行，但您的门票被取消或无法进入会场，StubHub的FanProtect@保证会为您提供保障。</view>
				
				<!-- <view class="tag-list">
					
					<view class="tag-item">支付方式</view>
					<view class="tag-item">支付方式</view>
					<view class="tag-item">支付方式</view>
					<view class="tag-item">支付方式</view>
				</view> -->
				
				<!-- TODO -->
				<view class="btn-box" @click="payHandle">去结账</view>
			</view>
		</scroll-view>
		
		<uni-popup ref="popup" type="center" background-color="transparent">
			<view class="popup-container">
				<!-- TODO -->
				<view class="popup-tit">分享</view>
				<view class="popup-content" style="max-width: 100%;">https://www.iconfont.cn/search/index?searchType=icon&q=%E5%9C%B0%E5%9B%BE&page=2&fromCollection=-1</view>
				<!-- TODO -->
				<view class="popup-close-btn" @click="$refs.popup.close()">复制链接</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import {
		$request,
		url as requestUrl
	} from "@/utils/request";
export default {
	name: "详情 - 3",
	components: {
		hxNavbar,
	},
	data() {
		return {
			info: {
				classInfo:{
					
				},
				ticketInfo:{
					
				},
				ticketRule:''
			},
			headerBg: false,
			detailInfo:{}
		};
	},
	computed: {
		config() {
			return {
				// TODO
				title: "票务信息",
				color: "#ffffff",
				backgroundColor: "transparent",
				// rightSlot: true,
			};
		},
	},
	onLoad(e) {
		this.detailInfo = e;
		this.getDetail(e.ticket_id);
	},
	methods: {
		async payHandle(){
			let res = await $request('ordersRequest',{...this.detailInfo})
			
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
			if (res.data.code === 0) {
				setTimeout(()=>{
					uni.navigateBack({delta:1})
				},1000)
				return;
			}
		},
		scrollHandle(event) {
			const { scrollTop } = event.detail;
			if (scrollTop >= 50) {
				this.headerBg = true;
			} else {
				this.headerBg = false;
			}
		},
		async getDetail(ticket_id) {
			let res = await $request("ticketConfirmed", { ticket_id });
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
		openDialog() {
			this.$refs.popup.open("center");
		}
	},
};
</script>

<style lang="less">
@import "../../static/less/variable.less";

.map-page {
	.page-scroll {
		background: #1e1f28;
	}

	.map-scroll {
		padding: 120rpx 30rpx 0;
		
		.red-text {
			color: #EF414A !important;
		}
		
		.product-info {
			margin-bottom: 50rpx;
			border-radius: 20rpx;
			
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
			
			.left {
				border-radius: 20rpx;
				min-height: 460rpx;
				background-color: #fff;
			}
		}
			
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
		
		.tag-list {
			margin-top: 106rpx;
			.df(center, space-between);
			flex-wrap: wrap;
			
			.tag-item {
				margin-right: 5rpx;
				margin-left: 5rpx;
				.btn-box(10rpx, #2F303B, #C0C3D2);
				padding: 12rpx 24rpx;
			}
		}
		
		.btn-box {
			margin-top: 77rpx;
			.btn-box(100rpx, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%), #fff);
			text-align: center;
		}
	}
}
</style>

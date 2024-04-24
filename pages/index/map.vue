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
						<view class="time">{{info.formattedDateTime}}</view>
						<view class="name">{{ info.class_name }}</view>
						<!-- TODO -->
						<!-- <view class="address">这是表演的场地</view> -->
					</view>
					<view class="left pic">
						<img :src="info.inside_img" mode="widthFix" class="img" />
					</view>
				</view>
				
				<view class="address-info">
						<!-- TODO -->
					<view class="tit">场地信息</view>
					<view class="info-box">
						<view class="left pic">
							<img src="" mode="widthFix" class="img" />
						</view>
						<view class="right-text">
						<!-- TODO -->
							<view class="address-name">{{info.address_name}}</view>
							<view class="address-num">{{info.address_desc}}</view>
							<view class="address-en">{{info.address_detail}}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<uni-popup ref="popup" type="center" background-color="transparent">
			<view class="popup-container">
				<!-- TODO -->
				<view class="popup-tit">分享</view>
				<view class="popup-content" style="max-width: 100%;">{{ticketShareInfo.invitation_url}}</view>
				<!-- TODO -->
				<view class="popup-close-btn" @click="copyText">复制链接</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request, url as requestUrl } from "@/utils/request";
export default {
	name: "右上角场地详情",
	components: {
		hxNavbar,
	},
	data() {
		return {
			// productId: 1,
			info: {},
			headerBg: false,
			// numList: 10,
			ticketShareInfo:{},
			detailObj:{}
		};
	},
	computed: {
		config() {
			return {
				// TODO
				title: "Pacific Rim",
				color: "#ffffff",
				backgroundColor: "transparent",
				rightSlot: true,
			};
		},
	},
	onLoad(e){
		console.log(e)
		this.detailObj = e;
		let token = localStorage.getItem("token");
		if(!token){
			if(e.invitation_code){
				uni.reLaunch({
					url:`/pages/login/mobileRegion?invitation_code=${e.invitation_code}`
				})
			}
		}else{
			this.getDetail(e.class_id)
		}
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
		async getDetail(class_id) {
			let res = await $request("venueDetails", { class_id });
			console.log(res);
			if (res.data.code === 0) {
				this.info = res.data.data;
				return;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		async openDialog() {
			
			let res = await $request("ticketShare", {class_id:this.detailObj.class_id});
			console.log(res);
			if (res.data.code === 0) {
				this.ticketShareInfo = res.data.data;
				this.$refs.popup.open("center");
				return;
			}
			
		},
		copyText(){
			uni.setClipboardData({data:this.ticketShareInfo.invitation_url})
			this.$refs.popup.close()
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
		
		.address-info {
			
			.tit {
				margin-bottom: 36rpx;
				font-size: 30rpx;
				line-height: 1.4;
				color: #C0C3D2;
			}
			
			.info-box {
				.df();
				
				border-radius: 10rpx;
				border: 1rpx solid #707070;
				padding: 28rpx;
				background: #2F303B;
				
				.left {
					border-radius: 20rpx;
					width: 118rpx;
					height: 118rpx;
					background-color: #fff;
				}
				
				.right-text {
					padding-left: 38rpx;
					
					.address-name {
						font-size: 32rpx;
						font-weight: bold;
						line-height: 1.4;
						color: #FEFEFE;
					}
					
					.address-num,
					.address-en{
						color: #C0C3D2;
						font-size: 24rpx;
						line-height: 1.375;
					}
				}
			}
		}
	}
}
</style>

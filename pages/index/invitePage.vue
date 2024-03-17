<template>
	<view style="height: 100%;">
		<view class="profix-page-container join-page recargar-page">
			<hx-navbar :config="config" />
			<view class="bk">
				<view class="title">
					<text>Choose the right download software</text>
				</view>
				<view class="logo">
					<image src="../../static/img/logo.jpg" mode="widthFix"></image>
				</view>
				<view class="btn">
					<view class="ios"  @click="handleUrl('ios')">
						<text>{{$t("download.ios")}}</text>
					</view>
					<view class="android"   @click="handleUrl('android')">
						<text>{{$t("download.android")}}</text>
					</view>
					<!-- <image @click="handleUrl('ios')" src="../../static/img/invite_an.png" mode="widthFix"></image> -->
					<!-- <image  @click="handleUrl('android')" src="../../static/img/invite_ios.png" mode="widthFix"></image> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {url} from '@/utils/request.js'
	import {
		$request
	} from '@/utils/request.js'
	export default {
		components: {
			hxNavbar,
		},
		data() {
			return {
				appInfo:{}
			};
		},
		computed: {
			config() {
				return {
					title: this.$t("join.yq2"),
					color: "#ffffff",
					// backgroundColor: [1, "#24bdab"],
					// 背景图片（array则为滑动切换背景图，string为单一背景图）
					// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
					backgroundImg: "../../static/img/header_tabber.png",
				};
			},
		},
		mounted(){
			this.getInfo()
		},
		methods:{
			 getInfo(){
				uni.request({
					url: url + "/api/app_info",
					method:'GET',
					success: res => {
						if(res.data.code===0){
							this.appInfo = res.data.data
						}
					},
				});
			},
			handleUrl(type){
				// #ifdef H5
				if(type=='android'){
					window.open(this.appInfo.app_download_url.val)
				}else{
					window.open(this.appInfo.ios_app_download_url.val)
				}
				// #endif
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		height: 100%;
	}
	.profix-page-container{
		height: 100%;
	}
	.bk{
		width: 100%;
		background-image: url("../../static/img/invite_bk.png");
		background-size: 100% 100%;
		height: 100%;
		background-repeat: no-repeat;
		position: relative;
		overflow: hidden;
		.title{
			width: calc(100% - 100rpx);
			position: absolute;
			top: 50rpx;
			left: 20rpx;
			color: #FB8B21;
			font-size: 60rpx;
			font-weight: 600;
		}
		.logo{
			width: 94rpx;
			position: absolute;
			top: 50rpx;
			right: 20rpx;
			image{
				width: 100%;
			}
		}
		.btn{
			width: 100%;
			position: absolute;
			bottom: 202rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			image{
				margin-bottom: 40rpx;
			}
			.android,.ios{
				width: 85%;
				background: red;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50rpx;
				box-sizing: border-box;
				padding: 35rpx 0;
				color: white;
				font-weight: 600;
			}
			.ios{
				margin-bottom: 40rpx;
				background: rgb(255, 88, 26);
			}
			.android{
				background: rgb(255, 206, 77);
			}
		}
	}
</style>
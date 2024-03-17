<template>
	<view>
		<view class="profix-page-container join-page recargar-page">
			<hx-navbar :config="config" />
			<!-- <view class="tab" style="">
				<view class="item"  @click="setIndex(0)">
					<text>待发货
					<view v-if="index==0" class="active"></view>
					</text>
					
				</view>
				<view class="item"  @click="setIndex(1)">
					<text>待收货
					<view v-if="index==1" class="active"></view>
					</text>
					
				</view>
			</view> -->
			<view class="tab">
				<view class="item"  @click="setIndex(0)">
					<text>{{ $t("join.yq16") }}
					<view v-if="index==0" class="active"></view>
					</text>
					
				</view>
				<view class="item"  @click="setIndex(1)">
					<text>{{ $t("join.yq17") }}
					<view v-if="index==1" class="active"></view>
					</text>
					
				</view>
			</view>
			<view class="box-content">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="item-icon">
						<image :src="imgUrl+item.goods_img" ></image>
					</view>
					<view class="item-right">
						<view class="item-title">
							<text>{{item.goods_name}}</text>
						</view>
						<view class="item-order">
							<text>{{item.logistics_name}} </text>
						</view>
						<view class="item-order">
							<text>{{item.logistic_order}}</text>
						</view>
						<view class="item-price">
							<text class="label">BTN：</text>
							<text class="num">{{item.money}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request,url
	} from '@/utils/request.js'
	export default {
		components: {
			hxNavbar,
		},
		data() {
			return {
				index:0,
				list:[],
				page:1
			};
		},
		computed:{
			config() {
				return {
					title: this.$t("recargar.pageTit"),
					color: "#ffffff",
					// backgroundColor: [1, "#24bdab"],
					// 背景图片（array则为滑动切换背景图，string为单一背景图）
					// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
					backgroundImg: "../../static/img/header_tabber.png",
				};
			},
			imgUrl(){
				return url
			}
		},
		onReachBottom(e){
			console.log(e)
		},
		mounted(){
			this.drawlist();
		},
		methods:{
			async drawlist(){
				let res = await $request('drawlist', {page_size:20,page:this.page,type:this.index});
				console.log(res)
				if (res.data.code === 0) {
					this.list.push(...res.data.data.list);
					return
				}
				uni.showToast({
					icon: 'none',
					title: res.data.msg
				})
			},
			setIndex(ind){
				this.index = ind;
				this.page = 1;
				this.list = [];
				this.drawlist();
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F5F4F9;
	}
	.tab{
		width: 100%;
		background-color: #F5F4F9;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 64rpx;
		padding-bottom: 53rpx;
		position: sticky;
		top: 80rpx;
		z-index: 10;
		.item{
			width: 40%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #0995B8;
			font-size: 30rpx;
			position: relative;
			text{
				line-height: 1;
				position: relative;
				padding-bottom: 20rpx;
				.active{
					position: absolute;
					width: 100%;
					bottom: 0;
					height: 10rpx;
					background: linear-gradient( 95deg, #0794B8 0%, #6ABCB4 100%);
					border-radius: 50rpx 50rpx 50rpx 50rpx;
				}
			}
		}
		
	}
	.box-content{
		width: calc(100% -  24rpx);
		margin: 0 auto;
		// background-color: red;
		.item{
			width: 100%;
			background: #FFFFFF;
			border-radius: 10rpx 10rpx 10rpx 10rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
			padding: 21rpx;
			.item-icon{
				width: 160rpx;
				height: 160rpx;
				margin-right: 24rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.item-right{
				width: 500rpx;
				height: 150rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.item-title{
					color: #10101A;
					font-size: 30rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					text{
						white-space: nowrap;
					}
				}
				.item-order{
					color: #767687;
					font-size: 26rpx;
					line-height: 1;
				}
				.item-price{
					display: flex;
					flex-direction: row;
					align-items: center;
					.label{
						color: #10101A;
						font-size: 30rpx;
						
						
					}
					.num{
						color: #FE8D52;
						font-size: 30rpx;
					}
				}
			}
		}
	}
</style>
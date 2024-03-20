<template>
	<view class="profix-page-container classification-page has-tabbar">
		<scroll-view :scroll-y="true" :scroll-x="false" @scroll="scrollHandle" class="page-scroll">
			<customHeader :logoTag="true" style="position: fixed; top: 0; width: 100%; z-index: 1" />
			
			<view class="classification-scroll page-con">
				<view class="banner">
					<view class="pic">
						<image src="@/static/image/index/banner.png" class="img" mode="widthFix"></image>
					</view>
				</view>
				
				<view class="film-h-list">
					<scroll-view scroll-x="true" class="film-scroll">
						<view class="list">
							<view class="film-item">
								<view class="pic">
									<image src="@/static/image/goodsImg1.png" class="img" mode="widthFix"></image>
								</view>
							</view>
							<view class="film-item">
								<view class="pic">
									<image src="@/static/image/goodsImg2.png" class="img" mode="widthFix"></image>
								</view>
							</view>
							<view class="film-item">
								<view class="pic">
									<image src="@/static/image/goodsImg3.png" class="img" mode="widthFix"></image>
								</view>
							</view>
							<view class="film-item">
								<view class="pic">
									<image src="@/static/image/goodsImg1.png" class="img" mode="widthFix"></image>
								</view>
							</view>
							<view class="film-item">
								<view class="pic">
									<image src="@/static/image/goodsImg2.png" class="img" mode="widthFix"></image>
								</view>
							</view>
							<view class="film-item">
								<view class="pic">
									<image src="@/static/image/goodsImg3.png" class="img" mode="widthFix"></image>
								</view>
							</view>
							<view class="film-item">
								<view class="pic">
									<image src="@/static/image/goodsImg1.png" class="img" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				
				<view class="categite-box">
					<!-- TODO -->
					<view class="tit">More categories</view>
					
					<view class="categite-list">
						<view class="categite-item">All categories</view>
						<view class="categite-item">Emotional class</view>
						<view class="categite-item">Science fiction</view>
						<view class="categite-item">All categories</view>
						<view class="categite-item">All categories</view>
						<view class="categite-item">All categories</view>
						<view class="categite-item">All categories</view>
					</view>
				</view>
				
				<view class="swiper-box">
					<swiper class="swiper" circular previous-margin="256rpx" next-margin="256rpx" active-class="is-active" @change="swiperChange">
						<swiper-item :class="{'is-active': activeClass === index}" v-for="(item, index) in swiperList">
							<view class="swiper-item">
								<view class="pic">
									<image :src="item, index" mode="widthFix" class="img"></image>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import customHeader from "@/components/customHeader/customHeader.vue";
import { $request, url as requestUrl } from "@/utils/request";
import testImg from "@/static/image/goodsImg1.png";

export default {
	components: {
		customHeader,
	},
	data() {
		return {
			activeClass: 0,
			headerBg: false,
			swiperList: [testImg,testImg,testImg,testImg,testImg,testImg,testImg,testImg,testImg]
		};
	},
	methods: {
		scrollHandle(event) {
			const { scrollTop } = event.detail;
			if(scrollTop >= 50) {
				this.headerBg = true;
			}else {
				this.headerBg = false;
			}
		},
		swiperChange(event) {
			let {current} = event.detail
			this.activeClass = current;
		}
	}
};
</script>

<style lang="less">
@import "../../static/less/variable.less";

.classification-page {
	background-color: #1E1F28;

	.classification-scroll {
		padding: 0;
		
		.banner {
			margin-left: -30rpx;
			margin-right: -30rpx;

			.swiper {
				height: 140px;
			}
		}
		
		.film-h-list {
			padding-bottom: 38rpx;
			width: 100%;
			
			.film-scroll {
				margin-top: -150rpx;
				width: 100%;
				
				.list {
					.df();
					
					.film-item {
						margin-left: 30rpx;
						border-radius: 30rpx;
						width: 26%;
						flex-shrink: 0;
						overflow: hidden;
					}
				}
			}
		}
		
		.categite-box {
			margin-bottom: 62rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
			
			.tit {
				margin-bottom: 24rpx;
				color: #FFFFFF;
				font-size: 42rpx;
				line-height: 1.4;
				font-weight: bold;
			}
			
			.categite-list {
				.df();
				
				.categite-item {
					margin-right: 18rpx;
					border-radius: 20rpx;
					border: 1rpx solid #707070;
					padding: 28rpx;
					background-color: #FFFFFF;
					white-space: nowrap;
					font-size: 24rpx;
					color: #FB3146;
					line-height: 1.375;
					font-weight: bold;
				}
			}
		}
		
		.swiper-box {
			margin-bottom: 56rpx;
			
			::v-deep swiper {
				height: 320rpx;
				
				uni-swiper-item {
					&.is-active {
						.swiper-item {
							transform: scale(1);
						}
					}
					
					.swiper-item {
						transform: scale(0.8);
						transition: transform .35s ease-in-out;
						
						.pic {
							border-radius: 20rpx;
						}
					}
				}
			}
		}
	}
}
</style>
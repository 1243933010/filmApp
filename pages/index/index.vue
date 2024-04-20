<template>
	<view class="profix-page-container index-page has-tabbar">
		<scroll-view :scroll-y="true" :scroll-x="false" @scroll="scrollHandle" class="page-scroll">
			<!-- TODO -->
			<customHeader headerText="Film and Television Group" :logoTag="true" :class="{'has-bg': headerBg}" style="position: fixed; top: 0; z-index: 1" :above="true" />
			<view class="index-scroll page-con">
				<view class="banner">
					<view class="pic">
						<swiper class="swiper" vertical circular autoplay>
							<swiper-item v-for="(item, index) in swiperList" :key="index" @click="newLink(item)">
								<!-- <view class="swiper-item">{{ item.image }}</view> -->\
								<image :src=" item.image" class="img" mode="widthFix"></image>
							</swiper-item>
						</swiper>
						<!-- <image src="@/static/image/index/banner.png" class="img" mode="widthFix"></image> -->
					</view>
				</view>

				<view class="menu-container">
					<view class="menu-list">
						<view @click="goPage(item.link)" class="menu-item" v-for="(item, index) in menuList" :key="index">
							<view class="pic">
								<image :src="item.iconUrl" mode="widthFix" class="img"></image>
							</view>
							<view class="menu-tit">{{ item.tit }}</view>
						</view>
					</view>
				</view>

				<view class="news-list">
					<!-- TODO -->
					<view class="left-tit">News</view>
					<view class="news-swiper">
						<swiper class="swiper" vertical circular autoplay>
							<swiper-item v-for="(item, index) in newsList" :key="index" @click="newLink(item)">
								<view class="swiper-item">{{ item.name }}</view>
							</swiper-item>
						</swiper>
					</view>
				</view>

				<view class="paper-card-list">
					<view class="paper-card" @click="goPage(linkInfo.Join_community_url.val)">
						<view class="left">
							<!-- TODO -->
							<view class="title">Paper airplanes</view>
							<view class="label">Contact customer service online</view>
						</view>
						<view class="right1">
							<image src="../../static/img/shequ.c92aac23.png" mode="widthFix"></image>
						</view>
					</view>
				</view>

				<view class="product-container">
					<view class="tit">
						<!-- TODO -->
						<text class="left">Popular movies and television</text>
						<text class="right">more</text>
					</view>

					<view class="product-list">
						<view class="product-item" v-for="(item, index) in nftList" :key="index">
							<view class="product-img pic">
								<image src="@/static/image/goodsImg1.png" mode="widthFix" class="img" @click="goProductDetail(item)"></image>
							</view>
							<view class="product-info">
								<view class="product-tit">{{ item.nft_name }}</view>
								<view class="product-time">$ {{ item.money * 1 }}</view>
								<!-- TODO -->
								<view class="product-desc">Jianye Times Cinema</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="film-h-list">
					<view class="tit">
						<!-- TODO -->
						<text class="left">More movies and television</text>
						<text class="right">more</text>
					</view>
					<scroll-view scroll-x="true" class="film-scroll">
						<view class="product-list">
							<!-- nftList 暂时先用的这个数组, 后面可以声明一个新的数组, 记得处理likeIcon -->
							<view class="product-item" v-for="(item, index) in nftList" :key="index">
								<view class="product-img pic">
									<image src="@/static/image/goodsImg1.png" mode="widthFix" class="img" @click="goProductDetail(item)"></image>
									<view class="like-price">
										
										<view class="price-btn">From $39</view>
										<view class="icon pic" @click="likekHanle(item)">
											<img :src="item.likeIcon" class="img" />
										</view>
									</view>
								</view>
								<view class="product-info">
									<view class="product-tit">{{ item.nft_name }}</view>
									<view class="product-time">$ {{ item.money * 1 }}</view>
									<!-- TODO -->
									<view class="product-desc">建业时代影城</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="popup" type="center" background-color="transparent">
			<view class="popup-container">
				<view class="popup-tit">{{ newsList[0].name }}</view>
				<view class="popup-content">
					<rich-text :nodes="newsList[0].content"></rich-text>
				</view>
				<view class="popup-close-btn" @click="$refs.popup.close()">{{ $t("app.sure") }}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import customHeader from "@/components/customHeader/customHeader.vue";
import { $request } from "@/utils/request.js";
import { setTabbar } from "@/utils/utils.js";
import likeIcon from "@/static/image/icon/like.png";
import likeFillIcon from "@/static/image/icon/like-fill.png";
export default {
	name: "首页",
	components: { customHeader },
	data() {
		return {
			title: "Hello",
			newsList: [],
			swiperList: [],
			nftList: [],
			linkInfo: {},
			above: true,
			headerBg: false,
			
		};
	},
	onLoad() {},
	computed: {
		locales() {
			return [
				{
					text: this.$t("locale.auto"),
					code: "auto",
				},
				{
					text: this.$t("locale.en"),
					code: "en",
				},
				{
					text: this.$t("locale.zh-hans"),
					code: "zh-Hans",
				},
				{
					text: this.$t("locale.zh-hant"),
					code: "zh-Hant",
				},
				{
					text: this.$t("locale.ja"),
					code: "ja",
				},
			];
		},
		menuList() {
			return [
				{
					iconUrl: "../../static/image/index/menu1.png",
					tit: "Platform Rewards", // TODO
					link: "/pages/index/abloutList",
				},
				{
					iconUrl: "../../static/image/index/menu2.png",
					tit: "VIP level", // TODO
					link: "/pages/index/qualifications",
				},
				{
					iconUrl: "../../static/image/index/menu3.png",
					tit: "Invite friends", // TODO
					link: "/pages/index/activityInfo1",
				},
				{
					iconUrl: "../../static/image/index/menu4.png",
					tit: "Download the app", // TODO
					link: "/pages/index/storageLevel",
				},
			];
		},
	},
	mounted() {
		// console.log(uni.getLocale())
		setTabbar(this.$t);
		this.adverts();
		this.getNotices();
		this.nftListFnc();
		this.linkObj();
	},
	methods: {
		likekHanle(likeItem) {
			likeItem.likeIcon === likeFillIcon ? likeItem.likeIcon = likeIcon : likeItem.likeIcon = likeFillIcon;
		},
		scrollHandle(event) {
			const { scrollTop } = event.detail;
			if (scrollTop >= 50) {
				this.headerBg = true;
			} else {
				this.headerBg = false;
			}
		},
		async linkObj() {
			let res = await $request("linkObj", {});
			// console.log(res.data);
			if (res.data.code == 0) {
				// console.log(this.menuList);
				this.linkInfo = res.data.data;
				// console.log(this.menuList);
			}
		},
		async nftListFnc() {
			this.loading = true;
			let formData = { keywords: "", page: 1, page_size: 20, vip_grade: "" };
			let res = await $request("nftList", formData);
			// console.log(res);
			this.loading = false;
			if (res.data.code === 0) {
				this.nftList = res.data.data.data.map(item => {
					item.likeIcon = likeIcon;
					return item;
				});
				// console.log(this.nftList);
			}
		},
		newLink(item) {
			uni.setStorageSync("notices", item);
			uni.navigateTo({
				url: "./notices",
			});
		},
		linkImg(item) {
			uni.navigateTo({
				url: item.url,
			});
		},
		async getNotices() {
			let res = await $request("notices", {});
			// console.log(res)
			if (res.data.code === 0) {
				this.newsList = res.data.data;
				// console.log(this.newsList, "-------");
				if (this.newsList.length > 0) {
					this.$refs.popup.open("center");
				}
				return false;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		async adverts() {
			let res = await $request("adverts", {});
			// console.log(res)
			if (res.data.code === 0) {
				this.swiperList = res.data.data;
				return false;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		onLocaleChange(e) {
			if (this.isAndroid) {
				uni.showModal({
					content: this.$t("index.language-change-confirm"),
					success: res => {
						if (res.confirm) {
							uni.setLocale(e.code);
						}
					},
				});
			} else {
				uni.setLocale(e.code);
				this.$i18n.locale = e.code;
			}
		},
		goProductDetail(item) {
			uni.navigateTo({
				url: `/pages/index/productDetail?id=${item.id}`,
			});
		},
		goPage(link) {
			console.log(link);
			if (link == "/pages/index/invitePage") {
				// #ifdef APP
				return false;
				// #endif
			}
			// #ifdef H5
			if (link.includes("http") || link.includes("www")) {
				window.open(link, "_blank");
				return;
			}
			// #endif
			// #ifdef APP-PLUS
			// console.log(link, "===");
			if (link.includes("http") || link.includes("www")) {
				uni.navigateTo({
					url: `/pages/index/webview?url=${link}`,
				});
				return;
			}
			// #endif
			if (link.indexOf("join") !== -1) {
				uni.switchTab({
					url: link,
				});
			} else {
				uni.navigateTo({
					url: link,
				});
			}
		},
	},
};
</script>

<style lang="less">
@import "../../static/less/variable.less";

.index-page {
	background-color: #1E1F28;

	.index-scroll {
		padding: 0;
		background: #1E1F28;
		
		.banner {
			margin-left: -30rpx;
			margin-right: -30rpx;

			.swiper {
				height: 140px;
			}
		}

		.news-list {
			padding: 20rpx 30rpx;
			background-color: rgba(255, 255, 255, .1);

			.df(center, flex-start);

			.left-tit {
				margin-right: 38rpx;
				padding: 10rpx 14rpx 10rpx 26rpx;
				background: url('@/static/image/index/news.png') no-repeat center center / 100% 100%;
				color: #1E1F28;
				font-size: 22rpx;
				font-weight: bold;
				line-height: 1.36;
			}

			.news-swiper {
				min-width: 10%;
				flex-grow: 1;

				.swiper {
					height: 36rpx;

					.swiper-item {
						.vertical(1);

						color: #C3C8DA;
						font-size: @descSize;
						line-height: 36rpx;
					}
				}
			}
		}

		.menu-container {
			padding: 40rpx 0rpx 18rpx;

			.menu-list {
				.df(stretch, space-between);

				.menu-item {
					.df(center, flex-start, column);
					
					padding: 0 15rpx;
					width: 25%;
					text-align: center;

					.pic {
						width: 56rpx;
						
						.img {
							width: 100%;
						}
					}

					.menu-tit {
						margin-top: 13rpx;
						font-size: 22rpx;
						color: #C0C3D2;
						line-height: 1.25;
					}
				}
			}
		}

		.paper-card-list {
			margin: 30rpx 30rpx 34rpx;

			.paper-card {
				border-radius: 10rpx;
				padding: 10rpx 0 10rpx 44rpx;
				width: 100%;
				background: linear-gradient( 270deg, #2F303B 0%, #35374A 100%);

				.df(center, space-between);
				
				.left {
					width: 70%;
					color: #C0C3D2;
					line-height: 1.4;
					
					.title {
						margin-bottom: 36rpx;
						font-size: 30rpx;
						font-weight: 800;
					}
					
					.label {
						font-size: 20rpx;
					}
				}
				
				.right {
					width: 30%;
					display: flex;
					justify-content: center;
					align-items: center;
					image {
						width: 137rpx;
					}
				}
				.right1 {
					width: 30%;
					display: flex;
					justify-content: center;
					align-items: center;
					image {
						width: 174rpx;
					}
				}
			}
		}

		.product-list {
			margin-left: -7.5rpx;
			margin-right: -7.5rpx;
			.df(stretch, flex-start);

			.product-item {
				padding:0 7.5rpx 40rpx;
				border-radius: 8rpx;
				width: 33.33%;
				overflow: hidden;

				.product-img {
					border-radius: 20rpx;
					width: 100%;
					background-color: #e8e8e8;
					position: relative;
					
					.like-price {
						position: absolute;
						left: 6rpx;
						right: 6rpx;
						bottom: 10rpx;
						
						.df(center, space-between);
						
						.price-btn {
							border-radius: 10rpx;
							padding: 8rpx 12rpx;
							color: #fff;
							font-size: 24rpx;
							line-height: 1.166;
							background-image: linear-gradient( 180deg, #FE0A49 0%, #FD2D45 100%);
						}
						
						.icon {
							width: 34rpx;
						}
					}
				}

				.product-info {
					.product-tit {
						.vertical(2);
						margin-top: 10rpx;
						color: #fff;
						font-size: 24rpx;
						line-height: 1.375;
						font-weight: 800;
					}

					.product-time {
						color: #D32B56;
						font-size: 20rpx;
						line-height: 1.3;
					}
					
					.product-desc {
						font-size: 20rpx;
						line-height: 1.4;
						color: #C0C3D2;
					}
				}

				&:nth-child(2n) {
					margin-right: 0;
				}
			}
		}

		.product-container {
			padding-left: 30rpx;
			padding-right: 30rpx;

			.tit {
				margin-bottom: 20rpx;
				color: #C0C3D2;
				
				.df(baseline, space-between);
				
				.left {
					font-size: 30rpx;
					line-height: 1.4;
					font-weight: bold;
				}
				
				.right {
					font-size: 24rpx;
					line-height: 1.375;
				}
			}
			
			.product-list {
				flex-wrap: wrap;
			}
		}
		
		.film-h-list {
			.tit {
				margin-bottom: 20rpx;
				padding-left: 30rpx;
				padding-right: 30rpx;
				color: #C0C3D2;
				
				.df(baseline, space-between);
				
				.left {
					font-size: 30rpx;
					line-height: 1.4;
					font-weight: bold;
				}
				
				.right {
					font-size: 24rpx;
					line-height: 1.375;
				}
			}
			
			.film-scroll {
				width: 100%;
			
				.product-list {
					.product-item {
						width: 30%;
						flex-shrink: 0;
						
						&:first-child {
							margin-left: 30rpx;
						}
					}
				}
			}
		}
	}
}
</style>

<template>
	<view class="profix-page-container recargar-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="recargar-scroll page-con">
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
					<view class="item" @click="setIndex(0)">
						<text
							>{{ $t("join.yq16") }}
							<view v-if="index == 0" class="active"></view>
						</text>
					</view>
					<view class="item" @click="setIndex(1)">
						<text
							>{{ $t("join.yq17") }}
							<view v-if="index == 1" class="active"></view>
						</text>
					</view>
				</view>
				<view class="box-content">
					<view class="item" v-for="(item, index) in list" :key="index">
						<view class="item-icon">
							<image :src="imgUrl + item.goods_img"></image>
						</view>
						<view class="item-right">
							<view class="item-title">
								<text>{{ item.goods_name }}</text>
							</view>
							<view class="item-order">
								<text>{{ item.logistics_name }} </text>
							</view>
							<view class="item-order">
								<text>{{ item.logistic_order }}</text>
							</view>
							<view class="item-price">
								<text class="label">BTN：</text>
								<text class="num">{{ item.money }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request, url } from "@/utils/request.js";
export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			index: 0,
			list: [],
			page: 1,
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("recargar.pageTit"),
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
		imgUrl() {
			return url;
		},
	},
	onReachBottom(e) {
		console.log(e);
	},
	mounted() {
		this.drawlist();
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
		async drawlist() {
			let res = await $request("drawlist", { page_size: 20, page: this.page, type: this.index });
			console.log(res);
			if (res.data.code === 0) {
				this.list.push(...res.data.data.list);
				return;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		setIndex(ind) {
			this.index = ind;
			this.page = 1;
			this.list = [];
			this.drawlist();
		},
	},
};
</script>

<style lang="less">
.recargar-page {
	.recargar-scroll {
		padding: 120rpx 0 0;

		.tab {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 64rpx;
			padding-bottom: 53rpx;
			position: sticky;
			top: 80rpx;
			z-index: 10;

			.item {
				width: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-size: 30rpx;
				position: relative;

				text {
					line-height: 1;
					position: relative;
					padding-bottom: 20rpx;

					.active {
						position: absolute;
						width: 100%;
						bottom: -4rpx;
						height: 4rpx;
						background-color: #fff;
						border-radius: 50rpx 50rpx 50rpx 50rpx;
					}
				}
			}
		}
		
		.box-content {
			width: calc(100% - 24rpx);
			margin: 0 auto;
			// background-color: red;

			.item {
				width: 100%;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				box-sizing: border-box;
				padding: 21rpx;

				.item-icon {
					width: 160rpx;
					height: 160rpx;
					margin-right: 24rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.item-right {
					width: 500rpx;
					height: 150rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.item-title {
						color: #fff;
						font-size: 30rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;

						text {
							white-space: nowrap;
						}
					}

					.item-order {
						color: #fff;
						font-size: 26rpx;
						line-height: 1;
					}

					.item-price {
						display: flex;
						flex-direction: row;
						align-items: center;

						.label {
							color: #10101a;
							font-size: 30rpx;
						}

						.num {
							color: #fe8d52;
							font-size: 30rpx;
						}
					}
				}
			}
		}
	}
}
</style>

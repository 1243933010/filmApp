<template>
	<view class="profix-page-container recargar-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="recargar-scroll page-con">
				<view class="rec-box">
					<view class="left">
						<view class="text">
							<!-- TODO -->
							<text>USDT币</text>
							<text>USDT-TRC20</text>
						</view>
					</view>
					<!-- TODO -->
					<view class="right">{{ balance }}美元</view>
				</view>

				<view class="recargar-list">
					<!-- TODO -->
					<view class="tit">美元T-TEC 20</view>
					<view class="input">
						<input type="number" v-model="recargarNum" placeholder="0" />
					</view>
					<view class="list">
						<view class="item" v-for="(item, index) in recargar" :key="item" :class="{ active: checkIndex === index }" @click="checkNum(index)">
							<view class="num">{{ item }}</view>
						</view>
					</view>

					<view class="balance-list">
						<!-- TODO -->
						<view class="balance-item">注：货币转换器 1USDT=$1</view>
						<view class="balance-item">注：货币转换器 1BTC=$11233</view>
					</view>
				</view>
				
				<!-- TODO -->
				<view class="recargar-btn" @click="recargarHandle">申请提现</view>
			</view>
		</scroll-view>

		<uni-popup ref="popup" type="center" class="recargar-success">
			<view class="pic">
				<image src="../../static/img/recargarSuc.png" mode="widthFix" class="img"></image>
			</view>
			<view class="text">{{ $t("recargar.popupTips") }}</view>
		</uni-popup>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "@/utils/request";

export default {
	name: "充值",
	components: {
		hxNavbar,
	},
	data() {
		return {
			recargar: [50, 80, 240, 720, 1000, 2000, 5000],
			checkIndex: 0,
			recargarNum: 0,
			balance: 0,
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				// TODO
				title: "充值",
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	mounted() {
		this.getWalletInfo();
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
		checkNum(index) {
			console.log(typeof index, index);
			this.checkIndex = index;
			this.recargarNum = index === 0 ? this.recargarNum : this.recargar[index];
		},
		recargarHandle() {
			// 充值成功后的弹窗提示
			if (this.recargarNum === 0) {
				uni.showToast({
					title: this.$t("recargar.toastText"),
				});

				return;
			}
			uni.navigateTo({
				url: `/pages/me/onlinePayment?recargarNum=${this.recargarNum}`,
			});
			// this.$refs.popup.open("center");

			// let timer = setTimeout(() => {
			// 	this.$refs.popup.close();
			// 	clearTimeout(timer);
			// }, 2000);
		},
		async getWalletInfo() {
			let res = await $request("walletInfo", {});
			let { code, data } = res.data;
			if (code === 0) {
				this.balance = data.balance * 1;
			}
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

page {
	background-color: #f5f4f9;
}

.recargar-page {
	.recargar-scroll {
		padding-top: 120rpx;
		.df(center, flex-start, column);

		.rec-box {
			margin-bottom: 40rpx;
			border-radius: 20rpx;
			padding: 60rpx 56rpx;
			.df(center, space-between);
			background: url(@/static/image/mine/walletBg.png) no-repeat center center / cover;
			width: 100%;

			.left {
				.df(center, flex-start);

				.text {
					text {
						margin-bottom: 12rpx;
						line-height: 1;
						color: #fff;
						font-size: 32rpx;
						display: block;
						line-height: 1.4;

						&:last-child {
							margin-bottom: 0;
						}
					}
				}
			}

			.right {
				color: #fff;
				font-size: 50rpx;
				font-weight: bold;
			}
		}

		.recargar-list {
			border-radius: 20rpx;
			padding: 40rpx 42rpx;
			background-color: #2F303B;
			width: 100%;
			
			.tit {
				margin-bottom: 30rpx;
				color: #fff;
				font-size: 24rpx;
				line-height: 1.375;
			}
			
			.input {
				margin-bottom: 50rpx;
				border-radius: 10rpx;
				padding: 22rpx 28rpx;
				background-color: #1E1F28;
				font-size: 30rpx;
				line-height: 1.4;
			}
				
			.list {
				margin: 0 -12rpx 24rpx;
				.df();
				flex-wrap: wrap;
				
				.item {
					margin: 0 12rpx 24rpx;
					border-radius: 10rpx;
					padding: 24rpx 40rpx;
					color: #C0C3D2;
					background-color: #1E1F28;
					font-size: 30rpx;
					line-height: 1.4;
				}
			}
			.balance-list {
				margin-bottom: 26rpx;

				.balance-item {
					color: #C0C3D2;
					font-size: 24rpx;
					margin-bottom: 18rpx;
					line-height: 1.375;
				}
			}
		}
		
		.recargar-btn {
			margin-top: 114rpx;
			.btn-box(50rpx, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
			max-width: 400rpx;
			width: 100%;
			text-align: center;
		}
	}

	.recargar-success {
		.pic {
			width: 154rpx;
		}

		.text {
			margin-top: 20rpx;
			color: #fff;
			font-size: 30rpx;
			text-align: center;
		}
	}
}
</style>
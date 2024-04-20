<template>
	<view class="profix-page-container online-payment-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="online-payment-scroll page-con">
				<view class="address-box">
					<!-- <view class="tit">{{ network }}</view> -->
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in network" :key="index">
							<view class="tit" style="display: flex; flex-direction: row; align-items: center">
								<radio :value="item" :checked="index === current" />
								<view>{{ item }}</view>
							</view>
						</label>
					</radio-group>
					<view class="inp-box">
						<b>Payment address: </b>{{ account_number }} <text @click="copyHandle">{{ $t("join.copy") }}</text>
					</view>
				</view>
				<button class="next-btn" @click="goPage">
					<text>{{ $t("onlinePayment.btnText") }}</text>
				</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "../../utils/request";

export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			headerBg: false,
			recargarNum: 0,
			account_number: "",
			network: [],
			current: 0,
			networkStr: "",
		};
	},
	// mounted() {
	// 	console.log(this.$route,'---')
	// 	this.recargarNum = this.$route.query.recargarNum;
	// 	this.getRechargeQrCode();
	// },
	onLoad(e) {
		this.recargarNum = e.recargarNum;
		this.getRechargeQrCode();
	},
	computed: {
		config() {
			return {
				title: this.$t("onlinePayment.pageTit"),
				color: "#ffffff",
				backgroundColor: "transparent",
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
		radioChange(e) {
			console.log(e);
			this.networkStr = e.detail.value;
		},
		copyHandle() {
			uni.setClipboardData({
				data: this.account_number,
				showToast: true,
			});
		},
		goPage() {
			uni.navigateTo({
				url: `/pages/me/payUpdata?recargarNum=${this.recargarNum}&network=${this.networkStr}`,
			});
		},
		async getRechargeQrCode() {
			const res = await $request("getRechargeQrCode");
			const { data, code, msg } = res.data;

			if (code !== 0) {
				uni.showToast({
					title: this.$t("onlinePayment.toastText"),
					icon: "error",
				});
			}

			let { usdt, network } = data;
			this.account_number = usdt.toString();
			this.network = network;
			this.networkStr = network[0];
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.online-payment-page {
	.online-payment-scroll {
		padding-top: 120rpx;

		.address-box {
			border-radius: 20rpx;
			.glassBg(30px, 20, #2f303b);

			& > * {
				position: relative;
				z-index: 1;
			}

			.tit {
				border-bottom: 1px solid #f5f4f9;
				padding: 30rpx 35rpx;
				color: #fff;
				font-weight: bold;
			}

			.inp-box {
				padding: 50rpx 35rpx;
				word-break: break-all;
				line-height: 1.4;
				color: #fff;

				text {
					vertical-align: unset;
					color: #fd7e1f;
				}
			}
		}

		.next-btn {
			margin-top: 100rpx;
			.btn-box(50px, transparent);
			.glassBg(30px, 20, #2f303b);

			& > * {
				position: relative;
				z-index: 1;
			}
		}
	}
}
</style>

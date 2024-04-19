<template>
	<view class="profix-page-container wallet-page">
		<scroll-view :scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="wallet-scroll page-con">
				<view class="total-assets-box">
					<view class="num">{{ balance }}</view>
					<!-- TODO -->
					<view class="text">资产总额</view>
				</view>
				
				<view class="ratio">
					<view class="tit">美元T-TEC 20</view>
					<!-- TODO -->
					<input class="input-box" type="text" placeholder="请输入USDT收货地址" />
					<!-- TODO -->
					<view class="tips">注：默认法定货币  1美元=1美元</view>
				</view>

				<view class="sub-btn" @click="subBtn">捆绑钱包</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "../../utils/request";

export default {
	name: "我的钱包",
	components: {
		hxNavbar,
	},
	data() {
		return {
			balance: 0,
			account: "",
			// account_list: {},
			///
			tabVal: 0,
			loginObj: {
				old_password: "",
				password: "",
				password_confirmation: "",
			},
			bankObj: {
				realname: "",
				mobile: "",
				branch_bank_name: "",
				bank_account: "",
				id_number: "",
			},
			userInfo: {},
			usdtBool: false,
			bankBool: false,
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				// TODO
				title: "我的钱包",
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
		tabList() {
			return [this.$t("app.bankCard"), "USDT"];
			// return [ 'USDT']
			// this.$t('app.bankCard'),
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
		async bindBank() {
			let res = await $request("bindBank", { ...this.bankObj });
			console.log(res);
			if (res.data.code === 0) {
				this.walletInfo();
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		changeTab(index) {
			this.tabVal = index;
		},
		async walletInfo() {
			const res = await $request("walletInfo");
			const { code, data, msg } = res.data;

			if (code !== 0) {
				uni.showToast({
					title: "钱包信息获取失败",
					icon: "none",
				});

				return;
			}

			const { balance, account_list } = data;
			this.balance = balance * 1;
			// this.account_list = account_list;
			this.bankObj = account_list.bank;
			console.log(account_list.bank.mobile);
			if (account_list.bank.mobile) {
				this.bankBool = true;
			}
			if (account_list.usdt.bank_account) {
				this.usdtBool = true;
				this.account = account_list.usdt.bank_account;
			}
		},
		async subBtn() {
			let res = await $request("bindAccount", {
				account: this.account,
			});
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
			if (res.data.code === 0) {
				this.walletInfo();
				// setTimeout(() => {
				// 	uni.navigateBack({
				// 		delta: 1
				// 	})
				// }, 1500)
			}
		},
	},
	mounted() {
		this.walletInfo();
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.wallet-page {
	.page-scroll {
		background: #1e1f28;
	}
	
	.wallet-scroll {
		padding-top: 120rpx;
		.df(center, flex-start, column);
		
		.total-assets-box {
			margin: 20rpx 20rpx 0;
			padding: 54rpx 20rpx;
			background: url("../../static/image/mine/walletBg.png") no-repeat top left / 100% 100%;
			width: calc(100% - 40rpx);

			.df(center, center);
			flex-direction: column;

			.num {
				margin-bottom: 14rpx;
				font-size: 50rpx;
				color: #fff;
				font-weight: bold;
				line-height: 1.4;
			}

			.text {
				color: #fff;
				font-size: 24rpx;
			}
		}

		.ratio {
			margin-top: -20rpx;
			margin-bottom: 88rpx;
			border-radius: 20rpx;
			padding: 40rpx 44rpx;
			background-color: #2F303B;
			width: 100%;
			
			.tit {
				margin-bottom: 25rpx;
				color: #fff;
				font-size: 24rpx;
				line-height: 1.375;
			}
			
			.input-box {
				margin-bottom: 32rpx;
				border-radius: 10rpx;
				padding: 30rpx 28rpx;
				background-color: #1E1F28;
				display: block;
				color: #fff;
				font-size: 24rpx;
				line-height: 1.375;
				height: auto;
			}
			
			.tips {
				color: #C0C3D2;
				font-size: 24rpx;
				line-height: 1.375;
			}
		}
		
		.sub-btn {
			.btn-box(50rpx, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
			max-width: 400rpx;
			width: 100%;
			text-align: center;
		}
	}
}
</style>

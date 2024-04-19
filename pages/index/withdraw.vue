<template>
	<view class="profix-page-container withdraw-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="withdraw-scroll page-con">
				<view class="bg">
					<div class="pic">
						<img src="@/static/image/mine/walletBg.png" mode="scaleToFill" class="img" />
					</div>
				</view>
				<view class="withdraw-box">
					<!-- TODO -->
					<view class="way-box">美元T-TEC 20</view>
					<view class="inp-box">
						<input type="number" v-model="money" />
					</view>
					<view class="inp-box">
						<input v-model="pay_password" :type="type" :placeholder="$t('withdraw.pwdPlaceholder')" />
						<view class="eye-icon" @click="() => (type = type == 'password' ? 'text' : 'password')"></view>
					</view>
					<!-- TODO -->
					<view class="box-tips">注：默认法定货币  1美元=1美元</view>
				</view>
				<view class="tips">
					<!-- TODO -->
					<view class="tit">注意事项</view>
					<view class="tips-ul">
						<view class="tips-item">1.最低出金金额为12美元，提交出金时必须为整数例如:12美元20美元30美元40美元，以此类推。</view>
						<view class="tips-item">2.取款手续费: 单笔取款1~300美元收取5%手续费，301~500美元收取3%手续费，501~999美元收取2%手续费，超过1000美元不收手续费。</view>
						<view class="tips-item">3.取款时间:从周一到周五的10: 00到21: 00之间，撤离将在72小时内贷记。</view>
					</view>
				</view>

				<view class="sub-btn" @click="subBtn">申请提现</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "@/utils/request";
export default {
	name: "提现",
	components: {
		hxNavbar,
	},
	data() {
		return {
			info: {},
			money: 0,
			pay_password: "",
			current: 0,
			networkStr: "",
			type: "password",
			withdraw_type: "",
			account_list: {},
			accountList: [],
			current1: 0,
			requestBool: true,
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				// TODO
				title: "提现",
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	onShow() {
		this.withdrawInfo();
		this.walletInfo();
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
			// this.networkStr = e.detail.value;
		},
		radioChange1(e) {
			console.log(e.detail.value);
			this.withdraw_type = e.detail.value.withdraw_type;
			this.networkStr = e.detail.value.bank_account;
		},
		async withdrawInfo() {
			let res = await $request("withdrawInfo", {});
			if (res.data.code === 0) {
				this.info = res.data.data;
				// this.networkStr= res.data.data.withdrawal_network[0]
				return;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		async subBtn() {
			console.log(this.account_list.bank.bank_account, this.account_list.usdt.bank_account);
			if (!this.requestBool) {
				return;
			}

			if (!this.account_list.bank.bank_account && !this.account_list.usdt.bank_account) {
				uni.showToast({
					icon: "none",
					title: this.$t("wallet.text7"),
				});
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/me/wallet",
					});
				}, 1500);
				return;
			}
			this.requestBool = false;
			let res = await $request("withdrawCreate", { money: this.money, pay_password: this.pay_password, withdraw_address: this.networkStr, withdraw_type: this.withdraw_type });
			this.requestBool = true;
			console.log(res);
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
			if (res.data.code === 0) {
				setTimeout(() => {
					uni.navigateBack({ delta: 1 });
				}, 1500);
			}
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
			this.account_list = account_list;
			this.accountList = [];
			if (account_list.bank.bank_account) {
				this.accountList.push({ value: account_list.bank, label: this.$t("app.bankCard") });
				this.withdraw_type = account_list.bank.withdraw_type;
				this.networkStr = account_list.bank.bank_account;
			}
			if (account_list.usdt.bank_account) {
				this.accountList.push({ value: account_list.usdt, label: "usdt" });
				if (!this.withdraw_type) {
					this.withdraw_type = account_list.usdt.withdraw_type;
					this.networkStr = account_list.usdt.bank_account;
				}
			}
		},
	},
};
</script>

<style lang="less">
@import "../../static/less/variable.less";

.withdraw-page {
	.page-scroll {
		background: #1e1f28;
	}

	.withdraw-scroll {
		padding-top: 120rpx;
		.df(center, flex-start, column);

		.bg {
			margin-bottom: -10rpx;
			padding: 0 30rpx;
			height: 72rpx;
			width: 100%;

			.pic {
				border-radius: 20rpx 20rpx 0 0;
				height: 100%;

				img {
					height: 100%;
				}
			}
		}

		.withdraw-box {
			margin-bottom: 40rpx;
			border-radius: 20rpx;
			padding: 30rpx 42rpx;
			background-color: #2F303B;
			position: relative;
			z-index: 1;
			width: 100%;

			.way-box {
				margin-bottom: 62rpx;
				color: #fff;
				font-size: 24rpx;
				line-height: 1.375;
			}

			.inp-box {
				margin-bottom: 32rpx;
				border-radius: 10rpx;
				padding: 22rpx 28rpx;
				background-color: #1E1F28;

				.df(center, space-between);

				input {
					color: #C0C3D2;
					font-size: 30rpx;
					line-height: 1.4;
				}

				.eye-icon {
					width: 28rpx;
					height: 22rpx;
					background: url("../../static/img/icon/eye.png") no-repeat center center / 100%;
				}
			}
			
			.box-tips {
				font-size: 24rpx;
				color: #C0C3D2;
				line-height: 1.375;
			}
		}

		.tips {
			margin-bottom: 117rpx;
			width: 100%;

			.tit {
				margin-bottom: 20rpx;
				font-size: 24rpx;
				line-height: 1.375;
				color: #C0C3D2;
			}

			.tips-ul {
				.tips-item {
					margin-bottom: 8rpx;
					font-size: 24rpx;
					line-height: 1.375;
					color: #C0C3D2;
				}
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

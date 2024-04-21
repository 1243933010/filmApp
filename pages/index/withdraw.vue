<template>
	<view class="profix-page-container withdraw-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="withdraw-scroll page-con">
				<view class="bg">
					<view class="pic">
						<img src="@/static/image/mine/walletBg.png" class="img" />
					</view>
				</view>
				<view class="withdraw-box">
					<view class="way-box">
						<radio-group @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in info.withdrawal_network" :key="index">
								<view class="tit" style="display: flex; flex-direction: row; align-items: center">
									<radio :value="item" :checked="index === current" />
									<view>{{ item }}</view>
								</view>
							</label>
						</radio-group>
					</view>
					<view class="way-box">
						<!-- {{ $t("storageLevel.dollar") }}T-TEC 20 -->
						<radio-group style="display: flex; flex-direction: row" @change="radioChange1">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in accountList" :key="index">
								<view class="tit" style="display: flex; flex-direction: row; align-items: center; margin-right: 40rpx">
									<radio :value="item.value" :checked="index === current1" />
									<view>{{ item.label }}</view>
								</view>
							</label>
						</radio-group>
					</view>
					<view class="inp-box">
						<input type="number" v-model="money" />
					</view>
					<view class="inp-box">
						<input v-model="pay_password" :type="type" :placeholder="$t('withdraw.pwdPlaceholder')" />
						<view
							class="eye-icon"
							@click="
								() => {
									type = type == 'password' ? 'text' : 'password';
								}
							"
						></view>
					</view>
				</view>
				<view class="tips">
					<view class="tit">{{ $t("withdraw.tipsTit") }}</view>
					<view class="tips-ul">
						<!-- <view class="tips-item" v-for="(item,index) in info.labelList" :key="index">{{index+1}}、{{ item }}</view> -->
						<view class="tips-item">{{ $t("withdraw.tips1") }}</view>
						<view class="tips-item">{{ $t("withdraw.tips2") }}</view>
						<view class="tips-item">{{ $t("withdraw.tips3") }}</view>
						<!-- <view class="tips-item">4.{{ $t("app.MinimumWithdrawalAmount") }}:{{info.withdraw_min_amount}}</view> -->
						<!-- <view class="tips-item">5.{{ $t("app.MaximumWithdrawalAmount") }}:{{info.withdraw_max_amount}}</view> -->
						<!--  <view class="tips-item">{{ $t("withdraw.tips1") }}:{{info.withdraw_fee_ratio}}</view>
				<view class="tips-item">{{ $t("withdraw.tips2") }}:{{info.withdraw_min_amount}}</view>
				<view class="tips-item">{{ $t("withdraw.tips3") }}:{{info.withdraw_max_amount}}</view> -->
						<!-- <view class="tips-item">4、{{ $t("app.text5") }}{{info.withdraw_date_start_hour}}{{ $t("app.text6") }}{{info.withdraw_date_end_hour}}{{ $t("app.text7") }}</view> -->
					</view>
				</view>

				<button class="sub-btn" @click="subBtn">{{ $t("withdraw.btnText") }}</button>
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
				title: this.$t("withdraw.pageTit"),
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
			let res = await $request("withdrawCreate", {
				money: this.money,
				pay_password: this.pay_password,
				withdraw_address: this.networkStr,
				withdraw_type: this.withdraw_type,
			});
			this.requestBool = true;
			console.log(res);
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
			if (res.data.code === 0) {
				setTimeout(() => {
					uni.navigateBack({
						delta: 1,
					});
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
				this.accountList.push({
					value: account_list.bank,
					label: this.$t("app.bankCard"),
				});
				this.withdraw_type = account_list.bank.withdraw_type;
				this.networkStr = account_list.bank.bank_account;
			}
			if (account_list.usdt.bank_account) {
				this.accountList.push({
					value: account_list.usdt,
					label: "usdt",
				});
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
			background-color: #2f303b;
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
				background-color: #1e1f28;

				.df(center, space-between);

				input {
					color: #c0c3d2;
					font-size: 30rpx;
					line-height: 1.4;
					flex-grow: 1;
				}

				.eye-icon {
					margin-left: 20rpx;
					width: 28rpx;
					height: 22rpx;
					background: url("../../static/img/icon/eye.png") no-repeat center center / 100%;
				}
			}

			.box-tips {
				font-size: 24rpx;
				color: #c0c3d2;
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
				color: #c0c3d2;
			}

			.tips-ul {
				.tips-item {
					margin-bottom: 8rpx;
					font-size: 24rpx;
					line-height: 1.375;
					color: #c0c3d2;
				}
			}
		}

		.sub-btn {
			.btn-box(50rpx, linear-gradient(180deg, #F51B4C 0%, #ED4E49 100%));
			max-width: 400rpx;
			width: 100%;
			text-align: center;
		}
	}
}
</style>
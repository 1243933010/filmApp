<template>
	<view class="profix-page-container wallet-page"> 
		<hx-navbar :config="config"> </hx-navbar>

		<view class="wallet-scroll page-scroll">
			<view class="total-assets-box">
				<view class="num">{{userInfo.deposit_balance}}</view>
				<view class="text">{{ $t("wallet.total") }}</view>
			</view>

			
		</view>
		<view class="withdraw-scroll page-scroll">
			<view class="withdraw-box">
				<view class="way-box">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in info.withdrawal_network"
							:key="index">
							<view class="tit" style="display: flex;flex-direction: row;align-items: center;">
								<radio :value="item" :checked="index === current" />
								<view>{{item}}</view>
							</view>

						</label>
					</radio-group>
				</view>
				<view class="way-box">
					<!-- {{ $t("storageLevel.dollar") }}T-TEC 20 -->
					<radio-group style="display: flex;flex-direction: row;" @change="radioChange1">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in accountList" :key="index">
							<view class="tit" style="display: flex;flex-direction: row;align-items: center;">
								<radio :value="item.value" :checked="index === current1" />
								<view>{{item.label}}</view>
							</view>

						</label>
					</radio-group>
				</view>
				<!-- <view class="inp-box">
					<input type="number" v-model="money" />
				</view> -->
				<view class="inp-box">
					<input v-model="pay_password" :type="type" :placeholder="$t('withdraw.pwdPlaceholder')" />
					<view class="eye-icon" @click="()=>{type=type=='password'?'text':'password'}"></view>
				</view>
				<button class="sub-btn" @click="refund">{{$t("app.popup8")}}</button>
				
				<view class="deal-list" >
					<view class="list-item" v-for="item in dealList" :key="index">
						<view class="left">
							<view class="top">{{item.status_text}}</view>
							<view class="bottom">{{item.updated_at||item.created_at}}</view>
						</view>
						<view class="right">{{item.money||item.amount*1}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request
	} from "../../utils/request";

	export default {
		components: {
			hxNavbar,
		},
		computed: {
			config() {
				return {
					title: this.$t("app.popup8"),
					color: "#ffffff",
					// backgroundColor: [1, "#24bdab"],
					// 背景图片（array则为滑动切换背景图，string为单一背景图）
					// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
					backgroundImg: "../../static/img/header_tabber.png",
				};
			},
		},
		onShow() {
			this.withdrawInfo();
			this.walletInfo();
			this.getUserInfo();
			this.getRefund();
		},
		data() {
			return {
				userInfo:{},
				info:{},
				current:0,
				accountList:[],
				current1:0,
				networkStr:'',
				type:'password',
				withdraw_type:'',
				account_id:'',
				pay_password:'',
				dealList:[
					{status_text:'xxx',created_at:'2022-111',money:20}
				],
				page:1,
				page_size:10,
				requestBool:true
			};
		},
		onReachBottom(){
			if(!this.requestBool){
				return
			}
			this.page++;
			this.getRefund();
		},
		methods: {
			async getRefund(){
				if(!this.requestBool){
					return
				}
				this.requestBool = false;
				if(this.page==1){
					this.dealList = [];
				}
				let resp = await $request('returnedList',{page:this.page,page_size:this.page_size});
				this.requestBool = true;
				if(resp.data.code==0){
					this.dealList.push(...resp.data.data.list);
				}else{
					uni.showToast({
						icon:'none',
						title:resp.data.msg
					})
				}
			},
			async refund(){
				let resp = await $request('returnedCash',{
					account_type:this.withdraw_type,
					account_address:this.networkStr,
					pay_password:this.pay_password
				});
				uni.showToast({
					icon:'none',
					title:resp.data.msg
				})
				if(resp.data.code==0){
					setTimeout(()=>{
						uni.navigateBack({delta:1})
					},1000)
				}
			},
			async getUserInfo() {
				uni.showLoading()
				let res = await $request("getUserInfo", {});
				uni.hideLoading()
				console.log(res);
				if (res.data.code === 0) {
					this.userInfo = res.data.data;
					
				}else{
					uni.showToast({
						icon: "none",
						title: res.data.msg,
					});
				}
			},
			radioChange(e) {
				console.log(e)
				// this.networkStr = e.detail.value;
			},
			radioChange1(e) {
				console.log(e.detail.value)
				this.withdraw_type = e.detail.value.withdraw_type;
				this.networkStr = e.detail.value.bank_account;
			},
			async withdrawInfo() {
				let res = await $request('withdrawInfo', {})
				if (res.data.code === 0) {
					this.info = res.data.data;
					// this.networkStr= res.data.data.withdrawal_network[0]
					return
				}
				uni.showToast({
					icon: 'none',
					title: res.data.msg
				})
			},
			async subBtn() {
				console.log(this.account_list.bank.bank_account, this.account_list.usdt.bank_account)
				if (!this.requestBool) {
					return
				}

				if (!this.account_list.bank.bank_account && !this.account_list.usdt.bank_account) {
					uni.showToast({
						icon: 'none',
						title: this.$t("wallet.text7")
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/me/wallet'
						})
					}, 1500)
					return
				}
				this.requestBool = false;
				let res = await $request('withdrawCreate', {
					money: this.money,
					pay_password: this.pay_password,
					withdraw_address: this.networkStr,
					withdraw_type: this.withdraw_type
				}, )
				this.requestBool = true;
				console.log(res)
				uni.showToast({
					icon: 'none',
					title: res.data.msg
				})
				if (res.data.code === 0) {
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
				}
			},

			async walletInfo() {
				const res = await $request("walletInfo");
				const {
					code,
					data,
					msg
				} = res.data;

				if (code !== 0) {
					uni.showToast({
						title: "钱包信息获取失败",
						icon: "none",
					});

					return;
				}

				const {
					balance,
					account_list
				} = data;
				this.account_list = account_list;
				this.accountList = [];
				if (account_list.bank.bank_account) {
					this.accountList.push({
						value: account_list.bank,
						label: this.$t("app.bankCard")
					})
					this.withdraw_type = account_list.bank.withdraw_type
					this.networkStr = account_list.bank.bank_account;
				}
				if (account_list.usdt.bank_account) {
					this.accountList.push({
						value: account_list.usdt,
						label: 'usdt'
					})
					if (!this.withdraw_type) {
						this.withdraw_type = account_list.usdt.withdraw_type
						this.networkStr = account_list.usdt.bank_account;
					}
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "../../static/less/variable.less";

	.disabled-text {
		padding: 20px 0;

		view {
			margin-bottom: 20px;
			font-size: 24rpx;
		}
	}

	page {
		background-color: #f5f4f9;
	}

	.wallet-page {
		.wallet-scroll {
			.total-assets-box {
				margin-top: 20rpx;
				padding: 56rpx 20rpx 24rpx;
				background: url("../../static/img/bg/wallet.png") no-repeat top left / 100% 100%;

				.df(center, center);
				flex-direction: column;

				.num {
					margin-bottom: 54rpx;
					font-size: 48rpx;
					color: #fffeff;
					font-weight: bold;
				}

				.text {
					color: #fff;
				}
			}

			.ratio {
				margin-top: 52rpx;

				.tips {
					margin-bottom: 22rpx;
					.df(center, flex-start);
					font-size: 24rpx;

					.circle {
						margin-right: 12rpx;
						border-radius: 50%;
						// background: linear-gradient(0deg, #fd7e1f 0%, #fd862c 100%);
						background: linear-gradient(0deg, #0694B8 0%, #6BBDB4 100%);
						width: 20rpx;
						height: 20rpx;
					}
				}

				.text {
					margin-bottom: 56rpx;
					margin-left: 32rpx;
				}
			}

			.address-box {
				border-radius: 20rpx;
				background-color: #fff;

				.tit {
					border-bottom: 1px solid #f5f4f9;
					padding: 30rpx 35rpx;
					color: #fd7e1f;
					font-weight: bold;
				}

				.inp-box {
					padding: 50rpx 35rpx;

					view {
						margin-bottom: 10px;
					}

					input {
						line-height: 1;
						font-size: 26rpx;
					}
				}
			}

			.sub-btn {
				margin: 200rpx auto 0;
				border-radius: 10rpx;
				padding: 34rpx;
				background-color: #383838;
				// background: linear-gradient(0deg, #0694B8 0%, #6BBDB4 100%);
				width: calc(100vw - 236rpx);
				color: #fff;
				font-size: 24rpx;
				line-height: 1;
			}
		}
	}


	.forget-pwd-scroll {
		.tab {
			.df(center, space-around);

			.tab-item {
				padding: 40rpx 0 30rpx;
				color: #383838;
				font-weight: bold;

				position: relative;

				.line-list {
					width: 0;
					transition: width 0.35s;

					position: absolute;
					bottom: 0;
					left: 0;
					height: 10rpx;
					z-index: 1;

					.df(center, space-between);

					.line {
						border-radius: 5rpx;
						// background-color: #fd7e1f;
						background: linear-gradient(0deg, #0694B8 0%, #6BBDB4 100%);
						height: 100%;

						&.long {
							width: 66%;
						}

						&.sort {
							width: 16%;
						}
					}
				}

				&.active {
					color: #fd7e1f;

					.line-list {
						width: 100%;
					}
				}
			}
		}

		.tab-content-list {
			display: flex;
			position: relative;

			.tab-content {
				padding-top: 55rpx;
				transition: 0.35s;
				position: absolute;
				top: 0;
				overflow: hidden;

				&.active {
					flex-grow: 1;
					z-index: 1;

					&.left {
						right: 100%;
					}

					&.right {
						left: 100%;
					}
				}

				&.left {
					left: 0;
					right: 0;
				}

				&.right {
					right: 0;
					left: 0;
				}

				.input-box {
					border-radius: 20rpx;
					background-color: #fff;
					width: calc(100vw - 60rpx);

					.input-label {
						border-bottom: 1px solid #f5f4f9;
						padding: 30rpx 35rpx;
						.df(center, space-between);

						.text {
							color: #fd7e1f;
						}

						.eye-icon {
							width: 29rpx;
							height: 22rpx;
							background: url("../../static/img/icon/eye.png") no-repeat center center / 100%;
						}
					}

					.inp-box {
						padding: 50rpx 35rpx;

						input {
							line-height: 1;
							font-size: 26rpx;
						}
					}
				}

				.save-btn {
					margin: 35vh auto 0;
					border-radius: 10rpx;
					padding: 34rpx;
					// background-color: #383838;
					background: linear-gradient(60deg, #0694B8 0%, #6BBDB4 100%);
					width: calc(100vw - 236rpx);
					color: #fff;
					font-size: 24rpx;
					line-height: 1;
					text-align: center;
				}
			}
		}
	}

	.save-success {
		.pic {
			width: 166rpx;
		}

		.text {
			margin-top: 20rpx;
			color: #fff;
			font-size: 30rpx;
			text-align: center;
		}
	}

	.withdraw-scroll {
		padding-bottom: 20rpx;
		color: #fffeff;

		.title {
			margin-top: 110rpx;
			font-size: 36rpx;
			text-align: center;
			margin-bottom: 30rpx;
		}

		.withdraw-box {
			border-radius: 20rpx;
			padding: 42rpx 30rpx 85rpx;
			background-color: #fff;

			.way-box {
				margin-bottom: 36rpx;
				color: #fd7e1f;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.inp-box {
				margin-bottom: 20rpx;
				border-radius: 10rpx;
				padding: 30rpx 40rpx;
				background-color: #f5f4f9;

				.df(center, space-between);

				input {
					color: @bodyColor;
				}

				.eye-icon {
					width: 29rpx;
					height: 22rpx;
					background: url("../../static/img/icon/eye.png") no-repeat center center / 100%;
				}
			}
		}

		.tips {
			margin-top: 40rpx;

			.tit {
				margin-bottom: 34rpx;
				font-size: @bodySize;
			}

			.tips-ul {
				.tips-item {
					font-size: @descSize;
					line-height: 1.38;
				}
			}
		}

		.sub-btn {
			margin: 100rpx auto 0;
			padding: 10rpx;
			// background-color: #383838;
			background-color: #EAF9FF;
			color: #0E97B7;
			font-size: @descSize;
			width: calc(100vw - 236rpx);
		}
	}
	.sub-btn {
	  margin: 100rpx auto 0;
	  padding: 10rpx;
	  // background-color: #383838;
	  background-color: #EAF9FF;
	  color: #0E97B7;
	  font-size: @descSize;
	  width: calc(100vw - 236rpx);
	}
	
	.deal-list {
		// margin-left: 26%;
		padding-top: 30rpx;
		padding-bottom: 1rpx;
	
		.list-item {
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			padding: 30rpx 34rpx;
			border: 1px solid #fd7e1f;
	
			.df(center, space-between);
	
			.left {
				margin-right: 20rpx;
				color: #504f5e;
				
				.top {
					margin-bottom: 38rpx;
					font-size: 28rpx;
					font-weight: bold;
				}
	
				.bottom {
					font-size: 24rpx;
				}
			}
	
			.right {
				font-size: 36rpx;
				color: #FD852B;
				font-weight: bold;
			}
		}
	}
</style>
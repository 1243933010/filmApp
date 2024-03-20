<template>
	<view class="profix-page-container mine-page">
		<scroll-view :scroll-y="true" class="mine-scroll page-scroll">
			<view class="userinfo-box">
				<view class="userinfo">
					<view class="message" @click="goMessage">
						<uni-badge size="small" :text="messageCount" absolute="rightTop" type="error">
							<image src="../../static/img/message.png" mode="widthFix"></image>
						</uni-badge>

					</view>
					<view class="logo pic" @click="openAvatarPop">
						<image :src="userInfo.avatar?userInfo.avatar:'../../static/img/logo.jpg'" mode="" class="img">
						</image>
					</view>
					<view class="msg">
						<view class="name" v-if="userInfo.nickname">
							<!-- {{ userInfo.nickname||userInfo.mobile }} -->
							<text class="name-text" style="font-size: 36rpx;" @click="goModifyNickname">
								{{ userInfo.nickname}}</text>
							<!-- <view class="vip">{{ userInfo.vip_name }}</view> -->
						</view>
						<view class="name" >
							<text class="name-text" style="font-weight: 100;font-size: 24rpx;"
								@click="goModifyNickname">UUID:{{userInfo.id}}</text>
							<view class="vip">{{ userInfo.vip_name }}</view>
						</view>

						
						<view class="id" style="margin-bottom: 20rpx;color: white;">
							<text>{{userInfo.email}}</text>
						</view>
						<!-- <view class="id" style="margin-bottom: 10rpx;color: white;">
							<text>UUID:{{userInfo.id}}</text>
						</view> -->
						<view class="id"  >
							<text style="margin-right: 10rpx;">{{userInfo.country_code}}</text> <text>{{ userInfo.mobile }}</text>
						</view>
					</view>

				</view>
				<view class="number">
					<view class="item">
						<view class="num">
							<text>{{ userInfo.balance }}</text>
						</view>
						<view class="text">
							<text>{{ $t("app.balance") }} (U)</text>
						</view>
					</view>
					<view class="item">
						<view class="num">
							<text>{{ userInfo.total_income }}</text>
						</view>
						<view class="text">
							<text>{{ $t("app.TotalIncome") }} (U)</text>
						</view>
					</view>
					<view class="item">
						<view class="num">
							<text>{{ userInfo.recharge_money }}</text>
						</view>
						<view class="text">
							<text>{{ $t("app.deposit") }} (U)</text>
						</view>
					</view>
				</view>
			</view>

			<view class="list">
				<view class="item" v-for="(item, index) in linkList" :key="index" @click="goPage(item.url)">
					<view class="left">
						<view class="icon pic">
							<image :src="item.src" mode="widthFix" class="img"></image>
						</view>
						<view class="text">
							<text>{{ item.title }}</text>
						</view>
					</view>
					<view class="right"></view>
				</view>
			</view>

			<view class="btn-box">
				<view class="exit" @click="logout">
					<text>{{ $t("app.Exit") }}</text>
				</view>
				<view class="agreement" @click="goFwxy">
					<text>{{ $t("app.Agreement") }}</text>
				</view>
			</view>
		</scroll-view>

		<uni-popup ref="openingPopup" type="center" class="opening">
			<view class="pic">
				<image src="../../static/img/opening.png" mode="widthFix" class="img"></image>
			</view>
			<view class="text">{{ $t("opening.popupTips") }}</view>
		</uni-popup>

		<uni-popup ref="avatarPopup" type="bottom" class="change-avatar">
			<view class="select-ul">
				<view class="select-item">{{$t("app.popup3")}}</view>
				<view class="select-item">{{$t("app.popup4")}}</view>
				<view class="select-item cancel" @click="closeAvatarPop">{{$t("app.cancel")}}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		$request,
		url as requestUrl
	} from "@/utils/request.js";
	export default {
		data() {
			return {
				userInfo: {
					username: "username",
					avatar: "",
					// balance: '',
					country_code: null,
					created_at: "",
					deposit_balance: 0,
					email: "",
					freeze_balance: "",
					id: 0,
					invitation_code: "",
					is_auth: 0,
					last_login: 0,
					mobile: "",
					nickname: "",
					pay_password: "",
					pid: 1,
					point: "",
					// recharge_money: "",
					status: 0,
					// total_income: 0,
					updated_at: "",
					usdt: "",
					username: "",
					vip_grade: 1,
					vip_name: "",
					withdraw_money: "",
					id: "",
					vip: 1,
					num1: 1,
					num2: 1,
					num3: 1,
				},
				messageCount: 0,
				linkList: [{
						url: "/pages/me/wallet",
						title: this.$t("app.myWallet"),
						src: "../../static/img/mine/lc.png",
					},
					{
						url: "/pages/me/deal",
						title: this.$t("app.financial"),
						src: "../../static/img/mine/cw.png",
					},
					{
						url: "/pages/login/forgetPwd",
						title: this.$t("app.securityCenter"),
						src: "../../static/img/mine/ws.png",
					},
					{
						url: "/pages/index/recargar",
						title: this.$t("app.recharge"),
						src: "../../static/img/mine/cz.png",
					},
					{
						url: "/pages/index/withdraw",
						title: this.$t("app.withdraw"),
						src: "../../static/img/mine/tx.png",
					},
					{
						url: "",
						title: this.$t("app.basicFunctions"),
						src: "../../static/img/mine/jz.png",
					}
				]
			};
		},
		mounted() {
			this.bindEmail();
		},
		onShow() {
			this.getUserInfo();

		},
		methods: {
			async bindEmail() {
				let res = await $request('bindEmail', {})
				console.log(res)
				if (res.data.code == 0) {
					if (res.data.data.is_bind !== 1) {
						this.linkList = [{
								url: "/pages/me/wallet",
								title: this.$t("app.myWallet"),
								src: "../../static/img/mine/lc.png",
							},
							{
								url: "/pages/me/deal",
								title: this.$t("app.financial"),
								src: "../../static/img/mine/cw.png",
							},
							{
								url: "/pages/me/bindEmail",
								title: this.$t("login.bindEmail"),
								src: "../../static/img/mine/jz.png",
							},
							{
								url: "/pages/login/forgetPwd",
								title: this.$t("app.securityCenter"),
								src: "../../static/img/mine/ws.png",
							},
							{
								url: "/pages/index/recargar",
								title: this.$t("app.recharge"),
								src: "../../static/img/mine/cz.png",
							},
							{
								url: "/pages/index/withdraw",
								title: this.$t("app.withdraw"),
								src: "../../static/img/mine/tx.png",
							},
							{
								url: "",
								title: this.$t("app.basicFunctions"),
								src: "../../static/img/mine/jz.png",
							}
						]
					}
				}
			},
			async getUserInfo() {
				uni.showLoading()
				let res = await $request("getUserInfo", {});
				uni.hideLoading()
				console.log(res);
				if (res.data.code == 0) {
					this.userInfo = res.data.data;

				} else {
					uni.showToast({
						icon: "none",
						title: res.data.msg,
					});
				}
				uni.hideLoading()
				let resp = await $request('msgCount', {});
				console.log(resp.data.data, '---')
				if (resp.data.code === 0) {
					this.messageCount = resp.data.data.total_count;
					// console.log(resp.data.data.total_count,'--')
				}
			},
			goModifyNickname() {
				uni.navigateTo({
					url: "/pages/me/modifyNickname",
				});
			},
			goPage(url) {
				if (!url) {
					this.openPopup();
					return;
				}
				uni.navigateTo({
					url,
				});
			},
			goFwxy() {
				uni.navigateTo({
					url: "/pages/me/fwxy",
				});
			},
			openPopup() {
				// 开发中 的弹窗
				this.$refs.openingPopup.open("center");

				let timer = setTimeout(() => {
					this.$refs.openingPopup.close();
					clearTimeout(timer);
				}, 2000);
			},
			async openAvatarPop() {
				// this.$refs.avatarPopup.open("bottom");
				uni.chooseImage({
					count: 1,
					success: async res => {
						console.log(res);
						uni.uploadFile({
							url: `${requestUrl}/api/file_upload`,
							filePath: res.tempFilePaths[0],
							name: "file",
							formData: {},
							success: async res1 => {
								console.log(res1);
								let avatar = JSON.parse(res1.data);
								if (avatar.code === 0) {
									let resp = await $request("userSave", {
										avatar: avatar.data.src
									});
									uni.showToast({
										icon: "none",
										title: resp.data.msg,
									});
									if (resp.data.code === 0) {
										this.getUserInfo();
									}
								}
							},
						});
					},
				});
			},
			closeAvatarPop() {
				this.$refs.avatarPopup.close();
			},
			async logout() {
				let res = await $request("logout", {});
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
				if (res.data.code === 0) {
					setTimeout(() => {
						uni.clearStorageSync();
						uni.reLaunch({
							url: "/pages/login/emailVerificationLogin",
						});
					}, 1000);
					return;
				}
			},
			goMessage() {
				uni.navigateTo({
					url: '/pages/me/message'
				})
			}
		},
	};
</script>

<style lang="less" scoped>
	@import "../../static/less/variable.less";

	// page {
	// 	background-color: #fd7f20;
	// }

	.mine-page {
		height: 100%;

		.mine-scroll {
			padding: 0;

			.userinfo-box {
				background: url("../../static/img/bgcb7c2c77.png") no-repeat top left / cover;
				color: #fff;
				// height: 1000rpx;
				box-sizing: border-box;
				padding: 100rpx 0rpx 32rpx 0rpx;

				.userinfo {

					// background-color: red;
					display: flex;
					flex-direction: column;
					align-items: center;

					// align-items: flex-start;
					// justify-content: space-between;
					// align-items: center;
					.message {

						// padding-left: 100rpx;
						// margin-top: -25rpx;
						padding-right: 58rpx;
						display: flex;
						// flex-direction: row-reverse;
						// align-items: flex-end;
						align-self: flex-end;

						image {
							width: 43rpx;
						}
					}

					.df(center, flex-start);

					.logo {
						border-radius: 50%;
						// margin-right: 46rpx;
						width: 115rpx;
						max-height: 115rpx;
						background-color: #f5f5f5;
						margin-bottom: 20rpx;

						image {
							width: 115rpx;
							height: 115rpx;
							border-radius: 50%;
						}
					}

					.msg {

						// padding-left: 50rpx;
						margin-bottom: 46rpx;
						.name {
							margin-bottom: 26rpx;
							// .df(center, flex-start);
							display: flex;
							justify-content: center;
							align-items: center;

							.name-text {
								min-height: 20rpx;
								min-width: 50rpx;
								font-size: 36rpx;
								font-weight: bold;
							}

							.vip {
								margin-left: 20rpx;
								// border-radius: 10rpx;
								padding: 8rpx 15rpx;
								// background-color: #ffb47c;
								background: linear-gradient(90deg, #FFE0B2 0%, #FEC27A 100%);
								border-radius: 10rpx;
								font-size: 24rpx;
								color: #945C3B;
								font-weight: 600;
							}
						}

						.id {
							color: #ffcf84;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}

				.number {
					padding-bottom: 33rpx;
					display: flex;

					.item {
						.df(center, flex-start);
						flex-direction: column;

						width: 33.33%;

						.num {
							font-size: 38rpx;
							font-weight: 600;
							margin-bottom: 23rpx;
						}

						.text {
							font-size: 24rpx;
						}
					}
				}
			}

			.list {
				padding: 22rpx 34rpx;
				background-color: #fff;

				.item {
					padding: 30rpx 0;
					.df(center, space-between);

					.left {
						.df(center, flex-start);

						.icon {
							margin-right: 20rpx;
							width: 54rpx;
						}

						.text {
							font-size: 28rpx;
							font-weight: bold;
						}
					}

					.right {
						width: 14rpx;
						height: 25rpx;
						background: url("../../static/img/right_arrow.png") no-repeat top left / 100% 100%;
					}
				}
			}

			.btn-box {
				padding: 0 50rpx 100rpx;
				width: calc(100% - 100rpx);
				background-color: #fff;

				.df(center, space-between);

				.exit,
				.agreement {
					border-radius: 10rpx;
					padding: 32rpx 0;
					font-size: 24rpx;
					width: calc(50% - 40rpx);
					text-align: center;
				}

				.exit {
					color: #383838;
					background: #F0E8E8;
				}

				.agreement {
					background: linear-gradient(0deg, #0694B8 0%, #6BBDB4 100%);
					// background: #FD8124;
					color: #fff;
				}
			}
		}

		.opening {
			.pic {
				width: 210rpx;
			}

			.text {
				margin-top: 20rpx;
				color: #fff;
				font-size: 30rpx;
				text-align: center;
			}
		}

		.change-avatar {
			z-index: 9999;

			.select-ul {
				display: flex;
				flex-direction: column;

				.select-item {
					padding: 40rpx;
					text-align: center;
					background-color: #fff;

					&.cancel {
						margin-top: 10rpx;
					}
				}
			}
		}
	}
</style>
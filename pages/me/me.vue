<template>
	<view class="profix-page-container mine-page has-tabbar">
		<scroll-view :scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<!-- TODO -->
			<customHeader headerText="我的" :class="{'has-bg': headerBg}" style="position: fixed; top: 0; z-index: 1" :above="true" />
			<view class="mine-scroll scroll-con">
				<view class="userinfo-box">
					<view class="userinfo">
						<view class="logo pic" @click="openAvatarPop">
							<image :src="userInfo.avatar ? userInfo.avatar : '../../static/img/logo.jpg'" mode="widthFix" class="img"> </image>
						</view>
						<view class="msg">
							<view class="nickname-vip">
								<view class="nickname" @click="goModifyNickname">{{ userInfo.nickname || '昵称' }}</view>
								<view class="vip-level">{{ userInfo.vip_name }}</view>
							</view>
							<view class="id">{{ userInfo.email }}</view>
						</view>
					</view>
					<view class="number">
						<view class="item">
							<view class="num">
								<text>{{ userInfo.balance }}</text>
							</view>
							<view class="text">
								<!-- TODO -->
								<text>平衡 (U)</text>
							</view>
						</view>
						<view class="item">
							<view class="num">
								<text>{{ userInfo.total_income }}</text>
							</view>
							<view class="text">
								<!-- TODO -->
								<text>总收入 (U)</text>
							</view>
						</view>
						<view class="item">
							<view class="num">
								<text>{{ userInfo.recharge_money }}</text>
							</view>
							<view class="text">
								<!-- TODO -->
								<text>存款 (U)</text>
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
				<view class="select-item">{{ $t("app.popup3") }}</view>
				<view class="select-item">{{ $t("app.popup4") }}</view>
				<view class="select-item cancel" @click="closeAvatarPop">{{ $t("app.cancel") }}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import customHeader from "@/components/customHeader/customHeader.vue";
import { $request, url as requestUrl } from "@/utils/request.js";
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
				status: 0,
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
			linkList: [
				{
					url: "/pages/me/wallet",
					title: this.$t("app.myWallet"),
					src: "../../static/image/mine/lc.png",
				},
				{
					url: "/pages/me/deal",
					title: this.$t("app.financial"),
					src: "../../static/image/mine/cw.png",
				},
				{
					url: "/pages/login/forgetPwd",
					title: this.$t("app.securityCenter"),
					src: "../../static/image/mine/ws.png",
				},
				{
					url: "/pages/index/recargar",
					title: this.$t("app.recharge"),
					src: "../../static/image/mine/cz.png",
				},
				{
					url: "/pages/index/withdraw",
					title: this.$t("app.withdraw"),
					src: "../../static/image/mine/tx.png",
				},
				{
					url: "",
					title: this.$t("app.basicFunctions"),
					src: "../../static/image/mine/jz.png",
				},
			],
			headerBg: false
		};
	},
	mounted() {
		this.bindEmail();
	},
	onShow() {
		this.getUserInfo();
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
		async bindEmail() {
			let res = await $request("bindEmail", {});
			console.log(res);
			if (res.data.code == 0) {
				if (res.data.data.is_bind !== 1) {
					this.linkList = [
						{
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
						},
					];
				}
			}
		},
		async getUserInfo() {
			uni.showLoading();
			let res = await $request("getUserInfo", {});
			uni.hideLoading();
			console.log(res);
			if (res.data.code == 0) {
				this.userInfo = res.data.data;
			} else {
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			}
			uni.hideLoading();
			let resp = await $request("msgCount", {});
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
									avatar: avatar.data.src,
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
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.mine-page {
	.page-scroll {
		background: #1E1F28;
	}
	
	.mine-scroll {
		padding-left: 30rpx;
		padding-right: 30rpx;
		
		.userinfo-box {
			color: #fff;
			padding: 225rpx 18rpx 0;

			.userinfo {
				margin-bottom: 42rpx;
				.df(center);

				.logo {
					border-radius: 50%;
					width: 115rpx;
					height: 115rpx;
					background-color: #fff;
				}

				.msg {
					margin-left: 24rpx;
					.df(flex-start, flex-start, column);
					
					.nickname-vip {
						margin-bottom: 15rpx;
						color: #FFFFFF;
						
						.df();

						.nickname {
							font-size: 36rpx;
							font-weight: bold;
							line-height: 1.4;
						}

						.vip-level {
							margin-left: 20rpx;
							border-radius: 10rpx;
							padding: 5rpx 20rpx 8rpx;
							background: linear-gradient( 180deg, #FE0D49 0%, #FD2A45 100%);
							font-size: 24rpx;
							line-height: 1.375;
						}
					}

					.id {
						color: #C0C3D2;
						font-size: 24rpx;
						line-height: 1.66;
					}
				}
			}

			.number {
				border-radius: 20rpx;
				padding: 42rpx 0 26rpx;
				display: flex;
				background-color: #141219;

				.item {
					.df(center, center, column);

					width: 33.33%;

					.num {
						font-size: 48rpx;
						font-weight: 800;
						margin-bottom: 12rpx;
						line-height: 1.4;
					}

					.text {
						font-size: 24rpx;
						line-height: 1.375;
					}
				}
			}
		}

		.list {
			padding: 0 38rpx;

			.item {
				margin-top: 58rpx;
				.df(center, space-between);

				.left {
					.df(center);

					.icon {
						margin-right: 20rpx;
						width: 46rpx;
					}

					.text {
						font-size: 26rpx;
						color: #C0C3D2;
						line-height: 1.42;
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
			margin-top: 34rpx;
			padding: 0 34rpx 34rpx;
			.df(stretch, flex-start, column);

			.exit,
			.agreement {
				.btn-box(10rpx, #1E1F28, #C0C3D2);
				
				margin-top: 24rpx;
				border: 1rpx solid #646670;
				padding-top: 26rpx;
				padding-bottom: 26rpx;
				text-align: center;
				width: 100%;
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

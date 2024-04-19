<template>
	<view class="profix-page-container forget-pwd-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="forget-pwd-scroll page-con">
				<view class="tab">
					<view class="tab-item" :class="{ active: tabVal === index }" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">
						{{ item }}
						<view class="line-list">
							<view class="long line"></view>
							<view class="sort line"></view>
						</view>
					</view>
				</view>
				<view class="tab-content-list">
					<view class="tab-content left" :class="{ active: tabVal === 1 }">
						<view class="input-box">
							<view class="input-label">
								<!-- TODO -->
								<view class="text">登录密码</view>
								<view class="eye-icon"></view>
							</view>
							<view class="inp-box">
								<!-- TODO -->
								<input type="text" v-model="loginObj.old_password" placeholder="请输入旧密码" />
							</view>
							<view class="inp-box">
								<!-- TODO -->
								<input type="text" v-model="loginObj.password" placeholder="请输入新密码" />
							</view>
							<view class="inp-box">
								<!-- TODO -->
								<input type="text" v-model="loginObj.password_confirmation" placeholder="请确认新密码" />
							</view>
						</view>

						<!-- TODO -->
						<view class="save-btn" @click="saveHandle('changePassword')">保存</view>
					</view>
					<view class="tab-content right" :class="{ active: tabVal === 0 }">
						<view class="input-box">
							<view class="input-label">
								<view class="text">{{ $t("app.transactionPassword") }}</view>
								<view class="eye-icon"></view>
							</view>
							<view class="inp-box" v-if="userInfo.pay_password">
								<input type="text" v-model="payObj.old_pay_password" :placeholder="$t('app.password1')" />
							</view>
							<view class="inp-box" v-if="userInfo.pay_password">
								<input type="text" v-model="payObj.pay_password" :placeholder="$t('app.password2')" />
							</view>
							<view class="inp-box" v-if="userInfo.pay_password">
								<input type="text" v-model="payObj.pay_password_confirmation" :placeholder="$t('app.password3')" />
							</view>
							<view class="inp-box" v-if="!userInfo.pay_password">
								<input type="text" v-model="payObj.pay_password1" :placeholder="$t('app.password4')" />
							</view>
							<view class="inp-box" v-if="!userInfo.pay_password">
								<input type="text" v-model="payObj.pay_password_confirmation1" :placeholder="$t('app.password3')" />
							</view>
						</view>

						<!-- TODO -->
						<view class="save-btn" @click="saveHandle('')">保存</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<uni-popup ref="popup" type="center" class="save-success">
			<view class="pic">
				<image src="@/static/image/mine/success.png" mode="widthFix" class="img"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request, url as requestUrl } from "@/utils/request.js";
export default {
	name: "安全中心",
	components: {
		hxNavbar,
	},

	data() {
		return {
			tabVal: 0,
			loginObj: {
				old_password: "",
				password: "",
				password_confirmation: "",
			},
			payObj: {
				old_pay_password: "",
				pay_password: "",
				pay_password_confirmation: "",

				pay_password1: "",
				pay_password_confirmation1: "",
			},
			userInfo: {},
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				title: "安全中心",
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
		tabList() {
			// TODO
			return ["登录密码", "交易密码"];
		},
	},
	mounted() {
		this.getUserInfo();
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
		async getUserInfo() {
			let res = await $request("getUserInfo", {});
			console.log(res);
			if (res.data.code === 0) {
				this.userInfo = res.data.data;
				return;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		changeTab(index) {
			this.tabVal = index;
		},
		handleRes(res, num) {
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
			if (res.data.code === 0) {
				if (num) {
					// this.getUserInfo()
					uni.setStorageSync("token", `Bearer ${res.data.data.token}`);
				}
				setTimeout(() => {
					uni.navigateBack({
						delta: 1,
					});
				}, 1000);
			}
		},
		async saveHandle(type) {
			console.log(type);
			if (type) {
				let res = await $request(type, { ...this.loginObj });
				this.handleRes(res, 1);
				return;
			}
			if (this.userInfo.pay_password) {
				let resp = await $request("changePayPassword", { ...this.payObj });
				this.handleRes(resp);
				return;
			}

			let respon = await $request("setPayPassword", { pay_password: this.payObj.pay_password1, pay_password_confirmation: this.payObj.pay_password_confirmation1 });
			this.handleRes(respon);
			// // 充值成功后的弹窗提示
			// this.$refs.popup.open("center");

			// let timer = setTimeout(() => {
			// 	this.$refs.popup.close();
			// 	clearTimeout(timer);
			// }, 2000);
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
.forget-pwd-page {
	.page-scroll {
		background: #1e1f28;
	}

	.forget-pwd-scroll {
		padding-top: 120rpx;

		.tab {
			.df(center, space-around);

			.tab-item {
				color: #383838;
				font-weight: bold;

				position: relative;

				.line-list {
					border-radius: 50rpx;
					width: 0;
					height: 10rpx;
					transition: width 0.35s;
					background: linear-gradient(92deg, #f51d4c 0%, #ee4d49 100%);

					position: absolute;
					bottom: -20rpx;
					left: 50%;
					transform: translateX(-50%);
					z-index: 1;

					.df(center, space-between);
				}

				&.active {
					color: #f2314b;

					.line-list {
						width: 80%;
					}
				}
			}
		}

		.tab-content-list {
			display: flex;
			position: relative;

			.tab-content {
				padding-top: 90rpx;
				transition: 0.35s;
				position: absolute;
				top: 0;
				overflow: hidden;
				.df(center, flex-start, column);
				width: 100%;

				&.active {
					flex-grow: 1;
					z-index: 1;

					&.left {
						transform: translateX(0);
					}

					&.right {
						transform: translateX(0);
					}
				}

				&.left {
					transform: translateX(-120%);
				}

				&.right {
					transform: translateX(120%);
				}

				.input-box {
					border-radius: 20rpx;
					width: 100%;

					.input-label {
						margin-bottom: 28rpx;
						padding: 0 18rpx;
						.df(center, space-between);

						.text {
							color: #fff;
						}

						.eye-icon {
							width: 28rpx;
							height: 20rpx;
							background: url("../../static/img/icon/eye.png") no-repeat center center / 100%;
						}
					}

					.inp-box {
						margin-bottom: 28rpx;
						border-radius: 10rpx;
						padding: 24rpx 18rpx;
						background-color: #2f303b;

						input {
							line-height: 1;
							font-size: 26rpx;
						}
					}
				}

				.save-btn {
					margin-top: 30vh;
					.btn-box(50rpx, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
					max-width: 400rpx;
					width: 100%;
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
}
</style>

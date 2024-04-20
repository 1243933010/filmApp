<template>
	<view class="profix-page-container invite-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="invite-scroll page-con">
				<view class="text-box">
					<!-- TODO -->
					<view class="h2">Invite a friend<br />to claim a gift</view>
				</view>

				<view class="qr-code-box glass-box">
					<!-- <view class="left">
						<view class="pic">
							<img src="" mode="widthFix" class="img" />
						</view>
					</view> -->
					<view class="right">
						<view class="invite-code">
							<!-- TODO -->
							<view class="label">邀请码</view>
							<view class="code">{{invitationObj.invitation_code}}</view>
							<view class="icon pic"  @click="copy(invitationObj.invitation_code)">
								<img src="@/static/image/icon/copy.png" mode="widthFix" class="img" />
							</view>
						</view>
						<view class="url">
							<view class="text">{{invitationObj.invitation_url}}</view>
							<view class="icon pic">
								<img  @click="copy(invitationObj.invitation_url)" src="@/static/image/icon/copy.png" mode="widthFix" class="img" />
							</view>
						</view>
					</view>
				</view>

				<view class="glass-box gift-info">
					<view class="explain-info">
						<view class="left">
							<view class="pic">
								<img src="@/static/image/join/explain.png" mode="widthFix" class="img" />
							</view>
						</view>
						<view class="right">
							<view class="tit">邀人享礼</view>
							<view class="desc">邀请下方数量人数即可获得精美礼品</view>
						</view>
					</view>

					<view class="label">
						<view class="icon pic">
							<img src="@/static/image/icon/user.png" mode="widthFix" class="img" />
						</view>
						<view class="text">普通用户</view>
					</view>

					<view class="gift-list">
						<view class="num-list">
							<view class="item" v-for="(item, index) in regularNumList" :key="item">
								{{ item }}人
								<view class="single" v-if="inviteNum === index + 1 && rememberLevel === 'regular'"></view>
							</view>
						</view>
						<view class="line">
							<view class="single"></view>
						</view>
						<view class="envelope-list">
							<view class="envelope-item" v-for="(item, index) in regularEnvelope" :key="index">
								<view class="no-level" v-if="rememberLevel !== 'regular'">
									<view class="pic">
										<img src="@/static/image/icon/refuse.png" mode="widthFix" class="img" />
									</view>
								</view>

								<view class="received" v-if="item.isReceive">
									<view class="pic">
										<img src="@/static/image/icon/ok.png" mode="widthFix" class="img" />
									</view>
								</view>
								<view class="lock" v-if="index !== 0 && regularEnvelope[index - 1].isReceive">
									<view class="pic">
										<img src="@/static/image/icon/lock.png" mode="widthFix" class="img" />
									</view>
								</view>
							</view>
						</view>
					</view>

					<!-- <view class="label is-vip">
						<view class="icon pic">
							<img src="@/static/image/icon/vip.png" mode="widthFix" class="img" />
						</view>
						<view class="text">普通用户</view>
					</view> -->

					<!-- <view class="gift-list">
						<view class="num-list">
							<view class="item" v-for="item in inviteInfo" :key="item">
								{{ item }}人
								<view class="single" v-if="inviteNum === index - 1 && rememberLevel !== 'vip'"></view>
							</view>
						</view>
						<view class="line"> </view>
						<view class="envelope-list">
							<view class="envelope-item" v-for="(item, index) in vipEnvelope" :key="index">
								<view class="no-level" v-if="rememberLevel !== 'vip'">
									<view class="pic">
										<img src="@/static/image/icon/refuse.png" mode="widthFix" class="img" />
									</view>
								</view>

								<view class="received" v-if="item.isReceive">
									<view class="pic">
										<img src="@/static/image/icon/ok.png" mode="widthFix" class="img" />
									</view>
								</view>
								<view class="lock" v-if="index !== 0 && vipEnvelope[index - 1].isReceive">
									<view class="pic">
										<img src="@/static/image/icon/lock.png" mode="widthFix" class="img" />
									</view>
								</view>
							</view>
						</view>
					</view> -->
				
				</view>
				
				<view class="btn-box">查看订单</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request,url } from "@/utils/request.js";
export default {
	name: "邀请好友",
	components: {
		hxNavbar,
	},
	data() {
		return {
			imgUrl: url,
			value: '',
			index: 0,
			invitationObj: {
				first: {
					total_count: 0,
					total_commission: 0
				},
				two: {
					total_count: 0,
					total_commission: 0
				},
				three: {
					total_count: 0,
					total_commission: 0
				},
				four: {
					total_people: 0,
					vip_number: 0
				},
				commission: {},
				number_of_people: {}
			},
			inviteInfo: {},
			temporaryItem: {},
			formData: {
				country: '',
				name: '',
				mobile: '',
				address: ''
			}
		};
	},
	mounted() {
		this.invitation();
		this.incentiveIndex()
	},
	computed: {
		config() {
			return {
				// TODO
				title: "邀请好友",
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
		counteList() {
			return [
				this.$t("join.yq31"), 
				this.$t("join.yq32"), 
				this.$t("join.yq33"), 
				this.$t("join.yq34"), 
				this.$t("join.yq35"), 
				this.$t("join.yq36"), 
				this.$t("join.yq37"), 
				this.$t("join.yq38"), 
				this.$t("join.yq39"), 
				this.$t("join.yq40"), 
				this.$t("join.yq41"), 
				this.$t("join.yq42"), 
				this.$t("join.yq43"), 
				this.$t("join.yq44"), 
				this.$t("join.yq45")
				// {label:this.$t("join.yq20"),value:this.$t("join.yq20")},
				// {label:this.$t("join.yq21"),value:this.$t("join.yq21")},
				// {label:this.$t("join.yq22"),value:this.$t("join.yq22")},
				// {label:this.$t("join.yq23"),value:this.$t("join.yq23")},
			]
		}
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
		listenLocale() {
			this.invitation();
			this.incentiveIndex()
		},
		async handleSubmit() {
			this.formData.country = this.counteList[this.index]
			let res = await $request('incentiveDrawing', {
				...this.formData,
				...{
					id: this.temporaryItem.id
				}
			});
			console.log(res)
			uni.showToast({
				icon: 'none',
				title: res.data.msg
			})
			if (res.data.code === 0) {
				this.incentiveIndex()
				return
			}
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.detail.value)
			this.index = e.detail.value
		},
		openDialog(item) {
			this.$refs.popup.open('bottom')
			this.temporaryItem = item;
			// uni.navigateTo({
			// 	url: './joinDetail'
			// })
		},
		goUrl() {
			this.$refs.popup.close()
			uni.navigateTo({
				url: './joinDetail'
			})
		},
		copy(text) {
			uni.setClipboardData({
				data: text,
				success: (res) => {
					uni.showToast({
						icon: 'none',
						title: 'success'
					})
				}
			})
		},
		async incentiveIndex() {
			let res = await $request('incentiveIndex', {});
			console.log(res)
			if (res.data.code === 0) {
				this.inviteInfo = res.data.data;
				return
			}
			uni.showToast({
				icon: 'none',
				title: res.data.msg
			})
		},
		async invitation() {
			let res = await $request('invitation', {});
			console.log(res)
			if (res.data.code === 0) {
				this.invitationObj = res.data.data;
				return
			}
			uni.showToast({
				icon: 'none',
				title: res.data.msg
			})
		},
		goTeamInfo(index) {
			uni.navigateTo({
				url: `/pages/join/teamInfo?id=${index}`,
			});
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
.invite-page {
	.page-scroll {
		background: #1e1f28;
	}

	.invite-scroll {
		padding-top: 250rpx;
		background: #000000 url(@/static/image/join/inviteBg.png) no-repeat center top / 100% auto;
		.df(center, flex-start, column);

		.text-box {
			width: 100%;
			
			.h2 {
				color: #fff;
				font-size: 70rpx;
				text-align: center;
				font-weight: bold;
				line-height: 1.27;
			}
		}

		.glass-box {
			margin-bottom: 5rpx;
			border: 1px solid #fff;
			padding: 46rpx 24rpx;
			width: 100%;
			.glassBg(30px, 20, #2f303b);

			& > * {
				position: relative;
				z-index: 1;
			}
		}

		.qr-code-box {
			margin-top: 200rpx;
			border-radius: 20rpx 20rpx 0 0;
			.df(center);

			.left {
				flex-shrink: 0;

				.pic {
					width: 176rpx;
					height: 176rpx;
					background-color: #fff;
				}
			}

			.right {
				padding-left: 30rpx;
				flex-grow: 1;
				min-width: 10%;

				.icon.pic {
					width: 28rpx;
				}

				.invite-code {
					margin-bottom: 40rpx;
					.df(center);

					.label {
						margin-right: 36rpx;
						font-size: 24rpx;
						color: #fff;
						line-height: 1.735;
					}

					.code {
						margin-right: 26rpx;
						color: #62e8c7;
						font-size: 30rpx;
						line-height: 1.4;
					}
				}

				.url {
					.df(center);
					.glassBg(30rpx, 0.8, #000);

					border-radius: 20rpx;
					border: 1rpx solid #707070;
					padding: 20rpx 15rpx;
					width: 100%;

					.text {
						font-size: 24rpx;
						line-height: 1.375;
						color: #fff;
						z-index: 1;
						flex-grow: 1;
						min-width: 1%;
						.vertical(1);
					}

					.icon.pic {
						margin-left: 10rpx;
						z-index: 1;
						flex-grow: 1;
						flex-shrink: 0;
					}
				}
			}
		}

		.gift-info {
			border-radius: 0 0 20rpx 20rpx;
			padding: 22rpx 28rpx;

			.explain-info {
				margin-bottom: 30rpx;
				.df(center);

				.left {
					flex-shrink: 0;

					.pic {
						width: 60rpx;
					}
				}

				.right {
					padding-left: 20rpx;

					.tit {
						margin-bottom: 12rpx;
						font-size: 36rpx;
						color: #fff;
						line-height: 1.4;
						font-weight: bold;
					}

					.desc {
						font-size: 24rpx;
						color: #96c1b6;
						line-height: 1.375;
					}
				}
			}

			.label {
				margin-bottom: 40rpx;
				padding: 0 12rpx;
				.df(center);

				.icon {
					margin-right: 14rpx;
					width: 40rpx;
					flex-shrink: 0;
				}

				.text {
					font-size: 30rpx;
					color: #dbdbdb;
					font-weight: bold;
				}

				&.is-vip {
					margin-top: 134rpx;

					.text {
						color: #d4cf91;
					}
				}
			}

			.gift-list {
				.num-list {
					.df(center, space-between);

					.item {
						flex-grow: 1;
						color: #ffffff;
						font-size: 22rpx;
						line-height: 1.36;
						text-align: center;
						position: relative;

						.single {
							border: 6px solid transparent;
							border-bottom: 18rpx solid #f2db3b;
							position: absolute;
							bottom: -22rpx;
							left: 50%;
							transform: translateX(-50%);
							z-index: 2;
						}
					}
				}

				.line {
					margin: 22rpx 0 32rpx;
					border-radius: 50rpx;
					background-image: linear-gradient(90deg, #ffc551 0%, #e1f61f 100%);
					height: 30rpx;
				}

				.envelope-list {
					.df(stretch, space-between);

					.envelope-item {
						margin: 0 8rpx;
						background: url(@/static/image/join/blindBox.png) no-repeat center center / cover;
						position: relative;
						flex-grow: 1;

						&:before {
							content: "";
							padding-top: 156.56%;
							display: block;
							width: 100%;
						}

						.no-level {
							background-color: rgba(0, 0, 0, 0.8);

							position: absolute;
							left: 0;
							right: 0;
							bottom: 0;
							top: 0;

							.df(center, center);

							.pic {
								width: 30rpx;
							}
						}

						.received {
							position: absolute;
							left: 0;
							right: 0;
							bottom: 0;
							top: 0;

							.df(center, center);

							.pic {
								width: 26rpx;
							}
						}

						.lock {
							position: absolute;
							left: 50%;
							top: calc(100% + 10rpx);
							transform: translateX(-50%);

							.pic {
								width: 60rpx;
							}
						}
					}
				}
			}
		}
		
		.btn-box {
			.btn-box(50rpx, transparent, #F03A4A);
			
			margin-top: 52rpx;
			border: 1px solid #F03A4A;
			text-align: center;
			max-width: 590rpx;
			width: 100%;
		}
	}
}
</style>

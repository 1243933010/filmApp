<template>
	<view class="profix-page-container join-page">
		<scroll-view :scroll-y="true" :scroll-x="false" class="page-scroll">
			<!-- TODO -->
			<customHeader @listenLocale="listenLocale" headerText="加盟" style="background-color: #1E1F28; position: fixed; top: 0; width: 100%; z-index: 1" />
			<view class="join-scroll page-con">
				<view class="banner">
					<view class="banner-img pic">
						<image src="@/static/image/join/joinBg.png" mode="widthFix" class="img"></image>
					</view>
					<view class="text-box">
						<!-- TODO -->
						<view class="banner-desc">立即加入！永久加入团队</view>
						<view class="banner-tit">即可享受稳定的收入和奖金</view>
					</view>
				</view>

				<view class="join-info">
					<!-- TODO -->
					<view class="join-tit">加入代码</view>
					<view class="info-box">
						<view class="icon-text">
							<view class="icon pic">
								<image src="@/static/image/icon/code.png" mode="widthFix" class="img"></image>
							</view>
							<!-- TODO -->
							<view class="text">{{ invitationObj.invitation_code }} (英语)</view>
						</view>
						<!-- TODO -->
						<view class="copy-btn" @click="copy(invitationObj.invitation_code)">复制</view>
					</view>
				</view>

				<view class="join-info">
					<!-- TODO -->
					<view class="join-tit">加入链接</view>
					<view class="info-box">
						<view class="icon-text">
							<view class="icon pic">
								<image src="../../static/img/icon/code.png" mode="widthFix" class="img"></image>
							</view>
							<view class="text">{{ invitationObj.invitation_url }}</view>
						</view>
						<!-- TODO -->
						<view class="copy-btn" @click="copy(invitationObj.invitation_url)">复制</view>
					</view>
				</view>

				<view class="census-box">
					<view class="census-tit">
						<view class="icon pic">
							<image src="@/static/image/icon/wallet.png" mode="widthFix" class="img"></image>
						</view>
						<!-- TODO -->
						<view class="tit">加入统计数量</view>
					</view>
					<view class="chart-con">
						<view class="left">
							<view class="chart-box">
								<view class="color-line" style="background-color: #ffba1f"></view>
								<view class="count">{{ invitationObj?.commission?.invite_rewards || 0 }}</view>
								<!-- TODO -->
								<view class="text">加盟店奖金</view>
							</view>
							<view class="chart-box">
								<view class="color-line" style="background-color: #fe2147"></view>
								<view class="count">{{ invitationObj?.commission?.queue || 0 }}</view>
								<!-- TODO -->
								<view class="text">加盟店佣金</view>
							</view>
						</view>
						<view class="right">
							<view class="pic">
								<image src="@/static/image/join/census1.png" mode="widthFix" class="img"></image>
							</view>
							<view class="count">{{ invitationObj?.commission?.totaT_commission || 0 }}</view>
							<!-- TODO -->
							<view class="text">总薪酬</view>
						</view>
					</view>
				</view>

				<view class="census-box">
					<view class="census-tit">
						<view class="icon pic">
							<image src="@/static/image/icon/person.png" mode="widthFix" class="img"></image>
						</view>
						<!-- TODO -->
						<view class="tit">加入统计数量</view>
					</view>
					<view class="chart-con">
						<view class="left">
							<view class="chart-box">
								<view class="color-line" style="background-color: #ffba1f"></view>
								<view class="count">{{ invitationObj?.number_of_people?.total_num || 0 }}</view>
								<!-- TODO -->
								<view class="text">加盟店奖金</view>
							</view>
							<view class="chart-box">
								<view class="color-line" style="background-color: #fe2147"></view>
								<view class="count">{{ invitationObj?.number_of_people?.vip_num || 0 }}</view>
								<!-- TODO -->
								<view class="text">加盟店佣金</view>
							</view>
						</view>
						<view class="right">
							<view class="pic">
								<image src="@/static/image/join/census1.png" mode="widthFix" class="img"></image>
							</view>
							<view class="count">{{ invitationObj?.commission?.totaT_commission || 0 }}</view>
							<!-- TODO -->
							<view class="text">总薪酬</view>
						</view>
					</view>
				</view>

				<view class="team-info">
					<view class="info-box">
						<view class="info-tit">
							<view class="line"></view>
							<!-- TODO -->
							<view class="tit">A-level团队加入详情</view>
							<view class="more-text" @click="goTeamInfo(1)">更多</view>
						</view>
						<view class="box-num">
							<view class="count-info san">
								<view class="count">{{ invitationObj.first.total_count }}</view>
								<!-- TODO -->
								<view class="text">合伙人数量</view>
							</view>
							<view class="count-info yi">
								<view class="count">{{ invitationObj.first.total_commission }}</view>
								<!-- TODO -->
								<view class="text">已获得佣金</view>
							</view>
						</view>
					</view>
					<view class="info-box">
						<view class="info-tit">
							<view class="line"></view>
							<!-- TODO -->
							<view class="tit">B级团队加入详情</view>
							<view class="more-text" @click="goTeamInfo(2)">更多</view>
						</view>
						<view class="box-num">
							<view class="count-info san">
								<view class="count">{{ invitationObj.two.total_count }}</view>
								<!-- TODO -->
								<view class="text">合伙人数量</view>
							</view>
							<view class="count-info yi">
								<view class="count">{{ invitationObj.two.total_commission }}</view>
								<!-- TODO -->
								<view class="text">已获得佣金</view>
							</view>
						</view>
					</view>
					<view class="info-box">
						<view class="info-tit">
							<view class="line"></view>
							<!-- TODO -->
							<view class="tit">C级团队加入详情</view>
							<view class="more-text" @click="goTeamInfo(3)">更多</view>
						</view>
						<view class="box-num">
							<view class="count-info san">
								<view class="count">{{ invitationObj.three.total_count }}</view>
								<!-- TODO -->
								<view class="text">合伙人数量</view>
							</view>
							<view class="count-info yi">
								<view class="count">{{ invitationObj.three.total_commission }}</view>
								<!-- TODO -->
								<view class="text">已获得佣金</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-class">
				<view class="popup-class-top">
					<view class=""></view>
					<view class="title"
						><text>{{ $t("join.yq8") }}</text>
					</view>
					<view class="icon" @click="$refs.popup.close()">
						<image src="../../static/img/close_small_icon.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="popup-class-form">
					<view class="item">
						<view class="item-label">
							<text>{{ $t("join.yq9") }}：</text>
						</view>
						<view class="item-input">
							<textarea v-model="formData.address" :placeholder="`${$t('join.yq10')}...`" name="" id="" cols="30" rows="10"></textarea>
						</view>
					</view>
					<view class="item">
						<view class="item-label">
							<text>{{ $t("join.yq24") }}：</text>
						</view>
						<view class="item-input">
							<picker @change="bindPickerChange" :value="index" :range="counteList">
								<view class="uni-input">{{ counteList[index] }}</view>
							</picker>
						</view>
					</view>
					<view class="item">
						<view class="item-label">
							<text>{{ $t("join.yq11") }}：</text>
						</view>
						<view class="item-input">
							<input type="text" v-model="formData.name" :placeholder="`${$t('join.yq12')}...`" />
						</view>
					</view>
					<view class="item">
						<view class="item-label">
							<text>{{ $t("join.yq13") }}：</text>
						</view>
						<view class="item-input">
							<input type="text" v-model="formData.mobile" :placeholder="`${$t('join.yq14')}...`" />
						</view>
					</view>
					<view class="form-btn">
						<view class="form-sub" @click="handleSubmit">
							<text>{{ $t("join.yq15") }}</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import customHeader from "@/components/customHeader/customHeader.vue";
import { $request, url } from "@/utils/request.js";
export default {
	components: {
		customHeader,
	},
	data() {
		return {
			imgUrl: url,
			value: "",
			index: 0,
			invitationObj: {
				first: {
					total_count: 0,
					total_commission: 0,
				},
				two: {
					total_count: 0,
					total_commission: 0,
				},
				three: {
					total_count: 0,
					total_commission: 0,
				},
				four: {
					total_people: 0,
					vip_number: 0,
				},
				commission: {},
				number_of_people: {},
			},
			inviteInfo: {},
			temporaryItem: {},
			formData: {
				country: "",
				name: "",
				mobile: "",
				address: "",
			},
		};
	},
	mounted() {
		this.invitation();
		this.incentiveIndex();
	},
	computed: {
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
				this.$t("join.yq45"),
				// {label:this.$t("join.yq20"),value:this.$t("join.yq20")},
				// {label:this.$t("join.yq21"),value:this.$t("join.yq21")},
				// {label:this.$t("join.yq22"),value:this.$t("join.yq22")},
				// {label:this.$t("join.yq23"),value:this.$t("join.yq23")},
			];
		},
	},
	methods: {
		listenLocale() {
			this.invitation();
			this.incentiveIndex();
		},
		async handleSubmit() {
			this.formData.country = this.counteList[this.index];
			let res = await $request("incentiveDrawing", {
				...this.formData,
				...{
					id: this.temporaryItem.id,
				},
			});
			console.log(res);
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
			if (res.data.code === 0) {
				this.incentiveIndex();
				return;
			}
		},
		bindPickerChange: function (e) {
			console.log("picker发送选择改变，携带值为", e.detail.value);
			this.index = e.detail.value;
		},
		openDialog(item) {
			this.$refs.popup.open("bottom");
			this.temporaryItem = item;
			// uni.navigateTo({
			// 	url: './joinDetail'
			// })
		},
		goUrl() {
			this.$refs.popup.close();
			uni.navigateTo({
				url: "./joinDetail",
			});
		},
		copy(text) {
			uni.setClipboardData({
				data: text,
				success: res => {
					uni.showToast({
						icon: "none",
						title: "success",
					});
				},
			});
		},
		async incentiveIndex() {
			let res = await $request("incentiveIndex", {});
			console.log(res);
			if (res.data.code === 0) {
				this.inviteInfo = res.data.data;
				return;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		async invitation() {
			let res = await $request("invitation", {});
			console.log(res);
			if (res.data.code === 0) {
				this.invitationObj = res.data.data;
				return;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		goTeamInfo(index) {
			uni.navigateTo({
				url: `/pages/join/teamInfo?id=${index}`,
			});
		},
	},
};
</script>

<style lang="less">
@import "../../static/less/variable.less";

.popup-class {
	width: 100%;
	background-color: #1e5e60;
	box-sizing: border-box;
	padding: 43rpx 35rpx;

	.popup-class-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 60rpx;

		.title {
			color: #ffffff;
			font-size: 30rpx;
			font-weight: 600;
		}

		.icon {
			width: 54rpx;

			image {
				width: 100%;
			}
		}
	}

	.popup-class-form {
		.item {
			display: flex;
			flex-direction: column;
			margin-bottom: 40rpx;

			.item-label {
				color: #ffffff;
				font-size: 24rpx;
				line-height: 1;
				margin-bottom: 16rpx;
			}

			.item-input {
				width: 100%;
				background: #113c3d;
				border-radius: 10rpx;
				box-sizing: border-box;
				padding: 30rpx;

				.uni-input {
					color: #498576;
				}

				input {
					color: #498576;
				}

				textarea {
					color: #498576;
				}
			}
		}

		.form-btn {
			width: 100%;
			padding-top: 55rpx;
			padding-bottom: 170rpx;

			.form-sub {
				width: 589rpx;
				margin: 0rpx auto;
				height: 100rpx;

				background: #fcc94d;
				border-radius: 50rpx 50rpx 50rpx 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #30333a;
				font-size: 30rpx;
				font-weight: 600;
			}
		}
	}
}

.join-page {
	.join-scroll {
		padding-left: 0;
		padding-right: 0;
		
		background: linear-gradient(130deg, #241208 0%, #0e0702 39%, #1e1f28 100%);
		display: flex;
		flex-direction: column;
		overflow-x: hidden;

		.banner {
			position: relative;

			.text-box {
				color: #fff;
				text-align: center;
				font-weight: bold;
				white-space: nowrap;

				position: absolute;
				bottom: 132rpx;
				left: 50%;
				transform: translateX(-50%);

				.banner-desc {
					font-size: 36rpx;
					letter-spacing: 2px;
				}

				.banner-tit {
					margin-top: 26rpx;
					font-size: 48rpx;
					letter-spacing: 1px;
				}
			}

			.banner-img {
				width: 100%;
			}
		}

		.join-info {
			padding: 0 30rpx;
			margin-top: 38rpx;
			margin-bottom: 46rpx;
			width: 100%;
			overflow: hidden;

			.join-tit {
				color: #c0c3d2;
				margin-bottom: 26rpx;
				font-size: 24rpx;
			}

			.info-box {
				border-radius: 6rpx;
				padding: 20rpx 26rpx;
				background-color: #070302;
				.df(center, space-between);

				.icon-text {
					margin-right: 6rpx;
					.df(center, flex-start);
					flex-grow: 1;

					.icon {
						width: 50rpx;
						flex-shrink: 0;
					}

					.text {
						color: #c0c3d2;
						margin-left: 30rpx;
						flex-grow: 1;
						font-size: 24rpx;
						line-height: 1.75;
						word-break: break-all;

						.vertical(1);
					}
				}

				.copy-btn {
					.btn-box(@radius: 6rpx, linear-gradient( 180deg, #FE0C49 0%, #FD2B45 100%), @fontColor: #E1CFC2);

					padding: 20rpx 50rpx;
					flex-shrink: 0;
				}
			}
		}

		.census-box {
			margin: 16rpx 30rpx 4rpx;
			border-radius: 6rpx;
			padding: 36rpx 26rpx;
			background-color: #373843;

			.census-tit {
				margin-bottom: 32rpx;
				.df(center, flex-start);

				.icon {
					margin-right: 24rpx;
					width: 58rpx;
				}

				.tit {
					font-size: 24rpx;
					color: #f5f5f5;
					font-weight: bold;
					flex-grow: 1;
					line-height: 1.54;
				}
			}

			.chart-con {
				display: flex;
				flex-direction: row;
				align-items: stretch;
				justify-content: flex-start;

				.left {
					margin-right: 22rpx;
					width: calc(50% - 10rpx);

					.chart-box {
						margin-bottom: 32rpx;
						border-radius: 6rpx;
						padding: 15rpx 20rpx 24rpx 50rpx;
						background-color: #1e1f28;
						color: #c0c3d2;

						position: relative;
						overflow: hidden;

						.color-line {
							position: absolute;
							left: 0;
							top: 0;
							bottom: 0;
							width: 20rpx;
						}

						.count {
							margin-bottom: 20rpx;
							font-size: 32rpx;
							line-height: 1.4;
						}

						.text {
							font-size: 24rpx;
							line-height: 1.54;
						}

						&:last-child {
							margin-bottom: 0;
						}
					}
				}

				.right {
					border-radius: 6rpx;
					padding: 25rpx;
					width: calc(50% - 10rpx);
					background-color: #1e1f28;
					color: #c0c3d2;

					.df(center, center, column);

					.pic {
						width: 138rpx;
					}

					.count {
						margin-top: 25rpx;
						margin-bottom: 12rpx;
						font-size: 32rpx;
						line-height: 1.4;
					}

					.text {
						font-size: 24rpx;
						line-height: 1.54;
					}
				}
			}
		}

		.team-info {
			margin:16rpx 30rpx 20rpx;
			border-radius: 6rpx;
			padding: 32rpx 26rpx;
			background-color: #373843;

			.info-box {
				margin-bottom: 48rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.info-tit {
					margin-bottom: 40rpx;
					padding-left: 38rpx;
					position: relative;
					color: #F5F5F5;

					.df(center, space-between);

					.line {
						border-radius: 50rpx;
						background-color: #FE2147;
						width: 10rpx;

						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
					}

					.tit {
						font-size: 24rpx;
						font-weight: bold;
						line-height: 1.54;
					}

					.more-text {
						font-size: 22rpx;
						line-height: 1.36;
					}
				}

				.box-num {
					border-radius: 6rpx;
					padding: 15rpx 60rpx 24rpx;
					background-color: #1E1F28;
					.df(stretch, flex-start);

					.count-info {
						color: #C0C3D2;
						
						&.san {
							width: 70%;
						}

						&.yi {
							width: 30%;
						}

						.count {
							margin-bottom: 20rpx;
							font-size: 32rpx;
							line-height: 1.4;
						}

						.text {
							font-size: 26rpx;
							line-height: 1.42;
						}
					}
				}
			}
		}
	}
}
</style>

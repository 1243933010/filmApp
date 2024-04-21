<template>
	<view class="profix-page-container join-page">
		<customHeader style="z-index: 0" :headerText="$t('app.name')" />
		<customHeader @listenLocale="listenLocale" :headerText="$t('app.name')"
			style="position: fixed; top: 0; width: 100%; z-index: 1;background: rgba(13,13,13,1);" />
		<view class="banner1">
			<view style="position: absolute;
			top: 150rpx;left: 0rpx; 
			display: flex;justify-content: center;align-items: center;
			 font-size: 70rpx;color: white;width: 100%;">
				<text style="text-align: center;">Invite a friend to claim a gift</text>
			</view>
			<view class="qucord">
				<!-- <view class="img">
					<image src="../../static/img/logo1.jpg" mode="widthFix"></image>
				</view> -->
				<view class="qucord-text">
					<view class="code">
						<view class="title">
							<text>{{ $t("join.yq1") }}：</text>
						</view>
						<view class="span">
							<text>{{invitationObj.invitation_code}} </text>
						</view>
						<view class="copy" @click="copy(invitationObj.invitation_code)">
							<image src="../../static/img/copy_icon.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="url">
						<view class="span"><text>{{invitationObj.invitation_url}}</text> </view>
						<view class="copy">
							<image @click="copy(invitationObj.invitation_url)" src="../../static/img/copy_icon.png"
								mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="invite">
				<view class="invite-top">
					<view class="invite-top-icon">
						<image src="../../static/img/join_icon1.png" mode="widthFix"></image>
					</view>
					<view class="invite-top-text">
						<view class="invite-top-text-title">
							<text>{{ $t("join.yq2") }}</text>
						</view>
						<!-- <view class="invite-top-text-span">
							<rich-text :nodes="inviteInfo.activities_desc"></rich-text>
						</view> -->
					</view>
				</view>
				<view class="invite-box">
					<view class="invite-box-top">
						<view class="icon">
							<image src="../../static/img/vip_icon.png" mode="widthFix"></image>
						</view>
						<view class="title">
							<text>{{ $t("join.yq4") }}</text>
						</view>
						<view class="label">
							<!-- <text>（购买VIP后升级下方奖）</text> -->
						</view>
					</view>


					<view class="invite-box-len">
						<view class="invite-box-len-items" v-if="inviteInfo.vip_user.length>0">
							<scroll-view class="scroll-view_H" style="white-space: nowrap;" scroll-x="true"
								@scroll="scroll" scroll-left="120">
								<view class="item" style="display: inline-block;"
									v-for="(item,index) in inviteInfo.vip_user" :key="index">
									<text
										style="padding-left: 5rpx;">{{item.invitations_number}}</text><text>{{ $t("join.yq19") }}</text>
									<!-- <view class="arrow">
										<image src="../../static/img/arrow.png" mode="widthFix"></image>
									</view> -->

									<view class="hb-icon">
										<view class="icon">
											<view v-if="inviteInfo.vip_is_lock==1"
												:style="{backgroundImage: 'url('+imgUrl + item.goods_img+') ' ,backgroundSize:'cover'}"
												class="hb-img">
												<view
													style="background-color: rgba(145, 145, 145, 0.5);">
													<image src="../../static/img/unuse.png" mode="widthFix"
														style="margin: 20rpx;width: 50rpx;"></image>
												</view>

											</view>
											<view v-if="inviteInfo.vip_is_lock==0 && item.is_draw==1"
												:style="{backgroundImage: 'url('+imgUrl + item.goods_img+') ' ,backgroundSize:'cover'}"
												class="hb-img">
												<view
													style="background-color: rgba(145, 145, 145, 0.5);">
													<image src="../../static/img/used.png" mode="widthFix"
														style="margin: 20rpx;width: 50rpx;"></image>
												</view>
											</view>
											<view v-if="inviteInfo.vip_is_lock==0&&item.is_standard==0"
												:style="{backgroundImage: 'url('+imgUrl + item.goods_img+') ' ,backgroundSize:'cover'}"
												class="hb-img">
												<view style="background-color:rgba(145, 145, 145, 0.5);">
													<image src="../../static/img/unuse.png" mode="widthFix"
														style="margin: 20rpx;width: 50rpx;"></image>
												</view>
											</view>
											<view v-if="inviteInfo.vip_is_lock==0&&item.is_standard==1&&item.is_draw==0"
												:style="{backgroundImage: 'url('+imgUrl + item.goods_img+') ' ,backgroundSize:'cover'}"
												class="hb-img">
											</view>
										</view>
									</view>
									<view class="open-icon" @click="openDialog(item)"
										v-if="inviteInfo.vip_is_lock==0&&item.is_draw==0&&item.is_standard==1">
										<!-- v-if="inviteInfo.vip_is_lock==0&&item.is_draw==0&&item.is_standard==1" -->
										<image src="../../static/img/check_index.png" mode="widthFix"></image>
									</view>
								</view>
							</scroll-view>
						</view>
						<view class="step"></view>
					</view>
					<!-- <view class="icon-items">
						<scroll-view class="scroll-view_H" style="white-space: nowrap;" scroll-x="true"
							@scroll="scroll" scroll-left="120">
						<view class="item" style="display: inline-block;" v-for="(item,index) in inviteList" :key="index">
							<image src="../../static/img/box_false_icon.png" mode="widthFix"></image>
						</view>
						</scroll-view>
					</view> -->

				</view>
			</view>
			<view class="see" @click="goUrl">
				<text>{{ $t("join.yq5") }}</text>
			</view>
			<view class="zhu">
				<!-- <text>{{ $t("join.yq6") }}：</text> -->
				<!-- <text>{{ $t("join.yq7") }}</text> -->
				<rich-text :nodes="inviteInfo.activities_desc"></rich-text>
			</view>
		</view>
		<view class="join-scroll  has-tabbar">
			<!-- 	<view class="banner">
				<view class="banner-tit">{{ $t("join.bannerTit") }}</view>
				<view class="banner-tit">{{ $t("join.bannerTit1") }}</view>
				<view class="banner-img pic">
					<image src="../../static/img/banner/renwu.png" mode="widthFix" class="img"></image>
				</view>
			</view> -->

			<!-- 	<view class="join-info">
				<view class="join-tit">{{ $t("join.joinTit1") }}</view>
				<view class="info-box">
					<view class="icon-text">
						<view class="icon pic">
							<image src="../../static/img/icon/code.png" mode="widthFix" class="img"></image>
						</view>
						<view class="text">{{invitationObj.invitation_code}} ({{ $t("loacal.chinaText") }})</view>
					</view>
					<view class="copy-btn" @click="copy(invitationObj.invitation_code)">{{ $t("join.copy") }}</view>
				</view>
			</view>

			<view class="join-info">
				<view class="join-tit">{{ $t("join.joinTit2") }}</view>
				<view class="info-box">
					<view class="icon-text">
						<view class="icon pic">
							<image src="../../static/img/icon/code.png" mode="widthFix" class="img"></image>
						</view>
						<view class="text">{{invitationObj.invitation_url}}</view>
					</view>
					<view class="copy-btn" @click="copy(invitationObj.invitation_url)">{{ $t("join.copy") }}</view>
				</view>
			</view> -->

			<view class="census-box">
				<view class="census-tit">
					<view class="icon pic">
						<image src="../../static/img/icon/wallet.png" mode="widthFix" class="img"></image>
					</view>
					<view class="tit">{{ $t("join.boxTit") }}</view>
				</view>
				<view class="chart-con">
					<view class="left">
						<view class="chart-box">
							<view class="color-line" style="background-color: #ffba1f"></view>
							<view class="count">{{invitationObj?.commission?.invite_rewards||0}}</view>
							<view class="text">{{ $t("join.text1") }}</view>
						</view>
						<view class="chart-box">
							<view class="color-line" style="background-color: #fd7e1f"></view>
							<view class="count">{{invitationObj?.commission?.queue||0}}</view>
							<view class="text">{{ $t("join.text3") }}</view>
						</view>
					</view>
					<view class="right">
						<view class="pic">
							<image src="../../static/img/pig.png" mode="widthFix" class="img"></image>
						</view>
						<view class="count">{{invitationObj?.commission?.total_commission||0}}</view>
						<view class="text">{{ $t("join.text2") }}</view>
					</view>
				</view>
			</view>

			<view class="census-box">
				<view class="census-tit">
					<view class="icon pic">
						<image src="../../static/img/icon/wallet.png" mode="widthFix" class="img"></image>
					</view>
					<view class="tit">{{ $t("join.boxTit") }}</view>
				</view>
				<view class="chart-con">
					<view class="left">
						<view class="chart-box">
							<view class="color-line" style="background-color: #6e1fff"></view>
							<view class="count">{{invitationObj?.number_of_people?.total_num||0}}</view>
							<view class="text">{{ $t("join.text4") }}</view>
						</view>
						<view class="chart-box">
							<view class="color-line" style="background-color: #1f5efd"></view>
							<view class="count">{{invitationObj?.number_of_people?.vip_num||0}}</view>
							<view class="text">{{ $t("join.text5") }}</view>
						</view>
					</view>
					<view class="right">
						<!-- 						<view class="chart-box">
							<view class="color-line" style="background-color: #6e1fff"></view>
							<view class="count">0</view>
							<view class="text">{{ $t("join.text6") }}</view>
						</view>
						<view class="chart-box">
							<view class="color-line" style="background-color: #1f5efd"></view>
							<view class="count">0</view>
							<view class="text">{{ $t("join.text7") }}</view>
						</view> -->
						<!-- 						<view class="pic">
							<image src="../../static/img/person.png" mode="widthFix" class="img"></image>
						</view> -->
						<view class="count">{{invitationObj?.number_of_people?.today_num||0}}</view>
						<view class="text">{{ $t("join.text6") }}</view>
						<view class="count">{{invitationObj?.number_of_people?.today_vip_num||0}}</view>
						<view class="text">{{ $t("join.text7") }}</view>
					</view>
				</view>
			</view>

			<view class="team-info">
				<view class="info-box">
					<view class="info-tit" @click="goTeamInfo(1)">
						<view class="line"></view>
						<view class="tit">{{ $t("join.teamTit1") }}</view>
						<view class="arrow-icon"></view>
					</view>
					<view class="box-num">
						<view class="count-info san">
							<view class="count">{{invitationObj.first.total_count}}</view>
							<view class="text">{{ $t("join.partners") }}</view>
						</view>
						<view class="count-info yi">
							<view class="count">{{invitationObj.first.total_commission}}</view>
							<view class="text">{{ $t("join.committee") }}</view>
						</view>
					</view>
				</view>
				<view class="info-box">
					<view class="info-tit" @click="goTeamInfo(2)">
						<view class="line"></view>
						<view class="tit">{{ $t("join.teamTit2") }}</view>
						<view class="arrow-icon"></view>
					</view>
					<view class="box-num">
						<view class="count-info san">
							<view class="count">{{invitationObj.two.total_count}}</view>
							<view class="text">{{ $t("join.partners") }}</view>
						</view>
						<view class="count-info yi">
							<view class="count">{{invitationObj.two.total_commission}}</view>
							<view class="text">{{ $t("join.committee") }}</view>
						</view>
					</view>
				</view>
				<view class="info-box">
					<view class="info-tit" @click="goTeamInfo(3)">
						<view class="line"></view>
						<view class="tit">{{ $t("join.teamTit3") }}</view>
						<view class="arrow-icon"></view>
					</view>
					<view class="box-num">
						<view class="count-info san">
							<view class="count">{{invitationObj.three.total_count}}</view>
							<view class="text">{{ $t("join.partners") }}</view>
						</view>
						<view class="count-info yi">
							<view class="count">{{invitationObj.three.total_commission}}</view>
							<view class="text">{{ $t("join.committee") }}</view>
						</view>
					</view>
				</view>
				<view class="info-box">
					<view class="info-tit" @click="goTeamInfo(4)">
						<view class="line"></view>
						<view class="tit">{{ $t("join.teamTit4") }}</view>
						<view class="arrow-icon"></view>
					</view>
					<view class="box-num">
						<view class="count-info san">
							<view class="count">{{invitationObj.four.total_people}}</view>
							<view class="text">{{ $t("join.peopleD") }}</view>
						</view>
						<view class="count-info yi">
							<view class="count">{{invitationObj.four.vip_number}}</view>
							<view class="text">{{ $t("join.committeeVIP") }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-class">
				<view class="popup-class-top">
					<view class=""></view>
					<view class="title"><text>{{ $t("join.yq8") }}</text> </view>
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
							<textarea v-model="formData.address" :placeholder="`${$t('join.yq10')}...`" name="" id=""
								cols="30" rows="10"></textarea>
						</view>
					</view>
					<view class="item">
						<view class="item-label">
							<text>{{ $t("join.yq24") }}：</text>
						</view>
						<view class="item-input">

							<picker @change="bindPickerChange" :value="index" :range="counteList">
								<view class="uni-input">{{counteList[index]}}</view>
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
	import {
		$request,
		url
	} from '@/utils/request.js'
	export default {
		components: {
			customHeader,
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

<style lang="less">
	@import "../../static/less/variable.less";
	page{
		overflow: auto;
	}
	.scroll-view-item_H {
		// display: inline-block;
		// width: 100%;
		// height: 150rpx;
		// line-height: 300rpx;
		// text-align: center;
		// font-size: 36rpx;
	}

	.scroll-view_H {
		height: 260rpx;
	}

	.popup-class {
		width: 100%;
		// height: 1100rpx;
		background-color: #1E5E60;
		box-sizing: border-box;
		padding: 43rpx 35rpx;

		.popup-class-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 60rpx;

			.title {
				color: #FFFFFF;
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
					color: #FFFFFF;
					font-size: 24rpx;
					line-height: 1;
					margin-bottom: 16rpx;
				}

				.item-input {
					width: 100%;
					background: #113C3D;
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

					background: #FCC94D;
					border-radius: 50rpx 50rpx 50rpx 50rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #30333A;
					font-size: 30rpx;
					font-weight: 600;
				}
			}
		}

	}

	.banner1 {
		width: 100%;
		background-image: url(../../static/img/join_banner.png);
		background-size: cover;
		background-repeat: no-repeat;
		position: relative;
		padding-top: 480rpx;

		.qucord {
			box-sizing: border-box;
			width: calc(100% - 40rpx);
			margin: 5rpx auto;
			// padding: 0 20rpx;
			background-color: rgba(0, 0, 0, 0.3);
			/* 这里的0.5表示50%的不透明度 */
			/* 设置内部div的大小和位置 */
			// width: 100%;
			height: 100%;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			padding: 46rpx 24rpx;
			display: flex;
			flex-direction: row;

			.img {
				width: 176rpx;
				margin-right: 24rpx;

				image {
					width: 100%;
				}
			}

			.qucord-text {
				display: flex;
				flex-grow: 1;
				flex-direction: column;

				.code {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-bottom: 38rpx;

					.title {
						font-size: 25rpx;
						color: #FFFFFF;
					}

					.span {
						color: #62E8C7;
						font-size: 30rpx;
						font-weight: 600;
						margin-right: 26rpx;
					}

					.copy {
						width: 28rpx;
						padding-top: 3rpx;

						image {
							width: 100%;
						}
					}
				}

				.url {
					width: 50%;
					background: rgba(16, 162, 169, 0.3);
					display: flex;
					justify-content: space-between;
					align-items: center;
					border: 1px solid white;
					border-radius: 20rpx;
					box-sizing: border-box;
					padding: 20rpx 15rpx 17rpx 15rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;

					.span {
						width: 100%;
						color: #FFFFFF;
						font-size: 24rp;
						overflow: hidden;
						line-height: 1;
						text-overflow: ellipsis;
						white-space: nowrap;

						text {
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
					}

					.copy {
						width: 28rpx;
						padding-top: 3rpx;

						image {
							width: 100%;
						}
					}
				}
			}

			// position: absolute;
			// top: 0;
			// left: 0;
		}

		.invite {
			// width: 100%;
			width: calc(100% - 40rpx);
			margin: 0 auto;
			box-sizing: border-box;
			background-color: rgba(0, 0, 0, 0.3);
			border-bottom-left-radius: 20rpx;
			border-bottom-right-radius: 20rpx;

			// padding-bottom: 30rpx;
			// padding: 46rpx 24rpx;
			.invite-top {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 27rpx;

				.invite-top-icon {
					width: 123rpx;

					image {
						width: 90%;
					}
				}

				.invite-top-text {
					display: flex;
					flex-direction: column;
					width: calc(100% - 123rpx);

					.invite-top-text-title {
						color: #FFFFFF;
						font-size: 36rpx;
						font-weight: 600;
						line-height: 1;
						margin-bottom: 12rpx;
					}

					.invite-top-text-span {
						color: #FFFFFF;
						font-size: 24rpx;
					}
				}
			}

			.invite-box {
				width: calc(100% - 50rpx);
				margin: 0 auto;

				// background-color: red;
				.invite-box-top {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-bottom: 41rpx;

					.icon {
						width: 40rpx;
						margin-right: 8rpx;

						image {
							width: 100%;
						}
					}

					.title {
						color: #FFEC00;
						font-size: 30rpx;
						font-weight: 600;
						margin-right: 18rpx;
						line-height: 1;
					}

					.label {
						color: #FFFFFF;
						font-size: 24rpx;
						line-height: 1;
					}
				}

				.invite-box-len {
					width: 100%;
					margin-bottom: 44rpx;
					position: relative;
					padding-bottom: 60rpx;
					text-align: center;

					.invite-box-len-items {
						width: 95%;
						margin: 0 auto;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.item {
							width: 130rpx;
							height: 100%;
							color: #FFFFFF;
							font-size: 22rpx;
							position: relative;
							box-sizing: border-box;

							// padding-bottom: 80rpx;
							.arrow {
								position: absolute;
								bottom: 150rpx;
								left: 35rpx;
								width: 20rpx;

								image {
									width: 100%;
								}
							}

							.hb-icon {
								width: 59rpx;
								height: 93rpx;
								position: absolute;
								bottom: 40rpx;
								left: 20rpx;

								// z-index: 10;
								.icon {
									.hb-img {
										width: 90rpx;
										height: 90rpx;
										border-radius: 5rpx;
									}

									// padding-left: -10rpx;
									image {
										width: 80rpx;
										height: 80rpx;
									}
								}
							}

							.open-icon {
								width: 61rpx;
								height: 30rpx;
								position: absolute;
								bottom: 10rpx;
								left: 35rpx;

								// z-index: 10;
								image {
									width: 100%;
								}
							}
						}

					}

					.step {
						width: 100%;
						height: 30rpx;
						background: linear-gradient(90deg, #FFC551 0%, #E1F61F 100%);
						border-radius: 10rpx 10rpx 10rpx 10rpx;
						position: absolute;
						top: 45rpx;
					}
				}

				.icon-items {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 80rpx;
					margin-bottom: 76rpx;

					.item {
						width: 59rpx;
						height: 93rpx;

						image {
							width: 100%;
						}
					}
				}

			}
		}

		.see {
			margin: 0 auto;
			width: 589rpx;
			height: 100rpx;
			background: #1E5E60;
			border-radius: 50rpx 50rpx 50rpx 50rpx;
			border: 2rpx solid #D4CF91;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #D4CF91;
			font-size: 30rpx;
			font-weight: 600;
		}

		.zhu {
			width: calc(100% - 40rpx);
			margin: 0 auto;
			padding-top: 70rpx;
			display: flex;
			flex-direction: column;
			color:white;
			font-size: 24rpx;
			line-height: 1;

			text {
				margin-bottom: 5rpx;
			}
		}
	}

	.join-page {
		.join-scroll {
			// background-color: #FD7C1F;
			// background-color: #0c96b7;
			// background: linear-gradient(180deg, #2BE5A6 0%, #1D545B 100%);
			background-color: rgba(13,13,13,1);
			display: flex;
			flex-direction: column;
			// overflow: hidden;

			.banner {
				padding-top: 54rpx;

				.banner-tit {
					color: #fff;
					font-size: 36rpx;
					margin-bottom: 10rpx;
					text-align: center;
				}

				.banner-img {
					margin: -20rpx auto 12rpx;
					width: 52vw;
				}
			}

			.join-info {
				margin-top: 46rpx;
				margin-bottom: 20rpx;

				.join-tit {
					color: #fff;
					margin-bottom: 26rpx;
					font-size: @bodySize;
				}

				.info-box {
					border-radius: 10rpx;
					box-sizing: border-box;
					padding: 32rpx 0rpx 32rpx 22rpx;
					height: 90rpx;
					// background-color: #ffe5d5;
					// background-color: #D5FEFF;
					background-color: rgba(13,13,13,1);
					.df(center, space-between);
					font-size: 28rpx;

					.icon-text {
						.df(center, flex-start);
						width: calc(100% - 190rpx);

						.icon {
							width: 45rpx;
						}

						.text {
							color: white;
							margin-left: 30rpx;
							width: calc(100% - 75rpx);
							.vertical(1);
						}
					}

					.copy-btn {
						height: 90rpx;
						border-radius: 10rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 14rpx 50rpx;
						color: #fff;
						// background: linear-gradient(0deg, #fd7e1f 0%, #fd631f 100%);
						// background: linear-gradient(0deg, #0694B8 0%, #6BBDB4 100%);
						background-color: rgba(13,13,13,1);
					}
				}
			}

			.census-box {
				margin-top: 40rpx;
				margin-bottom: 20rpx;
				border-radius: 10rpx;
				padding: 30rpx 25rpx;
				// background-color: #fff;
				background-color: rgba(13,13,13,1);

				.census-tit {
					margin-bottom: 40rpx;
					.df(center, flex-start);

					.icon {
						margin-right: 16rpx;
						width: 48rpx;
					}

					.tit {
						font-size: 28rpx;
						// color: #383838;
						color: #FFFFFF;
						font-weight: bold;
					}
				}

				.chart-con {
					display: flex;
					flex-direction: row;
					align-items: stretch;
					justify-content: flex-start;

					.left {
						margin-right: 22rpx;
						width: calc(50% - 11rpx);

						.chart-box {
							margin-bottom: 40rpx;
							border-radius: 10rpx;
							padding: 20rpx 20rpx 20rpx 50rpx;
							// background-color: #f4f6f8;
							background-color: rgba(13,13,13,1);

							position: relative;
							overflow: hidden;
							color: #383838;

							.color-line {
								position: absolute;
								left: 0;
								top: 0;
								bottom: 0;
								width: 20rpx;
							}

							.count {
								color: white;
								margin-bottom: 24rpx;
								font-size: 36rpx;
							}

							.text {
								color: white;
								font-size: 24rpx;
							}

							&:last-child {
								margin-bottom: 0;
							}
						}
					}

					.right {
						border-radius: 10rpx;
						padding: 25rpx;
						width: calc(50% - 11rpx);
						// background-color: #f4f6f8;
						background-color: rgba(13,13,13,1);
						.df(center, center);
						flex-direction: column;
						color: #383838;

						.pic {
							width: 134rpx;
						}

						.count {
							margin-top: 25rpx;
							margin-bottom: 24rpx;
							font-size: 36rpx;
							color: white;
						}

						.text {
							color: white;
							font-size: 24rpx;
						}
					}
				}
			}

			.team-info {
				margin-bottom: 20rpx;
				border-radius: 10rpx;
				padding: 36rpx 20rpx;
				// background-color: #fff;
				background-color: rgba(13,13,13,1);

				.info-box {
					margin-bottom: 40rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.info-tit {
						margin-bottom: 40rpx;
						padding-left: 34rpx;
						position: relative;

						.df(center, space-between);

						.line {
							border-radius: 4rpx;
							background-color: #fd661f;
							width: 8rpx;

							position: absolute;
							top: 0;
							bottom: 0;
							left: 4rpx;
						}

						.tit {
							// color: #383838;
							color: white;
							font-size: 28rpx;
							font-weight: bold;
						}

						.arrow-icon {
							width: 14rpx;
							height: 25rpx;
							background: url("../../static/img/right_arrow.png") no-repeat top left / 100% 100%;
						}
					}

					.box-num {
						border-radius: 10rpx;
						padding: 40rpx;
						// background-color: #f4f6f8;
						background-color: rgba(13,13,13,1);
						.df(stretch, flex-start);

						.count-info {
							&.san {
								width: 75%;
							}

							&.yi {
								width: 25%;
							}

							.count {
								margin-bottom: 22rpx;
								// color: #383838;
								color: white;
								font-size: 36rpx;
							}

							.text {
								// color: #383838;
								color: white;
								font-size: 24rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
<template>
	<view class="profix-page-container select-seat-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }"
				style="position: fixed; top: 0; left: 0; right: 0; z-index: 99">
				<template #right>
					<view class="pic" style="width: 50rpx; margin-right: 20rpx;" @click="openDialog">
						<img style="width: 45rpx;" src="@/static/image/icon/warning.png" class="img" mode="widthFix" />
					</view>
				</template>
			</hx-navbar>

			<view class="select-seat-scroll page-con">
				<view class="seat-img pic">
					<img :src="ticketsInfo.class_list.class_img" mode="widthFix" class="img" />
				</view>
				<view class="tab-list">
					<view class="tab-item" :class="{active: tabVal == 0}">
						<!-- <view class="pic">
							<img src="@/static/image/icon/filter2.png" mode="widthFix" class="img" />
						</view>
						
						筛选 -->
						<input :disabled="true" type="number" v-model="num" placeholder="输入票数" />
					</view>
					<view class="tab-item" @click="ticketCreate" :class="{active: tabVal == 1}">
						<!-- 	<view class="pic">
							<img src="@/static/image/icon/filter1.png" mode="widthFix" class="img" />
						</view> -->

						开始出票
					</view>
				</view>
				<view class="vote-list">
					<view class="tips">
						<view class="line"></view>
						<!-- TODO -->
						<text class="text">{{ticketsInfo.tickets_data.length}}张门票</text>
						<view class="line"></view>
					</view>
					<view class="vote-item" v-for="(item,index) in ticketsInfo.tickets_data" :key="index">
						<view class="line"></view>
						<view class="vote-info">
							<view class="cinema-name">{{item.shore}}s</view>
							<view class="vote-position">
								<!-- TODO -->
								<view class="row-num">第{{item.platoon}}排</view>
								<!-- TODO -->
								<view class="vote-num red-text">{{item.buy_num}}张票</view>
							</view>
							<!-- TODO -->
							<view class="pending red-text" v-if="item.ticket_status==0">正在出票...</view>
							<view class="pending red-text" v-if="item.ticket_status==1">已出票</view>
						</view>
						<view class="vote-price red-text">{{ item.fares }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request,
		url as requestUrl
	} from "@/utils/request";
	export default {
		name: "详情",
		components: {
			hxNavbar,
		},
		data() {
			return {
				paramsDetail: {},
				class_id: 1,
				headerBg: true,
				tabVal: 0,
				ticketsInfo: {
					class_list: {
						class_img: ""
					},
					tickets_data: []
				},
				num: 1
			};
		},
		onLoad: function(e) {
			// { class_id,goods_id }
			// console.log(e)
			this.paramsDetail = e;
			this.class_id = e.class_id;
			this.getTicketsList()
		},
		computed: {
			config() {
				return {
					// TODO
					title: "",
					color: "#ffffff",
					backgroundColor: "transparent",
					rightSlot: true,
					
				};
			},
		},
		methods: {
			async getTicketsList() {
				let res = await $request("ticketsList", {
					class_id: this.class_id
				});
				console.log(res);
				if (res.data.code == 0) {
					this.ticketsInfo = res.data.data;
				}
			},
			openDialog() {
				uni.navigateTo({
					url: `/pages/index/map?class_id=${this.class_id}`,
				});
			},
			scrollHandle(event) {
				// const { scrollTop } = event.detail;
				// if (scrollTop >= 50) {
				// 	this.headerBg = true;
				// } else {
				// 	this.headerBg = false;
				// }
			},
			async getDetail(id) {
				let res = await $request("nftDeail", {
					nft_id: id
				});
				// console.log(res);
				if (res.data.code === 0) {
					this.info = res.data.data;
					this.getTicketsList();
					return;
				}
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			},
			async ticketCreate() {
				let res = await $request('ticketCreate', {
					goods_id: this.paramsDetail.goods_id,
					class_id: this.paramsDetail.class_id,
					buy_num: this.num,
				})
				if (res.data.code === 0) {
					uni.showToast({
						icon: "none",
						title: res.data.msg,
					});
					setTimeout(()=>{
						console.log('11')
						uni.navigateTo({
							url: `/pages/index/voteDetails?ticket_id=${res.data.data.ticket_id}&goods_id=${res.data.data.goods_id}&order_number=${res.data.data.order_number}`,
						});
					},1000)
					return;
				}
				uni.showToast({
					icon: "none",
					title: res.data.msg,
				});
			}
		},
	};
</script>

<style lang="less" scoped>
	@import "../../static/less/variable.less";

	.select-seat-page {
		.page-scroll {
			background: #1e1f28;
		}

		.select-seat-scroll {
			padding: 0;

			.red-text {
				color: #EF414A !important;
			}

			.seat-img {
				width: 100%;
				min-height: 200rpx;
				background-color: #fff;
			}

			.tab-list {
				.df();

				.tab-item {
					flex-grow: 1;
					.df(center, center);

					padding-top: 30rpx;
					padding-bottom: 24rpx;
					color: #EF414A;
					background-color: #2F303B;

					&.active {
						color: #C0C3D2;
						background-color: #1C2025;
					}

					.pic {
						margin-right: 8rpx;
						width: 36rpx;
					}
				}
			}

			.vote-list {
				padding-left: 30rpx;
				padding-right: 30rpx;

				.tips {
					.df(center, center);

					margin-top: 68rpx;
					color: #C0C3D2;

					.text {
						margin-left: 40rpx;
						margin-right: 40rpx;
						display: block;
					}

					.line {
						background-color: #2F303B;
						height: 1px;
						width: 220rpx;
					}
				}

				.vote-item {
					margin-top: 32rpx;
					border-radius: 20rpx;
					padding: 24rpx 50rpx 36rpx 60rpx;
					background-color: #2F303B;
					position: relative;
					overflow: hidden;
					font-size: 30rpx;
					line-height: 1.4;
					font-weight: 800;

					.df(center, space-between);

					.line {
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						width: 26rpx;
						background-color: #EE4749;
					}

					.vote-info {

						.cinema-name {
							color: #FFFFFF;
						}

						.vote-position {
							margin-top: 20rpx;
							.df(center);

							.row-num {
								color: #C0C3D2;
							}

							.vote-num {
								margin-left: 36rpx;
							}
						}

						.pending {
							margin-top: 20rpx;
						}
					}

					.vote-price {
						font-size: 50rpx;
					}
				}
			}
		}
	}
</style>
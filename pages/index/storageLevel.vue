<template>
	<view class="profix-page-container storage-level-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{'has-bg': headerBg}" style="position: fixed; top: 0; left: 0;
			right: 0; z-index: 99;" />
			
			<view class="storage-level-scroll page-con">
				<view class="storage-list">
					<view class="storage-item LV0 black" v-for="(item,index) in level_list" :key="item.id" @click.stop="goPage(item)">
						<view class="pic bg">
							<image :src="lvImgList[index]" mode="widthFix" class="img"></image>
						</view>
						<view class="level-info">
							<view class="info-row">
								<view class="row-item">
									<!-- TODO -->
									<text>{{ item.price }}美元</text>
									<text>特许经营保证金</text>
								</view>
								<view class="row-item">
									<!-- TODO -->
									<text>{{ item.queue_num }}</text>
									<text>每日购买限额</text>
								</view>
								<view class="row-item">
									<!-- TODO -->
									<text>{{ item.monthly_income }}美元</text>
									<text>月收入</text>
								</view>
							</view>
							<view class="level-income">
								<view class="level">{{ item.title }}</view>
								<view class="income">
									<!-- TODO -->
									<text>{{ item.price }}美元</text>
									<text>每日收入{{item.daily_income}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "../../utils/request";

export default {
	name: "会员级别",
	components: {
		hxNavbar,
	},
	data() {
		return {
			lvImgList:['../../static/img/storageLevel/-h-1.png','../../static/img/storageLevel/-h-2.png','../../static/img/storageLevel/-h-3.png','../../static/img/storageLevel/-h-4.png','../../static/img/storageLevel/-h-5.png','../../static/img/storageLevel/-h-6.png','../../static/img/storageLevel/-h-7.png','../../static/img/storageLevel/-h-8.png','../../static/img/storageLevel/-h-9.png','../../static/img/storageLevel/-h-10.png','../../static/img/storageLevel/-h-11.png',],
			level_list: [],
			user_info: {},
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				// TODO
				title: "会员等级",
				color: "#ffffff",
				backgroundColor: "transparent"
			};
		},
	},
	async mounted() {
		this.getVip();
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
		async getVip(){
			const res = await $request("vipList");
			const { data, code, msg } = res.data;
			const { level_list, user_info } = data;
			this.level_list = level_list;
			this.user_info = user_info;
		},
		async goPage(item) {
			console.log(this.user_info)
			if(+this.user_info.balance<(+item.price)){
				uni.showModal({
					title:this.$t('api.message'),
					content:this.$t('app.popup1'),
					confirmText:this.$t('app.sure'),
					cancelText:this.$t('app.cancel'),
					success: (res) => {
						if(res.confirm){
							uni.navigateTo({
								url:'/pages/index/recargar'
							})
						}
					}
					
				})
			}else{
				// uni.switchTab({
				// 	url: "/pages/classification/classification"
				// })
				uni.showModal({
					title:this.$t('api.message'),
					content:this.$t('app.popup2'),
					confirmText:this.$t('app.sure'),
					cancelText:this.$t('app.cancel'),
					success: async(res) => {
						if(res.confirm){
							let resp = await $request('levelBuy',{vip_id:item.id});
							uni.showToast({
								icon:'none',
								title:resp.data.msg
							})
						}
					}
					
				})
				
			}
		},
		async refund(){
			uni.navigateTo({
				url:'./refund'
			})
			// uni.showModal({
			// 	title:this.$t('api.message'),
			// 	content:this.$t('app.popup9'),
			// 	confirmText:this.$t('app.sure'),
			// 	cancelText:this.$t('app.cancel'),
			// 	success: async(res) => {
			// 		if(res.confirm){
			// 			let resp = await $request('returnedCash',{});
			// 			uni.showToast({
			// 				icon:'none',
			// 				title:resp.data.msg
			// 			})
			// 			if(resp.data.code==0){
			// 				this.getVip();
			// 			}
			// 		}
			// 	}
				
			// })
		}
	}
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.storage-level-page {
	.page-scroll {
		background: #1E1F28;
	}
	
	.storage-level-scroll {
		padding-top: 120rpx;

		.storage-list {
			.df(stretch, flex-start, column);

			.storage-item {
				margin-bottom: 24rpx;
				border-radius: 20rpx;
				position: relative;
				
				&.black {
					.level-info {
						color: #1E1F28;
					}
				}

				.bg {
					width: 100%;
				}
				
				.level-info {
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					top: 0;

					padding: 50rpx;
					color: #FFFFFF;

					.df(stretch, space-between, column-reverse);

					.level-income {
						font-weight: bold;

						.level {
							margin-bottom: 8rpx;
							font-size: 48rpx;
							line-height: 1.4;
						}

						.income {
							.df(center, flex-start);

							text {
								margin-left: 36rpx;
								font-size: 24rpx;
								line-height: 1.37;

								&:first-child {
									margin-left: 0;
								}
							}
						}
					}

					.info-row {
						.df(center, space-between);

						.row-item {
							text-align: center;
							font-size: 24rpx;
							width: calc(33.33% - 8rpx);

							text {
								margin-bottom: 10rpx;
								display: block;
								line-height: 1.37;

								&:last-child {
									margin-bottom: 0;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>

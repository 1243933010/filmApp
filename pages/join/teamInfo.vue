<template>
	<view class="profix-page-container team-info-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="team-info-scroll page-con">
				<view class="table">
					<view class="th tr">
						<view class="td mW28">{{ $t("teamInfo.tableTh1") }}</view>
						<view class="td flex1">{{ $t("teamInfo.tableTh2") }}</view>
						<view class="td mW35">{{ $t("teamInfo.tableTh3") }}</view>
					</view>
					<view class="tr" v-for="(item, index) in list" :key="index">
						<view class="td mW28">{{ item.mobile }}</view>
						<view class="td flex1">{{ item.vip_level_txt }}</view>
						<view class="td mW35">{{ item.created_at }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "@/utils/request.js";
export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			headerBg: false,
			pageing: {
				page: 1,
				page_size: 20,
			},
			list: [],
			id: "",
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("teamInfo.pageTit"),
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	onLoad(e) {
		console.log(e);
		this.myTeam(+e.id);
		this.id = e.id;
	},
	onReachBottom(e) {
		this.pageing.page++;
		this.myTeam(this.id);
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
		async myTeam(num) {
			let res = await $request("myTeam", { level: num, ...this.pageing });
			console.log(res);
			if (res.data.code === 0) {
				this.list.push(...res.data.data.list);
				return;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
		goProductDetail(productId) {
			uni.navigateTo({
				url: `/pages/classification/detail?id=${productId}`,
			});
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.team-info-page {
	.team-info-scroll {
		padding: 120rpx 0 0;

		.table {
			color: #fff;
			font-size: 24rpx;
			
			.tr {
				background-color: rgba(255, 255, 255, .1);
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				justify-content: space-between;

				&.th {
					border-bottom: 1px solid rgba(255, 255, 255, .1);
					background-color: rgba(255, 255, 255, .1);
				}

				.td {
					padding: 38rpx 18rpx;
					text-align: center;
					
					view {
						width: 33%;
					}
					&.mW28 {
						min-width: 29%;
					}

					&.mW35 {
						min-width: 44%;
					}

					&.flex1 {
						flex-grow: 1;
					}
				}

				&:nth-child(2n) {
					background-color: transparent;
				}
			}
		}
	}
}
</style>

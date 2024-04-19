<template>
	<view class="profix-page-container sell-vote-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99">
				<template #left>
					<!-- TODO -->
					<view>出售门票</view>
				</template>
			</hx-navbar>

			<view class="sell-vote-scroll page-con">
				<view class="film-info">
					<view class="film-img">
						<view class="pic">
							<img src="" mode="widthFix" class="img" />
						</view>

						<view class="round"></view>
					</view>
					<!-- TODO -->
					<view class="film-name">Pacific Rim</view>
					<view class="film-time">Friday, January 26, 2024 at 1:08 a.m</view>
					<view class="film-desc">Jianye Times Cinema</view>
				</view>
				
				<view class="step-list">
					<view class="step-item" v-for="step in stepList" :key="step.id">
						<view class="step-num">{{ step.num }}</view>
						<view class="step-summary">{{ step.summary }}</view>
						<view class="step-desc">{{ step.desc }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request, url as requestUrl } from "@/utils/request";
export default {
	name: "我的 - 2",
	components: {
		hxNavbar,
	},
	data() {
		return {
			productId: 1,
			info: {},
			headerBg: false,
			// TODO
			stepList: [
				{
					id: 0,
					num: "第一步",
					summary: "Delivery",
					desc: "Tell us what kind of tickets you're selling, andhow and when you'l deliver them."
				},
				{
					id: 1,
					num: "第二步",
					summary: "Details",
					desc: "Give us more info abaut your tickets, liketicket quantity and seat location."
				},
				{
					id: 2,
					num: "第三步",
					summary: "Your info",
					desc: "Tell us what kind of tickets you're selling, andhow and when you'l deliver them."
				},
				{
					id: 3,
					num: "第四步",
					summary: "Delivery",
					desc: "Review your info and provide a few more"
				}
			]
		};
	},
	onLoad: function ({ id }) {
		this.productId = id;
		this.getDetail(id);
	},
	computed: {
		config() {
			return {
				// TODO
				title: "",
				color: "#ffffff",
				backgroundColor: "transparent",
				leftSlot: true,
			};
		},
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
		async getDetail(id) {
			let res = await $request("nftDeail", { nft_id: id });
			// console.log(res);
			if (res.data.code === 0) {
				this.info = res.data.data;
				return;
			}
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.sell-vote-page {
	.page-scroll {
		background-image: linear-gradient( 180deg, #1E1F28 0%, #2F303B 100%);
	}

	.sell-vote-scroll {
		padding: 120rpx 0 0;

		.film-info {
			border-bottom: 1px solid #2F303B;
			padding-bottom: 56rpx;
			.df(center, center, column);
			position: relative;
			text-align: center;

			.film-img {
				padding: 35rpx;
				border-radius: 50%;
				background-image: linear-gradient(180deg, #f5204c 0%, #ed4c49 100%);

				.pic {
					border-radius: 50%;
					width: 210rpx;
					height: 210rpx;
					background-color: #fff;

					position: relative;
					z-index: 1;
				}

				.round {
					position: absolute;
					top: 140rpx;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					background-color: #1e1f28;
					width: 100vw;
				}
			}

			.film-name {
				margin-bottom: 8rpx;
				font-size: 30rpx;
				font-weight: bold;
				color: #fff;
				line-height: 1.4;
				position: relative;
				z-index: 1;
			}
			
			.film-time {
				margin-bottom: 4px;
				position: relative;
				z-index: 1;
				color: #D32B56;
				font-size: 30rpx;
				line-height: 1.4;
			}
			
			.film-desc {
				position: relative;
				z-index: 1;
				color: #C0C3D2;
				font-size: 24rpx;
				line-height: 1.375;
			}
		}
		
		.step-list {
			padding: 1px 54rpx 100rpx;
			background-color: #1e1f28;
			
			.step-item {
				margin-top: 40rpx;
				
				.step-num {
					margin-bottom: 12rpx;
					color: #C0C3D2;
					font-size: 24rpx;
					line-height: 1.375;
				}
				
				.step-summary {
					margin-bottom: 24rpx;
					color: #EE474A;
					font-size: 24rpx;
					line-height: 1.375;
				}
				
				.step-desc {
					margin-bottom: 14rpx;
					color: #C0C3D2;
					font-size: 24rpx;
					line-height: 1.375;
				}
			}
		}
	}
}
</style>

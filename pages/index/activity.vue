<template>
	<view class="profix-page-container activity-page">
		<hx-navbar :config="config" />
		<view class="activity-scroll page-scroll">
			<view class="list">
				<view  class="item" v-for="(item,index) in list" :key="index" @click="goUrl(item)">
					<!-- <view class="item-tit">{{ $t("activity.item1")  }}</view> -->
					<view class="">{{item.title}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request } from "@/utils/request";
export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			list:[]
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("activity.pageTit"),
				color: "#ffffff",
				// backgroundColor: [1, "#24bdab"],
				// 背景图片（array则为滑动切换背景图，string为单一背景图）
				// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
				backgroundImg: "../../static/img/header_tabber.png",
			};
		},
	},
		mounted() {
			this.getActivity();
		},
		methods:{
			  async getActivity(){
				  let res = await $request('activity',{})
				  console.log(res)
				  if(res.data.code===0){
					  this.list = res.data.data;
				  }
			  },
			  goUrl(item){
				  uni.setStorageSync('activityInfo',item)
				  uni.navigateTo({
				  	url:`/pages/index/activityInfo`
				  })
			  }
		}
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
page {
	background-color: #f5f4f9;
}

.activity-page {
	.activity-scroll {
		.list {
			margin-left: -30rpx;
			margin-right: -30rpx;

			.item {
				background-color: #fff;
				margin-bottom: 1px;
				padding: 46rpx 52rpx;

				.df(center, space-between);

				.item-tit {
				}

				.arrow-icon {
					width: 14rpx;
					height: 25rpx;
					background: url("../../static/img/right_arrow.png") no-repeat top left / 100% 100%;
				}
			}
		}
	}
}
</style>

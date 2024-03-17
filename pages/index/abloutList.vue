<template>
	<view  class="profix-page-container qualifications-page">
		<hx-navbar :config="config" />
		
		<view class="qualifications-scroll page-scroll">
		  <view class="list">
		    <view @click="goUrl(item)" class="item" v-for="(item,index) in list" :key="index">
		      <view class="item-tit">{{ item.title }}</view>
		      <view class="arrow-icon"></view>
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
		computed: {
			config() {
			  return {
			    title: this.$t("aboutUs.pageTit"),
			    color: "#ffffff",
			    // backgroundColor: [1, "#24bdab"],
			    // 背景图片（array则为滑动切换背景图，string为单一背景图）
			    // backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
			    backgroundImg: "../../static/img/header_tabber.png",
			  };
			},
		},
		data() {
			return {
				list:[]
			};
		},
		mounted() {
			this.getCertifications();
		},
		methods:{
			  async getCertifications(){
				  let res = await $request('aboutList',{})
				  console.log(res)
				  if(res.data.code===0){
					  this.list = res.data.data;
				  }
			  },
			  goUrl(item){
				  uni.setStorageSync('about',item)
				  uni.navigateTo({
				  	url:`/pages/index/aboutUs`
				  })
			  }
		}
	}
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
page {
  background-color: #f5f4f9;
}

.qualifications-page {
  .qualifications-scroll {
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

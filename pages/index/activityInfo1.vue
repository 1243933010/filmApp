<template>
  <view class="profix-page-container activity-info-page">
    <hx-navbar :config="config" />
    <view class="activity-info-scroll page-scroll">
     <view class="pic">
        <image src="../../static/img/activity/1.png" mode="widthFix" class="img"></image>
      </view>
<!-- 	  <view class="about-us-text">
	  	<rich-text :nodes="info.content"></rich-text>
	  </view> -->
    </view>
  </view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";

export default {
  components: {
    hxNavbar,
  },
  data() {
    return {
		info:{
			content:''
		}
	}
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
  onLoad(e){
  		// this.getInfo(e.id)
  		this.getInfo()
  	},
  	methods:{
  		getInfo(id){
  			this.info = uni.getStorageSync('activityInfo');
  			// console.log(this.info)
  		}
  	}
  };

</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
page {
  background-color: #f5f4f9;
}

.activity-info-page {
	img{
		width: 100%;
	}
  .activity-info-scroll {
    .pic {
      margin-right: -30rpx;
      margin-left: -30rpx;
    }
  }
}
</style>

<template>
  <view class="profix-page-container index-page">
    <customHeader style="z-index: 0" :headerText="$t('app.name')" :above="false" />
    <customHeader :headerText="$t('app.name')" style="position: fixed; top: 0; z-index: 1" :above="true" />
    <view class="index-scroll page-scroll has-tabbar">
      <view class="banner">
        <swiper class="swiper" circular autoplay style="height: 400rpx;">
          <swiper-item v-for="(item, index) in swiperList" :key="index">
            <view class="swiper-item">
              <view class="pic">
                <image  @click="linkImg(item)" :src="item.image" class="img" mode="widthFix"></image>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>

      <view class="news-list">
        <view class="left-tit">{{ $t("index.news") }}</view>
        <view class="news-swiper">
          <swiper class="swiper" vertical circular autoplay>
            <swiper-item v-for="(item, index) in newsList" :key="index" @click="newLink(item)">
              <view class="swiper-item">{{ item.name }}</view>
            </swiper-item>
          </swiper>
        </view>
      </view>

      <view class="menu-container">
        <view class="menu-list" v-for="(item, index) in menuList" :key="index">
          <view @click="goPage(e.link)" class="menu-item" v-for="(e, i) in item" :key="i">
            <view class="pic">
              <image :src="e.iconUrl" mode="widthFix" class="img"></image>
            </view>
            <view class="menu-tit">{{e.tit}}</view>
          </view>
        </view>
      </view>

      <view class="paper-card-list">
        <view class="paper-card " @click="goPage(linkInfo.Join_community_url.val)">
          <!-- <image src="../../static/img/paperCard/join.png" mode="widthFix" class="img"></image> -->
		  
		  <view class="left">
		  	<view class="title">{{$t('app.img1')}}</view>
			<view class="label">{{$t('app.img2')}}</view>
		  </view>
		  <view class="right1">
		  	<image src="../../static/img/shequ.c92aac23.png" mode="widthFix"></image>
		  </view>
        </view>
        <view class="paper-card " @click="goPage(linkInfo.telegram_url.val)">
          <!-- <image src="../../static/img/paperCard/paper_air.png" mode="widthFix" class="img"></image> -->
          <view class="left">
          	<view class="title">{{$t('app.img3')}}</view>
          	<view class="label">{{$t('app.img4')}}</view>
          </view>
          <view class="right">
          	<image src="../../static/img/feiji.d3ae16e3.png" mode="widthFix"></image>
          </view>
		</view>
      </view>

      <view class="product-container">
        <view class="tit">{{ $t("index.moreProduct") }}</view>
        <view class="desc">{{ $t("index.moreProductDesc") }}</view>

        <view class="product-list">
          <view  class="product-item" v-for="(item,index) in nftList" :key="index" >
            <view class="product-img pic">
              <image :src="item.nft_img" mode="aspectFit" class="img" @click="goProductDetail(item)"></image>
            </view>
            <view class="product-info">
              <view class="product-tit">{{item.nft_name}}</view>
              <view class="product-price-info">
                <view class="rebate">$ {{item.money*1}}</view>
                <!-- <view class="brfore-rebate">$ 1980</view> -->
              </view>
            </view>
          </view>
          
        </view>
      </view>
    </view>
	<uni-popup ref="popup" type="center" background-color="#fff" >
	  <view class="popup-container">
	    <view class="popup-tit">{{newsList[0].name}}</view>
	    <view class="popup-content">
			<rich-text :nodes="newsList[0].content"></rich-text>
		</view>
	    <view class="popup-close-btn" @click="$refs.popup.close()">{{$t("app.sure")}}</view>
	  </view>
	</uni-popup>
  </view>
</template>

<script>
import customHeader from "@/components/customHeader/customHeader.vue";
import { $request } from "@/utils/request.js";
import { setTabbar } from "@/utils/utils.js";
export default {
  components: { customHeader },
  data() {
    return {
      title: "Hello",
      newsList: [],
      swiperList: [],
	  nftList:[],
	  linkInfo:{},
	  above:true
    };
  },
  onLoad() {},
  computed: {
    locales() {
      return [
        {
          text: this.$t("locale.auto"),
          code: "auto",
        },
        {
          text: this.$t("locale.en"),
          code: "en",
        },
        {
          text: this.$t("locale.zh-hans"),
          code: "zh-Hans",
        },
        {
          text: this.$t("locale.zh-hant"),
          code: "zh-Hant",
        },
        {
          text: this.$t("locale.ja"),
          code: "ja",
        },
      ];
    },
    menuList() {
      return [
        [
          {
            iconUrl: "../../static/img/icon/index/11.png",
            tit: this.$t("index.menuBtn1"),
            link: "/pages/index/abloutList",
          },
          {
            iconUrl: "../../static/img/icon/index/22.png",
            tit: this.$t("index.menuBtn2"),
            link: "/pages/index/qualifications",
          },
          {
            iconUrl: "../../static/img/icon/index/33.png",
            tit: this.$t("index.menuBtn3"),
            link: "/pages/index/activityInfo1",
          },
        ],
        [
          {
            iconUrl: "../../static/img/icon/index/44.png",
            tit: this.$t("index.menuBtn4"),
            link: "/pages/index/storageLevel",
          },
          {
            iconUrl: "../../static/img/icon/index/55.png",
            tit: this.$t("index.menuBtn5"),
            link: "/pages/index/recargar",
          },
          {
            iconUrl: "../../static/img/icon/index/66.png",
            tit: this.$t("index.menuBtn6"),
            link: "/pages/index/withdraw",
          },
        ],
        [
          {
            iconUrl: "../../static/img/icon/index/77.png",
            tit: this.$t("index.menuBtn7"),
            link: "/pages/index/invitePage",
          },
          {
            iconUrl: "../../static/img/icon/index/88.png",
            tit: this.$t("index.menuBtn8"),
            link: "/pages/index/activity",
          },
          {
            iconUrl: "../../static/img/icon/index/88.png",
            tit: this.$t("index.menuBtn9"),
            link: "/pages/join/join",
          },
        ],
      ];
    },
  },
  mounted() {
	// console.log(uni.getLocale())
	setTabbar(this.$t)
    this.adverts();
    this.getNotices();
	this.nftListFnc();
	this.linkObj();
  },
  methods: {
	  async linkObj(){
		  let res= await $request('linkObj',{});
		 console.log(res.data)
		  if(res.data.code==0){
			   console.log(this.menuList)
			  // this.menuList[2][0].link = res.data.data.app_download_url.val
			  this.linkInfo = res.data.data;
			   console.log(this.menuList)
		  }
	  },
	  async nftListFnc(){
	  	this.loading = true;
	  	let formData = {keywords:'',page:1,page_size:20,vip_grade:''}
	  	let res= await $request('nftList',formData);
	  	console.log(res)
	  	this.loading = false;
	  	if(res.data.code===0){
	  		this.nftList=res.data.data.data;
			console.log(this.nftList)
	  	}
	  },
    newLink(item) {
		
      uni.setStorageSync("notices", item);
      uni.navigateTo({
        url: "./notices",
      });
    },
    linkImg(item) {
		
      uni.navigateTo({
        url: item.url,
      });
    },
    async getNotices() {
      let res = await $request("notices", {});
      // console.log(res)
      if (res.data.code === 0) {
        this.newsList = res.data.data;
		console.log(this.newsList,'-------')
		if(this.newsList.length>0){
			this.$refs.popup.open("center");
		}
        return false;
      }
      uni.showToast({
        icon: "none",
        title: res.data.msg,
      });
    },
    async adverts() {
      let res = await $request("adverts", {});
      // console.log(res)
      if (res.data.code === 0) {
        this.swiperList = res.data.data;
        return false;
      }
      uni.showToast({
        icon: "none",
        title: res.data.msg,
      });
    },
    onLocaleChange(e) {
      if (this.isAndroid) {
        uni.showModal({
          content: this.$t("index.language-change-confirm"),
          success: res => {
            if (res.confirm) {
              uni.setLocale(e.code);
            }
          },
        });
      } else {
        uni.setLocale(e.code);
        this.$i18n.locale = e.code;
      }
    },
    goProductDetail(item) {
		
      uni.navigateTo({
        url: `/pages/index/productDetail?id=${item.id}`,
      });
    },
    goPage(link) {
		if(link=='/pages/index/invitePage'){
			// #ifdef APP
			return false
			// #endif
		}
		// #ifdef H5
		if(link.includes('http')||link.includes('www')){
			window.open(link, '_blank');
			return
		}
		// #endif
		// #ifdef APP-PLUS
		console.log(link,'===')
		if(link.includes('http')||link.includes('www')){
			uni.navigateTo({
			  url: `/pages/index/webview?url=${link}`,
			});
			return
		}
		// #endif
      if (link.indexOf("join") !== -1) {
        uni.switchTab({
          url: link,
        });
      } else {
        uni.navigateTo({
          url: link,
        });
      }
    },
  },
};
</script>

<style lang="less">
@import "../../static/less/variable.less";

.index-page {
  background-color: #f5f4f9;

  .index-scroll {
    .banner {
      margin-left: -30rpx;
      margin-right: -30rpx;

      .swiper {
        height: 140px;
      }
    }

    .news-list {
      margin-left: -30rpx;
      margin-right: -30rpx;
      padding: 10rpx 30rpx;
      background-color: #fff;

      .df(center, flex-start);
	  flex-direction: row;

      .left-tit {
        margin-right: 38rpx;
        border-radius: 0 50px 50px 0;
        padding: 10rpx 30rpx;
        // background: linear-gradient(0deg, #fd631f 0%, #fd7e1f 100%);
		background: linear-gradient(90deg, #1098B7 0%, #64BAB4 100%);
        color: #fff;
      }

      .news-swiper {
        min-width: 10%;
        flex-grow: 1;

        .swiper {
          height: 36rpx;

          .swiper-item {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            color: #908f9a;
            font-size: @descSize;
            line-height: 36rpx;
          }
        }
      }
    }

    .menu-container {
      padding: 70rpx 0rpx;

      .menu-list {
        margin-bottom: 60rpx;

        .df(stretch, space-between);
		flex-direction: row;

        &:last-child {
          margin-bottom: 0;
        }

        .menu-item {
          .df(center, center);
          flex-direction: column;
          width: 33.33%;
          text-align: center;

          .pic {
            width: 58rpx;
			.img{
				width: 100%;
			}
          }

          .menu-tit {
            margin-top: 24rpx;
            font-size: 24rpx;
          }
        }
      }
    }

    .paper-card-list {
      margin-bottom: 36rpx;

      .paper-card {
        margin-bottom: 10rpx;
        width: 100%;
		// height: 280rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		// background: linear-gradient(0deg, rgba(249,246,233,1) 0%,  rgba(251,249,255,1) 100%);
		background: linear-gradient(90deg, #B8DDDE 0%, #DBEBEB 100%);
		// background: red;
		padding: 40rpx 50rpx;
		.left{
			width: 70%;
			.title{
				color: #E68724;
				font-size: 36rpx;
				font-weight: 600;
				margin-bottom: 40rpx;
			}
			.label{
				color: #E68724;
				font-size: 24rpx;
				// font-weight: 600;
				// margin-bottom: 30rpx;
			}
		}
		.right{
			width: 30%;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 137rpx;
			}
		}
		.right1{
			width: 30%;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 174rpx;
			}
		}
      }
    }

    .product-container {
      padding-bottom: 26rpx;

      .tit {
        margin-bottom: 8rpx;
        color: @bodyColor;
        font-size: @bodySize;
      }

      .desc {
        margin-bottom: 28rpx;
        color: #777680;
        font-size: 24rpx;
      }

      .product-list {
        .df(stretch, flex-start);
		flex-direction: row;
        flex-wrap: wrap;

        .product-item {
          margin-top: 10rpx;
          margin-right: 10rpx;
          border-radius: 8rpx;
          background-color: #fff;
          width: calc(50% - 5rpx);
          overflow: hidden;

          .product-img {
            width: 100%;
			height: 400rpx;
            background-color: #e8e8e8;
			image{
				width: 100%;
				height: 100%;
				// height: 100rpx;
			}
          }

          .product-info {
            padding: 20rpx 28rpx;

            .product-tit {
              .vertical(2);
            }

            .product-price-info {
              .df(center, space-between);

              .rebate {
                color: #fd384f;
                font-size: 36rpx;
                font-weight: bold;
              }

              .brfore-rebate {
                color: #777680;
                font-size: 30rpx;
                text-decoration: line-through;
              }
            }
          }

          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
.popup-container {
  border-radius: 20rpx;
  padding: 30rpx 25rpx 55rpx;
  width: calc(100vw - 184rpx);

  .df(center, flex-start);
  flex-direction: column;

  .popup-tit {
    margin-bottom: 36rpx;
    text-align: center;
    font-size: @bodySize;
    color: @bodyColor;
    font-weight: bold;
  }

  .popup-content {
    color: #666;
    font-size: 24rpx;
    line-height: 1.41;
	// height: 100rpx;
	max-height: 500rpx;
	overflow-y: scroll;
  }

  .popup-close-btn {
    margin-top: 46rpx;
    border-radius: 50rpx;
    padding: 30rpx 80rpx;
    background-color: #fd7e1f;
	// background: linear-gradient(90deg, #B8DDDE 0%, #DBEBEB 100%);
    color: #fff;
    font-size: 26rpx;
  }
}
</style>

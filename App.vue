<script>
import { setTabbar } from "@/utils/utils.js";
import {url} from '@/utils/request.js'
export default {
	onLaunch: function () {
		console.log("App Launch");

		let token = uni.getStorageSync("token");
		if (!token) {
			const pages = getCurrentPages();

			// 获取当前页面路由信息
			const currentPage = pages[pages.length - 1];
			console.log(currentPage);
			if(!currentPage) return;
			const currentRoute = currentPage.route;
			if (currentRoute == "pages/login/region") {
				uni.reLaunch({
					url: "/pages/login/region",
				});
			} else {
				uni.reLaunch({
					url: "/pages/login/index",
				});
			}
		}
	},
	onShow: function () {
		console.log("App Show");
		// #ifdef APP-PLUS
				this.getAppInfo();
		// #endif
	},
	onHide: function () {
		console.log("App Hide");
	},
	methods: {
		appversion(data) {
			let that = this;
			console.log(data);
			//  获取manifest.json里的配置信息
			plus.runtime.getProperty(plus.runtime.appid, function (widgetinfo) {
				console.log(url + data.down);
				let version = widgetinfo.version, //用户当前版本
					appVersion = data.app_version.val, //升级包版本
					appName = widgetinfo.name, //app名称
					appurl =  data.app_download_url.val, //升级包地址
					intro = data.app_upgrade_remark.val; //升级包提示
				if (data && version != appVersion) {
					uni.showModal({
					            title: 'Please update the app ..',
					            content: 'V ' + appVersion,
					            confirmText:  'yes',
					            cancelText: 'exit',
					            success: res => {
					              if (res.confirm) {
					                uni.showLoading({
					                  title:  'downloading',
					                  mask: true,
					                });
					                
					                uni.downloadFile({
					                  url: appurl,
					                  success: download => {
					                    if (download.statusCode == 200) {
					                      plus.runtime.install(
					                        download.tempFilePath,
					                        {
					                          force: false,
					                        },
					                        () => {
					                          uni.hideLoading();
					                          plus.runtime.restart(); //更新成功启动
					                        },
					                        err => {
					                          //若没下载成功还是去下载
					                          uni.hideLoading();
					                          // uni.showToast({
					                          //   title: "更新失败，将跳转下载页面",
					                          //   icon: "none",
					                          //   duration: 2000,
					                          // });
					                        }
					                      );
					                      setTimeout(function () {
					                        plus.runtime.openURL(appurl);
					                      }, 2000);
					                    }
					                  },
					                });
					              } else if (res.cancel) {
					                // console.log("用户点击取消");
					                // uni.showToast({
					                //   title: "版本无法继续使用,请先升级",
					                //   icon: "none",
					                //   duration: 2000,
					                // });
					                //退出app
					                setTimeout(function () {
					                  plus.runtime.quit();
					                }, 2000);
					              }
					            },
					            fail: () => {
					              uni.hideLoading();
					              plus.runtime.quit()
					            },
					          });
				}
			});
		},
		getAppInfo() {
			uni.request({
				url: url + "/api/app_info",
				method:'GET',
				success: res => {
					console.log(res.data.data);
					this.appversion(res.data.data);
				},
			});
		},
	},
};
</script>

<style lang="less">
@import "@/static/less/variable.less";

/*每个页面公共css */
* {
	box-sizing: border-box;
}
uni-page-body {
	overflow: hidden;
	
	.has-tabbar {
		height: calc(100vh - var(--tab-bar-height));
	}
}
input {
	margin: 0;
	bottom: 0;
	outline: none;
	border: none;
}

body {
	background-color: transparent;
	margin: 0;
	padding: 0;
}

.profix-page-container {
	color: #333;
	font-size: 30rpx;
	width: 100vw;
	line-height: 1;
	height: 100%;

	.page-scroll {
		overflow-y: auto;
		height: 100%;
		width: 100%;
		background: url("@/static/image/pageBg.png") no-repeat center center / cover;
		
		.page-con {
			padding: 45rpx;

			&.has-tabbar {
				// #ifdef H5
				// 用于处理tabbar
				padding-bottom: var(--tab-bar-height);
				// #endif
			}
		}
	}

	.pic {
		font-size: 0;
		overflow: hidden;

		.img {
			width: 100%;
		}
	}
	
	.popup-container {
		.df(center, flex-start, column);
		
		border-radius: 20rpx;
		border: 1rpx solid #707070;
		padding: 40rpx 30rpx 46rpx;
		width: calc(100vw - 184rpx);
		background-color: #2F303B;
		
		.popup-tit {
			margin-bottom: 24rpx;
			text-align: center;
			font-size: 30rpx;
			color: #FFFFFF;
			font-weight: 800;
			line-height: 1.4;
		}
	
		.popup-content {
			color: #FFFFFF;
			font-size: 24rpx;
			line-height: 1.41;
			line-height: 1.625;
			max-height: 500rpx;
			overflow-y: scroll;
		}
	
		.popup-close-btn {
			.btn-box(50rpx, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
			
			margin-top: 26rpx;
			padding-top: 24rpx;
			padding-bottom: 24rpx;
			width: calc(100% - 160rpx);
			text-align: center;
		}
	}
}
</style>

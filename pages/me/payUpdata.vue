<template>
	<view class="profix-page-container pay-updata-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="pay-updata-scroll page-con">
				<view class="box">
					<view class="pic" @click="upImg">
						<image style="height: 400rpx" :src="payImg" mode="widthFix" class="img"></image>
					</view>
				</view>
				<view class="tips">{{ $t("payUpdata.tips") }}</view>
				<view class="address-box">
					<view class="tit">TXID</view>
					<view class="inp-box">
						<input type="text" v-model="txid" :placeholder="$t('payUpdata.placeholder')" />
					</view>
				</view>
				<button class="next-btn" @click="rechargeCreate">
					<text>{{ $t("payUpdata.btnText") }}</text>
				</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import { $request, url as requestUrl } from "@/utils/request";

export default {
	components: {
		hxNavbar,
	},
	data() {
		return {
			headerBg: false,
			address: "TDcu8jVJRpJ4hNMTJMKTQzwSMSHKmN1zAF",
			payImg: "../../static/img/updata_img.png",
			transfer_voucher: "",
			onLoadData: {},
			txid: "",
			requestBool: true,
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("payUpdata.pageTit"),
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	onLoad(e) {
		console.log(e);
		this.onLoadData = e;
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
		upImg() {
			uni.chooseImage({
				count: 1,
				success: async res => {
					console.log(res.tempFiles[0]);
					uni.uploadFile({
						url: `${requestUrl}/api/file_upload`,
						filePath: res.tempFilePaths[0],
						name: "file",
						formData: {},
						success: async res1 => {
							console.log(res1);
							let avatar = JSON.parse(res1.data);
							if (avatar.code === 0) {
								this.payImg = `${requestUrl}${avatar.data.src}`;
								this.transfer_voucher = avatar.data.src;
							}
						},
					});
				},
			});
		},
		async rechargeCreate() {
			if (!this.requestBool) {
				return;
			}
			let { recargarNum, network } = this.onLoadData;
			this.requestBool = false;
			let res = await $request("rechargeCreate", { money: recargarNum, transfer_voucher: this.transfer_voucher, network, txid: this.txid });
			this.requestBool = true;
			console.log(res);
			uni.showToast({
				icon: "none",
				title: res.data.msg,
			});
			if (res.data.code === 0) {
				setTimeout(() => {
					uni.navigateBack({ delta: 3 });
				}, 1500);
			}
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.pay-updata-page {
	.pay-updata-scroll {
		padding-top: 120rpx;
		.df(center, flex-start, column);

		.box {
			margin-bottom: 42rpx;
			border-radius: 20rpx;
			padding: 20rpx;
			width: 100%;
			.glassBg(30px, 20, #2f303b);

			& > * {
				position: relative;
				z-index: 1;
			}
			
			.pic {
				opacity: .2;
			}
		}

		.tips {
			margin-bottom: 52rpx;
			font-size: 24rpx;
			line-height: 1.24;
			color: #fff;
			width: 100%;
		}

		.address-box {
			border-radius: 20rpx;
			border: 1px solid #fff;
			width: 100%;
			.glassBg(30px, 20, #2f303b);

			& > * {
				position: relative;
				z-index: 1;
			}

			.tit {
				border-bottom: 1px solid #484848;
				padding: 30rpx 35rpx;
				color: #fff;
				font-weight: bold;
			}

			.inp-box {
				padding: 50rpx 35rpx;

				input {
					line-height: 1;
					font-size: 26rpx;
					color: #fff;
				}
			}
		}

		.next-btn {
			margin-top: 200rpx;
			.btn-box(50px, transparent);
			.glassBg(30px, 20, #2f303b);
			max-width: 400rpx;
			width: 100%;
			text-align: center;

			& > * {
				position: relative;
				z-index: 1;
			}
		}
	}
}
</style>

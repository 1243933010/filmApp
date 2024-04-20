<template>
	<view class="profix-page-container qualifications-page">
		<scroll-view :scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="qualifications-scroll page-con">
				<view class="list">
					<view @click="goUrl(item)" class="item" v-for="(item, index) in list" :key="index">
						<view class="item-tit">{{ item.title }}</view>
						<view class="arrow-icon pic">
							<img src="@/static/img/right_arrow.png" class="img" mode="widthFix" />
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
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
			list: [],
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				title: this.$t("qualifications.item1"),
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	mounted() {
		this.getCertifications();
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
		async getCertifications() {
			let res = await $request("certifications", {});
			console.log(res);
			if (res.data.code === 0) {
				this.list = res.data.data;
			}
		},
		goUrl() {
			let url = "https://puthgroup.cc";
			// #ifdef H5
			location.href = url;
			// #endif
			// #ifdef APP-NVUE
			uni.navigateTo({
				url: `./webview?url=${url}`,
			});
			// #endif
		},
	},
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";

.qualifications-page {
	.qualifications-scroll {
		padding: 120rpx 0 0;
		
		.list {
			.item {
				margin-bottom: 2px;
				padding: 45rpx;
				.glassBg(30px, 20, #2f303b);
				.df(center, space-between);

				& > * {
					position: relative;
					z-index: 1;
				}

				.item-tit {
					color: #fff;
				}

				.arrow-icon {
					width: 14rpx;
				}
			}
		}
	}
}
</style>

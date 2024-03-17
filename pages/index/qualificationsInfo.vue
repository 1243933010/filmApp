<template>
	<view class="profix-page-container qualifications-info-page">
		<hx-navbar :config="config" />
		<view class="qualifications-info-scroll page-scroll">

			<rich-text :nodes="dataObj.content"></rich-text>

		</view>
	</view>
</template>

<script>
	import hxNavbar from "@/components/hx-navbar.vue";
	import {
		$request
	} from "@/utils/request";
	export default {
		components: {
			hxNavbar,
		},
		data() {
			return {
				dataObj: {
					content: ''
				},
				id: ''
			};
		},
		computed: {
			config() {
				return {
					title: this.$t("qualifications.item1"),
					color: "#ffffff",
					// backgroundColor: [1, "#24bdab"],
					// 背景图片（array则为滑动切换背景图，string为单一背景图）
					// backgroundImg: ['/static/xj.jpg','/static/logo.jpg'],
					backgroundImg: "../../static/img/header_tabber.png",
				};
			},
		},
		onLoad(e) {
			console.log(e)
			this.id = +e.id
		},
		mounted() {
			this.getCertifications();
		},
		methods: {
			async getCertifications() {
				let res = await $request('certifications', {})
				console.log(res)
				if (res.data.code === 0) {
					let regex = /<img(.*?)>/g;
				
					res.data.data.forEach((val) => {
						if (val.id == this.id) {
							let str = val.content;
							let processedString = str.replace(regex, function(match) {
								// 在匹配到的<img标签后面添加指定样式
								return match.replace('<img', '<img style="width:100%;"');
							});
							val.content = processedString;
							// return processedString;
							this.dataObj = val;
						}
					})
					console.log(this.dataObj)
				}
			}

		}
	};
</script>

<style lang="less" scoped>
	@import "../../static/less/variable.less";

	page {
		background-color: #f5f4f9;
	}

	.qualifications-info-page {
		.qualifications-info-scroll {
			.pic {
				margin-right: -30rpx;
				margin-left: -30rpx;
			}
		}
	}

	img {
		width: 100%;
	}
</style>
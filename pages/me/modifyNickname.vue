<template>
	<view class="profix-page-container modify-nickname-page">
		<scroll-view scroll-y="true" class="page-scroll" @scroll="scrollHandle">
			<hx-navbar :config="config" :class="{ 'has-bg': headerBg }" style="position: fixed; top: 0; left: 0; right: 0; z-index: 99" />
			<view class="modify-nickname-scroll page-con">
				<view class="nickname-inp">
					<input type="text" v-model="userInfo.nickname" />
				</view>
				<!-- TODO -->
				<button class="save-btn" @click="saveBtn">保存</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import hxNavbar from "@/components/hx-navbar.vue";
import {$request} from '@/utils/request.js'
export default {
	name: "更换昵称",
	components: {
		hxNavbar,
	},
	data() {
		return {
			userInfo:{
				nickname:''
			},
			headerBg: false,
		};
	},
	computed: {
		config() {
			return {
				// TODO
				title: "更换昵称",
				color: "#ffffff",
				backgroundColor: "transparent",
			};
		},
	},
	mounted(){
		this.getUserInfo();
	},
	methods:{
		scrollHandle(event) {
			const { scrollTop } = event.detail;
			if (scrollTop >= 50) {
				this.headerBg = true;
			} else {
				this.headerBg = false;
			}
		},
		async getUserInfo(){
			let res =  await $request('getUserInfo',{})
			console.log(res)
			if(res.data.code===0){
				this.userInfo = res.data.data;
				return
			}
			uni.showToast({
				icon:'none',
				title:res.data.msg
			})
		},
		async saveBtn(){
			let resp = await $request('userSave',{nickname:this.userInfo.nickname});
			uni.showToast({
				icon: 'none',
				title: resp.data.msg
			})
			if(resp.data.code===0){
				setTimeout(()=>{uni.navigateBack({delta:1})},1500)
			}
		},
	}
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
.modify-nickname-page {
	.page-scroll {
		background: #1e1f28;
	}
	
	.modify-nickname-scroll {
		padding-top: 160rpx;

		.nickname-inp {
			border-radius: 10rpx;
			padding: 30rpx 36rpx;
			background-color: #2F303B;
			color: #C0C3D2;
			font-size: 12rpx;
			line-height: 1.375;
		}

		.save-btn {
			margin-top: 406rpx;
			.btn-box(50rpx, linear-gradient( 180deg, #F51B4C 0%, #ED4E49 100%));
			max-width: 400rpx;
		}
	}
}
</style>

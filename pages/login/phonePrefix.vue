<template>
	<view class="profix-page-container phone-prefix-page">
		<view class="input">
			<view class="" @click="back"><uni-icons type="left" size="30" ></uni-icons></view>
			
			<input @input="handleInput"   /> 
			<view class=""></view>
		</view>
		<view class="phone-prefix-scroll page-scroll">
			<view class="classify-list" v-if="Object.values(countries).length">
				<view class="classify-item" v-for="[key, value] in Object.entries(countries)" :key="key">
					<view class="tit">{{ key }}</view>
					<view class="list">
						<view class="item" @click="selectPrefix(prefix)" v-for="prefix of value" :key="prefix.id">
							<view class="prefix-name">{{ prefix.en }}</view>
							<view class="prefix">+{{ prefix.prefix }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import prefixSorted from "@/utils/phonePrefix.js";

export default {
	data() {
		return {
			countries: {},
			countries1:{}
		};
	},
	mounted() {
		this.sorting();
	},
	methods: {
		handleInput(e){
			if(!e.detail.value){
				this.countries = this.countries1;
				return
			}
			let arr = Object.entries(this.countries1);
			
			let obj = {'':[]};
			let list = [];
			arr.forEach(val=>{
				// console.log(val)
				val[1].forEach(item=>{
					if(item.prefix.includes(e.detail.value)){
						// console.log('--',val)
						list.push(item)
						
						
					}
				})
				
			})
			obj['']=list;
			this.countries= obj;
			// if(e.detail.value.length==1){
			// 	let arr1 = [];
			// 	arr.forEach(val=>{
			// 		// console.log(val)
			// 		if(e.detail.value[0].toUpperCase()==val[0]){
			// 			// console.log('--',val)
			// 			this.countries= {}
			// 			this.countries[val[0]]=val[1]
			// 		}
			// 	})
			// }
			// if(e.detail.value.length>1){
			// 	let arr2 = [];
			// 	let key = Object.keys(this.countries)[0];
			// 	Object.values(this.countries)[0].forEach(val=>{
			// 		if(val.en.toUpperCase().includes(e.detail.value.toUpperCase())){
			// 			arr2.push(val)
			// 			this.countries= {}
			// 			this.countries[key]=arr2
						
			// 		}
			// 	})
			// }
		},
		sorting() {
			prefixSorted.sort((a, b) => a.en.localeCompare(b.en));

			// 按照首页字母进行分类
			const categorizedCountries = {};
			prefixSorted.forEach(country => {
				const firstLetter = country.en.charAt(0).toUpperCase(); // 获取首字母并转为大写
				if (!categorizedCountries[firstLetter]) {
					categorizedCountries[firstLetter] = [];
				}
				categorizedCountries[firstLetter].push(country);
			});

			this.countries = categorizedCountries;
			console.log("}}}",categorizedCountries)
			this.countries1 = categorizedCountries;
		},
		selectPrefix(prefix) {
			uni.navigateBack({
				delta: 1, // 返回上一页
				success() {
					uni.$emit("getPrefix", prefix);
				},
			});
		},
		back(){
			uni.navigateBack({delta:1})
		}
	},
};
</script>

<style lang="less">
	.input{
		
		margin: 20rpx auto;
		padding-top: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		input{
			width: 500rpx;
			height: 70rpx;
			border-radius: 30rpx;
			text-align: center;
			border: 1px solid #888;
		}
	}
.profix-page-container {
	.phone-prefix-scroll {
		padding: 0;

		.classify-list {
			.classify-item {
				.tit {
					padding: 10px;
					background-color: #eee;
					font-weight: bold;
				}

				.list {
					display: flex;
					flex-direction: column;

					.item {
						border-bottom: 1px solid #eee;
						padding: 10px 15px 10px 10px;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.prefix-name {
							font: 16px;
						}

						.prefix {
							font-size: 12px;
							color: #888;
						}
					}
				}
			}
		}
	}
}
</style>

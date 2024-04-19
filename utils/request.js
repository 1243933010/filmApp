import requestObj from '@/utils/requestObj.js'
export let url = 'http://dev.2404.goldval.top'
export const $request = (requestName,params,headerType=0)=>{
	let reqObj = requestObj[requestName];
	let token = uni.getStorageSync('token');
	let language = uni.getLocale();
	console.log(language)
	let languageObj = {'en':'en','fr': "fr",'es': "es",'ara': "ara",}
	let headerObj = [
		{
			"Content-Type":"application/json",
			"Authorization":token?`${token}`:'',
			"Accept":"application/json",
			"Accept-Language":languageObj[language]
		},
		{
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization":token?`${token}`:'',
			"Accept":"application/json",
			"Accept-Language":languageObj[language]
		}
	]
	
	let reqUrl = reqObj.otherGet?`${url}${reqObj.url}/${params}`:`${url}${reqObj.url}`
	let data = reqObj.otherGet?{}:params;
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: reqUrl, 
			method:requestObj[requestName].type,
		    data,
		    header: headerObj[headerType],
		    success: (res) => {
				// console.log(res,'=====================')
				if(res.data.code==401){
					uni.hideLoading()
					uni.clearStorageSync();
					uni.reLaunch({
						url:'/pages/login/emailVerificationLogin'
					})
					return
				}
		        resolve(res)
		    },
			fail: (err) => {
				// console.log(err,'-------------')
				reject(err)
			}
		});

	})
}
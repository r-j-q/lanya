<script>
	export default {

		onLaunch: function() {
			console.log('App Launch')
		},
		globalData: {
			token: '',
			// reqUrl: 'https://bdsh.shningmi.com/addons/shopro'
			reqUrl:'' 
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// getRequestUrl(v) {
			// 	console.log('==v===>', v) 
			// 	this.globalData.reqUrl = "https://" + v + '/addons/shopro'
			// },
			 
			// getRequestParams() {
			// 	let url = location.href;
			// 	let requestParams = {};
			// 	if (url.indexOf('?') !== -1) {
			// 		let str = url.substr(url.indexOf('?') + 1); //截取?后面的内容作为字符串
			// 		console.log(str, '?后面的内容');
			// 		let strs = str.split('&'); //将字符串内容以&分隔为一个数组
			// 		console.log(strs, '以&切割的数组');
			// 		for (let i = 0; i < strs.length; i++) {
			// 			requestParams[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
			// 			// 将数组元素中'='左边的内容作为对象的属性名，'='右边的内容作为对象对应属性的属性值
			// 		}
			// 	}
			// 	console.log(requestParams, '处理后的对象');
			// 	return requestParams;
			// }
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

<template>
	<view class="lists">
		<view class="lists0">
			<image :src="goods" mode=""></image>
		</view>
		<view class="lists1">
			<view class="lists3">
				<view class="lists4">
					沃迈得
				</view>
				<view class="lists5">
					超声波电动牙刷
				</view>
			</view>
			<view class="lists2">
				<view class="lists10">
					<view class="lists11"> 8元/套 </view>
					<view class="lists12">
						<view class="lists13" @click="redu"> - </view>
						<input class="lists15" disabled type="number" v-model="taoNumber">
						<view class="lists14" @click="add"> + </view>
					</view>

				</view>
				<view v-if="getUserInfoDataToken" @click="toPay" class="chexiao">去支付</view>
				<button v-else open-type="getPhoneNumber" class="chexiao" @click.stop="loginfn"
					@getphonenumber.stop="onGetPhoneNumber"> 确定</button>

			</view>

		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				p: {},
				taoNumber: 1,
				disabled: false,
				id: '',
				goods: require('../../static/img/goods.jpg'),
				code: "",
				getUserInfo: {},
				getUserInfoDataToken: false,
				qty: 1, //商品数量
				deviceId:"",
				serviceId:"",
				unids:"",
				characteristicIdthis:"",
			}
		},

		onLoad: function(options) {
			// this.id = options.id;
			// this.getawardDetail(options.id)
			if(options.param){
				let pas =JSON.parse(options.param)
				this.deviceId= pas.deviceId
				this.serviceId= pas.serviceId
				this.unids =pas.unids
				this.characteristicId=pas.characteristicId
				console.log("====蓝牙传到商品页参数====>>>>>",pas)
			}
			 
			
		// deviceId: this.deviceId,
		// serviceId: this.serviceId,
		// unids :this.list[0].name.slice(4),
		// characteristicId:this.characteristicId
          let users= uni.getStorageSync('usersInfo');
		  if(users){
			  this.getUserInfo = JSON.parse(users);
			  if (this.getUserInfo.data && this.getUserInfo.data.userinfo) {
			  	this.getUserInfoDataToken = this.getUserInfo.data.userinfo ? true : false
			  }
		  }
			 
		},
		methods: {
			toPay() {
				if (this.taoNumber == 1) {
					this.qty = 1
				} else {
					this.qty = 2
				}
				this.createorder()
			},
			// 用户授权登录
			//首先点击登录按钮的时候获取一下code，保存到data里
			loginfn() {
				let that = this;
				wx.login({
					success(res) {
						that.code = res.code;
						return;
					},
				});
			},
			//调用button自带的弹窗获取用户信息方法
			async onGetPhoneNumber(val) {
				//此时的val是用户点击了允许还是拒绝
				let that = this;
				if (val.detail.errMsg === "getPhoneNumber:ok") {

					//保存需要的** iv, encryptedData **
					const {
						iv,
						encryptedData
					} = val.detail;
					that.getawardDetail(that.code, encryptedData, iv)


				}
			},



			redu() {
				if (this.taoNumber <= 1) {
					this.taoNumber = 1
				} else {
					this.taoNumber--
				}

			},
			add() {
				if (this.taoNumber >= 2) {
					this.taoNumber = 2
				} else {
					this.taoNumber++
				}
			},
			// 创建订单
			async createorder() {
				let _this = this;
				uni.request({
					url: 'http://ys.shningmi.com/api/order/create',
					data: {
						guid: "guid",
						qty: this.qty
					},
					header: {
						// 'Content-Type': 'application/x-www-form-urlencoded'
						'Content-Type': 'application/json',
						'token': this.getUserInfo.data.token
					},
					method: 'POST', //请求方式，必须为大写
					success: (res) => {
						// console.log('微1122221信支付参数------', res.data.data.timeStamp);
						console.log('微1122221信支付参数------', res.data.data.noncestr);
						// console.log('微1122221信支付参数------', res.data.data.package);
						console.log('微1333122221信支付参数------', res.data.data.signtype);
						// console.log('微1122221信支付参数------', res.data.data.sign); 
						uni.requestPayment({
							provider: 'wxpay', // 服务提提供商
							timeStamp: res.data.data.timeStamp, // 时间戳
							nonceStr: res.data.data.nonceStr, // 随机字符串
							package: res.data.data.package,
							signType: res.data.data.signType, // 签名算法
							paySign: res.data.data.sign, // 签名
							success: function(res) {
								console.log('支付成功', res);
								_this.writeBLECharacteristicValue()
								 

							},
							fail: function(err) {
								console.log('支付失败', err);
							}
						});

					}
				})

			},
			//写入蓝牙
			writeBLECharacteristicValue() {
				 let _this =this;

              // console.log("====蓝牙写入参数====>>>>>",pas)
				// let unids = this.list[0].name.slice(4)
				//PASS  2   PBSS   1
				let qtyString = _this.qty == 1 ? 'PBSS' : 'PASS';
				console.log("====蓝牙写入参数qtyString====>>>>>",qtyString)
				console.log("====蓝牙写入参数unids====>>>>>", _this.unids)
				console.log("====蓝牙写入参数deviceId====>>>>>",_this.deviceId)
				console.log("====蓝牙写入参数characteristicId====>>>>>",_this.characteristicId)
				let msg = qtyString + _this.unids;
				let buffer = new ArrayBuffer(msg.length);
				let dataView = new DataView(buffer);
				for (var i = 0; i < msg.length; i++) {
					dataView.setUint8(i, msg.charAt(i).charCodeAt())
				}
				let resHex = _this.ab2hex(buffer) + "0D0A";


				var buffers = new Uint8Array(resHex.match(/[\da-f]{2}/gi).map(function(h) {
					return parseInt(h, 16)
				})).buffer

				uni.writeBLECharacteristicValue({
					deviceId: _this.deviceId,
					serviceId: _this.serviceId,
					characteristicId: _this.characteristicId,
					value: buffers,
					success(res) {
						console.log('写入成功', res);
						uni.showToast({
							icon: 'none',
							title: "开启成功"
						})
					},
					fail(res) {
						console.log('写入失败1', JSON.stringify(res))
						// console.log('写入失败2', JSON.stringify(buffer))
					}
				})
			},
			// ArrayBuffer转16进度字符串示例
			ab2hex(buffer) {
				const hexArr = Array.prototype.map.call(
					new Uint8Array(buffer),
					function(bit) {
						return (bit.toString(16)).slice(-2)
					}
				)
				return hexArr.join('')
			},
			getawardDetail(code, encryptedData, iv) {
				uni.request({
					url: 'http://ys.shningmi.com/api/login/login',
					data: { //参数
						code,
						encryptedData,
						iv
					},
					header: {
						// 'Content-Type': 'application/x-www-form-urlencoded'
						'Content-Type': 'application/json' //自定义请求头信息
					},
					method: 'POST', //请求方式，必须为大写
					success: (res) => {
						let {
							data
						} = res;
						uni.setStorageSync('usersInfo', JSON.stringify(data));
						this.getUserInfo = JSON.parse(uni.getStorageSync('usersInfo'));

						console.log('缓存数据------', this.getUserInfo.data);

						if (this.getUserInfo.data && this.getUserInfo.data.userinfo) {
							console.log('缓存数据------', this.getUserInfo.data.userinfo);
							this.getUserInfoDataToken = this.getUserInfo.data.userinfo ? true : false
						}



					}
				})

			}


		}
	}
</script>

<style scoped>
	.lists {}

	.lists0 {
		height: 100vh;
	}

	.lists0 image {
		height: 100%;
		width: 100%;
		display: block;
	}

	.lists1 {
		position: fixed;
		bottom: 0;
		height: 300upx;
		left: 0;
		right: 0;
		/* background-color: #fff; */
		background: rgba(255, 255, 255, 0.9);
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
		width: 100%;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
	}

	.lists2 {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

	}

	.lists10 {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.lists12 {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 20upx;
	}

	.lists15 {
		width: 120upx;
		text-align: center;
	}

	.lists13,
	.lists14 {
		border: 1px solid #333333;
		border-radius: 2px;
		width: 20px;
		height: 20px;
		font-size: 12px;
		text-align: center;
	}

	.chexiao {
		width: 160upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 28upx;
		font-weight: 700;
		background-color: #4F86FE;
		color: #fff;
		border-radius: 50px;
		position: relative;
		z-index: 99;
	}

	.lists3 {
		width: 90%;
		margin: 40upx auto;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.lists4 {
		color: #4F86FE;
		font-size: 12px;
		background: rgba(79, 134, 254, 0.1);
		border-radius: 8px;
		width: 54px;
		height: 28px;
		line-height: 28px;
		text-align: center;
	}

	.lists5 {
		font-family: 'PingFang SC';
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 25px;
		color: #333333;
		margin-left: 10px;
	}
</style>
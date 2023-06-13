<view class="mapBox">
	<map style="width: 100%; height: 550rpx;" :latitude="location.latitude" :longitude="location.longitude" :markers="mapMarkers" @markertap="getMarkerInfo"></map>
	<cover-view class="markerInfoBox" v-show="highLightShow">
		<cover-view class="info-closeIcon">
			<cover-image src="/static/projectDetails/close.png" class="icon"></cover-image>
	    </cover-view>
	    <cover-view class="info-name">
		    2021P04项目工程总承包
	    </cover-view>
		<cover-view class="info-box">
			<cover-image src="/static/projectDetails/location.png" class="location-icon"></cover-image>
		    <cover-view class="info-address">
				福建省漳州市芗城区南昌路96号福建省漳州市芗城区南昌路
			</cover-view>
		</cover-view>
	</cover-view>
</view>
 <script>
	 
	      getAuthorize() {
	 
	             let that = this
	 
	             uni.authorize({
	 
	                 scope: 'scope.userLocation',
	 
	                 success(res) {
	 
	                     that.getLocation()
	 
	                 },
	 
	                 // 授权失败
	 
	                 fail(err) {
	 
	                     uni.showModal({
	 
	                         title: '提示',
	 
	                         content: '请授权位置获取附近的商家!',
	 
	                         showCancel: false,
	 
	                         confirmText: '确认授权',
	 
	                         success() {
	 
	                             uni.openSetting({
	 
	                                 success(res) {},
	 
	                                 fail(err) {}
	 
	                             })
	 
	                         }
	 
	                     })
	 
	                 }
	 
	             })
	 
	         } 
 </script>
<style lang="scss" scoped>
    .mapBox {
		position: relative;
	}
	.markerInfoBox {
		border-radius: 16rpx;
		width: 80%;
		position: absolute;
		bottom: 5%;
		left: 50%;
		transform: translateX(-50%);
		background-color: #FFFFFF;
		.info-closeIcon {
			position: absolute;
			right: 3%;
			top: 3%;
			.icon {
				width: 48rpx;
				height: 48rpx;
			}
		}
		.info-name {
			width: 540rpx;
			padding: 20rpx;
			font-size: 32rpx;
			color: #333333;
			overflow: auto;
			box-sizing: border-box;
			line-height: normal;
			white-space:normal;	
		}
			
		.info-box {
			display: flex; /* 防止父元素高度塌陷 */
			padding-bottom: 20rpx;
		}
		.location-icon {
			width: 38rpx;
			height: 38rpx;
			margin: 10rpx 20rpx;
			float: left;
		}
		.info-address {
			width: 480rpx;
			font-size: 32rpx;
			color: #999999;
			float: left;
			white-space:normal;
			line-height: normal;
		}	
	}
</style>
 getLocation() {
		let that = this;
		uni.getLocation({
			type: "wgs84",
			success: (
				res) => { //授权成功后，调用console.log(res, "当前位置的经纬度");

				that.latitude = res.latitude;
				that.longitude = res.longitude;
			},
			fail(err) {
				//授权失败后，调用，可以在这儿调用下面的例子 再次进行授权console.log(err, "eee");
				uni.showToast({
					title: "授权未通过",
					icon: "none",
				});
				that.openAuthSetting();
			},
		});
	},
	openAuthSetting() {
		let that = this;
		uni.getSetting({
			success: (res) => {
				console.log(res, JSON.stringify(res, "getSetting"));
				if (res.authSetting["scope.userLocation"] != undefined && res.authSetting[
						"scope.userLocation"] != true) {
					uni.showModal({
						title: "请求授权当前位置",
						content: "需要获取您的地理位置，请确认授权",
						success: function(res) {
							if (res.cancel) {
								uni.showToast({
									title: "拒绝授权",
									icon: "none"
								});
							} else if (res.confirm) {
								uni.openSetting({
									success: function(dataAu) {
										console.log(dataAu, "openSetting");
										if (dataAu.authSetting[
											"scope.userLocation"] == true) {
											uni.showToast({
												title: "授权成功",
												icon: "none"
											});
											//再次授权，调用wx.getLocation的API
											that.getLocation();
										} else {
											uni.showToast({
												title: "授权失败",
												icon: "none"
											});
										}
									},
								});
							}
						},
					});
				} else if (res.authSetting["scope.userLocation"] == undefined) {
					//调用wx.getLocation的APIconsole.log("首次授权");
					this.getLocation();
				} else {
					//调用wx.getLocation的API
					this.getLocation();
				}
			},
			complete() {
				console.log("getSetting");
			},
		});
	},
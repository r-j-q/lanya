(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{62:function(e,t,n){"use strict";(function(e,t){var o=n(4);n(26);o(n(25));var i=o(n(63));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n(1)["default"],n(2)["createPage"])},63:function(e,t,n){"use strict";n.r(t);var o=n(64),i=n(66);for(var c in i)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(c);n(71);var s,a=n(32),r=Object(a["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,"57280228",null,!1,o["components"],s);r.options.__file="pages/index/index.vue",t["default"]=r.exports},64:function(e,t,n){"use strict";n.r(t);var o=n(65);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},65:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return i})),n.d(t,"staticRenderFns",(function(){return s})),n.d(t,"recyclableRender",(function(){return c})),n.d(t,"components",(function(){return o}));try{o={uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,82))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.shows=!1})},c=!1,s=[];i._withStripped=!0},66:function(e,t,n){"use strict";n.r(t);var o=n(67),i=n.n(o);for(var c in o)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=i.a},67:function(e,t,n){"use strict";(function(e,o){var i=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=i(n(41)),s=i(n(43)),a={components:{},data:function(){return{shows:!1,mode:"bottom",mask:!0,closeable:!0,closeIconPos:"top-right",addressInfo:{},showButton:!1,duration:5e3,list:[],deviceId:"",serviceId:"",characteristics:[],characteristicId:"",lanya:n(68),getLocation:n(69),wmd:n(70),getUserInfo:{},getUserInfoDataToken:!1,code:"",address:"",latitude:"",longitude:"",address_component:{},timer:null,openLanYa:!0}},onLoad:function(){this.loginfn()},onShow:function(){var t=this;this.openLanYa&&(this.timer=setInterval((function(){t.handleOpenBluetoothAdapter()}),1e3));var n=e.getStorageSync("usersInfo");n&&(this.getUserInfo=JSON.parse(n),this.getUserInfo.data&&this.getUserInfo.data.userinfo&&(this.getUserInfoDataToken=!!this.getUserInfo.data.userinfo))},methods:{openWeiXinAlipay:function(){this.openBluetoothAdapterPay("open")},userAlipayLoginCode:function(){var e=this;my.getAuthCode({scopes:"auth_user",success:function(t){e.alipayLogin(t.authCode)}})},alipayLogin:function(t){var n=this;e.request({url:"https://ys.shningmi.com/api/alipay/login",data:{code:t},header:{"Content-Type":"application/json"},method:"POST",success:function(t){var o=t.data;1==o.code&&(e.setStorageSync("usersInfo",JSON.stringify(o)),n.getUserInfo=JSON.parse(e.getStorageSync("usersInfo")),n.getUserInfo.data&&n.getUserInfo.data.userinfo&&(n.getUserInfoDataToken=!!n.getUserInfo.data.userinfo))}})},createOrderAlipay:function(){var t=this;e.request({url:"https://ys.shningmi.com/api/alipay/order",data:{guid:"guid",qty:1,latitude:"",longitude:"",address:"",device_id:t.list[0].name},header:{"Content-Type":"application/json",token:t.getUserInfo.data.token},method:"POST",success:function(e){console.log("-1000-----\x3e",e),1==e.data.code&&t.paymentAliHandler(e.data.data)}})},paymentAliHandler:function(t){var n=this;e.requestPayment({provider:"alipay",orderInfo:t.trade_no,success:function(e){e&&"9000"===e.resultCode&&n.writeBLECharacteristicValue("PBSS")},fail:function(){}})},getPhoneNumber:function(e){return(0,s.default)(c.default.mark((function e(){return c.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:o.cloud.init(),o.cloud.callFunction({name:"payCode",data:{outTradeNo:outTradeNo,openId:openId,returnCode:returnCode,cashFee:cashFee}}).then((function(e){console.log("成功",e),console.log("手机号",e.result.phoneInfo.phoneNumber)})).catch((function(e){console.log("失败",res)}));case 2:case"end":return e.stop()}}),e)})))()},btnClick:function(){this.shows=!0},goSetting:function(){this.shows=!1,e.openSetting({success:function(t){console.log(t,"openSetting"),1==t.authSetting["scope.userLocation"]?(e.showToast({title:"授权成功",icon:"none"}),that.getLocation()):e.showToast({title:"授权失败",icon:"none"})}})},openAuthSetting:function(){var t=this,n=this;e.getSetting({success:function(e){console.log(e,JSON.stringify(e,"getSetting")),void 0!=e.authSetting["scope.userLocation"]&&1!=e.authSetting["scope.userLocation"]||(e.authSetting["scope.userLocation"],t.getLocation())},complete:function(){n.btnClick(),console.log("getSetting")}})},loginfn:function(){var e=this;o.login({success:function(t){e.getawardDetail(t.code)}})},onGetPhoneNumber:function(e){var t=this;return(0,s.default)(c.default.mark((function n(){var o;return c.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t,"getPhoneNumber:ok"===e.detail.errMsg&&(o=e.detail,o.iv,o.encryptedData);case 2:case"end":return n.stop()}}),n)})))()},getawardDetail:function(t){var n=this;return(0,s.default)(c.default.mark((function o(){return c.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return n,o.next=3,e.request({url:"https://ys.shningmi.com/api/login/login",data:{code:t},header:{"Content-Type":"application/json"},method:"POST",success:function(t){var o=t.data;e.setStorageSync("usersInfo",JSON.stringify(o)),n.getUserInfo=JSON.parse(e.getStorageSync("usersInfo")),console.log("缓存数据--2----",n.getUserInfo.data.userinfo),n.getUserInfo.data&&n.getUserInfo.data.userinfo&&(console.log("缓存数据--2----",n.getUserInfo.data.userinfo),n.getUserInfoDataToken=!!n.getUserInfo.data.userinfo)}});case 3:case"end":return o.stop()}}),o)})))()},handleOpenBluetoothAdapter:function(){var t=this;console.log("-----------------\x3e>>>>"),e.openBluetoothAdapter({success:function(n){e.getBluetoothAdapterState({success:function(n){t.openLanYa=!1,clearInterval(t.timer),console.log(n,"本机设备的蓝牙已打开"),e.hideLoading(),t.startBluetoothDeviceDiscovery()},fail:function(t){this.btnClick(),e.showToast({icon:"none",duration:this.duration,title:"查看手机蓝牙是否打开"})}})},fail:function(t){e.showToast({icon:"none",duration:1e4,title:"查看手机蓝牙是否打开"})}})},startBluetoothDeviceDiscovery:function(){var t=this;e.startBluetoothDevicesDiscovery({success:function(e){console.log("startBluetoothDevicesDiscovery success",e),t.onBluetoothDeviceFound()},fail:function(e){console.log(e,"错误信息")}})},onBluetoothDeviceFound:function(){var t=this;e.onBluetoothDeviceFound((function(e){-1==t.list.indexOf(e.devices[0].deviceId)&&"WMD8"===e.devices[0].name.slice(0,4)&&(console.log("支付宝蓝牙--2w------",e.devices),t.createBLEConnection(e.devices[0].deviceId),t.list.push({name:e.devices[0].name,deviceId:e.devices[0].deviceId}))}))},getBluetoothDevices:function(){console.log("获取蓝牙设备"),e.getBluetoothDevices({success:function(e){console.log("获取蓝牙设备成功:"),console.log(e.devices)}})},createBLEConnection:function(t){var n=this;this.deviceId=t,e.createBLEConnection({deviceId:this.deviceId,success:function(e){console.log("蓝牙连接成功",e),n.getBLEDeviceServices()},fail:function(e){console.log("蓝牙连接失败",e)}})},stopBluetoothDevicesDiscovery:function(){var t=this;e.stopBluetoothDevicesDiscovery({success:function(e){t.loading=!1,console.log("停止搜索蓝牙设备:"+e.errMsg)},fail:function(e){console.log("停止搜索蓝牙设备失败，错误码："+e.errCode)}})},getBLEDeviceCharacteristics:function(){var t=this,n=this;console.log("--11----------",this.deviceId),console.log("--12----------",this.serviceId),setTimeout((function(){e.getBLEDeviceCharacteristics({deviceId:t.deviceId,serviceId:t.serviceId,success:function(e){console.log("特征getBLEDeviceCharacteristics",e),t.characteristics=e.characteristics,console.log("特征数组---5--",e.characteristics),e.characteristics.forEach((function(e){-1!=e.uuid.indexOf("FFE1")&&(n.characteristicId=e.uuid,n.notifyBLECharacteristicValueChange(e.uuid))}))},fail:function(e){console.log(e)}})}),1e3)},notifyBLECharacteristicValueChange:function(t){var n=this;console.log(t,"--------1----------"),console.log(this.deviceId,"--------2----------"),console.log(this.serviceId,"--------3----------"),e.notifyBLECharacteristicValueChange({state:!0,deviceId:this.deviceId,serviceId:this.serviceId,characteristicId:t,success:function(e){n.listenValueChange(),console.log("notifyBLECharacteristicValueChange success",e.errMsg)},fail:function(e){console.log("notifyBLECharacteristicValueChange fail",e.errMsg)}})},getBLEDeviceServices:function(){var t=this;console.log("获取到蓝牙所有的服务-deviceId----:",this.deviceId),setTimeout((function(){e.getBLEDeviceServices({deviceId:t.deviceId,success:function(e){console.log("获取到蓝牙所有的服务:",e),e.services.forEach((function(e){-1!=e.uuid.indexOf("FFE0")&&(t.serviceId=e.uuid,console.log("1800特征值",t.serviceId),t.getBLEDeviceCharacteristics())}))}})}),1e3)},strToHexCharCode:function(e){if(""===e)return"";var t=[];t.push("0x");for(var n=0;n<e.length;n++)t.push(e.charCodeAt(n).toString(16));return t.join("")},handleInToPay:function(){var t={deviceId:this.deviceId,serviceId:this.serviceId,unids:this.list[0].name.slice(4),characteristicId:this.characteristicId},n=JSON.stringify(t);e.navigateTo({url:"/pages/game/detail?param="+n})},writeBLECharacteristicValue:function(t){var n=this;return(0,s.default)(c.default.mark((function o(){var i,s,a,r,u,l,d;return c.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:for(console.log("这页面传入PCSS是唤醒功能",t),console.log("这页面传入PCSS是唤醒功能1",n.deviceId),console.log("这页面传入PCSS是唤醒功能2",n.serviceId),console.log("这页面传入PCSS是唤醒功能3",n.characteristicId),i=n.list[0].name.slice(4),s=t+i,a=new ArrayBuffer(s.length),r=new DataView(a),u=0;u<s.length;u++)r.setUint8(u,s.charAt(u).charCodeAt());l=n.ab2hex(a)+"0D0A",d=new Uint8Array(l.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer,console.log("这页面传入PCSS是唤醒功能3buffers",d),e.writeBLECharacteristicValue({deviceId:n.deviceId,serviceId:n.serviceId,characteristicId:n.characteristicId,value:d,success:function(t){console.log("写入成功",t),e.showToast({icon:"none",title:"开启成功"}),this.onBLEConnectionStateChange()},fail:function(e){console.log("写入失败1",JSON.stringify(e))}});case 13:case"end":return o.stop()}}),o)})))()},string2buffer:function(e){for(var t="",n=0;n<e.length;n++)""===t?t=e.charCodeAt(n).toString(16):t+=","+e.charCodeAt(n).toString(16);return console.log("16数据",t),new Uint8Array(t.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer},str2ab:function(e){for(var t=new ArrayBuffer(e.length/2),n=new Uint8Array(t),o=0;o<n.length;o++)n[o]=parseInt(e.substr(2*o,2),16);return t},ab2hex:function(e){var t=Array.prototype.map.call(new Uint8Array(e),(function(e){return e.toString(16).slice(-2)}));return t.join("")},hexCharCodeToStr:function(e){var t,n=e.trim(),o="0x"===n.substr(0,2).toLowerCase()?n.substr(2):n,i=o.length;if(i%2!==0)return alert("存在非法字符!"),"";for(var c=[],s=0;s<i;s+=2)t=parseInt(o.substr(s,2),16),c.push(String.fromCharCode(t));return c.join("")},listenValueChange:function(){var t=this;console.log("进去了吗"),t.showButton=!0,e.onBLECharacteristicValueChange((function(e){console.log("进去了吗1111",e);var n=t.ab2hex(e.value);console.log(n);var o=t.hexCharCodeToStr(n);console.log("最终结果",o)}))},openBluetoothAdapterPay:function(t){var n=this;"open"==t?e.openBluetoothAdapter({success:function(e){n.createorder("PBSS",1),setInterval((function(){n.createorder("PBSS",1)}),25e3),console.log("7777777")},fail:function(t){n.showButton=!1,e.showModal({title:"提示",content:"请开启蓝牙后，重新扫码"}),10001===t.errCode&&console.log("---------------")}}):n.createorder("PCSS",1)},createorder:function(t,n){var o=this;console.log("支付成功---999------------\x3e",o.list[0].name),e.request({url:"https://ys.shningmi.com/api/order/create",data:{guid:"guid",qty:n,address:"",latitude:"",longitude:"",device_id:o.list[0].name},header:{"Content-Type":"application/json",token:o.getUserInfo.data.token},method:"POST",success:function(n){console.log("支付成功---------------\x3e",n),e.requestPayment({provider:"wxpay",timeStamp:n.data.data.timeStamp,nonceStr:n.data.data.nonceStr,package:n.data.data.package,signType:n.data.data.signType,paySign:n.data.data.sign,success:function(e){console.log("支付成功",e),o.writeBLECharacteristicValue(t)},fail:function(e){console.log("支付失败",e)}})}})},onBLEConnectionStateChange:function(){e.onBLEConnectionStateChange((function(e){}))}}};t.default=a}).call(this,n(2)["default"],n(1)["default"])},71:function(e,t,n){"use strict";n.r(t);var o=n(72),i=n.n(o);for(var c in o)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=i.a},72:function(e,t,n){}},[[62,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
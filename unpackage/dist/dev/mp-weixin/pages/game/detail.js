(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/game/detail"],{73:function(e,t,n){"use strict";(function(e,t){var a=n(4);n(26);a(n(25));var r=a(n(74));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n(1)["default"],n(2)["createPage"])},74:function(e,t,n){"use strict";n.r(t);var a=n(75),r=n(77);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(80);var o,c=n(32),s=Object(c["default"])(r["default"],a["render"],a["staticRenderFns"],!1,null,"a290fbb6",null,!1,a["components"],o);s.options.__file="pages/game/detail.vue",t["default"]=s.exports},75:function(e,t,n){"use strict";n.r(t);var a=n(76);n.d(t,"render",(function(){return a["render"]})),n.d(t,"staticRenderFns",(function(){return a["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return a["recyclableRender"]})),n.d(t,"components",(function(){return a["components"]}))},76:function(e,t,n){"use strict";var a;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return o})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return a}));var r=function(){var e=this,t=e.$createElement;e._self._c},i=!1,o=[];r._withStripped=!0},77:function(e,t,n){"use strict";n.r(t);var a=n(78),r=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=r.a},78:function(e,t,n){"use strict";(function(e,a){var r=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(n(41)),o=r(n(43)),c={data:function(){return{p:{},taoNumber:1,disabled:!1,id:"",goods:n(79),code:"",getUserInfo:{},getUserInfoDataToken:!1,qty:1,deviceId:"",serviceId:"",unids:"",characteristicIdthis:""}},onLoad:function(t){if(t.param){var n=JSON.parse(t.param);this.deviceId=n.deviceId,this.serviceId=n.serviceId,this.unids=n.unids,this.characteristicId=n.characteristicId,console.log("====蓝牙传到商品页参数====>>>>>",n)}var a=e.getStorageSync("usersInfo");a&&(this.getUserInfo=JSON.parse(a),this.getUserInfo.data&&this.getUserInfo.data.userinfo&&(this.getUserInfoDataToken=!!this.getUserInfo.data.userinfo))},methods:{toPay:function(){1==this.taoNumber?this.qty=1:this.qty=2,this.createorder()},loginfn:function(){var e=this;a.login({success:function(t){e.code=t.code}})},onGetPhoneNumber:function(e){var t=this;return(0,o.default)(i.default.mark((function n(){var a,r,o,c;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:a=t,"getPhoneNumber:ok"===e.detail.errMsg&&(r=e.detail,o=r.iv,c=r.encryptedData,a.getawardDetail(a.code,c,o));case 2:case"end":return n.stop()}}),n)})))()},redu:function(){this.taoNumber<=1?this.taoNumber=1:this.taoNumber--},add:function(){this.taoNumber>=2?this.taoNumber=2:this.taoNumber++},createorder:function(){var t=this;return(0,o.default)(i.default.mark((function n(){var a;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:a=t,e.request({url:"http://ys.shningmi.com/api/order/create",data:{guid:"guid",qty:t.qty},header:{"Content-Type":"application/json",token:t.getUserInfo.data.token},method:"POST",success:function(t){console.log("微1122221信支付参数------",t.data.data.noncestr),console.log("微1333122221信支付参数------",t.data.data.signtype),e.requestPayment({provider:"wxpay",timeStamp:t.data.data.timeStamp,nonceStr:t.data.data.nonceStr,package:t.data.data.package,signType:t.data.data.signType,paySign:t.data.data.sign,success:function(e){console.log("支付成功",e),a.writeBLECharacteristicValue()},fail:function(e){console.log("支付失败",e)}})}});case 2:case"end":return n.stop()}}),n)})))()},writeBLECharacteristicValue:function(){var t=this,n=1==t.qty?"PBSS":"PASS";console.log("====蓝牙写入参数qtyString====>>>>>",n),console.log("====蓝牙写入参数unids====>>>>>",t.unids),console.log("====蓝牙写入参数deviceId====>>>>>",t.deviceId),console.log("====蓝牙写入参数characteristicId====>>>>>",t.characteristicId);for(var a=n+t.unids,r=new ArrayBuffer(a.length),i=new DataView(r),o=0;o<a.length;o++)i.setUint8(o,a.charAt(o).charCodeAt());var c=t.ab2hex(r)+"0D0A",s=new Uint8Array(c.match(/[\da-f]{2}/gi).map((function(e){return parseInt(e,16)}))).buffer;e.writeBLECharacteristicValue({deviceId:t.deviceId,serviceId:t.serviceId,characteristicId:t.characteristicId,value:s,success:function(t){console.log("写入成功",t),e.showToast({icon:"none",title:"开启成功"})},fail:function(e){console.log("写入失败1",JSON.stringify(e))}})},ab2hex:function(e){var t=Array.prototype.map.call(new Uint8Array(e),(function(e){return e.toString(16).slice(-2)}));return t.join("")},getawardDetail:function(t,n,a){var r=this;e.request({url:"http://ys.shningmi.com/api/login/login",data:{code:t,encryptedData:n,iv:a},header:{"Content-Type":"application/json"},method:"POST",success:function(t){var n=t.data;e.setStorageSync("usersInfo",JSON.stringify(n)),r.getUserInfo=JSON.parse(e.getStorageSync("usersInfo")),console.log("缓存数据------",r.getUserInfo.data),r.getUserInfo.data&&r.getUserInfo.data.userinfo&&(console.log("缓存数据------",r.getUserInfo.data.userinfo),r.getUserInfoDataToken=!!r.getUserInfo.data.userinfo)}})}}};t.default=c}).call(this,n(2)["default"],n(1)["default"])},80:function(e,t,n){"use strict";n.r(t);var a=n(81),r=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=r.a},81:function(e,t,n){}},[[73,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/game/detail.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-Home"],{"48a9":function(t,n,a){"use strict";var o=a("f972"),e=a.n(o);e.a},"4ab1":function(t,n,a){"use strict";var o;a.d(n,"b",(function(){return e})),a.d(n,"c",(function(){return i})),a.d(n,"a",(function(){return o}));var e=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"container"},[o("van-search",{attrs:{label:"关键词",placeholder:"请输入搜索关键词","use-action-slot":!0},on:{search:function(n){arguments[0]=n=t.$handleEvent(n),t.onSearch.apply(void 0,arguments)},change:function(n){arguments[0]=n=t.$handleEvent(n),t.query.apply(void 0,arguments)}},model:{value:t.value,callback:function(n){t.value=n},expression:"value"}},[o("v-uni-view",{attrs:{slot:"action"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onClick.apply(void 0,arguments)}},slot:"action"},[t._v("搜索")])],1),o("v-uni-scroll-view",{staticClass:"container-1",attrs:{"scroll-y":"true"},on:{scrolltolower:function(n){arguments[0]=n=t.$handleEvent(n),t.lower.apply(void 0,arguments)}}},[o("v-uni-view",{staticClass:"card-container"},t._l(t.list,(function(n,a){return o("v-uni-view",{key:n.id,staticClass:"home-column"},[t._l(t.dealingList,(function(n,e){return[e%2===a?o("v-uni-view",{key:n.id+"_0",class:"product-card column"+a},[o("v-uni-view",{staticClass:"product-pic-container",attrs:{"data-id":n.id},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onTappingCard.apply(void 0,arguments)}}},[o("img",{staticClass:"product-pic",attrs:{src:n.photo,mode:"widthFix"}})]),o("v-uni-view",{staticClass:"product-text"},[o("v-uni-text",{staticClass:"title"},[t._v(t._s(n.itemName)+"\\n")]),0===n.type?o("v-uni-view",[o("v-uni-view",{staticClass:"desc"},[t._v("出售")])],1):t._e(),1===n.type?o("v-uni-view",[o("v-uni-view",{staticClass:"desc"},[t._v("求购")])],1):t._e(),2===n.type?o("v-uni-view",[o("v-uni-view",{staticClass:"desc"},[t._v("交换")])],1):t._e(),2==n.type?o("v-uni-view",[o("v-uni-view",{staticClass:"price1"},[t._v(t._s(n.exchange))])],1):o("v-uni-view",{staticClass:"price-container"},[o("v-uni-text",{staticClass:"currency-tag"},[t._v("¥")]),o("v-uni-text",{staticClass:"price"},[t._v(t._s(n.price)+"\\n")])],1)],1)],1):t._e()]}))],2)})),1)],1),null!=t.userInfo?o("v-uni-view",{staticClass:"floating-cart"},[o("v-uni-image",{attrs:{src:a("6265"),mode:"widthFix"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.viewCart.apply(void 0,arguments)}}})],1):t._e()],1)},i=[]},6265:function(t,n){t.exports="data:image/png;base64,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"},"715d":function(t,n,a){var o=a("24fb");n=o(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.container[data-v-14076d30]{width:100%;height:100vh\r\n  /*background: #4cd964;*/}.container .container-1[data-v-14076d30]{background:#9acd32;width:100%;height:90vh}.container .container-1 .card-container[data-v-14076d30]{display:flex;flex-direction:row;background-color:#f5f5f5}.container .container-1 .card-container .home-column[data-v-14076d30]{width:50%}.container .container-1 .card-container .home-column .product-card[data-v-14076d30]{background-color:#fff;border:5px;border-radius:%?15?%;display:flex;flex-direction:column}.container .container-1 .card-container .home-column .product-card .product-pic-container[data-v-14076d30]{width:100%;display:flex;justify-content:center;align-items:center;margin-bottom:%?10?%}.container .container-1 .card-container .home-column .product-card .product-pic-container .product-pic[data-v-14076d30]{width:100%;background-size:cover;background-position:50%;border-radius:%?15?% %?15?% 0 0\r\n  /*和父容器.product-card保持一致*/}.container .container-1 .card-container .home-column .product-card .product-text[data-v-14076d30]{padding:%?15?% %?30?%}.container .container-1 .card-container .home-column .product-card .product-text .title[data-v-14076d30]{font-size:%?35?%;font-weight:700}.container .container-1 .card-container .home-column .product-card .product-text .price1[data-v-14076d30]{display:inline-block;border-radius:%?5?%;padding:0 %?7?%;border:%?1?% solid #ccc;color:#aaa;font-size:%?25?%;margin-top:%?5?%}.container .container-1 .card-container .home-column .product-card .product-text .desc[data-v-14076d30]{display:inline-block;font-size:13px;\r\n  /*color: #bbb;*/color:#d65655;padding:%?0?% %?8?%;border:%?1?% solid red;border-radius:%?5?%}.container .container-1 .card-container .home-column .product-card .product-text .price-container[data-v-14076d30]{margin-top:%?20?%}.container .container-1 .card-container .home-column .product-card .product-text .price-container .currency-tag[data-v-14076d30]{color:#e62e25;font-size:small}.container .container-1 .card-container .home-column .product-card .product-text .price-container .price[data-v-14076d30]{color:#e62e25;font-weight:700;font-size:1}.container .container-1 .card-container .home-column .column0[data-v-14076d30]{margin:%?20?% %?10?% %?20?% %?20?%}.container .container-1 .card-container .home-column .column1[data-v-14076d30]{margin:%?20?% %?20?% %?20?% %?10?%}.container .floating-cart[data-v-14076d30]{position:fixed;right:%?40?%;bottom:%?80?%;width:%?95?%;height:%?95?%;background-color:#df412c;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 15px 10px -15px #000}.container .floating-cart uni-image[data-v-14076d30]{width:60%}',""]),t.exports=n},"87f3":function(t,n,a){"use strict";a("4160"),a("ac1f"),a("1276"),a("159b"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a("5084"),e={name:"Home",components:{},data:function(){return{value:"",userInfo:null,dealingList:[],list:[{id:1},{id:2}],curpage:1,total:0}},methods:{onLoad:function(){this.getData(this.curpage)},getData:function(t){var n=this,a=uni.getStorageSync("userInfo");""!==a&&(this.userInfo=uni.getStorageSync("userInfo")),(0,o.getDealingList)(t).then((function(t){console.log("货物信息",t),n.total=t.total,t.data.forEach((function(t){t.photo=t.photo.split("`")[0],n.dealingList.push(t)}))})).catch((function(t){uni.showToast({title:"获取货物信息失败",icon:"none"})}))},query:function(t){t&&(this.value=t.detail)},lower:function(){console.log("触底了"),this.dealingList.length<this.total?this.getData(this.curpage+1):uni.showToast({title:"没有更多了！",icon:"error"})},toSearch:function(){""!==this.value?(uni.navigateTo({url:"/pages/search/Search?keyword=".concat(this.value)}),this.value=""):uni.showToast({title:"请输入关键词",icon:"error"})},onClick:function(){this.toSearch()},onSearch:function(){this.toSearch()},viewCart:function(){uni.navigateTo({url:"/pages/cart/Cart"})},onTappingCard:function(t){uni.navigateTo({url:"/pages/dealingDtail/DealDtail?id=".concat(t.currentTarget.dataset.id)})}}};n.default=e},8957:function(t,n,a){"use strict";a.r(n);var o=a("4ab1"),e=a("f81e");for(var i in e)"default"!==i&&function(t){a.d(n,t,(function(){return e[t]}))}(i);a("48a9");var c,r=a("f0c5"),d=Object(r["a"])(e["default"],o["b"],o["c"],!1,null,"14076d30",null,!1,o["a"],c);n["default"]=d.exports},f81e:function(t,n,a){"use strict";a.r(n);var o=a("87f3"),e=a.n(o);for(var i in o)"default"!==i&&function(t){a.d(n,t,(function(){return o[t]}))}(i);n["default"]=e.a},f972:function(t,n,a){var o=a("715d");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var e=a("4f06").default;e("24763da6",o,!0,{sourceMap:!1,shadowMode:!1})}}]);
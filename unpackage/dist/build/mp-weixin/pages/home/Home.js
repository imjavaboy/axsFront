(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/Home"],{"2df9":function(t,n,e){"use strict";var a=e("8ae9"),o=e.n(a);o.a},"37a7":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("5084"),o={name:"Home",components:{},data:function(){return{value:"",userInfo:null,dealingList:[],list:[{id:1},{id:2}],curpage:1,total:0}},methods:{onLoad:function(){this.getData(this.curpage)},getData:function(n){var e=this,o=t.getStorageSync("userInfo");""!==o&&(this.userInfo=t.getStorageSync("userInfo")),(0,a.getDealingList)(n).then((function(t){console.log("货物信息",t),e.total=t.total,t.data.forEach((function(t){t.photo=t.photo.split("`")[0],e.dealingList.push(t)}))})).catch((function(n){t.showToast({title:"获取货物信息失败",icon:"none"})}))},query:function(t){t&&(this.value=t.detail)},lower:function(){console.log("触底了"),this.dealingList.length<this.total?this.getData(this.curpage+1):t.showToast({title:"没有更多了！",icon:"error"})},toSearch:function(){""!==this.value?(t.navigateTo({url:"/pages/search/Search?keyword=".concat(this.value)}),this.value=""):t.showToast({title:"请输入关键词",icon:"error"})},onClick:function(){this.toSearch()},onSearch:function(){this.toSearch()},viewCart:function(){t.navigateTo({url:"/pages/cart/Cart"})},onTappingCard:function(n){t.navigateTo({url:"/pages/dealingDtail/DealDtail?id=".concat(n.currentTarget.dataset.id)})}}};n.default=o}).call(this,e("543d")["default"])},"471c":function(t,n,e){"use strict";(function(t){e("085c");a(e("66fd"));var n=a(e("8957"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"6dae":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var o=function(){var t=this,n=t.$createElement;t._self._c},i=[]},8957:function(t,n,e){"use strict";e.r(n);var a=e("6dae"),o=e("f81e");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("2df9");var c,u=e("f0c5"),r=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"9a89f238",null,!1,a["a"],c);n["default"]=r.exports},"8ae9":function(t,n,e){},f81e:function(t,n,e){"use strict";e.r(n);var a=e("37a7"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=o.a}},[["471c","common/runtime","common/vendor"]]]);
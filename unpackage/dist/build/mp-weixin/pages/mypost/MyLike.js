(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mypost/MyLike"],{1208:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("5084"),o={name:"MyLike",data:function(){return{posts:[]}},methods:{onLoad:function(){this.getData()},getData:function(){var n=this;(0,a.getMyLike)(t.getStorageSync("id")).then((function(t){200===t.code&&(n.posts=t.obj)})).catch((function(n){t.showToast({title:"获取点赞信息失败",icon:"error"})}))},toDeatil:function(n){var e=n.currentTarget.dataset.pid;t.navigateTo({url:"/pages/forumDetail/ForumDetail?pid=".concat(e,"&isMeLike=",1)})}}};n.default=o}).call(this,e("543d")["default"])},"2b57":function(t,n,e){"use strict";e.r(n);var a=e("1208"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=o.a},"3bef":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}));var o=function(){var t=this,n=t.$createElement,e=(t._self._c,t.posts.length>0?t.__map(t.posts,(function(n,e){var a=t.__get_orig(n),o=""!==n.photo?n.photo.split("`"):null;return{$orig:a,l0:o}})):null);t.$mp.data=Object.assign({},{$root:{l1:e}})},u=[]},c8d7:function(t,n,e){},d7af:function(t,n,e){"use strict";(function(t){e("085c");a(e("66fd"));var n=a(e("f0a0"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},e149:function(t,n,e){"use strict";var a=e("c8d7"),o=e.n(a);o.a},f0a0:function(t,n,e){"use strict";e.r(n);var a=e("3bef"),o=e("2b57");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("e149");var r,i=e("f0c5"),c=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,"56f44eca",null,!1,a["a"],r);n["default"]=c.exports}},[["d7af","common/runtime","common/vendor"]]]);
<script>
    import {login} from "./api/require";
	export default {
        globalData: {
            userInfo:null,
            loginAccount:1,
            dealingId: null,
            postingId: null,
            dealingSearch: null,
            shopId: null,
            userImg: null,
            chatWho: null,
            shopIsMine: false,
            dealIsEdit: false,
            editDealingId: null,
            postIsEdit: false,
            editPostingId: null,
            isBuying: false,
            viewBuyingId: null,
            viewPostType: 0,
        },
        onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
            const userInfo = uni.getStorageSync("userInfo");
            // if ( userInfo !== ""){
            //     this.globalData.userInfo = userInfo;
            // }else{
            //     wx.getUserProfile({
            //         desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            //         success: (res) => {
            //             console.log(res);
            //             //获取用户信息
            //             this.globalData.userInfo = res.userInfo
            //             wx.login({
            //                 success: res => {
            //                     // 发送 res.code 到后台换取 openId, sessionKey, unionId
            //                     // console.log("code",res);
            //                     // console.log(this.userInfo,"1111")
            //                     if (res.code) {
            //                         //发起网络请求
            //                         const  userInfo = this.globalData.userInfo
            //                         console.log("是世界上",userInfo)
            //                         login({
            //                             code: res.code ,//将code发给后台拿token
            //                             nickName: userInfo.nickName,
            //                             city:userInfo.city,
            //                             avatarUrl:userInfo.avatarUrl,
            //                             gender:userInfo.gender
            //                         }).then(res=>{
            //                             console.log("hello",res);
            //                             this.globalData.loginAccount = res.obj.account.id;
            //                             this.globalData.userInfo = res.obj.account;
            //                             uni.setStorageSync('token', res.obj.token);
            //                             console.log(this.userInfo)
            //                             uni.setStorageSync("userInfo",this.globalData.userInfo)
            //                         }).catch(e=>{
            //                             console.log(e)
            //                         })
            //
            //                     } else {
            //                         uni.showToast({
            //                             title:"登陆失败",
            //                             icon:"none"
            //                         })
            //                         // console.log('获取用户登录态失败！' + res.errMsg)
            //                     }
            //                 }
            //             })
            //         }
            //     });
            //
            // }
			// console.log('App Show',uni.getStorageSync("userInfo"))

		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	/*每个页面公共css */
    @import "./wxcomponents/vant/common/index.wxss";
</style>

<template>
    <div class="box">

        <view class="userinfo-container" @click="toEdit" v-if="userInfo !== null">
            <view class="userinfo-container-info">
                <image class="userimage" :src="userInfo.headimg" />
                <text class="username">{{userInfo.username}}</text>
            </view>
            <view class="userinfo-container-arrow">
                <image src="../../static/avatars/youjiantou.png"></image>
            </view>
        </view>

        <view class="userinfo-container" @click="getUserProfile" v-else>
            <view class="userinfo-container-info">
                <image class="userimage" src="../../static/avatars/user.png" />
                <text class="username">点击登录</text>
            </view>
            <view class="userinfo-container-arrow">
                <image src="../../static/avatars/youjiantou.png"></image>
            </view>
        </view>

        <!-- 第二部分 -->
        <view class="my-trans">
            <text class="deal">我的交易</text>
            <view class="my-trans-items-container" >
                <view class="icon-item-container" @click="toShop">
                    <image class="my-trans-icon" src="../../static/icon/newss.png" />
                    <text class="item-desc">我发布的</text>
                </view>
                <view class="icon-item-container" @click="toOrder">
                    <image class="my-trans-icon" src="../../static/icon/packagee.png" />
                    <text class="item-desc">我购买的</text>
                </view>
                <view class="icon-item-container" @click="toSale">
                    <image class="my-trans-icon" src="../../static/icon/soldd.png" />
                    <text class="item-desc">我出售的</text>
                </view>
                <view class="icon-item-container" @click="toCollection">
                    <image class="my-trans-icon" src="../../static/icon/starrr.png" />
                    <text class="item-desc">我收藏的</text>
                </view>
            </view>
        </view>

        <!-- 第四部分 -->
        <view class="my-forum">
            <text class="deal">我的帖吧</text>
            <view class="list-container">
                <view class="list-item" @click="toMyPost">
                    <view class="list-item-left">
                        <image src="../../static/icon/mypost_user.png" class="list-icon" />
                    </view>
                    <view class="list-item-right with-bottom-border">
                        <text class="item-title">我的帖子</text>
                    </view>
                </view>
                <view class="list-item" @click="toMyLike">
                    <view class="list-item-left">
                        <image src="../../static/icon/thumb_user.png" class="list-icon"> </image>
                    </view>
                    <view class="list-item-right with-bottom-border">
                        <text class="item-title">我点赞的</text>
                    </view>
                </view>
                <view class="list-item" @click="toMyComment">
                    <view class="list-item-left">
                        <image src="../../static/icon/mycomment_user.png" class="list-icon"> </image>
                    </view>
                    <view class="list-item-right with-bottom-border">
                        <text class="item-title">我评论的</text>
                    </view>
                </view>

                <view class="list-item" @click="toMyComment">
                    <view class="list-item-left">
                        <image src="../../static/avatars/yonghuguifan.png" class="list-icon"> </image>
                    </view>
                    <view class="list-item-right with-bottom-border">
                        <text class="item-title">用户规范</text>
                    </view>
                </view>
                <view class="list-item" @click="toMyComment">
                    <view class="list-item-left">
                        <image src="../../static/avatars/guanyu.png" class="list-icon"> </image>
                    </view>
                    <view class="list-item-right">
                        <text class="item-title">关于我们</text>
                    </view>
                </view>

            </view>
        </view>


        <view class="floating-cart" v-if="userInfo != null" @click="toCart">
            <image src="../../static/icon/cart.png"></image>
        </view>
    </div>
</template>

<script>
    import {login,getAccount} from "../../api/require";

    export default {
        name: "List",
        data(){
            return{
                user:{},
                userInfo:null,

            }
        },
        methods:{
            toEdit(){

            },
            onShow(){
                const userInfo = uni.getStorageSync('userInfo')
                if (userInfo !== '') {
                   this.userInfo = uni.getStorageSync('userInfo')
               }
            },
            toLogin(){
                uni.navigateTo({
                    url:'/pages/login/Login'
                })
            },
            // 登录

            getUserProfile(e) {
                // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
                wx.getUserProfile({
                    desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    success: (res) => {
                        console.log(res);
                        //获取用户信息
                        this.userInfo = res.userInfo
                        getApp().globalData.userInfo = this.userInfo
                        console.log("哈哈",getApp().globalData.userInfo);
                        this.sendToBack()
                    }
                });
            },
            sendToBack(){
                wx.login({
                    success: res => {
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        console.log("code",res);
                        // console.log(this.userInfo,"1111")
                        if (res.code) {
                            //发起网络请求
                            login({
                                code: res.code ,//将code发给后台拿token
                                nickName: this.userInfo.nickName,
                                city:this.userInfo.city,
                                avatarUrl:this.userInfo.avatarUrl,
                                gender:this.userInfo.gender
                            }).then(res=>{
                                console.log("hello",res)
                                uni.setStorageSync('token', res.obj.token);
                                console.log(this.userInfo)
                                uni.setStorageSync("userInfo",res.obj.account)
                                uni.setStorageSync("id",res.obj.account.id)

                            }).catch(e=>{
                                console.log(e)
                            })

                        } else {
                            uni.showToast({
                                title:"登陆失败",
                                icon:"none"
                            })
                            // console.log('获取用户登录态失败！' + res.errMsg)
                        }
                    }
                })
            },
            getAccoId(){
                getAccount(1).then(res=>{
                    console.log("用户信息",res)
                })
            },

            toShop(){
                if(this.userInfo === null){
                    uni.showToast({
                        title:'请先登录',
                        icon:'error'
                    })
                    return;
                }
                uni.navigateTo({
                    url:`/pages/shop/Shop?uid=${uni.getStorageSync('id')}`
                })

            },
            toOrder(){
                if(this.userInfo === null){
                    uni.showToast({
                        title:'请先登录',
                        icon:'error'
                    })
                    return;
                }
                uni.navigateTo({
                    url:'/pages/order/OrderList'
                })
            },
            toSale(){
                if(this.userInfo === null){
                    uni.showToast({
                        title:'请先登录',
                        icon:'error'
                    })
                    return;
                }
                uni.navigateTo({
                    url:'/pages/sell/MySell'
                })
            },
            toCollection(){
                if(this.userInfo === null){
                    uni.showToast({
                        title:'请先登录',
                        icon:'error'
                    })
                    return;
                }
                uni.navigateTo({
                    url:'/pages/collect/MyCollect'
                })
            },
            toMyPost(){
                if(this.userInfo === null){
                    uni.showToast({
                        title:'请先登录',
                        icon:'error'
                    })
                    return;
                }
                uni.navigateTo({
                    url:'/pages/mypost/MyPosting'
                })

            },
            toMyLike(){
                if(this.userInfo === null){
                    uni.showToast({
                        title:'请先登录',
                        icon:'error'
                    })
                    return;
                }
                uni.navigateTo({
                    url:'/pages/mypost/MyLike'
                })
            },
            toMyComment(){
                if(this.userInfo === null){
                    uni.showToast({
                        title:'请先登录',
                        icon:'error'
                    })
                    return;
                }
                uni.navigateTo({
                    url:'/pages/mypost/MyComment'
                })
            },
            toCart(){
                if(this.userInfo === null){
                    uni.showToast({
                        title:'请先登录',
                        icon:'error'
                    })
                    return;
                }
                uni.navigateTo({
                    url:'/pages/cart/Cart'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.box{
    width: 100%;
    height: 100vh;
    background: #ccc;
    padding-top: 20rpx;
    .userinfo-container{
        width: 96%;
        /* padding: 0 3%; */
        height: 30vw;
        background-color: #fefefe;
        border-radius: 24rpx;
        /*  阴影 */
        box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.15);
        margin: 0rpx 2% 0rpx 2%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: white;

        .userinfo-container-info{
            display: flex;
            flex-direction: row;
            align-items: center;
            .username{
                margin-left: 30rpx;
            }
            .userimage {
                overflow: hidden;
                border-radius: 50%;
                width: 120rpx;
                height: 120rpx;
                margin: 10rpx;
            }
            .username {
                font-weight: normal;
                font-size: 35rpx;
            }

        }
        .userinfo-container-arrow{
            image{
                width: 50rpx;
                height: 50rpx;
                margin-right: 30rpx;
            }
        }
    }
    .deal {
        margin-left: 50rpx;
        margin-bottom: 20rpx;
        font-weight: bold;
        font-size: 30rpx;
        color: #333333;
    }
    .my-trans{
        width: 96%;
        /* padding: 0 3%; */
        height: 28vw;
        background-color: #fefefe;
        border-radius: 24rpx;
        /*  阴影 */
        box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.15);
        margin: 20rpx 2% 0rpx 2%;
        /*margin: 20rpx 0;*/
        padding: 30rpx 0;

        .my-trans-items-container{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 10rpx 0;
            .icon-item-container{
                display: flex;
                flex-direction: column;
                width: 22%;
                justify-content: center;
                align-items: center;
                .my-trans-icon{
                    margin: 18rpx;
                    width: 65rpx;
                    height: 65rpx;
                }
                .item-desc{
                    font-size: 24rpx;
                    color: rgb(50,50,50);
                }


            }

        }







    }
    .my-forum{
        width: 96%;
        /* padding: 0 3%; */
        height: 70vw;
        background-color: #fefefe;
        border-radius: 24rpx;
        /*  阴影 */
        box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.15);
        margin: 20rpx 2% 0rpx 2%;
        background-color: white;
        /*margin: 20rpx 0;*/
        padding: 25rpx 0 5rpx 0;
        .list-container{
            margin-left: 60rpx;
            margin-top: 15rpx;
            .list-item{
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 5rpx 0;
                width: 100%;
                .list-item-left{
                    align-items: center;
                    .list-icon{
                        width: 50rpx;
                        height: 50rpx;
                        margin-left: 2rpx;
                    }
                }

                .list-item-right{
                    display: flex;
                    align-items: center;
                    margin-left: 25rpx;
                    color: rgb(25,25,25);
                    width: 80%;
                    padding: 20rpx 0;
                    font-size: 30rpx;
                }

                .with-bottom-border{
                    border-bottom: solid 0.1rpx rgb(232,232,232);
                }
            }
        }

    }
    .floating-cart{
        position: fixed;
        right: 40rpx;
        bottom: 80rpx;
        width: 95rpx;
        height: 95rpx;
        background-color: rgb(223, 65, 44);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow:0px 15px 10px -15px #000;
        image{
            width: 60rpx;
            height: 60rpx;
        }
    }



}
</style>

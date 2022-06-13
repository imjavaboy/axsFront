<template>
    <view>
        <view class="parent-container">
            <view class="page-section-spacing">
                <swiper class="swiper" indicator-dots autoplay circular >
                    <swiper-item v-for="itemPicUrl in dealingImgArr" :key="itemPicUrl">
                       <image :src="itemPicUrl" mode="scaleToFill"></image>
                    </swiper-item>
                </swiper>
            </view>

            <view class="desc-card">
                <text class="title">{{item.itemName}}\n</text>
                <block v-if="item.type !== 2">
                    <text class="price">{{item.price}}  元\n</text>
                </block>
                <block v-else>
                    <van-icon name="exchange" color="red" size="20px" />
                    <text class="price"> {{item.exchange}}</text>
                </block>
                <view class="desc-brief">
                    <view class="desc-title"> 商品类别:
                        <span style="display: inline-block;width: 10rpx"></span>
                        <text class="desc-context"> {{item.category}} \n </text>
                    </view>

                    <view class="desc-title"> 剩余件数:
                        <span style="display: inline-block;width: 10rpx"></span>
                        <text class="desc-context"> {{item.status}} \n </text>
                    </view>

                </view>

                <view class="user-block">
                    <image class="userinfo-avatar" :src="item.headimg" ></image>
                    <text class="userinfo-username">{{item.username}}</text>
                </view>

                <view class="block">
                    <view class="detail-block">简介:
                        <span style="display: inline-block;width: 20rpx"></span>
                        <text>{{      item.content}}</text>
                    </view>

                    <view class="time-block">发布时间：
                        <span style="display: inline-block;width: 20rpx"></span>
                        <text> {{   item.time}} </text>
                    </view>
                </view>
            </view>
        </view>
        <view style="height: 50rpx;background: #ccc"></view>
        <view class="bottom-bar">
            <van-goods-action>
                <block v-if="loginUserInfo === ''">
                    <van-goods-action-icon icon="chat-o" @click="showLoginTip" text="联系发布者" />
                </block>
                <block v-else>
                    <van-goods-action-icon icon="chat-o" @click="contact" text="联系发布者" />
                </block>
                <van-goods-action-icon icon="home-o" text="进店" :data-shop="item.uid" @click="enterShop" />
                <block v-if="loginUserInfo === ''">
                    <van-goods-action-icon icon="star-o" text="收藏" @click="showLoginTip" />
                </block>
                <block v-else-if="isCollected === false">
                    <van-goods-action-icon icon="star-o" text="收藏" :data-id="item.id" @click="doCollect" />
                </block>
                <block v-else>
                    <van-goods-action-icon icon="star" color="yellow" text="取消收藏" class="selected" :data-id="item.id" @click="dontCollect" />
                </block>
                <block v-if="loginUserInfo === ''">
                    <van-goods-action-button
                            text="加入购物车"
                            type="warning"
                            @click="showLoginTip"
                    />
                </block>
                <block  v-else-if="isInCart === false">
                    <van-goods-action-button
                            text="加入购物车"
                            type="warning"
                            @click="onCartButton"
                    />
                </block>
                <block v-else>
                    <van-goods-action-button
                            text="移出购物车"
                            type="warning"
                            @click="onCartOffButton"
                    />
                </block>
                <block v-if="loginUserInfo !== ''">
                    <van-goods-action-button text="立即购买" @click="onBuyButton" />
                </block>
                <block v-else>
                    <van-goods-action-button text="立即购买" @click="showLoginTip" />
                </block>
            </van-goods-action>
        </view>
        <van-dialog id="van-dialog" />
    </view>
</template>

<script>
    import Dialog from "../../wxcomponents/vant/dialog/dialog";
    import {getDealingDetail, insertBuying, isCollect, collectDeal, noCollect, outCart} from './../../api/require'
    import {inCart, isInCart} from "../../api/require";
    export default {
        name: "DealDetail",
        props:{

        },
        data(){
            return{
                item: {},
                dealId:0,
                dealingImgArr:[],
                userimg: "",
                nickname: "",
                isCollected: false,
                isInCart:false,
                loginUserInfo:null,
            }
        },
        methods:{
            onLoad(options){
                // console.log("商品id",options)
                this.dealId = options.id;
                this.loginUserInfo = uni.getStorageSync("userInfo")
                const uid = uni.getStorageSync("id")
                if(this.loginUserInfo !== ""){
                    isCollect(uid,this.dealId).then(res=>{
                        // console.log(res)
                        this.isCollected = res.obj.isCollect;
                    })
                    isInCart(uid,this.dealId).then(res=>{
                        this.isInCart = res.obj.isInCart
                    })
                }

            },
            onShow(options){
                this.userInfo = uni.getStorageSync("userInfo");
                //获取物品详情
                getDealingDetail(this.dealId).then(res=>{
                    console.log("物品详情",res.obj);
                    this.item = res.obj;
                    this.dealingImgArr = res.obj.photo.split('`');
                }).catch(err=>{
                    uni.showToast({
                        title:'获取物品详情失败',
                        icon:'error'
                    })
                })
            },
            showLoginTip(){
                uni.showToast({
                    title:'请先登录',
                    icon:'error'
                })
            },
            contact(){
                uni.navigateTo({
                    url:`/pages/chatDetail/ChatDeatil?sendto=${this.item.uid}&username=${this.item.username}`
                })

            },
            enterShop(e){
                uni.navigateTo({
                    url:`/pages/shop/Shop?uid=${e.currentTarget.dataset.shop}`
                })
            },
            doCollect(){
                const dealingId = this.dealId;
                const uid = uni.getStorageSync('id')
                collectDeal({
                    uid,dealingId
                }).then(res=>{
                    console.log("收藏结果",res)
                    if (res.code === 200){
                        uni.showToast({
                            title:'收藏成功',
                            icon:'success'
                        })
                        this.isCollected = true
                    }
                }).catch(error=>{
                    uni.showToast({
                        title:'收藏失败',
                        icon:'error'
                    })
                })

            },
            dontCollect(){
                const dealingId = this.dealId;
                const uid = uni.getStorageSync('id')
                noCollect({
                    uid,dealingId
                }).then(res=>{
                    if (res.code === 200){
                        uni.showToast({
                            title:'取消收藏成功',
                            icon:'success'
                        })
                        this.isCollected = false
                    }
                }).catch(err=>{
                    uni.showToast({
                        title:'取消收藏失败',
                        icon:'error'
                    })
                })

            },
            onCartButton(){
                // console.log("加入购物车");
                inCart({
                    uid:uni.getStorageSync("id"),
                    dealingId:this.dealId
                }).then(res=>{
                    if (res.code === 200){
                        uni.showToast({
                            title:'加入购物车成功',
                            icon:'success'
                        })
                        this.isInCart= true
                    }else{
                        uni.showToast({
                            title:'加入购物车失败',
                            icon:'success'
                        })
                    }
                })
            },
            onBuyButton(){
                const uid = this.loginUserInfo.id;
                const dealingId = this.dealId;
                const status = 0;
                const havUserId = this.item.uid;
                const itemName = this.item.itemName
                const data = {
                    uid,
                    dealingId,
                    status,
                    havUserId,
                    itemName
                }
                console.log("购买信息",data)
                insertBuying(data).then(res=>{
                    console.log(res)
                    if (res.code === 200){
                        Dialog.alert({
                            title: '购买成功',
                            message: '请联系发布者请求线下交易',
                        }).then(() => {
                            // on close
                        });

                    }
                }).catch(err=>{
                    uni.showToast({
                        title:'购买失败',
                        icon:'error'
                    })
                })

            },
            onCartOffButton(){
                console.log("移除购物车")
                outCart(uni.getStorageSync("id"),this.dealId).then(res=>{
                   if (res.code === 200){
                       uni.showToast({
                           title:'移除成功',
                           icon:'success'
                       })
                       this.isInCart = false
                   }else {
                       uni.showToast({
                           title:'移除失败',
                           icon:'error'
                       })
                   }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .selected{
        color: red;
    }
.parent-container{
    background: #cccccc;
    height: 100vh;
    .page-section-spacing{
        width: 96%;
        margin: 5rpx auto;
        border-radius: 20rpx;
        overflow: hidden;
       .swiper{
           height: 400upx;
           swiper-item {
               display: block;
               line-height: 300upx;
               text-align: center;
               image{
                   width:100%;
                   height:400upx;
               }
           }
       }
    }
    .desc-card {
        padding: 50rpx ;
        margin: 20rpx;
        border-radius: 20rpx;
        background-color: white;
        .title{
            font-size: 22px;
            font-weight: bold;
            padding: 5rpx 0 5rpx 0;
        }
        .price{
            font-size: 22px;
            font-weight: bold;
            padding: 5rpx 0 5rpx 0;
            color: #E62E25;
        }
        .desc-brief {
           background: #ccc;
            border-radius: 15rpx;
            padding: 20rpx 35rpx;
            margin: 20rpx 0 10rpx 0;
            text{
                font-size: 25rpx;
            }

            .desc-title{
                color: rgb(135, 135, 135);
                .desc-context{
                    color: black;
                    font-size: 30rpx;
                }
            }
        }
        .user-block{
            display: flex;
            flex-direction: row;
            align-items: center;
            margin:0 0 10rpx 0;
            .userinfo-avatar {
                overflow: hidden;
                width:60rpx;
                height: 60rpx;
                margin: 20rpx;
                border-radius: 30rpx;
            }
            .userinfo-username{
                font-size: 35rpx;
                padding-left: 10rpx;
                color:#aaa;
            }
        }
       .block{
           /*background: red;*/
           background: #eee;
           border-radius: 20rpx;
           border: 1rpx solid #ccc;
           padding: 10rpx 20rpx;
           .detail-block{
               margin: 10rpx 0;
               padding: 5rpx 0;
           }
           .time-block{
               padding: 5rpx 0;
           }
       }

    }
}
.bottom-bar {
    /* display: flex; */
    background: #4cd964;
    margin-top: 10rpx;
    /*height: 80rpx;*/
}

</style>

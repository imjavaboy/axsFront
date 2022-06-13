<template>
   <div class="container">
       <view v-for="(order,index) in orderList" :key="order.id" class="box">
           <view class="order-item-block" :data-id="order.id" @tap="viewDetail">
               <view v-if="order.buyingStatus === 2 || order.buyingStatus === 4">
                   <view class="state-stamp">
                       <image src="../../static/icon/finished.png"/>
                   </view>
               </view>
               <view class="publisher-block">
                   <img :src="order.headimg" alt="">
                   <view> {{order.username}} </view>
               </view>
               <view class="detail-container">
                   <text class="item-title"> {{order.itemName}} </text>
                   <view class="price-block">
                       <text class="curruncy-tag">¥</text>
                       <text class="pricetag"> {{order.price}}</text>
                   </view>
               </view>
               <view class="item-block">
                   <view class="image-container" v-for="po in order.photo.split('`')" :key="po">
                       <image :src="po" class="item-img"/>
                   </view>

               </view>
               <view class="state-bar">
                   <view v-if="order.buyingStatus === 0 " class="status-box">
                       <view class="state-title">状态: </view>
                       <view class="wait-text">等待商家确认</view>
                   </view>
                   <view v-if="order.buyingStatus === 1" class="status-box">
                       <view class="state-title">状态: </view>
                       <view class="wait-text">等待商家发货</view>
                   </view>
                   <view v-if="order.buyingStatus === 2" class="status-box">
                       <view class="state-title">状态: </view>
                       <view class="error-text">商家已拒绝</view>
                   </view>
                   <view v-if="order.buyingStatus === 3" class="status-box">
                       <button class="single-button" @click.stop="confirm"  :data-bid="order.bid" :data-did="order.id">确认收货</button>
                   </view>
                   <view v-if="order.buyingStatus === 4" class="status-box">
                       <view class="state-title">状态: </view>
                       <view class="success-text">完成</view>
                   </view>
               </view>
           </view>
       </view>
   </div>
</template>

<script>
    import {editStatus, getMyPurchase} from "../../api/require";
    import Dialog from "../../wxcomponents/vant/dialog/dialog";

    export default {
        name: "OrderList",
        data(){
            return{
                orderList:[]
            }
        },
        methods:{
            onLoad(){
                this.getData()
            },

            getData(){
                const uid = uni.getStorageSync("id");
                getMyPurchase(uid).then(res=>{
                    this.orderList = res.obj;
                })
            },
            viewDetail(event){
                uni.navigateTo({
                    url:`/pages/dealingDtail/DealDtail?id=${event.currentTarget.dataset.id}`
                })
            },
            confirm(event){
                const bid = event.currentTarget.dataset.bid;
                const did = event.currentTarget.dataset.did;
                editStatus({id:bid,status:4,dealingId:did}).then(res=>{
                    if (res.code === 200){
                        Dialog.alert({
                            title: '确认收货成功',
                        }).then(() => {
                            // on close
                        });
                        this.getData()
                    }
                })
            },

        }
    }
</script>

<style scoped lang="scss">
    .container{
        width: 100%;
        height: 100vh;
        background: #ccc;
        padding-top: 10rpx;

        .box{
            background: #ccc;
            width: 100%;

            .order-item-block{
                position: relative;
                padding: 3% 5%;
                background-color: white;
                margin: 12rpx 20rpx 6rpx 20rpx;
                border-radius: 20rpx;
                .state-stamp {
                    position: absolute;
                    right: 40rpx;
                    top: 40rpx;
                    image{
                        width: 125rpx;
                        height: 125rpx;
                    }
                }

                .publisher-block {
                    display: flex;
                    justify-content: left;
                    font-size: 35rpx;
                    margin-bottom: 10rpx;
                    color: rgb(38, 38, 38);
                    img{
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 30rpx;
                        margin-right: 10rpx;
                    }
                }
                .detail-container{
                    display: flex;
                    justify-content: space-between;
                    margin-left: 30rpx;
                    margin-bottom: 5rpx;
                    .item-title{
                        font-weight: bold;
                        font-size: 35rpx;
                        color: rgb(38, 38, 38);
                    }
                    .curruncy-tag {
                        font-weight: bold;
                        font-size: 25rpx;
                        color: rgb(223, 46, 49);
                    }

                    .pricetag {
                        font-weight: bold;
                        color: rgb(223, 46, 49);
                    }

                }
                .item-block{
                    display: flex;
                    flex-direction: row;
                    margin: 10rpx 0;
                    /* justify-content: space-between; */
                    .item-img{
                        width: 215rpx;
                        height: 215rpx; /*750rpx代表屏幕宽度, 这个数值略小于1/3屏幕宽度*/
                        padding: 5rpx;
                        background-color: null;
                        border-radius: 25rpx;
                    }
                }
                .state-bar{
                    margin-top: 10rpx;
                    font-size: 30rpx;
                    padding-left: 5rpx;
                    .status-box{
                        display: flex;
                        justify-content: left;
                        align-items: center;
                        .state-title{
                            color: black;
                            margin-right: 10rpx;
                        }
                        .wait-text {
                            color: grey
                        }

                        .error-text {
                            color: red
                        }
                        .success-text{
                            color: green;
                        }
                        .single-button {
                            background: white;
                            border: solid thin rgba(38,38,38,0.32);
                            font-size: 25rpx;
                            border-radius: 50rpx;
                            color: rgb(38,38,38);
                            margin: 0 0 0 auto ;
                            width: 165rpx;
                        }
                    }

                }
            }


        }



    }


</style>

<template>
   <div class="container">
       <div v-if="items.length > 0">
           <div class="box">
               <checkbox-group bindchange="onCheckChange">
                   <block v-for="(item,index) in items" :key="item.id">
                       <view class="cart-item-block">
                           <view class="publisher-block">
                               <img :src="item.headimg" alt="">
                               <view class="block-right">
                                   <view class="time">{{item.time}}</view>
                                   <view>{{item.username}}</view>
                               </view>
                           </view>
                           <van-divider />
                           <view class="detail-container">
                               <text class="item-title">{{item.itemName}}</text>
                               <view class="price-block">
                                   <text class="curruncy-tag">¥</text>
                                   <text class="pricetag">{{item.price}}</text>
                               </view>
                           </view>
                           <view class="item-block">
                               <view class="image-container" v-for="it in item.photo.split('`')" :key="it">
                                   <image :src="it" class="item-img"></image>
                               </view>
                               <view class="checkbox-container">
                                   <van-checkbox
                                           :value="item.checked"
                                           :data-index="index"
                                           @change="onChange"></van-checkbox>
                               </view>
                           </view>
                       </view>
                   </block>
               </checkbox-group>
               <view class="btm-button-block">
                   <button class="out-button" @tap.stop="outCarto">移出</button>
                   <button class="proceed-button" @tap="checkCart">结算</button>
               </view>
               <view class="prop-for-bottom-bar">
                   <image class="transparent-image"></image>
               </view>
           </div>
       </div>
       <div v-else>
           <view class="card-container">
               <view class="sorry">
                   <image src="../../static/icon/sorry.png" class="sorryimg" mode="widthFix"></image>
                   <view class="sorrytxt">
                       <text>
                           您的购物车空空如也
                       </text>
                   </view>
               </view>
           </view>
       </div>
       <van-dialog id="van-dialog" />
   </div>
</template>

<script>
    import {insertBuying, myCart, outCart} from "../../api/require";
    import Dialog from "../../wxcomponents/vant/dialog/dialog";

    export default {
        name: "Cart",
        data(){
            return{
                items:[],
                selectedIndex: [],
                ids:[]
            }
        },
        methods:{
            onLoad(){
                this.getData()
            },

            getData(){
                myCart(uni.getStorageSync('id')).then(res=>{
                    // console.log("我的购物车",res)

                   res.obj.forEach(item=>{
                       item.checked = false
                   })
                    this.items = res.obj
                })
            },
            onChange(event) {
                this.items[event.currentTarget.dataset.index].checked=event.detail;
            },
            checkeIsone(){
                for(const item of this.items){
                    if (item.checked === true){
                        this.ids.push(item.id);
                    }
                }
            },
           async outCarto(){
                this.checkeIsone();
                if (this.ids.length === 0){
                    uni.showToast({
                        title:'请至少选择一件物品',
                        icon:'error'
                    })
                    return;
                }
                const uid = uni.getStorageSync('id')
               let res = null;
                for (const item of this.ids) {
                        res = await  outCart(uid,item);
                }
               // console.log("promise",res)
                if (res.code === 200){
                    this.getData()
                    uni.showToast({
                        title:"移除成功",
                        icon:"success"
                    })
                }

           },
           async checkCart(){
                this.checkeIsone();
                if (this.ids.length === 0){
                    uni.showToast({
                        title:'请至少选择一件物品',
                        icon:'error'
                    })
                    return;
                };
                let res = null;
                for (const item of this.items){

                    if (item.checked === true){
                        const uid = uni.getStorageSync('id');
                        const dealingId = item.id;
                        const status = 0;
                        const havUserId = item.uid;
                        const itemName = item.itemName
                        const data = {
                            uid,
                            dealingId,
                            status,
                            havUserId,
                            itemName
                        }
                        console.log(data)
                        res = await insertBuying(data)
                    }
                }
               console.log(res)
                if (res.code === 200){
                    Dialog.alert({
                        title: '购买成功',
                        message: '请联系发布者请求线下交易',
                    }).then(() => {
                        // on close
                    });
                    this.getData()
                }
            }

        }
    }
</script>

<style scoped lang="scss">
    .container{
        width: 100%;
        height: 100vh;
        background: #cccccc;
    }
    .curruncy-tag {
        font-weight: bold;
        font-size: 25rpx;
        color: rgb(223, 46, 49);
    }
    .card-container{
        display: flex;
        flex-direction: row;
        background-color: whitesmoke;
        height: 100vh;
        .sorry{
            width: 100%;
            height: 60vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background-color: whitesmoke;
            image{
                width: 200rpx;
                height: 200rpx;
            }
            .sorrytxt{
                text-align: center;
                color: #8a8a8a;
                font-size: 40rpx;
            }
        }
    }

    .pricetag {
        font-weight: bold;
        color: rgb(223, 46, 49);
    }

    .cart-item-block{
        padding: 3% 5%;
        background-color: white;
        margin: 0 20rpx 20rpx 20rpx;
        border-radius: 20rpx;
    }

    .item-img{
        width: 215rpx;
        height: 215rpx; /*750rpx代表屏幕宽度, 这个数值略小于1/3屏幕宽度*/
        padding: 5rpx;
        background-color: null;
        border-radius: 25rpx;
    }

    .box{
        background: #ccc;
        width: 100%;
        height: 100%;
        padding-top:20rpx ;
    }
    .publisher-block {
        display: flex;
        justify-content: left;
        align-items: center;
        img{
            width: 70rpx;
            height: 70rpx;
            border-radius: 35rpx;
            overflow: hidden;
        }
        .block-right{
            margin-left: 30rpx;
            display: flex;
            justify-content: center;
            align-items:flex-start;
            flex-direction: column;
            .time{
                font-size: 25rpx;
                color: #ccc;
            }
        }
    }

    .item-title{
        font-weight: bold;
        font-size: 35rpx;
        color: rgb(38, 38, 38);
    }

    .item-block{
        display: flex;
        flex-direction: row;
        margin-top: 10rpx;
        /* justify-content: space-between; */
    }

    .checkbox-container{
        margin-left: auto;
        display: flex;
        flex-direction: column-reverse;
        margin-bottom: 20rpx;
    }

    .detail-container{
        display: flex;
       justify-content: space-between;
        align-items: center;
    }

    .detail-container-btm{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    checkbox{
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
    }

    checkbox .wx-checkbox-input {
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
    }

    /*checkbox选中后样式  */
    checkbox .wx-checkbox-input.wx-checkbox-input-checked {
        background: rgb(245, 162, 29);
    }

    /*checkbox选中后框内样式  */
    checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
        /* width: 30rpx;
        height: 30rpx; */
        line-height: 0;
        text-align: center;
        font-size: 0;
        color: rgb(245, 162, 29);
        background: transparent;
        /* transform: translate(-50%, -50%) scale(1); */
        /* -webkit-transform: translate(-50%, -50%) scale(1); */
    }

    van-icon{
        color: rgb(245, 162, 29);
    }

    .out-button {
        background: white;
        width: 180rpx;
        height: 68rpx;
        font-size: 28rpx;
        border-radius: 60rpx;
        color: white;
        margin: 0 0 0 auto ;
        background: linear-gradient(135deg ,rgb(250,202,51), rgb(242,138,49));
        margin-left: 25px;
        align-items: center;
    }

    .proceed-button {
        background: white;
        width: 180rpx;
        height: 68rpx;
        font-size: 28rpx;
        border-radius: 60rpx;
        color: white;
        margin: 0 0 0 auto ;
        background: linear-gradient(135deg ,rgb(228,140,31), rgb(241,63,29));
        align-items: center;
    }

    .btm-button-block{
        background-color: white;
        height: 100rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-right: 25rpx;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
    }

    .prop-for-bottom-bar{
        margin-top: 10rpx;
        height: 100rpx;
    }

    .prop-for-bottom-bar image{
        width: 100%;
        height: 100rpx;
    }


</style>


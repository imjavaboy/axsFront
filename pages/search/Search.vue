<template>
   <view>
       <view v-if="items.length === 0" class="card-container">
           <view class="sorry">
               <image src="../../static/icon/sorry.png" class="sorryimg"></image>
               <view class="sorrytxt">
                   <text>
                       非常抱歉\n
                       没有找到相关的宝贝
                   </text>
               </view>
           </view>
       </view>
       <view class="card-container">
           <view v-for="(item,index) in list" :key="item.id" class="home-column">
               <block v-for="(iitem,iindex) in items" :key="iitem.id" >
                   <view :class="'product-card column'+index" v-if="iindex%2===index">
                       <view class="product-pic-container" :data-id="iitem.id"  @click="onTappingCard">
                           <image :src="iitem.photo.split('`')[0]" class="product-pic" mode="widthFix"></image>
                       </view>
                       <view class="product-text">
                           <text class="title">{{iitem.itemName}}\n</text>
                           <view v-if="iitem.type===0">
                               <view  class="desc" >出售</view>
                           </view>
                           <view v-if="iitem.type===1">
                               <view  class="desc">求购</view>
                           </view>
                           <view v-if="iitem.type===2">
                               <view  class="desc">交换</view>
                           </view>
                           <view v-if="iitem.type==2">
                               <view  class="price1">{{iitem.exchange}}</view>
                           </view>
                           <view v-else class="price-container">
                               <text class="currency-tag">¥ </text>
                               <text class="price">{{iitem.price}}\n</text>
                           </view>
                           <!-- <navigator url="#">
                               Add to cart
                           </navigator> -->
                       </view>
                   </view>
               </block>

           </view>
       </view>
   </view>
</template>

<script>
    import { getSearchDetail} from './../../api/require'
    export default {
        name: "Search",
        data(){
            return{
                keyword:'',
                items:[],
                list:[{
                    id:1
                },{
                    id:2
                }]
            }
        },
        methods:{
           onLoad(event){
               // console.log("搜索次",event)
               this.keyword = event.keyword;
               this.getData();
           } ,

            getData(){
                getSearchDetail(this.keyword).then(res=>{
                    console.log("搜索数据",res)
                    this.items = res.obj;
                }).catch(err=>{
                    uni.showToast({
                        title:'获取搜索详情失败',
                        icon:'error'
                    })
                })
            },
            /*跳转详情页*/
            onTappingCard(event){
                // console.log(event.currentTarget.dataset.id)
                uni.navigateTo({
                    url:`/pages/dealingDtail/DealDtail?id=${event.currentTarget.dataset.id}`
                })
            },

        }
    }
</script>

<style scoped lang="scss">

    .card-container{
        display: flex;
        flex-direction: row;
        background-color: #ccc;
        height: 100vh;
        .sorry{
            width: 100%;
            height: 100%;
            display: flex;
            /*justify-content: center;*/
            align-items: center;
            flex-direction: column;
            background-color: whitesmoke;
            .sorryimg{
                width: 100rpx;
                height: 100rpx;
                margin:50rpx auto;
            }
            .sorrytxt{
                text-align: center;
                color: #8a8a8a;
            }
        }


        .home-column{
            width: 50%;

            .product-card{
                background-color: rgb(255, 255, 255);
                border: 5px;
                border-radius: 15rpx;
                display: flex;
                flex-direction: column;
                .product-pic-container{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 10rpx;
                    .product-pic{
                        width: 100%;
                        background-size: cover;
                        background-position: center;
                        border-radius: 15rpx 15rpx 0 0; /*和父容器.product-card保持一致*/
                    }

                }
                .product-text{
                    padding: 15rpx 30rpx;
                    .title{
                        font-size: 35rpx;
                        font-weight: bold;
                    }
                    .price1{
                        display: inline-block;
                        border-radius: 5rpx;
                        padding: 0 7rpx;
                        border: 1rpx solid #ccc;
                        color: #aaa;
                        font-size: 25rpx;
                        margin-top: 5rpx;
                    }
                    .desc{
                        display: inline-block;
                        font-size: 13px;
                        /*color: #bbb;*/
                        color:  rgb(214,86,85);
                        padding: 0rpx 8rpx;
                        border: 1rpx solid red;
                        border-radius: 5rpx;
                    }
                    .price-container{
                        margin-top: 20rpx;
                        .currency-tag{
                            color: #E62E25;
                            font-size: small;
                        }
                        .price{
                            color: #E62E25;
                            font-weight: bold;
                            font-size: 1;

                        }
                    }


                }

            }
            .column0{
                margin: 20rpx 10rpx 20rpx 20rpx;
            }

            .column1{
                margin: 20rpx 20rpx 20rpx 10rpx;
            }

        }

    }
</style>

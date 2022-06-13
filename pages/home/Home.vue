<template>
    <div class="container">
        <!-- 设置圆角 -->
        <van-search
                v-model="value"
                label="关键词"
                placeholder="请输入搜索关键词"
                use-action-slot
               @search="onSearch"
                @change="query"
        >
            <view slot="action" @click="onClick">搜索</view>
        </van-search>

        <scroll-view class="container-1" scroll-y="true" @scrolltolower="lower">
            <view class="card-container">
                <view v-for="(item,index) in list" :key="item.id" class="home-column">
                    <block v-for="(iitem,iindex) in dealingList" :key="iitem.id" >
                        <view :class="'product-card column'+index" v-if="iindex%2===index">
                            <view class="product-pic-container" :data-id="iitem.id"  @click="onTappingCard">
                                <img :src="iitem.photo" class="product-pic" mode="widthFix"/>
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
        </scroll-view>

        <view class="floating-cart" v-if="userInfo != null">
            <image src="../../static/icon/cart.png" mode="widthFix" @click="viewCart"></image>
        </view>
    </div>
</template>

<script>
    import {getDealingList} from "./../../api/require"
    export default {
        name: "Home",
        components:{

        },
        data(){
            return{
                value:'',
                userInfo:null,
                dealingList:[],
                list:[{
                    id:1
                },{
                    id:2
                }],
                curpage:1,
                total:0
            }
        },

        methods:{
            onLoad(){
               this.getData(this.curpage);
            },

            getData(page){
                /*获取用户信息*/
                const userInfo = uni.getStorageSync('userInfo')
                if (userInfo !== '') {
                    this.userInfo = uni.getStorageSync('userInfo')
                }
                /*获取页面数据*/
                getDealingList(page).then(res=>{
                    console.log("货物信息",res)
                    this.total = res.total
                    res.data.forEach(item=>{
                        item.photo = item.photo.split('`')[0];
                        this.dealingList.push(item)
                    })
                }).catch(err=>{
                    uni.showToast({
                        title:'获取货物信息失败',
                        icon:'none'
                    })
                })

            },
            //跳转搜索页
            query(e) {
                if (e) {
                    // console.log(e.detail)
                    this.value = e.detail
                }
            },
            lower(){
                // 触底的时候请求数据，即为上拉加载更多
                console.log("触底了");
                if (this.dealingList.length < this.total){
                    this.getData(this.curpage+1);
                }else{
                    uni.showToast({
                        title:'没有更多了！',
                        icon:'error'
                    })
                }

                // this.getData(this.currentPage+1);
            },
            toSearch(){
                if (this.value !== ''){
                    uni.navigateTo({
                        url:`/pages/search/Search?keyword=${this.value}`
                    });
                    this.value = ''
                }else{
                    uni.showToast({
                        title:"请输入关键词",
                        icon:'error'
                    })
                }
            },
            onClick() {
                this.toSearch();
            },
            onSearch(){
                // console.log("数据关键词",this.value)
               this.toSearch();
            },

            viewCart(){
                uni.navigateTo({
                    url:'/pages/cart/Cart'
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
.container{
    width: 100%;
    height: 100vh;
    /*background: #4cd964;*/

    .container-1{
        background: yellowgreen;
        width: 100%;
        height: 90vh;
        .card-container{
            display: flex;
            flex-direction: row;
            background-color: whitesmoke;
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
    }

    .floating-cart image{
        width: 60%;
    }
}

</style>

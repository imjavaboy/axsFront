<template>
    <div>
        <view class="box">

            <scroll-view class="container" scroll-y="true" @scrolltolower="lower" v-if="collectList.length > 0">
                <view v-for="(item,index) in collectList" :key="item.id" class="item-container"
                       :data-id="item.id"
                      @click="toDeatil" >
                    <view class="item-top">
                       <view class="item-left">
                           <!--头像-->
                           <span class="top-avater">
                            <img :src="item.headimg" alt="">
                        </span>
                           <span class="item-time">
                                  <view class="username">
                                {{item.username}}
                            </view>
                            <view class="time">
                                {{item.time}}
                            </view>
                            </span>
                       </view>
                        <view class="item-price">
                            ￥{{item.price}}
                        </view>
                    </view>
                    <!--内容-->
                    <view class="item-content">
                        <view class="item-name">
                            {{item.itemName}}
                        </view>
                        <view class="content-text">
                            {{item.content}}
                        </view>
                        <!--图片-->
                        <view class="item-photo" v-if="item.photo !== ''">
                            <view v-for="(phot,iindex) in item.photo.split('`')" :key="phot">
                                <image  :src="phot" mode="aspectFill" :data-itemIndex="index" :data-imgindex="iindex" @click.stop="clickImg"/>
                            </view>

                        </view>

                    </view>
                    <view class="item-button">
                       <button :data-did="item.id" :data-index="index" @click.stop="dontCollect">取消收藏</button>
                    </view>

                </view>
            </scroll-view>
            <view v-else class="nonde">
                <image src="../../static/icon/sorry.png"></image>
                <view class="text">您没有收藏任何商品</view>
            </view>

        </view>
    </div>
</template>

<script>
    import {getCollectList, noCollect} from "../../api/require";

    export default {
        name: "List",
        data(){
            return{
                collectList:[],
                page:1,
                total:0
            }
        },
        methods:{
            onLoad(){
                this.getData(this.page);
            },

            getData(page){
                const uid = uni.getStorageSync("id");
                getCollectList(page,uid).then(res=>{
                    // this.collectList = res.data;
                    this.total = res.total
                    res.data.forEach(item =>{
                        this.collectList.push(item)
                    })
                })
            },
            /*图片放大*/
            clickImg(event){
                // console.log(event.currentTarget,"图片index")
                const itemIndex = event.currentTarget.dataset.itemindex;
                const imgindex = event.currentTarget.dataset.imgindex;
                wx.previewImage({
                    urls: this.collectList[itemIndex].photo.split('`'), //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
                    current: this.collectList[itemIndex].photo.split('`')[imgindex], // 当前显示图片的http链接，默认是第一个
                })
            },
            toDeatil(event){
                // console.log(event.currentTarget.dataset.id)
                uni.navigateTo({
                    url:`/pages/dealingDtail/DealDtail?id=${event.currentTarget.dataset.id}`
                })
            },
            lower(){
                if (this.collectList.length === this.total){
                    uni.showToast({
                        title:'没有更多了',
                        icon:'error'
                    })
                }else{
                    this.page = this.page+1
                    this.getData(this.page)
                }
            },
            dontCollect(event){
                const dealingId = event.currentTarget.dataset.did;
                const index = event.currentTarget.dataset.index;
                const uid = uni.getStorageSync('id')
                let that = this
                noCollect({
                    uid,dealingId
                }).then(res=>{
                    if (res.code === 200){
                        uni.showToast({
                            title:'取消收藏成功',
                            icon:'success'
                        })
                        that.collectList.splice(index,1)
                    }
                }).catch(err=>{
                    uni.showToast({
                        title:'取消收藏失败',
                        icon:'error'
                    })
                })

            },
        }
    }
</script>

<style scoped lang="scss">
    .box{
        width: 100%;
        height: 100vh;
        background: #eee;
    }
    .container{
        width: 96%;
        height: 100vh;
        margin: 0 auto;
        .item-container{
            width: 100%;
            /*height:30vh;*/
            margin: 20rpx 0;
            background: white;
            border-radius: 20rpx;
            overflow: hidden;
            padding: 20rpx 0;
            .item-top{
                /*background: #4cd964;*/
               display: flex;
                justify-content: space-between;
                align-items: center;
                .item-left{
                    display: flex;
                    align-items: center;
                    .top-avater{
                        display: inline-block;
                        width: 60rpx;
                        height: 60rpx;
                        background: #333333;
                        border-radius: 50rpx;
                        margin:0 20rpx;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .item-time{
                        color: #cccccc;
                        font-size: 26rpx;
                        .username{
                            color: #000000;
                        }
                    }
                }
                .item-price{
                    font-size: 40rpx;
                    color: orangered;
                    margin-right: 30rpx;
                }


            }
            .item-content{
                .content-text{
                    margin-top: 10rpx;
                    margin-left: 30rpx;
                }
                .item-name{
                    font-weight: bold;
                    font-size: 40rpx;
                    margin: 10rpx 0 10rpx 30rpx;
                }
                .item-photo{
                    height: 160rpx;
                    margin-left: 30rpx;
                    margin-top: 10rpx;
                    view{
                        height: 100%;
                        border-radius: 20rpx;
                        display: inline-block;
                        margin: 0 20rpx;
                        image{
                            width: 200rpx;
                            height: 100%;
                        }
                    }

                }
                .tag-block{
                    padding: 5rpx 20rpx;
                    .tag-block{
                        display: inline-block;
                        margin: 0 30rpx;
                    }
                }
            }
            .item-button{
                width: 100%;
                display: flex;
                text-align: right;
                button{
                    background: white;
                    border: solid thin rgba(38,38,38,0.32);
                    width: 25%;
                    font-size: 25rpx;
                    border-radius: 50rpx;
                    color: rgba(38,38,38,0.5);
                    margin: 0 30rpx 0 auto ;
                }


            }

        }


        van-tag{
            margin-right: 10rpx;
        }
    }
    .nonde{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        image{
            width: 200rpx;
            height: 200rpx;
            margin: 50rpx auto;
        }
        .text{
            color: #ccc;
            font-size: 40rpx;
        }

    }
</style>

<template>
    <div>
        <view class="box" v-if="posts.length > 0">

            <scroll-view class="container" scroll-y="true" >
                <view v-for="(item,index) in posts" :key="item.id" class="item-container"
                      :data-islike="item.isMeLike===undefined ? 0 : 1" :data-pid="item.id"
                      @click="toDeatil" >
                    <view class="item-top">
                        <!--头像-->
                        <span class="top-avater">
                            <img :src="item.headimg" alt="">
                        </span>
                        <span class="item-time">{{item.time}}</span>
                    </view>
                    <!--内容-->
                    <view class="item-content">
                        <view class="content-text">
                            {{item.content}}
                        </view>
                        <!--图片-->
                        <view class="item-photo" v-if="item.photo !== ''">
                            <view v-for="(phot,iindex) in item.photo.split('`')" :key="phot">
                                <image  :src="phot" mode="aspectFill" :data-itemIndex="index" :data-imgindx="iindex" @click.stop="clickImg"/>
                            </view>

                        </view>
                        <!--标签-->
                        <view v-if="item.tags.length > 0" class="tag-block">
                            <span  v-for="tag in item.tags" :key="tag.id">
                                <van-tag plain color="SkyBlue">{{tag.tagName}}</van-tag>
                            </span>
                        </view>
                    </view>
                </view>
            </scroll-view>

        </view>
        <view v-else class="elese">
            您没有赞过的帖子
        </view>
    </div>
</template>

<script>
    import {getMyLike} from './../../api/require'
    export default {
        name: "MyLike",
        data(){
            return{
                posts: [],
            }
        },
        methods:{
            onLoad(){
                this.getData()
            },

            getData(){
                getMyLike(uni.getStorageSync('id')).then(res=>{
                    // console.log("点赞信息",res);
                    if (res.code === 200){
                        this.posts=res.obj
                    }
                }).catch(err=>{
                    uni.showToast({
                        title:"获取点赞信息失败",
                        icon:'error'
                    })
                })
            },
            toDeatil(event){
                const postingid =  event.currentTarget.dataset.pid;
                uni.navigateTo({
                    url:`/pages/forumDetail/ForumDetail?pid=${postingid}&isMeLike=${1}`
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .box{
        width: 100%;
        height: 100vh;
        background: #cccccc;
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
                    color: #333333;
                    font-size: 26rpx;
                }

            }
            .item-content{
                .content-text{
                    margin-top: 10rpx;
                    margin-left: 20rpx;
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
            .item-icon{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20rpx;
                van-icon{
                    margin: 10rpx 50rpx;
                }
            }
        }


        van-tag{
            margin-right: 10rpx;
        }
    }
    .elese{
        width: 100%;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40rpx;
        color: #cccccc;

    }
</style>

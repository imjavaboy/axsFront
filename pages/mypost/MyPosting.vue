<template>
    <div>
        <view class="box">

            <scroll-view class="container" scroll-y="true" @scrolltolower="lower">
                <view v-for="(item,index) in posts" :key="item.id" class="item-container"
                      :data-islike="item.isMeLike===undefined ? 0 : 1" :data-pid="item.id"
                      @click="toDeatil" >
                    <view class="item-top">
                        <!--头像-->
                        <span class="top-avater">
                            <img :src="item.headimg" alt="">
                        </span>
                        <view class="item-time">
                            <view class="username">
                                {{item.username}}
                            </view>
                            <view class="time">
                                {{item.time}}
                            </view>
                        </view>
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

                        <view class="edit-box">
                            <view class="edit">
                                <button class="bottom del-button" :data-pid="item.id" @click.stop="delPostings" >删除</button>
                            </view>
                        </view>



                </view>
            </scroll-view>

        </view>
    </div>
</template>

<script>
    import { getMyPosting,delPosting} from "../../api/require";

    export default {
        name: "List",
        data(){
            return{
                posts: [],
                list:[{
                    id:1
                },{
                    id:2
                }],
                remarkPostingId:'',//评论帖子id
                textValue:'',//文本框文字评论
                remarkPostingIndex:'',
                currentPage:1,
            }
        },
        methods:{
            onLoad(){
                this.getData(this.currentPage)
            },

            getData(page){
                const uid = uni.getStorageSync('id');
                getMyPosting(uid,page).then(res=>{
                    console.log("我的帖子",res);
                    const userId = uni.getStorageSync('id')
                    // this.posts = res.data
                    if(this.posts.length >= res.total){
                        uni.showToast({
                            title:'没有更多了',
                            icon:'warning'
                        })
                        return;
                    }
                    res.data.forEach(item=>{
                        item.likeAccounts.forEach(item1=>{

                            if (item1.id === userId){
                                item.isMeLike = true
                            }
                        })
                        // item.isMeLike = false
                    })
                    console.log(res.data,'经济建设')
                    res.data.forEach(item=>{
                        this.posts.push(item)
                    })
                    // this.posts.push(res.data) ;
                }).catch(err=>{
                    uni.showToast({
                        title:'获取帖子失败',
                        icon:'error'
                    })
                })
            },
            lower(){
                // 触底的时候请求数据，即为上拉加载更多
                console.log("触底了")
                this.getData(this.currentPage+1);
            },
            /*图片放大*/
            clickImg(event){
                // console.log(event.currentTarget,"图片index")
                const itemIndex = event.currentTarget.dataset.itemindex;
                const imgindex = event.currentTarget.dataset.imgindex;
                wx.previewImage({
                    urls: this.posts[itemIndex].photo.split('`'), //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
                    current: this.posts[itemIndex].photo.split('`')[imgindex], // 当前显示图片的http链接，默认是第一个
                })
            },
            toDeatil(event){
                // console.log(event.currentTarget.dataset.pid,"去帖子详情")
                const postingid =  event.currentTarget.dataset.pid;
                const isMeLike = event.currentTarget.dataset.islike
                uni.navigateTo({
                    url:`/pages/forumDetail/ForumDetail?pid=${postingid}&isMeLike=${isMeLike}`
                })

            },
            bindTextAreaBlur(e){
                // console.log("文本框文本",e.detail.value);
                this.textValue = e.detail.value;
            },
        //    编辑贴子
            delPostings(event){
                console.log("当前点击的帖子",event.currentTarget.dataset.pid)
                const pid = event.currentTarget.dataset.pid
                delPosting(pid).then(res=>{

                    console.log("删除信息",res)
                    if (res.code === 200){
                        uni.showToast({
                            title:'删除成功',
                            icon:'success'
                        });
                        this.posts = []
                        this.getData(this.currentPage)
                    }
                }).catch(err=>{
                    uni.showToast({
                        title:"删除失败",
                        icon:'error'
                    })
                })
            },
            /*编辑提欸子*/
            editPosting(){

            }

        }
    }
</script>

<style scoped lang="scss">
    .box{
        width: 100%;
        height: 100vh;
        background: #ccc;
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
            /*position: relative;*/
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
                    color: #cccccc;
                    font-size: 26rpx;
                    .username{
                        color: #000000;
                    }
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
            .edit-box{
               position: relative;
                width: 100%;
                height: 80rpx;
                .edit{
                    position: absolute;
                    width: 350rpx;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row;
                }
                .bottom{
                    height: 50rpx;
                    width: 120rpx;
                    background: #3c89fc;
                    color: #fff;
                    font-size: 30rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .del-button{
                    background: #f69869;
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
</style>

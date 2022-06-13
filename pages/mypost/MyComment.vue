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
                        <span class="item-time">
                                  <view class="username">
                                {{item.username}}
                            </view>
                            <view class="time">
                                {{item.time}}
                            </view>
                            </span>
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
                    <!--点赞和评论-->
                    <view class="item-icon">
                        <van-icon v-if="item.isMeLike" name="thumb-circle-o" color="red" size="50rpx" :data-pid="item.id"
                                  :data-index = "index"
                                  :info="item.likesNum > 0 ? item.likesNum : null" @tap.stop="dontLike" />
                        <van-icon v-else name="thumb-circle-o"  size="50rpx"  :data-pid="item.id"
                                  :data-index = "index"
                                  :info="item.likesNum > 0 ? item.likesNum : null" @tap.stop="doLike" />

                        <van-icon name="comment-o" size="50rpx"  :info="item.commentNum > 0 ? item.commentNum : null"
                                  :data-pid="item.id"  :data-index = "index"
                                  @tap.stop="clickRemark" />
                    </view>
                    <van-divider />
                    <!--所有的评论-->
                    <view class="comment-box" v-if="item.comments.length > 0">

                        <view v-for="com in item.comments" :key="com.id" class="com-item">
                            <view class="com-left">
                                <view class="com-avater">
                                    <img :src="account.headimg" alt="">
                                </view>
                                <view class="com-mid">
                                    <view class="com-name">{{account.username}}</view>
                                    <view class="com-context" >{{com.context}}</view>
                                </view>
                            </view>
                            <view class="com-time">
                                <view>{{com.time}}</view>
                                <van-icon name="clear"
                                          color="red" style="margin-top: 15rpx" size="40rpx"
                                          :data-cid="com.id"
                                          :data-pid ="item.id"
                                          @tap.stop="delComment"
                                />
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>

        </view>
    </div>
</template>

<script>
    import {doLike, dontLike, delComment, getMyCommentPosting} from "../../api/require";

    export default {
        name: "Mycomment",
        data(){
            return{
                posts: [],
                headimgs: [],
                nicknames: [],
                likes: [],
                isCommentPopupShow: false,
                commentTextareaValue: "",
                targetIndex: "",
                loginUserInfo: {},
                list:[{
                    id:1
                },{
                    id:2
                }],
                account:{},
                remarkPostingId:'',//评论帖子id
                textValue:'',//文本框文字评论
                remarkPostingIndex:'',
                currentPage:1,
            }
        },
        methods:{
            onLoad(){
                this.account = uni.getStorageSync('userInfo')
                this.getData()
            },

            getData(){
                const id = uni.getStorageSync('id')
                getMyCommentPosting(id).then(res=>{
                    // console.log("所有的帖子",res);
                    const userId = uni.getStorageSync('id')
                    // this.posts = res.data
                    res.obj.forEach(item=>{
                        item.likeAccounts.forEach(item1=>{

                            if (item1.id === userId){
                                item.isMeLike = true
                            }
                        })
                    })
                    this.posts = res.obj;
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
            dontLike(e){
                // console.log(e.currentTarget.dataset)
                const uid = uni.getStorageSync('id');
                const pid = e.currentTarget.dataset.pid;
                const index = e.currentTarget.dataset.index;
                dontLike(uid,pid).then(res=>{
                    if (res.code === 200){
                        this.$set(this.posts[index],'likesNum',this.posts[index].likesNum-1);
                        this.$set(this.posts[index],'isMeLike',false);
                    }
                    uni.showToast({
                        title:res.message,
                        icon:'success'
                    })
                })

            },
            /*点赞*/
            doLike(e){
                console.log(e.currentTarget.dataset)
                const uid = uni.getStorageSync('id');
                const pid = e.currentTarget.dataset.pid;
                const index = e.currentTarget.dataset.index;
                doLike(uid,pid).then(res=>{
                    // console.log(res,"点赞请求");
                    if (res.code === 200){
                        this.$set(this.posts[index],'likesNum',this.posts[index].likesNum+1);
                        this.$set(this.posts[index],'isMeLike',true);
                    }
                    uni.showToast({
                        title:res.message,
                        icon:'success'
                    })
                })

            },
            /*删除评论*/
            delComment(event){
                // console.log("要删除的评论",event.currentTarget.dataset.cid)
                // console.log("要删除的帖子id",event.currentTarget.dataset.pid)
                const cid = event.currentTarget.dataset.cid;
                const pid = event.currentTarget.dataset.pid;
                delComment(cid,pid).then(res=>{
                    if (res.code === 200){
                        uni.showToast({
                            title:'删除成功',
                            icon:'success'
                        });
                        this.getData()

                    }
                }).catch(err=>{
                    uni.showToast({
                        title:"删除失败"
                    })
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
            .item-icon{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20rpx;
                van-icon{
                    margin: 10rpx 50rpx;
                }
            }
            .comment-box{
                background: white;
                width: 90%;
                padding: 20rpx;
                border-radius: 20rpx;
                margin: 30rpx  auto 0 auto;
                /*background: #4cd964;*/
                .com-item{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20rpx;
                    .com-left{
                        display: flex;
                        justify-content: left;
                        align-items: center;
                        .com-avater{
                            width: 100rpx;
                            height: 100rpx;
                            border-radius: 50rpx;
                            overflow: hidden;
                            margin-right: 20rpx;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .com-mid{
                            .com-name{
                                color: #aaa;
                                font-size: 28rpx;
                            }
                            .content-text{
                                margin-top: 10rpx;
                            }

                        }
                    }
                    .com-time{
                        margin-top: 10rpx;
                        color: #aaa;
                        display: flex;
                        flex-direction: column;
                        justify-content: right;
                        align-items: center;
                    }

                }
            }
        }


        van-tag{
            margin-right: 10rpx;
        }
    }
</style>

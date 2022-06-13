<template>
    <div class="box">
        <view class="item-container">
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
                <view class="item-photo" v-if="item.photo !== '' && item.photo !== undefined">
                    <view v-for="(phot,iindex) in item.photo.split('`')" :key="phot">
                        <image  :src="phot" mode="aspectFill" :data-imgindx="iindex" @click="clickImg"/>
                    </view>

                </view>
                <!--标签-->
                <view v-if="item.tags !== ''" class="tag-block">
                            <span  v-for="tag in item.tags" :key="tag">
                                <van-tag plain color="SkyBlue">{{tag.tagName}}</van-tag>
                            </span>
                </view>
            </view>
            <!--点赞和评论-->
            <view class="item-icon">
                <van-icon v-if="isMeLike === '1'" name="thumb-circle-o" color="red" size="50rpx" :data-pid="item.id"
                          :info="item.likesNum > 0 ? item.likesNum : null" @tap.stop="dontLike" />
                <van-icon v-if="isMeLike === '0'" name="thumb-circle-o"  size="50rpx"  :data-pid="item.id"
                          :info="item.likesNum > 0 ? item.likesNum : null" @tap.stop="doLike" />
                <van-icon name="comment-o" size="50rpx"
                          :info="item.commentNum > 0 ? item.commentNum : ''"
                          @tap="isCommentPopupShow = true"/>
            </view>

        </view>
        <!--所有的评论-->
        <view class="comment-box" v-if="item.comments.length > 0">
            <view v-for="com in item.comments" :key="com.id" class="com-item">
                <view class="com-left">
                    <view class="com-avater">
                        <img :src="com.account.headimg" alt="">
                    </view>
                    <view class="com-mid">
                        <view class="com-name">{{com.account.username}}</view>
                        <view class="com-context">{{com.context}}</view>
                    </view>
                </view>

                <view class="com-time">{{com.time}}</view>
            </view>
        </view>
        <view class="none-comment" v-else>
            暂无评论
        </view>
        <!--弹出层-->
        <van-popup
                :show="isCommentPopupShow"
                position="bottom"
                custom-style="height: 230rpx;"
                @after-leave="closePopup"
                closeable
                @close="closePopup"
                @click-overlay="closePopup">
            <view class="popup-container">
            <textarea auto-focus
                      placeholder="..."
                      :value="textValue"
                      placeholder-class="textarea-placeholder"
                      class="comment-textarea"
                      @blur="bindTextAreaBlur"
                      @input="bindTextAreaBlur"
            />
                <button class="send-comment-button" @click="sendComment">发布</button>
            </view>
        </van-popup>
    </div>
</template>

<script>
    import {doLike, dontLike, getDetailPostingById, remarkPosting} from './../../api/require'
    export default {
        name: "ForumDetail",
        data(){
            return{
                pid:'',
                item:{},//数据
                isCommentPopupShow:false,
                textValue:'',
                isMeLike:0,
            }
        },
        methods:{
            closePopup(){
                this.isCommentPopupShow = false;
                this.textValue = ''
            },
            onLoad(options){
                // console.log(options.pid,"传参");
                // console.log(options.isMeLike,"传参");
                this.pid = options.pid;
                this.isMeLike = options.isMeLike
                this.getData();
            },

            //获取帖子详情
            getData(){
                getDetailPostingById(this.pid).then(res=>{
                    // console.log("详情数据",res);
                    this.item = res.obj;
                }).catch(err=>{
                    uni.showToast({
                        title:'获取帖子详情失败',
                        icon:'error'
                    })
                })
            },
            clickImg(event){
                // console.log(event.currentTarget,"图片index")
                const imgindex = event.currentTarget.dataset.imgindex;
                wx.previewImage({
                    urls: this.item.photo.split('`'), //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
                    current: this.item.photo.split('`')[imgindex], // 当前显示图片的http链接，默认是第一个
                })
            },
            bindTextAreaBlur(event){
                // console.log("文本框文本",e.detail.value)
                this.textValue = event.detail.value;
            },
            sendComment(){

            },
            dontLike(e){
                // console.log(e.currentTarget.dataset)
                const uid = uni.getStorageSync('id');
                dontLike(uid,this.pid).then(res=>{
                    if (res.code === 200){
                        this.$set(this.item,'likesNum',this.item.likesNum-1);
                        this.isMeLike ='0'
                    }
                    uni.showToast({
                        title:res.message,
                        icon:'success'
                    })
                })

            },
            /*点赞*/
            doLike(e){
                const uid = uni.getStorageSync('id');
                doLike(uid,this.pid).then(res=>{
                    // console.log(res,"点赞请求");
                    if (res.code === 200){
                        this.$set(this.item,'likesNum',this.item.likesNum+1);
                        this.isMeLike = '1'
                    }
                    uni.showToast({
                        title:res.message,
                        icon:'success'
                    })
                })

            },
            sendComment(e){
                // console.log("发布的评论",this.textValue)
                if (this.textValue === ''){
                    uni.showToast({
                        title:'评论不能为空',
                        icon:'error'
                    });
                    return;
                }
                const uid = uni.getStorageSync('id');
                // console.log("提欸子 ",index)
                remarkPosting(uid,this.pid,this.textValue).then(res=>{
                    if (res.code === 200){
                        uni.showToast({
                            title:'评论成功',
                            icon:'success'
                        });
                        this.getData()

                    }else{
                        uni.showToast({
                            title:'评论失败',
                            icon:'error'
                        });
                    }
                }).catch(err=>{
                    uni.showToast({
                        title:'评论失败',
                        icon:'error'
                    });
                })
                this.textValue = '';
                this.isCommentPopupShow = false
            },
        }
    }
</script>

<style scoped lang="scss">
    .box{
        width: 100%;
        height: 100vh;
        background: #ddd;
    }
    .item-container{
        width: 96%;
        /*height:30vh;*/
        margin:0rpx auto;
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
           justify-content: space-around;
            align-items: center;
            margin-top: 20rpx;

            van-icon{
                margin: 10rpx 50rpx;
            }
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
                color: #aaa;
            }

        }
    }
    .none-comment{
        height: 30rpx;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30rpx;
        padding: 30rpx;
        color: #bbb;
        width: 90%;
        border-radius: 20rpx;
        margin: 30rpx  auto 0 auto;
    }


    .popup-container{
        margin: 20rpx 30rpx;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;

    }
    .comment-textarea{
        border: none;
        background-color: rgb(244,244,244);
        border-radius: 40rpx;
        padding: 23rpx;
        width: 80%;
        height: 150rpx;
        font-size: 28rpx;
        color: rgb(50, 50, 50);
    }

    .textarea-placeholder{
        font-size: 28rpx;
        color: rgb(50, 50, 50);
    }

    .popup-container button::after{
        border: none;
    }

    .popup-container button{
        background-color: white;
        color: rgb(241,130,48);
        width: 20%;
        font-size: 30rpx;
        margin-left: 0;
        margin-right: 0;
        padding: 0;
        margin-top: auto;
        margin-bottom: -20rpx;
        padding-left: 65rpx;
    }

</style>

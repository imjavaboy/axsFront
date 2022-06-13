<template>
    <div>
        <view class="box">

            <scroll-view scroll-x="true" class="tabber">
                <view v-for="(item,index) in tags" :key=" item.id">
                    {{item.tagName}}
                </view>
            </scroll-view>
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

                    </view>
                </scroll-view>

        </view>
         <!--弹出层-->
        <van-popup
          :show="isCommentPopupShow"
          position="bottom"
          custom-style="height: 230rpx;"
          closeable
          @after-leave="closePopup"
          @close="closePopup"
          @click-overlay="closePopup">
          <view class="popup-container">
            <textarea auto-focus
                      :value="textValue"
                      placeholder="..."
                      placeholder-class="textarea-placeholder"
                      class="comment-textarea"
                      @input="bindTextAreaBlur"
                      @blur="bindTextAreaBlur"
            />
              <button class="send-comment-button" @click="sendComment">发布</button>
          </view>
        </van-popup>
    </div>
</template>

<script>
    import {getAllPosting, doLike, dontLike, remarkPosting, getAllTags} from '../../api/require'
    export default {
        name: "ForumHome",
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
              remarkPostingId:'',//评论帖子id
              textValue:'',//文本框文字评论
              remarkPostingIndex:'',
              currentPage:1,
              total:0,
              tags:[]
          }
      },
      methods:{
        onLoad(){
            this.getTags()
           this.getData(this.currentPage)
        },
          getTags(){
              getAllTags().then(res=>{
                  console.log("所以标签",res)
                  if (res.code === 200){
                    this.tags = res.obj
                  }
              }).catch(err=>{
                  uni.showToast({
                      title:"获取标签失败",
                      icon:"error"
                  })
              })
          },
          getData(id){
              getAllPosting(id).then(res=>{
                  console.log("所有的帖子",res);
                  this.total = res.total;
                  const userId = uni.getStorageSync('id')
                  // this.posts = res.data
                  res.data.forEach(item=>{
                      item.likeAccounts.forEach(item1=>{
                          if (item1.id === userId){
                              item.isMeLike = true
                          }
                      })
                      // item.isMeLike = false
                  })
                  // console.log(res.data,'经济建设')
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
              if (this.posts.length < this.total){
                  this.getData(this.currentPage+1);
              }else{
                  uni.showToast({
                      title:'没有更多了',
                      icon:'error'
                  })
              }

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
          const index = this.remarkPostingIndex;
          // console.log("提欸子 ",index)
          remarkPosting(uid,this.remarkPostingId,this.textValue).then(res=>{
              if (res.code === 200){
                  uni.showToast({
                      title:'评论成功',
                      icon:'success'
                  });
                  this.$set(this.posts[index],'commentNum',this.posts[index].commentNum+1)
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
      clickRemark(event){
          this.isCommentPopupShow = true
          this.remarkPostingId = event.currentTarget.dataset.pid;
          this.remarkPostingIndex=event.currentTarget.dataset.index;
      },
          closePopup(){
              this.isCommentPopupShow = false;
              this.textValue = ''
          },
        onPostTapped(){

        },
        showLoginLike(){

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
        showLoginComment(){

        },
        showCommentPopup(){

        },
        hideCommentPopup(){

        },
        updateCommentInputData(){

        },

        preview(){

        }
      }
    }
</script>

<style scoped lang="scss">
.box{
    width: 100%;
    height: 100vh;
    background: #ccc;
    .tabber{
        margin-top: 10rpx;
        background: #ffffff;
        padding: 30rpx 0 30rpx 0;
       white-space: nowrap;
        view{
            width: 150rpx;
            display: inline-block;
            /*background: #333333;*/
            color: #ccc;
            margin: 0 20rpx;
        }
    }
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
            justify-content: space-around;
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

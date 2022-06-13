<template>
    <div class="box">
        <form @submit="onSubmit" >
            <view class="container">
                <view class="input-block">
                <textarea class="desc-input"
                          :value="textValue"
                          name="content"
                          auto-focus
                          placeholder="分享新鲜事儿..."
                          @blur="bindTextAreaBlur"
                          @input="bindTextAreaBlur"
                />
                   <view class="menu-tags">

                       <van-dropdown-menu>
                           <van-dropdown-item :value="value1" :options="option1" @change="onChange"/>
                       </van-dropdown-menu>
                   </view>
                    <view class="pics">

                        <van-uploader
                                @delete="onDeletePicItem"
                                capture="camera"
                                :file-list="fileList"
                                max-count="2"
                                @after-read="afterRead" />
                    </view>
                </view>

                <view class="submit-button-container">
                    <button class="submit-button" form-type="submit">发布</button>
                </view>

            </view>

        </form>
    </div>
</template>

<script>
    import {uploadImge,insertPosting,getAllTags} from "../../api/require";

    export default {
        name: "PublishPost",
        data(){
            return{
                textValue:'',
                fileList: [
                ],
                urlList:[],
                upCount:0,
                option1: [
                    { text: '请选择标签', value: 0 },
                ],
                value1:0
            }
        },
        methods:{
            onLoad(){
                this.getData()
            },

            getData(){
              getAllTags().then(res=>{
                  console.log("所以标签",res)
                  if (res.code === 200){
                      res.obj.forEach(item=>{
                         this.option1.push( {
                             text:item.tagName, value: item.id
                         })
                      })
                  }
              }).catch(err=>{
                  uni.showToast({
                      title:"获取标签失败",
                      icon:"error"
                  })
              })
            },
            onChange(e){
                // console.log("change",e.detail)
                this.value1 = e.detail
            },
            bindTextAreaBlur(event){
                // console.log("哈哈哈哈哈",event.detail.value)
                this.textValue = event.detail.value;
            },
            afterRead(event) {
                console.log(event.detail,"文件");
                let obj = {}
                obj.url = event.detail.file.url;
                obj.name = "图片"+(this.fileList.length+1)
                obj.deletable=true
                this.fileList.push(obj)
            },

           async onSubmit(){
                uni.showLoading({
                    title:"发布中"
                });
                let urls=[]
               for (let i = 0; i < this.fileList.length; i++) {
                  urls[i] =  await uploadImge(this.fileList[i].url)
               }
               this.urlList = urls.map(item=>{
                   return item.obj
               })
                const userInfo = uni.getStorageSync('userInfo')
                insertPosting({
                    uid:userInfo.id,
                    content:this.textValue,
                    photo:this.urlList.join('`'),
                    username:userInfo.username,
                    headimg:userInfo.headimg,
                    likesNum:0,
                    commentNum:0,
                    tagsId:this.value1
                }).then(res=>{
                    if (res.code === 200){
                        uni.hideLoading();
                        uni.showToast({
                            title:'发布成功',
                            icon:'success'
                        });
                        console.log("2222222")
                    }
                }).catch(err=>{
                    uni.showToast({
                        title:'发布失败',
                        icon:'success'
                    })
                });
                setTimeout(function () {
                    uni.hideLoading();
                }, 1000);
                this.upCount = 0;
                this.fileList = [];
                this.urlList = [];

                uni.switchTab({
                    url:'/pages/forum-home/ForumHome'
                })
            },
            /*删除图片*/
            onDeletePicItem(event){
                console.log(event.detail.index,"第几个图片")
                this.fileList = this.fileList.splice(event.detail.index,1)
            },

        }
    }
</script>

<style scoped lang="scss">
    .box{
        position: fixed;
        left: 0;
        top: 0;
        background: #cccccc;
        width: 100%;
        height: 100vh;
        .container{
            background: #ffffff;
            width: 94%;
            height: 50vh;
            margin: 10rpx auto;
            border-radius: 10rpx;
            padding: 10rpx;
        }
    }
    .input-block{
        margin: 5 32rpx 32rpx 32rpx;
        position: relative;
    }
    .menu-tags{
        /*position: absolute;*/
        /*right: 0;*/
        /*top: 5rpx;*/
        width: 220rpx;
    }

    .input-block textarea{
        font-size: 35rpx;
        max-height: 150rpx;
        width: 100% !important;
    }

    .van-uploader__preview-image{
        border-radius: 20rpx;
    }

    .van-uploader__upload{
        border-radius: 20rpx;
    }

    .tag-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: end;
        padding: 5rpx 0;
    }

    .tag-container .titleText{
        font-size: 30rpx;
        padding-left: 20rpx;
    }

    .tag-container input{
        align-content: right;
        width: 90rpx;
    }

    .price-container{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .price-container{
        font-size: 30rpx;
        color: black;
    }

    .submit-button-container{
        margin: 20rpx;
    }

    button{
        background-color: rgba(244,167,39,0.7);
        color: rgb(38,38,38);
        width: 60%;
        margin-top: 50rpx;
    }
</style>

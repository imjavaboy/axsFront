<template>
    <div class="box">
        <!--pages/forum-edit/edit.wxml-->
        <form @submit="onSubmit">
            <view class="input-block">
                <textarea name="content"
                          class="desc-input"
                          :value="textValue"
                          auto-focus
                          placeholder="说说您的使用感受，入手渠道，转手原因..."
                          @blur="bindTextAreaBlur"
                          @input="bindTextAreaBlur"
                />
                <view class="pics">
                    <van-uploader
                            catch:delete="onDeletePicItem"
                            :file-list="fileList "
                            deletable="true"
                            max-count="2"
                            @after-read="afterRead"
                    />
                </view>
            </view>

            <van-collapse :value="collapseActiveNames"
                          @change="onCollapseChange">
                <van-collapse-item title="详情" name="1">
                    <view class="tag-container">
                        <text class="titleText" decode="emsp">&emsp;&emsp;方式</text>
                        <van-dropdown-menu>
                            <van-dropdown-item
                                    name="type"
                                    :value="type"
                                    :options="option1"
                                    @change="onChange" />
                        </van-dropdown-menu>
                    </view>
                    <view class="tag-container">
                        <text class="titleText" decode="emsp">&emsp;&emsp;分类</text>
                        <van-dropdown-menu>
                            <van-dropdown-item
                                    name="category"
                                    :value="category"
                                    :options="option2"
                                    @change="onChangeCatgeory"
                            />
                        </van-dropdown-menu>
                    </view>
                    <view class="tag-container">
                        <text class="titleText">商品名称</text>
                        <input name="title" placeholder="..." v-model="itemname"/>
                    </view>
                    <block v-if="isExchange !== 2">
                        <view class="tag-container">
                            <text class="titleText" decode="emsp">&emsp;&emsp;价格</text>
                            <view class="price-container">
                                <input name="price" placeholder="0.00" v-model="price"/>
                                <text decode="ensp">&ensp;元</text>
                            </view>
                        </view>
                    </block>
                    <block v-else>
                        <view class="tag-container">
                            <text class="titleText">交换物品</text>
                            <input name="exchange" placeholder="..." v-model="exchange"/>
                        </view>
                    </block>
                    <view class="tag-container">
                        <text class="titleText" decode="emsp">&emsp;&emsp;数量</text>
                        <view class="price-container">
                            <input name="count" placeholder="..." v-model="status"/>
                        </view>
                    </view>
                </van-collapse-item>

            </van-collapse>

            <view class="submit-button-container">
                <button class="submit-button" form-type="submit">发布</button>
            </view>

        </form>
    </div>
</template>

<script>
    import {insertDealing, uploadImge} from "./../../api/require"
    export default {
        name: "Publish",
        data(){
           return{
               collapseActiveNames: ["1"],
               fileList: [
                   // {
                   //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
                   //   name: '图片1',
                   // },
                   // // Uploader 根据文件后缀来判断是否为图片文件
                   // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                   // {
                   //   url: 'http://iph.href.lu/60x60?text=default',
                   //   name: '图片2',
                   //   isImage: true,
                   //   deletable: true,
                   // },
               ],
               urlList:[],
               photoUrl: "",
               upCount: 0,
               option1: [
                   {
                   text: '出售',
                   value: 0
                },
                   {
                       text: '求购',
                       value: 1
                   },
                   {
                       text: '交换',
                       value: 2
                   },
               ],
               value1: 0,
               option2: [
                    {
                   text: '生活',
                   value: "生活"
                    },
                   {
                       text: '学习',
                       value: "学习"
                   },
                   {
                       text: '穿搭',
                       value: "穿搭"
                   },
                   {
                       text: '其他',
                       value: "其他"
                   },
               ],
               value2: "生活",
               isExchange: false,
               content: null,
               type: 0,
               price: null,
               exchange: null,
               category: "生活",
               status: null,
               itemname: null,
               isEdit: false,
               textValue:''
           }
        },
        methods:{
            bindTextAreaBlur(event){
                // console.log("哈哈哈哈哈",event.detail.value)
                this.textValue = event.detail.value;
            },
            onCollapseChange(event){
                this.collapseActiveNames = event.detail
            },
            onChange({detail}) {
                // console.log("方式",detail)
                this.type = detail
                if (this.type===2 ){
                    this.isExchange = 2
                }else {
                    this.isExchange = 1
                }
            },
            onChangeCatgeory({detail}){
                // console.log("分类",detail)
                this.category = detail;
            },
            upImg(){

                for (let i = 0; i < this.fileList.length; i++) {
                    uploadImge(this.fileList[i].url).then(res=>{
                        console.log(res)
                        this.urlList.push(res.obj);
                        this.upCount++;
                        // if (i === this.fileList.length -1){
                        //     setTimeout(()=>{},1000)
                        //     this.sendPost();
                        // }

                    }).catch(err=>{
                        uni.showToast({
                            title:"上传图片失败",
                            icon:'error'
                        })
                    })
                }
                console.log(this.urlList)
            },
             validateData(){
                 if (this.textValue === null){

                     uni.showToast({
                         title:"请输入介绍",
                         icon:'error'
                     });
                     return false
                 }
                 if (this.urlList.length === 0){
                     uni.showToast({
                         title:"请至少上传一张照片",
                         icon:'error'
                     });
                     return false
                 }
                 if (this.isExchange === 2 && this.exchange === null){
                     uni.showToast({
                         title:'请输入交换物品',
                         icon:'error'
                     })
                     return false
                 }

                 if (this.status === null){
                     uni.showToast({
                         title:'请输入物品数量',
                         icon:'error'
                     })
                     return false
                 }
                 if (this.itemname === null){
                     uni.showToast({
                         title:'请输入物品数量',
                         icon:'error'
                     })
                     return false
                 }
                 if (this.isExchange !==2 && this.price === null){
                     uni.showToast({
                         title:'请输入物品价格',
                         icon:'error'
                     });
                     return false
                 }
                 return true
            },
           async onSubmit(){
                // console.log("content",this.textValue)
                // console.log("type",this.type);
                // console.log("分类",this.category);
                // console.log("交换物品",this.exchange);
                // console.log("交换价格",this.price);
                // console.log("交换数量",this.status);
                // console.log("交换名称",this.itemname);
                //验证
               const urls = []
               for (let i = 0; i < this.fileList.length; i++) {
                   urls[i] = await uploadImge(this.fileList[i].url)
               }
               this.urlList = urls.map(item=>{
                   return item.obj
               });
               if (this.validateData() === true){
                   const uid = uni.getStorageSync('id');
                   const data = {
                       uid,
                       content: this.textValue,
                       type:this.type,
                       category:this.category,
                       price: this.price,
                       status:this.status,
                       exchange:this.exchange,
                       itemName:this.itemname,
                       photo:this.urlList.join('`')

                   }
                   console.log("发送数据",data)
                   insertDealing(data).then(res=>{
                       if (res.code === 200){
                           uni.showToast({
                               title:'发布成功',
                               icon:'success'
                           });
                           uni.switchTab({
                               url:'/pages/home/Home'
                           })
                       }
                   }).catch(err=>{
                       uni.showToast({
                           title:'发布失败',
                           icon:'error'
                       })
                   })
               }


            },
            onDeletePicItem(event){
                console.log(event.detail.index,"第几个图片")
                this.fileList = this.fileList.splice(event.detail.index,1)
            },
            afterRead(event) {
                console.log(event.detail,"文件");
                let obj = {}
                obj.url = event.detail.file.url;
                obj.name = "图片"+(this.fileList.length+1)
                obj.deletable=true
                this.fileList.push(obj)
            },
        }
    }
</script>

<style scoped lang="scss">

    .input-block{
        margin: 0 32rpx 32rpx 32rpx;
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

    .van-cell__title{
        font-size: 30rpx;
    }

    .van-collapse-item__content{
        padding: 20rpx 45rpx;
    }

    .van-dropdown-menu{
        margin-right: 12rpx;
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

    input{
        color: rgb(50, 50, 50)
    }

    .tag-container input{
        width: 200 rpx;
        text-align: right;
        font-size: 30rpx;
    }

    .price-container{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .price-container{
        font-size: 30rpx;
        color: rgb(50, 50, 50);
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

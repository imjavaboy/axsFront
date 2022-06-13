<template>
    <div>
        <view>

            <scroll-view scroll-y scroll-into-view='toView' style='height: 100vh;'>
                <!-- <view class='scrollMsg'> -->
                <view v-for="(item,index) in msgList" :key="item.id">

                    <!-- 单个消息1 客服发出（左） -->
                    <view v-if="item.isTo" :id="'msg-'+index" style='display: flex; padding: 2vw 11vw 2vw 2vw;'>
                        <view style='width: 11vw; height: 11vw;'>
                            <image v-if="item.buyUserId === 0" src="../../static/icon/sys.png" style='width: 11vw; height: 11vw; border-radius: 10rpx;'/>
                            <image v-else style='width: 11vw; height: 11vw; border-radius: 10rpx;' :src="item.buyHeadImg"/>
                        </view>
                        <!-- <view style='width: 3vw; height: 11vw; margin-left: 0.5vw; display: flex; align-items: center; z-index: 9;'>
                        </view> -->
                        <view class='leftMsg'>
                            <text class="msg-text">{{item.content}}</text>

                        </view>
                    </view>

                    <!-- 单个消息2 用户发出（右） -->
                    <view v-else :id="'msg-'+index" style='display: flex; justify-content: flex-end; padding: 2vw 2vw 2vw 11vw;'>
                        <view class='rightMsg'>
                            <text class="msg-text">{{item.content}}</text>
                        </view>
                        <!-- <view style='width: 11vw; height: 11vw; margin-right: -8vw; display: flex; align-items: center; z-index: 9;'>
                        </view> -->
                        <view style='width: 11vw; height: 11vw;'>
                            <image style='width: 11vw; height: 11vw; border-radius: 10rpx;' :src="item.buyHeadImg"/>
                        </view>
                    </view>


                </view>
                <!-- </view> -->

                <!-- 占位 -->
                <view style='width: 100%; height: 18vw;'></view>
            </scroll-view>
            <form @submit="sendClick" v-if="item.buyUserId !== 0">
                <view class='inputRoom' :style="'bottom:' +inputBottom">
                    <input @focus='focus' @blur='blur' name="content" adjust-position=false :value='inputVal'/>
                    <button
                            style='width: 120rpx; height: 60rpx; margin-left: 20rpx;
                             margin-right: 10rpx; background-color: #07C160; color: white; font-size: 24rpx'
                            form-type="submit">发送</button>
                </view>
            </form>


        </view>
        <van-dialog id="van-dialog" />
    </div>
</template>
<script>
    import {getChatListSomeOne, insertMsg} from "../../api/require";
    import Dialog from "../../wxcomponents/vant/dialog/dialog";

    export default {
        name: "ChatDetail",
        data(){
            return{
                to:0,//接收者
                from:0,
                msgList:[],
                myPhoto:'',
                inputVal:'',
                windowWidth:0,
                windowHeight:0,
                keyHeight:0,
                scrollHeight: '100vh',
                inputBottom: 0,
                toView:''
            }
        },
        methods:{
            onLoad(options){
                this.windowWidth = wx.getSystemInfoSync().windowWidth;
                this.windowHeight = wx.getSystemInfoSync().windowHeight;
                this.to = options.sendto
                this.from = uni.getStorageSync('id');
                uni.setNavigationBarTitle({
                    title: options.username
                });
                this.myPhoto = uni.getStorageSync("userInfo").headimg
                this.getData()
            },
            getData(){
                getChatListSomeOne(this.from,this.to).then(res=>{
                    res.obj.forEach(item =>{
                        if (item.buyUserId !== parseInt(this.from)){
                            item.isTo = true
                        }else{
                            item.isTo = false
                        }
                    })
                    this.msgList = res.obj

                })
            },
            /**
             * 获取聚焦
             */
            focus (e) {
                console.log(e.detail)
                this.keyHeight = e.detail.height;
                this.scrollHeight = (this.windowHeight - this.keyHeight) + 'px'
               this.toView = 'msg-'+ (this.msgList.length - 1)
                this.inputBottom = this.keyHeight+'px'
                this.inputVal = e.detail.value
                //计算msg高度
                // calScrollHeight(this, keyHeight);

            },
            //失去聚焦(软键盘消失)
            blur (e) {
                console.log(e.detail)
                this.scrollHeight= '100vh',
                    this.inputBottom= 0
               this.toView = 'msg-' + (this.msgList.length - 1)
                this.inputVal = e.detail.value

            },
            sendClick(){
                console.log("消息",this.inputVal)
                if (this.inputVal === ''){
                    Dialog.alert({
                        title: '请输入消息',
                    }).then(() => {
                        // on close
                    });
                }
                insertMsg({
                    who:1,
                    content:this.inputVal,
                    buyUserId:this.from,
                    havUserId:this.to,
                    who:this.from
                }).then(res=>{
                    if(res.code === 200){
                      this.getData()
                    }else{
                        uni.showToast({
                            title:'消息发送失败',
                            icon:'error'
                        })
                    }
                }).catch(err=>{
                    uni.showToast({
                        title:'消息发送失败',
                        icon:'error'
                    })
                });
                this.inputVal = ''
            }


        }
    }
</script>
<style scoped lang="scss">
    .inputRoom {
        width: 100vw;
        height: 16vw;
        border-top: 1px solid #cdcdcd;
        background-color: #f1f1f1;
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        z-index: 20;
    }

    input {
        width: 600rpx;
        height: 70rpx;
        background-color: #fff;
        border-radius: 5rpx;
        margin-left: 2vw;
        padding: 0 3vw;
        font-size: 28rpx;
        color: #444;
    }

    .leftMsg {
        font-size: 35rpx;
        color: #444;
        /* line-height: 7vw; */
        padding: 15rpx 25rpx;
        background-color: black;
        color: #fff;
        margin-left: 10rpx;
        border-radius: 10rpx;
        z-index: 10;
        margin-right: 28rpx;
    }

    .rightMsg {
        font-size: 35rpx;
        color: #444;
        /* line-height: 7vw; */
        padding: 15rpx 25rpx;
        background-color: #96EB6A;
        margin-left: 27rpx;
        margin-right: 10rpx;
        border-radius: 10rpx;
        z-index: 10;
    }

    .msg-text{
        font-size: 30rpx;
    }
</style>

<template>
    <div>
        <block v-if="friends.length === 0">
            <view class="card-container">
                <view class="sorry">
                    <image src="../../static/icon/msg.png" class="sorryimg" mode="widthFix"></image>
                    <view class="sorrytxt">
                        <text>
                            暂无消息
                        </text>
                    </view>
                </view>
            </view>
        </block>
        <block v-else-if="loginUserInfo === ''">
            <view class="card-container">
                <view class="sorry">
                    <image src="../../static/icon/msg.png" class="sorryimg"></image>
                    <view class="sorrytxt">
                        <text>
                            暂无消息
                        </text>
                    </view>
                </view>
            </view>
        </block>
        <block v-else>
            <view class="list-container">
                <view
                        v-for="(item,index) in friends"
                        :key="item.id"
                        class="list-row-wrapper"
                        hover-class="list-row-hover"
                        hover-stay-time="50"
                        :data-username="item.toUsername"
                        :data-id ="item.toId"
                        @tap="gotoContact">
                    <view class="list-row">
                        <view class="list-icon">
                            <view v-if="item.buyUserId === 0">
                                <view class="list-photo">
                                    <image src="../../static/icon/sys.png" style="width: 45px; height: 45px;"></image>
                                </view>
                            </view>
                            <view class="list-photo" v-else>
                                <image :src="item.toHeadimg" style="width: 45px; height: 45px;"></image>
                            </view>
<!--                            <view v-if="item.unread == meWho[index]" class="message-dot"></view>-->
                        </view>
                        <view class="list-content">
                            <view class="list-content-layout">
                                <view class="list-content-name">
                                    <view class="list-content-title">{{item.toUsername}}</view>
                                    <view class="list-content-time">{{ item.time }}</view>
                                </view>
                                <view class="list-content-brief">
                                    <text>{{ item.content }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </block>

    </div>
</template>

<script>
    import {getChatList} from "../../api/require";

    export default {
        name: "List",
        data(){
            return{
                friends:[],
                loginUserInfo:'',
                uid:'',
            }
        },
        methods:{
            onLoad(){
                this.loginUserInfo = uni.getStorageSync('userInfo')
                this.uid = uni.getStorageSync('id');
                this.getList()
            },

            getList(){
                getChatList(this.uid).then(res=>{
                    for (const item1 of res.obj){
                        // console.log(item1.time > res.obj[2].time,"比较世家")
                        for (let i = 0; i < res.obj.length; i++) {
                            for (let j = 0; j < res.obj.length; j++) {
                                if (res.obj[i].buyUserId === res.obj[j].havUserId && res.obj[i].havUserId === res.obj[j].buyUserId){
                                    if (res.obj[i].time > res.obj[j].time){
                                        res.obj.splice(j,1)
                                    }else{
                                        res.obj.splice(i,1)
                                    }
                                }
                            }

                        }
                    }

                    res.obj.forEach(item=>{

                        if (item.sendAccount !== null){
                            if ( item.sendAccount.id === this.uid){
                                console.log("黑黑黑黑黑黑嘿吧")
                                item.toId = item.toAccount.id
                                item.toUsername = item.toAccount.username
                                item.toHeadimg = item.toAccount.headimg
                            }else{
                                console.log("哈哈哈哈")
                                item.toId = item.sendAccount.id
                                item.toUsername = item.sendAccount.username
                                item.toHeadimg = item.sendAccount.headimg
                            }
                        }else {
                            item.toId = 0;
                            item.toUsername = "系统消息"
                            item.toHeadimg = `../../static/icon/sys.png`
                        }

                    })
                    console.log(res.obj)
                    this.friends = res.obj
                })
            },
            gotoContact(event){
                const toId = event.currentTarget.dataset.id;
                const username = event.currentTarget.dataset.username;
                uni.navigateTo({
                    url:`/pages/chatDetail/ChatDeatil?sendto=${toId}&username=${username}`
                })

            }
        }

    }
</script>

<style scoped lang="scss">


    .card-container{
        display: flex;
        flex-direction: row;
        background-color: whitesmoke;
        height: 100vh;
        .sorry{
            width: 100%;
            height: 60vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background-color: whitesmoke;
            image{
                width: 200rpx;
                height: 200rpx;
            }
            .sorrytxt{
                text-align: center;
                color: #8a8a8a;
                font-size: 40rpx;
            }
        }
    }

    .list-row-wrapper {
        padding: 0 10rpx 0 35rpx;
        box-sizing: border-box;
        background-color: #fff;
    }
    .list-row {
        display: flex;
        /* border-bottom: 1rpx solid #ccc; */
        padding: 20rpx 0 0 0;
        box-sizing: border-box;
    }
    .list-row-hover {
        background-color: rgba(0, 0, 0, 0.3);
    }
    .list-icon {
        height: 50px;
        width: 50px;
        position: relative;
    }
    .list-photo {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .list-photo image{
        border-radius: 50%;
    }


    .message-dot {
        width: 16rpx;
        height: 16rpx;
        position: absolute;
        top: -4rpx;
        right: -4rpx;
        background-color: red;
        border-radius: 50%;
    }
    .list-content {
        flex: 1;
        font-size: 14px;
        padding: 0rpx 20rpx 0;
        border-bottom: solid thin rgba(242,242,242,30%);
    }
    .list-content-layout {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 35rpx;
    }
    .list-content-name {
        flex: 1;
        margin-bottom: -8rpx;
        margin-top: 5rpx;
    }
    .list-content-brief {
        flex: 1;
        margin-bottom: 10rpx;
    }


    .list-content-title {
        color: rgb(25,25,25);
    }
    .list-content-time {
        font-size: 12px;
        float: left;
        color: rgb(178,178,178);
    }
    .list-content-brief > text {
        font-size: 27rpx;
        color: rgb(178,178,178);
    }
</style>


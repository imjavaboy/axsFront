<template>
    <div class="box">
        <van-popup
                show="isPopupShowed"
                position="bottom"
                round
                custom-style="width: 100%; height: 42%"
                @close="onClose"
        >
            <view class="popup-container">
                <view class="item-container">
                    <view class="icon-container forum" @click="onClickPostItem">
                        <image src="../../static/icon/note.png"/>
                    </view>
                    <view class="text">发帖子</view>
                </view>
                <view class="item-container">
                    <view class="icon-container secondhand" @click="onClickSecondhandItem">
                        <image src="../../static/icon/star.png"/>
                    </view>
                    <view class="text">发二手</view>
                </view>
            </view>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: "Popup",
        data(){
            return{
                isPopUpLayerShowed: false,
                isPopupShowed: true
            }
        },
        methods:{
            onClickPostItem(){
                console.log(uni.getStorageSync('userInfo'),"数据")
                if (uni.getStorageSync('userInfo') === ''){
                    uni.showToast({
                        title:'请先登录',
                        icon:'error'
                    })
                }else{
                    uni.navigateTo({
                        url:'/pages/postPublish/PublishPost'
                    })
                }

            },
            onClickSecondhandItem(){
                if (uni.getStorageSync('userInfo') === ''){
                    uni.showToast({
                        title:'请先登录',
                        icon:'error'
                    })
                }else{
					uni.navigateTo({
                        url:'/pages/secondhand-new/Publish'
                    })
                }

            },
            onClose(){
                uni.switchTab({
                    url: '/pages/home/Home',
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .box{
        background: white;
    }
    .popup-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        .item-container{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            margin: 100rpx;
            font-size: 30rpx;
            color: white;
            .text{
                color: #333333;
            }
            .icon-container{
                border-radius: 50%;
                /* border: black solid 1rpx; */
                padding: 10rpx;
                width: 120rpx;
                height: 120rpx;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20rpx;
                image{
                    height: 80rpx;
                    width: 80rpx;
                }

            }
            .forum{
                background-color: rgb(67,189,250);
            }

            .secondhand{
                background-color: rgb(255,228,41);
            }
        }

    }

</style>

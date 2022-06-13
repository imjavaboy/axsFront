<template>
   <div>注册</div>
</template>
<script>
    export default {
        name:'Register',
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>
<style scoped lang="scss">
    .userinfo-breif-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 20rpx 30rpx;
        justify-content: space-between;
        background-color: white;
        margin-bottom: 15rpx;
    }

    .brief-container-info{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .username{
        margin-left: 30rpx;
    }

    .userimage {
        overflow: hidden;
        border-radius: 50%;
        width: 120rpx;
        height: 120rpx;
        margin: 10rpx;
    }

    .username {
        font-weight: normal;
        font-size: 35rpx;
    }


    .graydivide {
        /*灰色分割条*/
        height: 10px;
        background-color: #ededed;
        position: relative;
        top: 0px;
    }

    .item {
        width: 100%;
        background-color: #ffffff;
        margin-top: 0rpx;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        justify-content: space-around;align-content: baseline;
        border-bottom: solid 0.1rpx rgb(232,232,232) ;
    }

    .titleView{
        margin-left: 30rpx;
    }

    .functioninformation {
        display: flex;
    }

    .title {
        /*文字*/
        font-size: 30rpx;
        font-style: normal;
        font-weight: normal;
        width: 68px;
        margin: 14px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #000000;
    }

    .icon_jiantou {
        display: flex;
        width: 28px;
        height: 28px;
    }

    .right-information {
        display: flex;
        flex-direction: row-reverse;
        width: 500rpx;
        margin: 14px;
        position: relative;
        right: 15rpx;
    }

    .information{
        text-align:right;
        width:300rpx;
    }


    .item text,
    .right-information input{
        font-size: 30rpx;
    }

    .submit{
        margin:30rpx;
    }

    .section{
        margin-bottom: 80rpx;
    }

    .section__title{
        margin-bottom: 16rpx;
        padding-left: 30rpx;
        padding-right: 30rpx;
    }

    .picker{
        font-size: 30rpx;
        background-color: #FFFFFF;
    }
</style>

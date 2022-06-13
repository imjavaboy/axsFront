<template>
    <div class="box">
       <view class="box-1">
           <view class="container">
               <view class="user-box">
                   <view>用户名:</view>
                   <input placeholder="请输入电话号码" :value="tel" @input="handleInputUsername" />
               </view>
               <view class="user-box">
                   <view>密码:</view>
                   <input placeholder="请输入密码" :val="password" type="password" @input="handleInput" />
               </view>
               <button @click="SubmitLogin">登录</button>
               <view class="no-account" @click="toRegister">还没有账号，去注册</view>
           </view>
       </view>
        <van-dialog id="van-dialog" />
    </div>
</template>
<script>
    import {loginByUser} from "../../api/require";
    import Dialog from "../../wxcomponents/vant/dialog/dialog";
    export default {
        name:'Login',
        data(){
            return{
                tel:'',
                password:''
            }
        },
        methods:{
            handleInputUsername(event){
                console.log(event.detail)
                this.tel = event.detail.value
            },
            handleInput(event){
                this.password = event.detail.value
            },
            SubmitLogin(){
                loginByUser({
                   tel:this.tel,
                    password:this.password
                }).then(res=>{
                    if (res.code === 200){
                        this.tel = ''
                        this.password = ''
                        console.log(res)
                        uni.setStorageSync("token",res.obj.token)
                        uni.setStorageSync("userInfo",res.obj.account)
                        uni.setStorageSync("id",res.obj.account.id)
                        uni.switchTab({
                            url:'/pages/home/Home'
                        })
                    }else{
                        this.tel = ''
                        this.password = ''
                        Dialog.alert({
                            title: '登陆失败',
                            message: '请检查用户名和密码',
                        }).then(() => {
                            // on close
                        });
                    }
                }).catch(er=>{

                })
            },
            toRegister(){
                uni.navigateTo({
                    url:'/pages/register/Register'
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .box{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background: #eee;
        .container{
            width: 90%;
            height: 30vh;
            border-radius: 20rpx;
            margin: 20rpx auto;
            background: #fff;
            padding:  20rpx;
            .user-box{
                display: flex;
                justify-content: space-between;
                margin: 20rpx 0;
                view{
                    color: #333333;
                    font-size: 40rpx;
                }
                input{
                    width: 450rpx;
                    height: 80rpx;
                    background: white;
                    border: 1rpx solid #ccc;
                    border-radius: 20rpx;
                    padding: 0 20rpx;
                }
            }
            .no-account{
                color: skyblue;
                text-align: right;
                margin-top: 10rpx;
                cursor: pointer;
            }
            button{
                background: #4cd964;
                color: #fff;
            }
        }
    }

</style>

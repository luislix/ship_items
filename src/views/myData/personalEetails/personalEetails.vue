<template>
    <div class="personalEetails pageCommonStyle">
        <myheader></myheader>
        <van-row class="main">
            <van-row class="border_bottom float_c">
                <van-col span="18" type="flex" class="float_l">更改头像</van-col>
                <van-col span="4" class="float_r">
                    <van-uploader
                        :preview-full-image="flag"
                        style="border-radius: 1rem;"
                        multiple
                        :max-count="1"
                        preview-size="1.3rem"
                        :disabled="userLoginInfo?false:true"
                        :after-read="uploadUserImg"
                        >
                        <van-image
                        width=".7rem"
                        height=".7rem"
                        round
                        :src="userImg"
                        />
                    </van-uploader>
                </van-col>
                <van-col span="2" type="flex" justify="end" class="float_r"><van-icon class="iconSize" name="arrow" /></van-col>
            </van-row>
            <van-row class="border_bottom float_c">
                <van-col span="12" type="flex" class="float_l">姓名</van-col>
                <van-col span="12" type="flex" justify="end" class="float_r">{{userLoginInfo.userName}}</van-col>
            </van-row>
            <van-row class="border_bottom float_c">
                <van-col span="12" type="flex" class="float_l">手机号</van-col>
                <van-col span="12" type="flex" justify="end" class="float_r">{{userLoginInfo.loginName}}</van-col>
            </van-row>
        </van-row>
        <van-row class="authenticationStatus">
             <van-row class="border_bottom float_c" @click="userAuthentication(0)">
                <van-col span="12" type="flex" class="float_l">个人身份证认证</van-col>
                <van-col span="12" type="flex" justify="end" class="float_r">{{userLoginInfo.user_certificate_status==1?'已认证':'未认证'}}</van-col>
                <van-col span="2" type="flex" justify="end" class="float_r"><van-icon class="iconSize" name="arrow" /></van-col>
            </van-row>
            <van-row class="border_bottom float_c" @click="userAuthentication(1)">
                <van-col span="12" type="flex" class="float_l">企业身份认证</van-col>
                <van-col span="12" type="flex" justify="end" class="float_r">{{userLoginInfo.company_certificate_status==1?'已认证':'未认证'}}</van-col>
                <van-col span="2" type="flex" justify="end" class="float_r"><van-icon class="iconSize" name="arrow" /></van-col>
            </van-row>
        </van-row>
    </div>
</template>

<script>
import {userPhoto} from "@/api/index"
export default {
    data() {
        return {
            flag:false,
            userImg:'',
            userLoginInfo:'',
        }
    },
    created() {
        if(localStorage.getItem('userLoginInfo')){
            this.userLoginInfo=JSON.parse(localStorage.getItem('userLoginInfo'));
            this.userImg =this.userLoginInfo.userPortrait||require("@/assets/image/goods_logo.png");
            this.userType=this.userLoginInfo.userType;
            this.userImg = this.userLoginInfo.userPortrait;
        } else {
            this.userImg = require("@/assets/image/goods_logo.png");
        }
    },
    methods: {
        // 上传头像
        uploadUserImg(file){
            console.log(file)
            // file.file.name=imgfile;
            if(localStorage.getItem('userLoginInfo')){
                let formData = new FormData();
                formData.append('imgfile', file.file);
                userPhoto(formData,file.file.name,localStorage.getItem('token')).then(res=>{
                    if(res.data.code==200){
                        this.userImg=res.data.data;
                        let userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));
                        console.log(userLoginInfo);
                        userLoginInfo.userPortrait = res.data.data
                        localStorage.setItem('userLoginInfo',JSON.stringify(userLoginInfo))
                    }
                })
            } else {
                this.$router.push({path:'/login'})
            }
        },

        userAuthentication(type){
            this.$router.push({path:'/Authentication',query:{jumpStatus:type}})
        }
    },
}
</script>


<style lang="less" scoped>
    .personalEetails {
        .main {
            background: #fff;
            padding:0 .1rem;
            .van-row {
                padding:.3rem;
            }
        }
        .authenticationStatus {
            margin-top:.2rem;
            background: #fff;
            padding:0 .1rem;
            .van-row {
                padding:.3rem;
            }
        }
        .border_bottom {
            :nth-of-type(1) {
                color:#bbb;
            }
        }
    }
</style>

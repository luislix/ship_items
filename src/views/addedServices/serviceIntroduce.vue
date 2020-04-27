<template>
    <div class="serviceIntroduce pageCommonStyle">
        <myheader></myheader>
        <van-row>
            <van-row class="header"><van-col span="24">为什么要签订{{$route.query.jumpStatus==1?'保险':"合同"}}服务？</van-col></van-row>
            <van-row class="align_center">
                <van-col span="10">
                    <img src="@/assets/image/service/service_1.png" alt="">
                </van-col>
                <van-col span="14" class="float_l">
                    <van-col style="text-align:left;">1.线上签署，随时随地地签合同，便捷高效</van-col>
                </van-col>
            </van-row>
            <van-row class="align_center" style="padding:.3rem 0;">
                <van-col span="14" class="float_c">
                    <van-col span="18" style="text-align:left;">2.多重认证手写签署，专业律师团队拟定，效力有保障</van-col>
                </van-col>
                <van-col span="10">
                    <img src="@/assets/image/service/service_2.png" alt="">
                </van-col>
            </van-row>
            <van-row class="align_center">
                <van-col span="10">
                    <img src="@/assets/image/service/service_3.png" alt="">
                </van-col>
                <van-col span="14" class="float_l">
                    <van-col style="text-align:left;">3.云端存储，不用担心合同遗失损毁，省心安心</van-col>
                </van-col>
            </van-row>
        </van-row>
        <van-row class="btn" v-if="$route.query.orderStatus==1">
            <van-button type="info" @click="buyService">购买服务</van-button>
        </van-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    created() {
        if(this.$route.query.jumpStatus==1){
            this.$route.meta.title = '保险服务'
        }
    },
    methods: {
        // 购买服务
        buyService(){
            this.$router.push({path:'/buyService',query:{}})
        }
    },
}
</script>

<style lang="less" scoped>
    .serviceIntroduce {
        .van-row {
            .header {
                font-weight: bold;
                padding:.4rem;
            }
            img {
                width: 2.2rem;
                // height: ;
            }
        }
    }
</style>

<template>
    <div class="coupon pageCommonStyle">
        <myheader></myheader>
        <van-row class="couponItems" v-for="(item,index) in coupon" :key="index">
            <van-col class="textColor_blue" span="5">
                <van-row class="float_c"><van-col>&yen;</van-col><van-col style="font-size:.5rem;">{{item.money}}</van-col></van-row>
                <van-row style="font-size:.2rem;"><van-col span="24">优惠券</van-col></van-row>
            </van-col>
            <van-col span="14" class="coupon_time">
                <van-row style="height:100%;">
                    <van-row><van-col>{{item.contractDescribe}}</van-col></van-row>
                    <van-row class="align_center" style="margin:.1rem;">
                        <!-- <van-col class="textColor_gray">有效期至：</van-col> -->
                        <!-- <van-col class="textClolor_lightGray">{{item.createTime | formatTime}}</van-col> -->
                    </van-row>
                </van-row>
            </van-col>
            <van-col span="5" @click="lookDetails" class="float_c method"><van-tag round type="primary">去使用</van-tag></van-col>
        </van-row>
        <van-col v-show="coupon.length>0?false:true" span="24">您暂无优惠券！</van-col>
    </div>
</template>

<script>
import {getMyCoupon,delCoupon} from '@/api/index';
export default {
    data() {
        return {
            coupon:[],
            pageData:{
                pageNum:1,
                pageSize:15,
            },
        }
    },
    created() {
        this.getMyCoupon(this.pageData);
    },
    methods: {
        getMyCoupon(pageData){
            getMyCoupon(pageData,localStorage.getItem('token')).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.coupon=res.data.data.list;
                }
            })
        },
        lookDetails(){
            this.$router.push({path:'/index/home',query:{}})
            // this.$toast({
            //     message:'签订',
            //     duration:5000
            // })
        }
    },
}
</script>

<style lang="less" scoped>
    .coupon {
        padding: .2rem;
        overflow:auto;
        .couponItems {
            border-radius: .2rem;
            margin-bottom: .15rem;
            background: #fff;
            height: 1.9rem;
            display: flex;
            align-items: center;
            .method {
                height: 100%;
                border-left: .5px dashed #ccc;
                position: relative;
                ::after {
                    display: block;
                    width: .3rem;
                    background: #f5f5f5;
                    height: .3rem;
                    content: '';
                    position: absolute;
                    top: -.15rem;
                    left: -.15rem;
                }
                ::before {
                    display: block;
                    width: .3rem;
                    background: #f5f5f5;
                    height: .3rem;
                    content: '';
                    border-radius: 50%;
                    position: absolute;
                    bottom: -.15rem;
                    left: -.15rem;
                }
            }
        }

    }
</style>

<template>
    <div class="evaluate pageCommonStyle">
        <myheader></myheader>
        <van-row class="evaluate_main">
            <van-row class="mark">
                <van-row>
                    <van-col span="24" style="font-size:18px;font-weight:bold;margin:.3rem 0;">您对此次交易满意吗?</van-col>
                </van-row>
                <van-row class="userName">
                    <van-col span="24" class="align_center userInfo">
                        <van-col span="12" class="align_center">
                            <img :src="userImg" style="width:.8rem;height:.8rem;border-radius:50%;margin-right:.2rem;"/>
                            <van-col class="align_center">{{userLoginInfo.userName}}</van-col>
                        </van-col>
                        <van-col span="12" class="float_r" @click="flag=!flag">
                            <van-col class="align_center" :style="{color:flag?'#0470dc':''}" style="margin-right:.1rem;"><van-icon name="checked" /></van-col>
                            <van-col>匿名评价</van-col>
                        </van-col>
                    </van-col>
                    <van-col span="24" class="satisfaction">
                        <van-col span="12" class="float_c">
                            <van-col @click="checked=!checked" class="options float_l" span="18" :style="{color:checked?'#0470dc':''}">
                                <van-col style="font-size:30px;" class="iconfont icon-wuqi"></van-col>
                                <van-col style="margin-left:.2rem;">不满意</van-col>
                            </van-col>
                        </van-col>
                        <van-col span="10" class="float_c">
                            <van-col @click="checked=!checked" class="options float_l" span="18" :style="{color:checked?'':'#0470dc'}">
                                <van-col style="font-size:30px;" class="iconfont icon-wuqi"></van-col>
                                <van-col style="margin-left:.2rem;">满意</van-col>
                            </van-col>
                        </van-col>
                    </van-col>
                </van-row>
            </van-row>
        </van-row>
        <van-row class="content">
            <van-cell-group style="border-radius: .3rem;">
            <van-field
                v-model="evaluate.evaluateRemark"
                rows="2"
                autosize
                type="textarea"
                maxlength="140"
                placeholder="请输入意见反馈"
                show-word-limit
            />
            </van-cell-group>
        </van-row>
        <van-row class="btn" @click="orderEvaluate">
            <van-button type="info">提价评价</van-button>
        </van-row>
    </div>
</template>

<script>
import {orderEvaluate} from '@/api/index'
export default {
    data() {
        return {
            flag:true,
            checked:true,
            userImg:'',
            evaluate:{
                // "shipOrderIdList": this.$route.query.shipOrderIdList, //船主订单集合(必须要)
                // "orderIdListStr": this.$route.query.orderIdListStr, //被评价订单集合(多个用逗号隔开)
                "orderType": 1, //被评价订单类型（1：货主订单， 2：船主订单）
                "orderId":this.$route.query.orderIdListStr,
                "satisfactionLevel": 5, //评价满意程度（1、2、3、4、5）
                "evaluateRemark": "", //备注信息
                "orderUserId":''
            },
            userLoginInfo:''
        }
    },
    created() {
        this.userLoginInfo=JSON.parse(localStorage.getItem('userLoginInfo'));
        // this.evaluate.orderUserId = this.$route.query.userId;
        if( this.userLoginInfo){
            this.userImg = this.userLoginInfo.userPortrait
            if(this.userLoginInfo.userType==3){
                this.evaluate.orderType=1
            } else {
                this.evaluate.orderId = this.$route.query.shipOrderIdList;
                this.evaluate.orderType=2;
            }
        };
    },
    methods: {
        orderEvaluate(){
            if(!this.evaluate.evaluateRemark.trim()){return this.$toast('请输入评价');}
            if(this.checked){this.evaluate.satisfactionLevel=1;}else {this.evaluate.satisfactionLevel=5};
            orderEvaluate(this.evaluate,localStorage.getItem('token')).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.$toast('提交成功');
                } else {
                    this.$toast(res.data.message);
                }
                setTimeout(() => {
                    this.$router.go(-1)
                }, 1000);
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .evaluate {
        padding: .2rem .3rem;
        .evaluate_main {
            background:#fff;
            border-radius: .2rem;
            .userName {
                padding: .2rem;
                .userInfo {
                    font-size:18px;
                    background: #F9FBFD;
                    padding:.2rem .4rem;
                    border-radius: 1rem;
                }
                .satisfaction {
                    margin-top: .3rem;
                    padding:.2rem .4rem;
                    font-size:16px;
                    .options {
                        background: #F9FBFD;
                        border-radius: .5rem;
                    }
                }
            }
        }
        .content {
            margin-top:.2rem;
            border-radius: .3rem;
        }
    }
</style>

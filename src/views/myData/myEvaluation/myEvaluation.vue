<template>
    <div class="myEvaluation pageCommonStyle">
        <myheader></myheader>
        <van-tabs v-model="active" animated @click="check" title-active-color="#0B6EFF" color="#0B6EFF">
            <van-tab v-for="(item,index) in contractName" :name="index" :title="item.name" :key="index">
                <van-row class="evaluationList" v-if="evaluateList.length>0?true:false">
                    <van-row class="evaluationItem" v-for="(item,index) in evaluateList" :key="index">
                        <van-col span="5">
                            <van-image
                            round
                            width=".8rem"
                            height=".8rem"
                            :src="item.userInfo.userPortrait?item.userInfo.userPortrait:''"
                            />
                        </van-col>
                        <van-col span="14">
                            <van-row><van-col class="textClolor_lightGray">匿名用户</van-col></van-row>
                            <van-row><van-col>{{item.evaluateRemark}}</van-col></van-row>
                            <van-row><van-col class="textClolor_lightGray">{{item.createTime|formatTime}}</van-col></van-row>
                        </van-col>
                        <van-col span="5">
                            <van-row>
                                <van-col span="6"><img style="width:.4rem;" :src="item.satisfactionLevel==1?upsetImg:happyImg" alt=""></van-col>
                                <van-col span="18" class="textColor_blue">{{item.satisfactionLevel==1?'不满意':'满意'}}</van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </van-row>
                <van-row v-else>
                    <van-col span="24" style="margin-top:1rem;">{{active?'您的评价为空！':'没有用户评价您！'}}</van-col>
                </van-row>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import {evaluateOfMy,myEvaluate} from '@/api/index';
export default {
    name:'myEvaluation',
    data() {
        return {
            active:0,
            contractName:[
                {
                    name:'评价我的'
                },
                {
                    name:'我的评价'
                }
            ],
            pageData:{
                "pageNum": 1,
                "pageSize": 10,
                "params": {
                    "userId":'',
                    "satisfactionLevel":0,
                    "orderType":0
                    }
                },
            userLoginInfo:'',
            evaluateList:[],
            upsetImg:require('@/assets/image/bunayi@2x.png'),
            happyImg:require('@/assets/image/manyi@2x.png')
        }
    },
    created() {
        if(localStorage.getItem('userLoginInfo')){
            this.userLoginInfo=JSON.parse(localStorage.getItem('userLoginInfo'));
            this.pageData.params.userId=this.userLoginInfo.user_id
        };
        this.$nextTick(()=>{
            // this.myEvaluate();
            // this.evaluateOfMy();
            this.check()
        })
    },
    methods: {
        //我评价的
        myEvaluate(){
            myEvaluate(this.pageData,this.userLoginInfo.user_id,localStorage.getItem('token')).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.evaluateList=res.data.data.list;
                } else {
                    this.$toast(res.data.message);
                }
            })
        },
        // 评价我的
        evaluateOfMy(){
            evaluateOfMy(this.pageData,this.userLoginInfo.user_id,localStorage.getItem('token')).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.evaluateList=res.data.data.list;
                } else {
                    this.$toast(res.data.message);
                }
            })
        },
        check(item,name){
            console.log(item,name)
            if(this.active==0){
                this.evaluateOfMy();
            } else if(this.active==1){
                this.myEvaluate();
            }
        }
    },
}
</script>

<style lang="less" scoped>
    .myEvaluation {
        .van-tabs {
            height: 92%!important;
            overflow: auto;
        }
        .evaluationList {
            padding: .2rem;
            .evaluationItem {
                .van-image {
                    margin-top:.2rem;
                }
                background: #fff;
                border-radius: .1rem;
                padding: .2rem;
                margin-bottom:.1rem;
                .van-row {
                    padding: .05rem 0;
                }
            }
        }
    }
</style>

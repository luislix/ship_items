<template>
    <div class="myContract pageCommonStyle">
        <!-- <myheader></myheader> -->
        <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
            :right-text="this.switch"
            >
            <!-- <template slot="right"> -->
                <!-- <div>
                    11111
                </div> -->
            <!-- </template> -->
            </van-nav-bar>
            <van-tabs v-model="active" v-if="title==='我的合同'" animated @click="check" title-active-color="#0B6EFF" color="#0B6EFF">
                <van-tab v-for="(item,index) in contractName" :name="index" :title="item.name" :key="index">
                    <van-row class="main">
                        <!-- <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        :offset="offset"
                        > -->
                        <van-row class="conractItems" v-for="(item,index) in contractList" :key="index" @click="lockContract(item)">
                            <van-row>
                                <van-col span="12" class="float_l textColor_darkGray">
                                    生成日期：{{item.createTime | formatTime()}}
                                </van-col>
                                <van-col span="12">
                                    <!-- <van-col>合同编号：</van-col><van-col class="textColor_darkGray">{{item.payOrderNumber}}</van-col> -->
                                </van-col>
                            </van-row>
                            <van-row>
                                <van-col span="12">
                                    <van-col>承运人：</van-col>
                                    <van-col class="textColor_darkGray">{{item.carrier}}</van-col>
                                </van-col>
                                <van-col span="12" class="float_r">
                                    <van-col>托运人：</van-col>
                                    <van-col class="textColor_darkGray">{{item.shipper}}</van-col>
                                </van-col>
                            </van-row>
                            <van-row>
                                <van-col span="12">
                                    <van-col>定金：</van-col>
                                    <van-col class="textColor_darkGray">{{item.downPayment}}元</van-col>
                                </van-col>
                                <van-col span="12" class="float_r">
                                    <van-col>运费单价：</van-col>
                                    <van-col class="textColor_darkGray">{{item.freightPrice}}元</van-col>
                                </van-col>
                            </van-row>
                            <van-row><van-col><van-tag mark :type="item.shipperSignImg&&item.carrierSignImg?'success':'primary'">{{active==0?item.shipperSignImg&&item.carrierSignImg?'合同已签订':'等待对方签订':item.shipperSignImg&&item.carrierSignImg?'合同已签订':'合同未签订'}}</van-tag></van-col></van-row>
                            <!-- <van-row v-else><van-col><van-tag mark type="primary">合同未签订</van-tag></van-col></van-row> -->
                        </van-row>
                    <!-- </van-list> -->
                    </van-row>
                </van-tab>
            </van-tabs>
            <van-row v-else class="insurance">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <van-row class="conractItems" v-for="(item,index) in insuranceList" :key="index" @click="lockInsurance(item)">
                        <van-row>
                            <van-col span="12" class="float_l">
                                <van-col>创建时间：</van-col>
                                <van-col class="textColor_darkGray">{{item.createTime | formatTime()}}</van-col>
                            </van-col>
                            <van-col span="12">
                                <!-- <van-col>定金：</van-col> -->
                                <!-- <van-col class="textColor_darkGray">{{item.downPayment}}元</van-col> -->
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col span="14">
                                <van-col>投保人：</van-col><van-col class="textColor_darkGray">{{item.applicantName}}</van-col>
                            </van-col>
                            <van-col span="10" class="float_r">
                                <van-col>被保人：</van-col>
                                <van-col class="textColor_darkGray">{{item.recognizeeName}}</van-col>
                                <!-- {{item.createTime | formatTime()}} -->
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col span="12">
                                <van-col>货物名称：</van-col>
                                <van-col class="textColor_darkGray">{{item.cargoName}}</van-col>
                            </van-col>
                            <van-col span="12" class="float_r">
                                <van-col>货物重量：</van-col>
                                <van-col class="textColor_darkGray">{{item.cargoNum}}吨</van-col>
                            </van-col>
                        </van-row>
                    </van-row>
            </van-list>
        </van-row>
    </div>
</template>

<script>
import {getMyContractList,getInsuranceList} from '@/api/index';
export default {
    name:"myContract",
    data() {
        return {
            loading: false,
            finished: false,
            offset:100,
            active:0,
            userLoginInfo:'',
            title:'我的合同',
            switch:'',
            contractName:[
                {
                    name:'我发出的合同'
                },
                {
                    name:'我收到的合同'
                }
            ],
            contractList:[],
            insuranceList:[],
            pageData:{
                pageNum:1,
                pageSize:20,
                params:{
                    userId:JSON.parse(localStorage.getItem('userLoginInfo')).user_id
                }
            }
        }
    },
    created() {
        if(localStorage.getItem('userLoginInfo')){
            this.userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));
            if(this.userLoginInfo.userType==2){
                this.switch = "查看保单";
            } 
        }
        this.getMyContractList(0);
        this.getInsuranceList();
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1);
        },
        onClickRight(){
            if(this.title==='我的合同'){
                this.title = "我的保单";
                this.switch = "查看合同";
            } else if(this.title === "我的保单"){
                this.title = "我的合同";
                this.switch = "查看保单";
            }
        },
        getMyContractList(sendOrAccept){
            getMyContractList(sendOrAccept,this.pageData,localStorage.getItem('token')).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.contractList = res.data.data.list
                }
            })
        },
        // 保险列表
        getInsuranceList(){
            getInsuranceList(this.pageData,localStorage.getItem('token')).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.insuranceList = res.data.data.list;
                    this.finished = true;
                }
            })
        },
        check(name,title){
            if(name==0){
                this.getMyContractList(0)
            } else if(name==1) {
                this.getMyContractList(1)
            }
        },
        // 查看合同详情
        lockContract(item){
            console.log(this.active)
            this.$store.commit('lookContractDetails',item);
            if(this.active==0){
                this.$router.push({path:'/buyContract',query:{jumpStatus:0,lookContract:1}});
            } else if(this.active==1){
                this.$router.push({path:'/buyContract',query:{jumpStatus:0,opposite:1}});
            }
        },
        onLoad(){

        },
        lockInsurance(item){
            console.log(item)
            this.$router.push({path:"/insurance",query:{jumpStatus:1,insurance:item}});
        }
    },
}
</script>

<style lang="less" scoped>
    .myContract {
        height: 100vh;
        overflow:hidden;
        // .van-tabs {
        //     height: 90vh;
        // }
        .main {
            height: 86vh;
            overflow: scroll;
        }
        
        .conractItems {
            padding: .1rem;
            background:#fff;
            margin-bottom: .2rem;
            .van-row {
                margin:.1rem;
            }
        }
        .insurance {
            height:90%;
            overflow:auto;
        }
    }
</style>

<template>
    <div class="buyService">
        <myheader></myheader>
        <van-row class="form">
            <van-row  v-for="(item,index) in orderInfo" :key="index">
                <van-col span="24">
                    <van-cell-group>
                        <van-field
                            label-width="150"
                            v-model="item.value"
                            readonly="readonly"
                            rows="1"
                            autosize
                            :label="item.name"
                            type="textarea"
                            input-align="right"
                            placeholder=""
                        />
                        </van-cell-group>
                    </van-col>
                </van-row>
        </van-row>
        <!-- <van-popup
            v-model="show"
            closeable
            position="bottom"
            :style="{ height: '40%' }"
            >
            <van-row style=" font-weight: bold;font-size:16px;">选择支付方式</van-row>
            <van-row>
                <van-row class="float_c" @click="flag=1">
                    <van-col span="4" style="font-size:48px;color:#03A0E9" class="iconfont icon-umidd17"></van-col>
                    <van-col span="16" style="font-size:16px;" class="float_l">支付宝支付</van-col>
                    <van-col span="4" style="font-size:20px;" :style="{color:flag==1?'#03A0E9':''}" class="iconfont" :class="flag==1?'icon-yuandian':'icon-yuandian2'"></van-col>
                </van-row>
                <van-row class="float_c" @click="flag=2">
                    <van-col span="4" style="font-size:40px;color:#40BA49;" class="iconfont icon-weixinzhifu"></van-col>
                    <van-col span="16" style="font-size:16px;" class="float_l">微信支付</van-col>
                    <van-col span="4" style="font-size:20px;" :style="{color:flag==2?'#40BA49':''}" class="iconfont" :class="flag==2?'icon-yuandian':'icon-yuandian2'"></van-col>
                </van-row>
                <van-row class="confirmBtn">
                    <van-button type="info" @click="confirmPay">确认支付</van-button>
                </van-row>
            </van-row>
        </van-popup>
        <van-row class="btn">
            <van-button type="info" @click="show=!show">确认支付</van-button>
        </van-row> -->
        <van-row class="btn">
            <van-button type="info" @click="pay">确认支付</van-button>
        </van-row>
    </div>
</template>

<script>
import {weChatPay,aliPay} from '@/api/index'
export default {
    data() {
        return {
            show:false,
            flag:'',
            orderInfo:[],
            alipayInfo:'',
            userLoginInfo:'',
            aliPayNo:'',
            // orderNumber 前端生成的订单编号
        }
    },
    created() {
        // this.MyweChatPay();
        console.log(this.$store.state.contractInfo);
        let data = this.$store.state.contractInfo;
        this.orderInfo = [
            {name:'订单编号',value:data.goodsOrderNumber},
            {name:'托运物品',value:data.goodsName},
            {name:'货物重量(吨)',value:data.actualTotalWeight},
            {name:'装货日期',value:this.$tools.formatTime(data.loadingStartTime)},
            {name:'货物总价(选填)',value:data.totalPrice},
            {name:'货物总运价(选填)',value:data.singlePrice},
            {name:'货物始发地',value:data.startAddressHistoryDTO.provinceName+data.startAddressHistoryDTO.cityName},
            {name:'货物目的地',value:data.endAddressHistoryDTO.provinceName+data.endAddressHistoryDTO.cityName},
            {name:'备注',value:data.remark},
        ];
        if(localStorage.getItem('userLoginInfo')){
            this.userLoginInfo=JSON.parse(localStorage.getItem('userLoginInfo'));
        }
    },
    methods: {
        // 前往支付页面
        pay(){
            let orderNumber = 'HT'+ +new Date();
            this.$router.push({path:'/pay',query:{jumpStatus:0,payment:'Wechat',goodsOrderId:this.$route.query.goodsOrderId,shipOrderId:this.$route.query.shipOrderId,payOrderNumber:orderNumber,userOrderId:''}})
        },
        // 前往支付
        confirmPay(){
            console.log(this.flag)
            this.show=false;
            let useCoupons = 0//是否使用代金券（0未使用 1已使用）
            let couponsId = null//优惠券id
            if(this.flag==1){
                console.log('alipay')
                let orderNumber = 'HT'+ +new Date();
                aliPay(orderNumber,localStorage.getItem('token'),20,useCoupons).then(res=>{
                    console.log(res)
                    if(res.data.code==200){
                        this.paybyAlipay(res.data.data);
                    } else {
                        this.$toast('网络异常，请稍后重试!')
                    }
                })
            } else if(this.flag==2){
                console.log('weat');
                let orderNumber = 'HT'+ +new Date();
                weChatPay(orderNumber,localStorage.getItem("token"),20,useCoupons, couponsId).then(res=>{
                    console.log(res.data.data)
                    if(res.data.code==200){
                        this.WeChatPay(res.data.data,orderNumber);
                    } else {
                        this.$toast(res.data.message)
                    }
                })
            }
        },
        // 支付宝支付
        paybyAlipay(payInfo,orderNumber){
            let that = this;
            document.addEventListener('deviceready',function(){
                // var payInfo = "alipay_root_cert_sn=687b59193f3f462dd5336e5abf83c5d8_02941eef3187dddf3d3b83462e1dfcf6&alipay_sdk=alipay-sdk-java-4.8.10.ALL&app_cert_sn=e3ff61340d583cadb1bb8b8712f9d3aa&app_id=2019111969262496&biz_content=%7B%22body%22%3A%22%E6%82%A8%E8%B4%AD%E4%B9%B0%E6%B8%B8%E6%88%8F%E5%B8%8110%E5%85%83%22%2C%22out_trade_no%22%3A%222019-12-06+10%3A24%3A18.971HHWm3YW%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22%E6%B8%B8%E6%88%8F%E5%85%85%E5%80%BC%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fqxzuc2.natappfree.cc%2Fweb%2Falipay%2Fnotify&sign=RFDR54rqwzMy5%2FYA2fNP7YBMjOnOxhw7kqPnXVmfO2QjkQ3Oj0LRkS1mefVlwGLWwCUOYuQwZKm2dk2ypjhRmZdBtDvqz%2BO1GiPnRKI8ffdNXNxMmSXBFKvFjSBHsjHFrBSmNgstgYqypXG2Q%2FuUUY7Q3FPzjQK6mb3AyrGDqvSln1lxtmKsmqO2RxRrnwogDLxPfeqlEEpneE%2F2Yr2Eu4MVrRj5b%2FOyuKLwQgs%2FlGbavsAa%2BpwTFZ6X%2Bkg%2FkhqjCV6lMnagC5Bo3YQyHeOKNMqd9EXHcatKx4yhvdytCu%2BVf4gVcLLnfsAmXsHmoY%2BWkzBm7zmgkGDFf6PHJY8PXQ%3D%3D&sign_type=RSA2&timestamp=2019-12-06+10%3A24%3A18&version=1.0";
                cordova.plugins.alipay.payment(payInfo,function success(e){
                    // that.$toast(JSON.stringify(e))
                    // alert(JSON.stringify(e))
                    if(e){
                        console.log(e)
                        let data = e.result;
                        data=JSON.parse(data);
                        console.log(data)
                        that.$dialog.confirm({
                            title: '嘟嘟船讯提醒您！',
                            message: '您已购买合同服务！点击确定前往签订合同。'
                            }).then(() => {
                                if(that.userLoginInfo.userType==3){
                                    that.$router.push({path:'/contract',query:{jumpStatus:0,payment:'aliPay',goodsOrderId:that.$store.state.contractInfo.goodsOrderId,shipOrderId:that.$route.query.shipOrderId,payOrderNumber:data.alipay_trade_app_pay_response.out_trade_no,aliOrderNumber:data.alipay_trade_app_pay_response.trade_no,userOrderId:''}})
                                } else if(that.userLoginInfo.userType==2){
                                    that.$router.push({path:'/contract',query:{jumpStatus:0,payment:'aliPay',goodsOrderId:that.$store.state.contractInfo.goodsOrderId,shipOrderId:that.$route.query.shipOrderId,payOrderNumber:data.alipay_trade_app_pay_response.out_trade_no,aliOrderNumber:data.alipay_trade_app_pay_response.trade_no,userOrderId:''}})
                                }
                            }).catch(() => {
                        });
                    }
                },function error(e){
                    that.$toast("支付失败" + e.resultStatus);
                })
            },false)
        },
        // 微信支付
        WeChatPay(params,orderNumber){
            let that = this;
            document.addEventListener('deviceready',function() {
                Wechat.sendPaymentRequest(params, function(success){
                    // alert("支付成功",JSON.stringify(success));//支付成功回调
                    that.$dialog.confirm({
                        title: '嘟嘟船讯提醒您！',
                        message: '您已购买合同服务！点击确定前往签订合同。'
                        }).then(() => {
                            if(that.userLoginInfo.userType==3){
                                that.$router.push({path:'/contract',query:{jumpStatus:0,payment:'Wechat',payOrderNumber:orderNumber,goodsOrderId:that.$route.query.goodsOrderId,shipOrderId:that.$route.query.shipOrderId,userOrderId:''}})
                            } else if(that.userLoginInfo.userType==2){
                                that.$router.push({path:'/contract',query:{jumpStatus:0,payment:'Wechat',payOrderNumber:orderNumber,goodsOrderId:that.$route.query.goodsOrderId,shipOrderId:that.$route.query.shipOrderId,userOrderId:''}})
                            }
                        }).catch(() => {
                    });
                }, function (reason) {
                    that.$toast("支付失败" + reason);
                });
            },false)
        }
    },
}
</script>

<style lang="less" scoped>
    .buyService {
        .form {
            // padding: .2rem;
            .van-col {
                background: #fff;
                padding: 0 .2rem;
            }
        }
        .van-popup {
            padding: .2rem;
            .van-row {
                
            }
            .confirmBtn {
                width: 100vw;
                position: absolute;
                bottom: .2rem;
                .van-field__label {
                    text-align: start;
                    padding: 10px 0px;
                }
                .van-button {
                    width: 80%;
                }
            }
        }
        .van-field {
            text-align: start;
        }
    }
</style>


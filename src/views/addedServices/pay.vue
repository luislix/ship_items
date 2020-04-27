<template>
    <div class="pay pageCommonStyle">
        <myheader></myheader>
        <van-row class="discount">
            <van-row style="padding-top:.3rem;">
                <van-row style="font-size:25px;">&yen;{{payNumber}}</van-row>
                <van-row class="textClolor_lightGray" style="text-decoration:line-through;margin-top:.1rem;">&yen;20.00</van-row>
            </van-row>
            <van-row style="padding:.2rem .2rem 0 .2rem;" v-if="coupon">
                <van-col span="12" class="float_l" style="font-weight:bold;">优惠券</van-col>
                <van-col span="12" class="float_r">
                    <van-col class="textColor_blue">{{-couponAmount}}</van-col>
                    <van-col class="iconfont icon-fangxiangyou textClolor_lightGray"></van-col>
                </van-col>
            </van-row>
            <van-row ref="couponList" class="couponList" :style="coupon.length==0?'height:0;':'height:4rem;'" v-if="coupon">
                <van-row class="couponItems" v-for="(item,index) in coupon" :key="index" @click="checkCoupon(item,index)">
                    <van-col class="textColor_blue" span="5">
                        <van-row class="float_c"><van-col>&yen;</van-col><van-col style="font-size:.5rem;">{{item.money}}</van-col></van-row>
                        <van-row style="font-size:.2rem;"><van-col span="24">抵用券</van-col></van-row>
                    </van-col>
                    <van-col span="14" class="coupon_time">
                        <van-row style="height:100%;">
                            <van-row><van-col style="font-weight:bold;">{{item.contractDescribe}}</van-col></van-row>
                            <van-row class="align_center" style="margin:.1rem;">
                                <!-- <van-col class="textColor_gray">有效期至：</van-col> -->
                                <!-- <van-col class="textClolor_lightGray" style="font-size:14px;">{{item.createTime | formatTime}}</van-col> -->
                            </van-row>
                        </van-row>
                    </van-col>
                    <van-col span="4" style="font-size:20px;" :style="{color:checkIndex==index+1?'#03A0E9':''}" class="iconfont" :class="checkIndex==index+1?'icon-yuandian':'icon-yuandian2'"></van-col>
                </van-row>
            </van-row>
            <van-row class="float_c" @click="showMore" v-if="coupon.length>2" style="margin-bottom:.2rem;">
                    <van-col>{{showMoreTitle}}</van-col>
                    <van-col class="iconfont textClolor_lightGray" :class="direction"></van-col>
            </van-row>
            <van-row v-if="coupon.length==0"><van-col span="24">您暂无优惠券!</van-col></van-row>
        </van-row>
        <van-row class="checkPayment">
            <van-row class="float_c" @click="AliPayOrWeChatPay(1)">
                <van-col span="4" style="font-size:48px;color:#03A0E9" class="iconfont icon-umidd17"></van-col>
                <van-col span="16" style="font-size:16px;" class="float_l">支付宝支付</van-col>
                <van-col span="4" style="font-size:20px;" :style="{color:flag==1?'#03A0E9':''}" class="iconfont" :class="flag==1?'icon-yuandian':'icon-yuandian2'"></van-col>
            </van-row>
            <van-row class="float_c" @click="AliPayOrWeChatPay(2)">
                <van-col span="4" style="font-size:40px;color:#40BA49;" class="iconfont icon-weixinzhifu"></van-col>
                <van-col span="16" style="font-size:16px;" class="float_l">微信支付</van-col>
                <van-col span="4" style="font-size:20px;" :style="{color:flag==2?'#40BA49':''}" class="iconfont" :class="flag==2?'icon-yuandian':'icon-yuandian2'"></van-col>
            </van-row>
        </van-row>
        <van-row class="btn">
            <van-button type="info" class="van-button" @click="confirmPay">确认支付</van-button>
        </van-row>
    </div>
</template>

<script>
import {getMyCoupon,useCoupon,aliPay,weChatPay} from '@/api/index';
export default {
    data() {
        return {
            payNumber:20,
            checkIndex:0,
            checkItem:'',
            couponAmount:'',//优惠券金额
            flag:0,
            coupon:'',
            pageData:{
                pageNum:1,
                pageSize:15,
            },
            showMoreTitle:'展示更多',
            direction:'icon-down',
            userLoginInfo:''
        }
    },
    created() {
        if(localStorage.getItem('userLoginInfo')){
            this.userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));
        }
        this.getMyCoupon(this.pageData)
    },
    methods: {
        // 获取优惠券列表
        getMyCoupon(pageData){
            getMyCoupon(pageData,localStorage.getItem('token')).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.coupon=res.data.data.list;
                    console.log(this.coupon)
                }
            })
        },
        // 确认支付
        confirmPay(){
            if(this.flag==0&&this.checkIndex==0){
                return this.$toast('请选择支付方式')
            }
            this.show=false;
            let useCoupons = 0//是否使用代金券（0未使用 1已使用）
            let couponsId = null//优惠券id
            // 使用/取消优惠券
            // money 减免金额
            // couponsStatus 优惠券状态(0未使用,1已使用)
            // user_id 用户id
            // contractDescribe 优惠券描述
            // contractStatus 是否能在订单中使用(0不能使用,1可以使用)
            console.log(this.payNumber)
            if(this.payNumber==0){
                let payInfo = {
                    id:this.checkItem.id,
                    money:this.checkItem.money,// 减免金额
                    couponsStatus:this.checkItem.couponsStatus,// 优惠券状态(0未使用,1已使用)
                    user_id:JSON.parse(localStorage.getItem('userLoginInfo')).user_id,// 用户id
                    contractDescribe:this.checkItem.contractDescribe, //优惠券描述
                    contractStatus:1,//是否能在订单中使用(0不能使用,1可以使用)
                    type:0//0 使用 1 取消
                }
                console.log(payInfo)
                return useCoupon(payInfo,payInfo.type,localStorage.getItem('token')).then(res=>{
                    console.log(res)
                    this.$toast({message:'优惠券使用成功，立即前往签订合同！',forbidClick: true})
                    if(res.data.code==200){
                        setTimeout(() => {
                            this.$router.push({path:'/buyContract',query:{jumpStatus:0,payment:'coupon',couponId:this.checkItem.id,goodsOrderId:this.$store.state.contractInfo.goodsOrderId,shipOrderId:this.$route.query.shipOrderId,userOrderId:''}})
                        }, 2000);
                    }
                })
            };
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
                        console.log('支付宝支付信息',data)
                        that.$dialog.confirm({
                            title: '嘟嘟船讯提醒您！',
                            message: '您已购买合同服务！点击确定前往签订合同。'
                            }).then(() => {
                                // if(that.userLoginInfo.userType==3){
                                //     that.$router.push({path:'/contract',query:{jumpStatus:0,payment:'aliPay',goodsOrderId:that.$route.query.goodsOrderId,shipOrderId,shipOrderId:that.$route.query.shipOrderId,payOrderNumber:JSON.parse(e.result).alipay_trade_app_pay_response.out_trade_no,aliOrderNumber:JSON.parse(e.result).alipay_trade_app_pay_response.trade_no,userOrderId:''}})
                                // } else if(that.userLoginInfo.userType==2){
                                //     that.$router.push({path:'/contract',query:{jumpStatus:0,payment:'aliPay',goodsOrderId:that.$route.query.goodsOrderId,shipOrderId,shipOrderId:that.$route.query.shipOrderId,payOrderNumber:JSON.parse(e.result).alipay_trade_app_pay_response.out_trade_no,aliOrderNumber:JSON.parse(e.result).alipay_trade_app_pay_response.trade_no,userOrderId:''}})
                                // }
                                 if(that.userLoginInfo.userType==3){
                                    that.$router.push({path:'/contract',query:{jumpStatus:0,payment:'aliPay',goodsOrderId:that.$route.query.goodsOrderId,shipOrderId:that.$route.query.shipOrderId,payOrderNumber:JSON.parse(e.result).alipay_trade_app_pay_response.out_trade_no,aliOrderNumber:JSON.parse(e.result).alipay_trade_app_pay_response.trade_no,userOrderId:''}})
                                } else if(that.userLoginInfo.userType==2){
                                    that.$router.push({path:'/contract',query:{jumpStatus:0,payment:'aliPay',goodsOrderId:that.$route.query.goodsOrderId,shipOrderId:that.$route.query.shipOrderId,payOrderNumber:JSON.parse(e.result).alipay_trade_app_pay_response.out_trade_no,aliOrderNumber:JSON.parse(e.result).alipay_trade_app_pay_response.trade_no,userOrderId:''}})
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
        },
        // 显示更多优惠券
        showMore(){
            console.log(this.$refs)
            if(this.showMoreTitle=='展示更多'){
                this.showMoreTitle = '收起';
                this.direction = 'icon-fangxiangshang';
                this.$refs.couponList.$el.style.height=8+'rem';
                this.$refs.couponList.$el.style.overflow='auto'
            } else {
                this.showMoreTitle = '展示更多';
                this.direction = 'icon-down';
                this.$refs.couponList.$el.style.height=4+'rem';
                // this.$refs.couponList.$el.style.overflow='hidden'
            }
        },
        // 选择优惠券
        checkCoupon(item,index){
            console.log(item,index)
            this.payNumber=20;
            this.checkIndex = index+1;
            this.payNumber = this.payNumber-item.money;
            this.checkItem = item;
            this.couponAmount = item.money;
            this.flag=0
        },
        // 选择支付宝货微信支付
        AliPayOrWeChatPay(index){
            if(this.payNumber==0){
                this.checkIndex = 0;
                this.payNumber = 20;
                this.couponAmount = 0;
                this.flag = index;
            } else {
                this.flag = index;
            }
        }
    },
}
</script>

<style lang="less" scoped>
    .pay {
        overflow:auto;
        padding-bottom:1rem;
        .discount {
            // height:50vh;
            .van-row {
                // padding: .1rem;
            }
            background:#fff;
            .couponList {
                height:4rem;
                overflow:hidden;
                padding: .3rem;
                margin-bottom:.25rem;
                .couponItems {
                border-radius: .2rem;
                margin-bottom: .15rem;
                background: #F6F9FF;
                height: 1.8rem;
                display: flex;
                align-items: center;
                .method {
                    height: 100%;
                    position: relative;
                    }
                }
            }
        }
        .checkPayment {
            margin-top:.1rem;
            .van-row {
                padding: .2rem;
            }
            background:#fff;
        }
    }
</style>
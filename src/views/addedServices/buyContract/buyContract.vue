<template>
    <div class="buyContract pageCommonStyle">
        <div class="content" ref="content">
            <myheader></myheader>
            <van-row class="contractTitle">
                <van-row class="textColor_darkGray title">水路货物运输合同</van-row>
                <van-row class="textClolor_lightGray">
                    <van-row>
                        <van-col span="12" class="float_l">
                            <label for="goods">托运人(甲方):</label><input :disabled="this.$route.query.opposite==1||this.$route.query.lookContract==1?true:false" type="text" v-model="contractInfo.shipper" class="goods">
                        </van-col>
                        <van-col span="12" class="float_r">
                            <label for="ship">承运人(乙方):</label><input :disabled="this.$route.query.opposite==1||this.$route.query.lookContract==1?true:false" type="text" v-model="contractInfo.carrier" class="ship">
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="12" class="float_l">
                            <label for="goodsPhone">联系电话:</label><input :disabled="this.$route.query.opposite==1||this.$route.query.lookContract==1?true:false" type="text" v-model="contractInfo.shipPhone" class="goodsPhone">
                        </van-col>
                        <van-col span="12" class="float_r">
                            <label for="shipPhone">联系电话:</label><input :disabled="this.$route.query.opposite==1||this.$route.query.lookContract==1?true:false" type="text" v-model="contractInfo.goodsPhone" class="shipPhone">
                        </van-col>
                    </van-row>
                </van-row>
            </van-row>
            <van-row class="shipAndGoodsInfo">
                <van-row class="textColor_darkGray title">一、航次任务</van-row>
                <van-row class="textClolor_lightGray shipAndGoodsInfo_content" v-if="shipInfo&&goodsInfo">
                    <van-row>
                        <van-col span="12" class="float_l">
                            <label>船舶名称:</label><input disabled v-model="shipInfo.shipInfoDTO.shipEnglishName" type="text">
                        </van-col>
                        <van-col span="12" class="float_r">
                            <label>货物名称:</label><input disabled v-model="goodsInfo.goodsName" type="text">
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="12" class="float_l">
                            <label>重量(吨):</label><input class="weight" disabled v-model="shipInfo.shipInfoDTO.maxRequiredWeight" type="text">
                        </van-col>
                        <van-col span="12" class="float_r">
                            <label>货物交接方式:</label><input disabled v-model="contractInfo.connectType" type="text">
                        </van-col>
                    </van-row>
                     <van-row>
                        <van-col span="12" class="float_l">
                            <label>起运地:</label><input class="startAddress" disabled v-model="shipInfo.startAddressHistoryDtoList[0].portName" type="text">
                        </van-col>
                        <van-col span="12" class="float_r">
                            <label>目的地:</label><input disabled v-model="goodsInfo.endAddressHistoryDTO.portName" type="text">
                        </van-col>
                    </van-row>
                     <van-row>
                        <van-col span="12" class="float_l">
                            <label>起运时间:</label><input disabled v-model="shipInfo.startAddressHistoryDtoList[0].createTime" type="text">
                        </van-col>
                        <van-col span="12" class="float_r">
                            <label>航行时间:</label><input disabled v-model="contractInfo.totalDate" type="text">
                        </van-col>
                    </van-row>
                     <van-row>
                        <van-col span="12" class="float_l">
                            <label>装船时间:</label><div disabled class="loadingTime">{{goodsInfo.loadingStartTime}}</div>
                        </van-col>
                        <van-col span="12" class="float_r">
                            <label>卸船时间:</label><div class="loadingTime" @click.stop="checkTime"><span v-if="contractInfo.orderEndTime">{{contractInfo.orderEndTime | formatTime}}</span></div>
                        </van-col>
                    </van-row>
                    <div style="margin:.2rem 0;border-bottom:.5px solid #bbb;"></div>
                    <van-row><van-col>装卸时间：</van-col></van-row>
                    <van-row style="text-align:start;">1、装卸港留港时间自船抵港指定的泊锚地起算，装卸完毕截止。人力不可抗力因素除外。单船装卸时间合并为<input v-model="contractInfo.overdueDay" :class="penalStatus==='overdueDay'?'bgc':''" :disabled="this.$route.query.opposite==1||this.$route.query.lookContract==1?true:false" style="width:.5rem;" />天，超过<input v-model="contractInfo.overdueDay" style="width:.5rem;border:none;"  :disabled="this.$route.query.opposite==1||this.$route.query.lookContract==1?true:false"/>天后甲方按<input :disabled="this.$route.query.opposite==1||this.$route.query.lookContract==1?true:false" style="width:.5rem;" :class="penalStatus==='goodsOverDateMoney'?'bgc':''" v-model="contractInfo.goodsOverDateMoney"/>元/吨/天的标准根据船舶载货吨位支付乙方滞期费。</van-row>
                    <van-row style="text-align:start;"> 2、若乙方未按约定航行时间到达目的港，则乙方按<input style="width:.5rem;" :class="penalStatus==='shipOverDateMoney'?'bgc':''" v-model="contractInfo.shipOverDateMoney"/>元/吨/天的标准根据船舶满载吨位支付甲方滞期费。</van-row>
                    <van-row style="text-align:start;">3、乙方未经甲方同意不得擅自更改船舶安排,否则应承担相应违约责任,按照每条船<input style="width:1rem;" :disabled="this.$route.query.opposite==1||this.$route.query.lookContract==1?true:false" ref="breakContractMoney" :class="penalStatus==='breakContractMoney'?'bgc':''" v-model="contractInfo.breakContractMoney" /> 元的标准支付甲方。</van-row>
                    <van-row><van-col span="24" class="float_l text_l">4、甲方若转港需支付转港费，费用另行约定。</van-col></van-row>
                    <van-row><van-col span="24" class="float_l text_l">5、约定航行时间、装卸时间遭遇不可抗力除外。</van-col></van-row>
                </van-row>
                <van-row v-if="orderStatus">
                    <van-col span="24">获取船货信息错误</van-col>
                </van-row>
            </van-row>
            <van-row class="freight">
                <van-row class="contractTitle">
                    <van-row class="textColor_darkGray title">二、费用计算</van-row>
                    <van-row class="textClolor_lightGray freight_content">
                        <van-row>
                            <van-col span="12" class="float_l">
                                <label for="goods">运费单价(元):</label><input :disabled="this.$route.query.opposite==1||this.$route.query.lookContract==1?true:false" v-model="contractInfo.freightPrice" :class="penalStatus==='freightPrice'?'bgc':''" type="text" class="goods">
                            </van-col>
                            <van-col span="12" class="float_r">
                                <label for="ship">定金(元):</label><input :disabled="this.$route.query.opposite==1||this.$route.query.lookContract==1?true:false" v-model="contractInfo.downPayment" :class="penalStatus==='downPayment'?'bgc':''" type="text" class="ship">
                            </van-col>
                        </van-row>
                        <div style="margin:.2rem 0;border-bottom:.5px solid #bbb;"></div>
                        <van-row><van-col class="text_l">1、支付方式:签订合同当日甲方支付定金，乙方收到定金后安排船舶到港装载，待船舶安全到达目的港卸货前结清全部运费，乙方必须提前开具增值税发票。</van-col></van-row>
                        <van-row><van-col class="text_l">2、运费单价为开票价，乙方负责办理船舶进出港手续。</van-col></van-row>
                    </van-row>
                </van-row>
            </van-row>
            <van-row class="clause">
                <van-row class="contractTitle">
                    <van-row class="textColor_darkGray title">三、承运责任</van-row>
                    <van-row class="textClolor_lightGray clause_content">
                        <van-row><van-col class="text_l">1、乙方提供适航的船舶，保证承运期间货物安全及货运质量。</van-col></van-row>
                        <van-row><van-col class="text_l">2、如需中途过驳，乙方要做好防雨等质量工作及时与甲方沟通。</van-col></van-row>
                        <van-row><van-col class="text_l">3、乙方因人为因素造成货物件数差损，乙方按市场价照价赔偿。</van-col></van-row>
                        <van-row><van-col class="text_l">4、责任期间:自货物装载至乙方船舶舱底办完交接手续时起，</van-col></van-row>
                    </van-row>
                </van-row>
            </van-row>
            <van-row class="otherTerms">
                <van-row class="contractTitle">
                    <van-row class="textColor_darkGray title">四、其他条款</van-row>
                    <van-row class="textClolor_lightGray otherTerms_content">
                        <van-row><van-col class="text_l">1、合同履行期间，若发生纠纷，尽可能协商解决，协商不成，双方一致同意在海事法院解决。</van-col></van-row>
                        <van-row><van-col class="text_l">2、一方为实现债权产生的包括但不限于诉讼费、律师费等费用，若起诉至法院后，由败诉方承担。</van-col></van-row>
                    </van-row>
                </van-row>
            </van-row>
            <van-row class="textClolor_lightGray signatureErea">
                <van-row>
                    <van-col span="12" @click="signature" class="float_l">
                        <label>托运方(甲方):</label><img :src="shipperSignImg" alt="" class="goodsSignature" />
                    </van-col>
                    <van-col span="12" @click="signature" class="float_r">
                        <label>承运方(乙方):</label><img :src="carrierSignImg" alt="" class="shipSignature" />
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="12" class="float_l">
                        <label for="goodsSignatureTime">签订时间:</label><div class="goodsSignatureTime"><span v-if="contractInfo.shipperSignTime">{{contractInfo.shipperSignTime | formatTime}}</span></div>
                    </van-col>
                    <van-col span="12" class="float_r">
                        <label for="shipSignatureTime">签订时间:</label><div class="shipSignatureTime"><span v-if="contractInfo.carrierSignTime">{{contractInfo.carrierSignTime | formatTime}}</span></div>
                    </van-col>
                </van-row>
            </van-row>
            <van-row class="float_l">
                <van-checkbox :disabled="$route.query.lookContract==1?true:false" class="float_c check textColor_darkGray" v-model="checked" shape="square">我已阅读，并同意合同内容</van-checkbox>
            </van-row>
        </div>
        <van-row class="btn btnStyle">
            <van-row v-if="$route.query.lookContract==1&&(contractInfo.carrierSignTime&&contractInfo.shipperSignTime)">
                <van-col span="24">
                    <van-button type="info"  @click="delContract">删除合同</van-button>
                </van-col>
            </van-row>
            <van-col span="24" v-if="$route.query.jumpStatus==0">
                <van-button v-if="orderStatus==1" type="info"  @click="delContract">删除合同</van-button>
                <van-button v-else type="info" @click="signContract">{{contractInfo.carrierSignTime&&contractInfo.shipperSignTime?'更新签名':'签订合同'}}</van-button>
            </van-col>
        </van-row>
         <!-- 签字弹框 -->
        <van-popup
            v-model="show"
            closeable
            close-icon="close"
            position="bottom"
            :style="{ height: '40%'}"
            >
            <vueSignature ref="signature" :sigOption="option" :w="'100%'" :h="'80%'" :defaultUrl="dataUrl"></vueSignature> 
            <van-col span="24" style="position:absolute;bottom:0;">
                <van-button style="width:50%;" type="warning" @click="clear">重写</van-button>
                <van-button style="width:50%;" type="info" @click="signatureConfirm">确定</van-button>
            </van-col>
        </van-popup>
        <!-- 时间 -->
        <van-popup
            v-model="showTime"
            position="bottom"
            :style="{ height: '40%' }"
            >
            <van-datetime-picker
                @cancel="showTime=false"
                @confirm="confirmPicker"
                v-model="contractInfo.orderEndTime"
                :min-date="minDate"
                :max-date="maxDate"
                type="datetime"
                />
        </van-popup>
    </div>
</template>

<script>
import {
  addContract,
  upDateContract,
  getShipsDetails,
  getCargoDetails,
  delContract
} from "@/api/index";
import signature from "@/mixin/signatrue";
export default {
    name:'contract',
    mixins:[signature],
    data() {
        return {
            shipInfo:'',
            goodsInfo:'',
            show:false,
            showTime:false,
            orderStatus:0,
            minDate: new Date(),
            maxDate: new Date(2025, 10, 1),
            checked:false,
            contractInfo:{
                shipper:'',
                carrier:'',
                goodsPhone:'',
                shipPhone:'',
                carrierSignTime:'',//船主签订时间
                shipperSignTime:'',//货主签订时间

                downPayment:0,//  定金
                freightPrice:0,//运费单价
                connectType:"电话沟通",// 交接方式
                overdueDay:0,
                orderEndTime:'',// 卸船期限
                totalDate:'',// 总共需要几天
                overDateMoney:0,//逾期扣费金额
                breakContractMoney:0,// 违约金
                goodsOverDateMoney:0,// 货逾期扣费金额
                shipOverDateMoney:0,// 船逾期扣费金额
            },
            flag:false,
            penalStatus:0,
            carrierSignImg:'',//承运方签名图片
            shipperSignImg:'',//托运方签名图片
            userLoginInfo:'',//用户登录信息
            orderInfo:'',//订单信息
            lookContract:''//查看订单详情
        }
    },
    created() {
        // 页面状态jumpStatus=1查看合同样表，jumpStatus=0合同签订、lockContract=1查看合同、update=1修改合同
        if(this.$route.query.jumpStatus==1) {
            this.$route.meta.title='合同样表';
        } else if(this.$route.query.jumpStatus==0){
            if(this.$route.query.lookContract==1){
                this.$route.meta.title="查看合同";
                this.lookContract=this.$store.state.contractDetails;
                this.contractInfo={
                    shipper:this.lookContract.shipper,
                    carrier:this.lookContract.carrier,
                    freightPrice:this.lookContract.freightPrice,
                    downPayment:this.lookContract.downPayment,
                    orderEndTime:this.lookContract.orderEndTime,
                    totalDate:this.lookContract.totalDate+'天',
                    connectType:this.lookContract.connectType,
                    shipperSignTime:this.lookContract.shipperSignTime,
                    carrierSignTime:this.lookContract.carrierSignTime,
                    goodsPhone:this.lookContract.shipperPhone,
                    shipPhone:this.lookContract.carrierPhone,
                    breakContractMoney:this.lookContract.breakContractMoney,
                    overdueDay:this.lookContract.overdueDay,
                    shipOverDateMoney:this.lookContract.shipOverDateMoney,
                    goodsOverDateMoney:this.lookContract.goodsOverDateMoney
                };
                this.carrierSignImg = this.lookContract.carrierSignImg;
                // this.contractInfo.carrierSignTime = this.lookContract.carrierSignTime;
                this.shipperSignImg = this.lookContract.shipperSignImg;
                // this.contractInfo.shipperSignTime = this.lookContract.shipperSignTime;
                this.checked=true;
                console.log(this.lookContract)
            } else {
                this.$route.meta.title="合同签订";
                if(this.$route.query.opposite==1){
                    // 付款方为甲方，乙方合同签订页面
                    this.lookContract=this.$store.state.contractDetails;
                    this.contractInfo={
                        shipper:this.lookContract.shipper,
                        carrier:this.lookContract.carrier,
                        freightPrice:this.lookContract.freightPrice,
                        downPayment:this.lookContract.downPayment,
                        orderEndTime:this.lookContract.orderEndTime,
                        totalDate:this.lookContract.totalDate+'天',
                        connectType:this.lookContract.connectType,
                        shipperSignTime:this.lookContract.shipperSignTime,
                        carrierSignTime:this.lookContract.carrierSignTime,
                        goodsPhone:this.lookContract.shipperPhone,
                        shipPhone:this.lookContract.carrierPhone,
                        breakContractMoney:this.lookContract.breakContractMoney,
                        overdueDay:this.lookContract.overdueDay,
                        shipOverDateMoney:this.lookContract.shipOverDateMoney,
                        goodsOverDateMoney:this.lookContract.goodsOverDateMoney
                    };
                    this.carrierSignImg = this.lookContract.carrierSignImg;
                    this.shipperSignImg = this.lookContract.shipperSignImg;
                }
            };
            if(this.lookContract){
                this.getorderInfo(this.lookContract.shipOrderId,this.lookContract.goodsOrderId)
            } else {
                this.getorderInfo(this.$route.query.shipOrderId,this.$route.query.goodsOrderId)
            }
        } 
        if(localStorage.getItem('userLoginInfo')){
            this.userLoginInfo=JSON.parse(localStorage.getItem('userLoginInfo'));
            if(this.userLoginInfo.userType==3){
                this.orderInfo=this.$store.state.contractInfo;
            } else if(this.userLoginInfo.userType==2){
                this.orderInfo=this.$store.state.shipOrderInfo;
            }
        }
    },
    methods: {
        // 签名弹框
        signature(){
            this.show=!this.show;
        },
        signatureConfirm(){
            var _this = this;
            let isEmpty = _this.$refs.signature.isEmpty();
            console.log(isEmpty)
            if (isEmpty) {
                return this.$toast('请签名')
            }
            var png = _this.$refs.signature.save();
            var jpeg = _this.$refs.signature.save('image/jpeg');
            var svg = _this.$refs.signature.save('image/svg+xml');
            console.log(png);
            console.log(jpeg);
            console.log(svg);
            if(this.userLoginInfo.userType==3){this.carrierSignImg = svg;this.contractInfo.carrierSignTime=+new Date()}
            else if (this.userLoginInfo.userType==2){this.shipperSignImg=svg;this.contractInfo.shipperSignTime=+new Date()}
            else if (this.userLoginInfo.userType==8){
                if(this.$route.query.opposite==1){
                    // requesterId: 1070 accepterId: 1569
                    if(this.lookContract.accepterId==this.userLoginInfo.user_id){
                        this.shipperSignImg=svg;this.contractInfo.shipperSignTime=+new Date()
                    }
                }
            }
            this.show = !this.show;
            this.clear();
        },
        save() {
            let contractDTO = {//新增合同订单: 
                    shipper:this.contractInfo.shipper,//托运人
                    shipperPhone:this.contractInfo.goodsPhone,// 托运人电话
                    carrier:this.contractInfo.carrier,//  承运人
                    carrierPhone:this.contractInfo.shipPhone,//  承运人电话
                    freightPrice:this.contractInfo.freightPrice,//  运费单价
                    downPayment:this.contractInfo.downPayment,//  定金
                    createTime:+new Date(),//  创建时间
                    shipperSignImg:this.shipperSignImg,//  托运方手写签名图片
                    shipperSignTime:+new Date(),//  托运方签订时间
                    carrierSignImg:this.carrierSignImg,//  承运方手写签名图片
                    carrierSignTime:+new Date(),//  承运方签订时间
                    payType:this.$route.query.payment=='aliPay'?0:this.$route.query.payment=='Wechat'?1:2,//  支付方式(0支付宝 1微信）
                    whetherRefund:0,//  是否退款（0 未退款 1 已退款）
                    isPay:1,//  是否支付（0未支付 1已支付）
                    requesterId:this.userLoginInfo.user_id,// 请求人id
                    accepterId:this.orderInfo.userId,//  被请求人id
                    payOrderNumber:this.$route.query.payOrderNumber,
                    money:20,

                    aliOrderNumber:this.$route.query.aliOrderNumber,//阿里支付订单号
                    shipOrderId:this.$route.query.shipOrderId,// 船订单id
                    goodsOrderId:this.$route.query.goodsOrderId,// 货物订单id
                    connectType:this.contractInfo.connectType,// 交接方式
                    orderEndTime:this.contractInfo.orderEndTime,// 卸船期限
                    totalDate:parseInt(this.contractInfo.totalDate),// 总共需要几天
                    //overDateMoney:this.contractInfo.overDateMoney,//逾期扣费金额
                    breakContractMoney:this.contractInfo.breakContractMoney,// 违约金
                    goodsOverDateMoney:this.contractInfo.goodsOverDateMoney,// 货逾期扣费金额
                    shipOverDateMoney:this.contractInfo.shipOverDateMoney,// 船逾期扣费金额
                    overdueDay:this.contractInfo.overdueDay
                };
                console.log(contractDTO)
            // 乙方签订合同，设置被请求人id
            console.log(this.lookContract);
            if(this.$route.query.opposite==1){
                contractDTO.accepterId=this.lookContract.accepterId;
            }
            console.log(contractDTO)
            // return
            if(this.$route.query.opposite==1){
                // 乙方修改合同
                contractDTO.shipperSignTime = +new Date();
                contractDTO.requesterId = this.lookContract.requesterId;//甲方id订单发起人id
                contractDTO.accepterId = this.lookContract.accepterId;//乙方id
                contractDTO.shipOrderId = this.lookContract.shipOrderId;//船主订单id
                contractDTO.goodsOrderId = this.lookContract.goodsOrderId;//货主订单id
                contractDTO.id = this.lookContract.id;
                contractDTO.payOrderNumber = this.lookContract.payOrderNumber;
                this.upDateContract(contractDTO);
            } else {
                let that = this;
                if(this.$route.query.payment=='coupon'){
                  // 使用优惠卷支付
                  contractDTO.couponId=this.$route.query.couponId //优惠券id
                  addContract(contractDTO,0,localStorage.getItem('token')).then(res=>{
                      console.log(res);
                      if(res.data.code==200){
                          this.$toast('合同签订成功!可在(我的-合同)查看详情！');
                          setTimeout(() => {
                              // that.$router.push({path:'/myContract',query:{}})
                              that.$router.go(-3);
                              that.$toast('合同已生成,请点击同意托运生成订单！')
                          }, 2000);
                      }
                  })
              } else {
                  // 付款方添加合同
                  addContract(contractDTO,0,localStorage.getItem('token')).then(res=>{
                      console.log(res);
                      if(res.data.code==200){
                          this.$toast('合同签订成功!可在(我的-合同)查看详情！');
                          setTimeout(() => {
                              // that.$router.push({path:'/myContract',query:{}})
                              that.$router.go(-3);
                              that.$toast('合同已生成,请点击同意托运生成订单！')
                          }, 2000);
                      }
                  })
              }
            }
        },
        // 添加合同
        signContract() {
            if (this.userLoginInfo.userType == 2) {
                if (!this.contractInfo.shipper.trim()) {
                return this.$toast("请输入托运人");
                }
                if (!this.contractInfo.shipPhone.trim()) {
                return this.$toast("请输入托运人电话");
                }
            } else {
                if (!this.contractInfo.carrier.trim()) {
                return this.$toast("请输入承运人");
                }
                if (!this.contractInfo.goodsPhone.trim()) {
                return this.$toast("请输入承运人电话");
                }
            }
            if (this.$route.query.payment) {
                if(this.contractInfo.overdueDay==''){
                    this.penalStatus='overdueDay';
                    return this.$toast('请输入卸货期限')
                }
                if (!this.contractInfo.orderEndTime) {
                    return this.$toast("请输入卸船时间");
                }
                if (this.contractInfo.downPayment=='') {
                    this.penalStatus='downPayment';
                    this.$refs.content.style.top=-30+"%";
                    return this.$toast("请输入定金");
                }
                if (this.contractInfo.freightPrice=='') {
                    this.penalStatus='freightPrice';
                    return this.$toast("请输入运费单价");
                }
                if (this.contractInfo.breakContractMoney=='') {
                    this.penalStatus='breakContractMoney';
                    this.$refs.content.style.top=-30+"%";
                    return this.$toast("请输入逾期扣费金额");
                }
                if (this.contractInfo.goodsOverDateMoney=='') {
                    this.penalStatus='goodsOverDateMoney';
                    return this.$toast("请输入货物卸货延期扣费金额");
                }
                if (this.contractInfo.shipOverDateMoney=='') {
                    this.penalStatus='shipOverDateMoney';
                    return this.$toast("请输入船舶逾期扣费金额");
                }
            };
            this.penalStatus='';
            this.$refs.content.style.top='';
            if(this.userLoginInfo.userType==3){
                this.$refs.content.style.bottom=0+"rem";
                if(!this.carrierSignImg){
                    return this.$toast('请点击承运方区域签名')
                }
                
            } else if (this.userLoginInfo.userType==2){
                this.$refs.content.style.bottom=0+"rem";
                if(!this.shipperSignImg){
                return this.$toast('请点击托运方区域签名')
                }
            };
            if(!this.checked){
                return this.$toast('请勾选已阅读合同内容')
            } else {
                let contractDTO = {//新增合同订单: 
                        shipper:this.contractInfo.shipper,//托运人
                        shipperPhone:this.contractInfo.goodsPhone,// 托运人电话
                        carrier:this.contractInfo.carrier,//  承运人
                        carrierPhone:this.contractInfo.shipPhone,//  承运人电话
                        freightPrice:this.contractInfo.freightPrice,//  运费单价
                        downPayment:this.contractInfo.downPayment,//  定金
                        createTime:+new Date(),//  创建时间
                        shipperSignImg:this.shipperSignImg,//  托运方手写签名图片
                        shipperSignTime:this.contractInfo.shipperSignTime,//  托运方签订时间
                        carrierSignImg:this.carrierSignImg,//  承运方手写签名图片
                        carrierSignTime:this.contractInfo.carrierSignTime,//  承运方签订时间
                        payType:this.$route.query.payment=='aliPay'?0:this.$route.query.payment=='Wechat'?1:2,//  支付方式(0支付宝 1微信）
                        whetherRefund:0,//  是否退款（0 未退款 1 已退款）
                        isPay:1,//  是否支付（0未支付 1已支付）
                        requesterId:this.userLoginInfo.user_id,// 请求人id
                        accepterId:this.orderInfo.userId,//  被请求人id
                        payOrderNumber:this.$route.query.payOrderNumber,
                        money:20,

                        aliOrderNumber:this.$route.query.aliOrderNumber,//阿里支付订单号
                        shipOrderId:this.$route.query.shipOrderId,// 船订单id
                        goodsOrderId:this.$route.query.goodsOrderId,// 货物订单id
                        connectType:this.contractInfo.connectType,// 交接方式
                        orderEndTime:this.contractInfo.orderEndTime,// 卸船期限
                        totalDate:parseInt(this.contractInfo.totalDate),// 总共需要几天
                        //overDateMoney:this.contractInfo.overDateMoney,//逾期扣费金额
                        breakContractMoney:this.contractInfo.breakContractMoney,// 违约金
                        goodsOverDateMoney:this.contractInfo.goodsOverDateMoney,// 货逾期扣费金额
                        shipOverDateMoney:this.contractInfo.shipOverDateMoney,// 船逾期扣费金额
                        overdueDay:this.contractInfo.overdueDay
                    };
                    console.log(contractDTO)
                // 乙方签订合同，设置被请求人id
                console.log(this.lookContract);
                if(this.$route.query.opposite==1){
                    contractDTO.accepterId=this.lookContract.accepterId;
                }
                console.log(contractDTO)
                // return
                if(this.$route.query.opposite==1){
                    // 乙方修改合同
                    contractDTO.shipperSignTime = +new Date();
                    contractDTO.requesterId = this.lookContract.requesterId;//甲方id订单发起人id
                    contractDTO.accepterId = this.lookContract.accepterId;//乙方id
                    contractDTO.shipOrderId = this.lookContract.shipOrderId;//船主订单id
                    contractDTO.goodsOrderId = this.lookContract.goodsOrderId;//货主订单id
                    contractDTO.id = this.lookContract.id;
                    contractDTO.payOrderNumber = this.lookContract.payOrderNumber;
                    this.upDateContract(contractDTO);
                } else {
                    let that = this;
                    if(this.$route.query.payment=='coupon'){
                    // 使用优惠卷支付
                    contractDTO.couponId=this.$route.query.couponId //优惠券id
                    addContract(contractDTO,0,localStorage.getItem('token')).then(res=>{
                        console.log(res);
                        if(res.data.code==200){
                            if(this.userLoginInfo.userType==2){
                                this.$store.commit('setShipContractId',this.$route.query.shipOrderId);
                            } else {
                                this.$store.commit('setGoodsContractId',this.$route.query.goodsOrderId);
                            };
                            this.$toast({message:'合同签订成功!可在(我的-合同)查看详情！',forbidClick: true});
                            setTimeout(() => {
                                that.$router.go(-3);
                                that.$toast({message:'合同已生成,请点击同意托运生成订单！', duration: 3000})
                            }, 2000);
                        }
                    })
                } else {
                    // 付款方添加合同
                    addContract(contractDTO,0,localStorage.getItem('token')).then(res=>{
                        console.log(res);
                        if(res.data.code==200){
                            this.$toast({message:'合同签订成功!可在(我的-合同)查看详情！',forbidClick: true});
                            setTimeout(() => {
                                that.$router.go(-3);
                                that.$toast('合同已生成,请点击同意托运生成订单！')
                            }, 2000);
                        }
                    })
                }
                }
            }
        },
        // 查看船主，货主订单详情
        getorderInfo(shipOrderId,goodsOrderId){
            getShipsDetails(shipOrderId,localStorage.getItem('token')).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    res.data.data.startAddressHistoryDtoList[0].createTime = this.$tools.formatTime(res.data.data.startAddressHistoryDtoList[0].createTime)
                    this.shipInfo = res.data.data;
                } else {
                    this.orderStatus = 1;
                }
            })
            getCargoDetails(goodsOrderId,localStorage.getItem('token')).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    res.data.data.loadingStartTime=this.$tools.formatTime(res.data.data.loadingStartTime);
                    this.goodsInfo = res.data.data;
                } else {
                    this.orderStatus = 1;
                }
            })
        },
        // 选择时间
        confirmPicker(value) {
            console.log(value)
            let time = +new Date(value)- +new Date(this.shipInfo.startAddressHistoryDtoList[0].createTime);
            console.log(this.shipInfo.startAddressHistoryDtoList[0].createTime)
            console.log(time)
            this.contractInfo.totalDate=Math.ceil(time/1000/60/60/24)+'天';
            let orderEndTime = +new Date(value)
            console.log(orderEndTime)
            this.contractInfo.orderEndTime = this.$tools.formatTime(orderEndTime);
            this.showTime = false;
        },
        // 更新合同
        upDateContract(data){
            upDateContract(data,localStorage.getItem('token')).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.$toast('合同更新成功')
                    let that= this;
                    setTimeout(() => {
                        that.$router.go(-1)
                    }, 1000);
                }
            })
        },
        // 删除合同
        delContract(){
            this.$dialog.confirm({
                title:'嘟嘟船讯提醒您！',
                message:'是否删除该合同',
            }).then(()=>{
                delContract(this.lookContract.id,localStorage.getItem('token')).then(res=>{
                if(res.data.code==200){
                        this.$toast('合同删除成功')
                    };
                    setTimeout(()=>{
                        this.$router.go(-1);
                    },1500);
                })
            }).catch(err=>{
                console.log(err)
            })
        },
        // 选择时间
        checkTime(){
            if(this.$route.query.opposite==1||this.$route.query.lookContract==1){
                
            } else {
                this.showTime=!this.showTime
            }
        }
    },
}
</script>

<style lang="less" scoped>
    .buyContract {
        height: 100%;
        width: 100%;
        overflow:auto;
        position:relative;
        top:0px;
        .content {
            padding:.2rem;
            overflow: auto;
            position:absolute;
            // top:0px;
            box-shadow: 1px 3px 3px 3px #eee;
            background: #fff;
            padding-bottom: 1.5rem;
            .contractTitle {
                .van-row {
                    padding: .1rem 0;
                }
            }
            .shipAndGoodsInfo {
                .van-row {
                    padding: .1rem 0;
                }
                .shipAndGoodsInfo_content {
                    padding: .1rem;
                    box-shadow: 1px 3px 3px 3px #eee;
                    border-radius: .1rem;
                    .text_l {
                        text-align: start;
                    }
                    .loadingTime {
                        width:1.9rem;
                        height:.3rem;
                        border:none;
                        border-bottom:.5px solid #bbb;
                        background:#fff;
                    }
                    .weight {
                        width: 1.9rem;
                    }
                    .startAddress {
                        width: 2.08rem;
                    }
                }
            }
            .freight {
                .freight_content {
                    padding: .1rem;
                    box-shadow: 1px 3px 3px 3px #eee;
                    border-radius: .1rem;
                    .text_l {
                        text-align: start;
                    }
                }
            }
            .clause {
                .clause_content {
                    padding: .1rem;
                    box-shadow: 1px 3px 3px 3px #eee;
                    border-radius: .1rem;
                    .text_l {
                        text-align: start;
                    }
                }
            }
            .otherTerms {
                .otherTerms_content {
                    padding: .1rem;
                    box-shadow: 1px 2px 2px 2px #eee;
                    border-radius: .1rem;
                    .text_l {
                        text-align: start;
                    }
                }
            }
            .signatureErea {
                padding-top: .2rem;
                .van-row {
                    padding:.1rem;
                }
                .goodsSignature, .shipSignature,.goodsSignatureTime,.shipSignatureTime{
                    width:1.5rem;
                    height:.5rem;
                    border:none;
                    border-bottom:.5px solid #bbb;
                    background:#fff;
                }
                .goodsSignatureTime,.shipSignatureTime {
                    width: 1.8rem;
                    height: .3rem;
                }
            }
            .check {
                margin-top:.2rem;
            }
        }
        input {
            width: 1.8rem;
            border:none;
            margin-left:.1rem;
            border-bottom: .5px solid #bbb;
            text-align:center;
            font-weight:bold;
            background:#fff;
        }
        .bgc {
            border:.5px solid #0470dc;
            // background: #0470dc;
        }
    }
</style>
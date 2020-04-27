<template>
    <div class="insurance pageCommonStyle">
        <myheader></myheader>
        <van-row class="step float_c" v-if="stepStatus==0">
            <van-col class="stepNav" span="6"  v-for="(item,index) in step" :key="index">
                <van-col span="24" class="stepItem" :class="flag==index?'bgcBlue':''">{{index+1}}</van-col>
                <van-col class="textClolor_lightGray">{{item.name}}</van-col>
            </van-col>
        </van-row>
        <van-row class="form">
            <van-row v-for="(item, index) in formDate" @click="checked(item)" :key="index">
                <van-col span="24">
                    <van-cell-group>
                        <van-field
                        v-model="item.val"
                        rows="1"
                        autosize
                        label-width="150"
                        :label="item.name"
                        type="textarea"
                        input-align="right"
                        :placeholder="'请输入' + item.placeholder"
                        />
                    </van-cell-group>
                </van-col>
            </van-row>
        </van-row>
        <van-row class="GeneratePolicy" v-if="this.flag==3">
            <van-row class="InsuranceManager align_center GeneratePolicy_item">
                <van-col span="8"><img src="@/assets/image/insuranceManager.png" /></van-col>
                <van-col class="InsuranceManager_info" span="10">
                    <van-row><van-col>保险公司业务员</van-col></van-row>
                    <van-row><van-col>姓名: 王博</van-col></van-row>
                    <van-row><van-col>职称: 高级产品经理</van-col></van-row>
                </van-col>
                <van-col span="6"><img @click="$tools.callPhone('13657261410')" style="width:.8rem;" src="@/assets/image/dianhua (2).png" /></van-col>
            </van-row>
            <van-row class="GeneratePolicy_item">
                <van-row><van-col span="24" class="formtitle float_l">投保人信息</van-col></van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.applicantName"
                            rows="1"
                            autosize
                            label="姓名"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.applicantIdCard"
                            rows="1"
                            autosize
                            label="身份证号"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
            </van-row>
            <van-row class="GeneratePolicy_item">
                <van-row><van-col span="24" class="formtitle float_l">被保人信息</van-col></van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.recognizeeName"
                            rows="1"
                            autosize
                            label="姓名"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.recognizeeIdCard"
                            rows="1"
                            autosize
                            label="身份证号"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
            </van-row>
            <van-row class="GeneratePolicy_item">
                <van-row><van-col span="24" class="formtitle float_l">货物信息</van-col></van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.cargoName"
                            rows="1"
                            autosize
                            label="名称"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.cargoType"
                            rows="1"
                            autosize
                            label="种类"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.cargoNum"
                            rows="1"
                            autosize
                            label="数量"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <!-- <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.cargoOrder"
                            rows="1"
                            autosize
                            label="单据号"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row> -->
            </van-row>
            <van-row class="GeneratePolicy_item">
                <van-row><van-col span="24" class="formtitle float_l">运输信息</van-col></van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.shipName"
                            rows="1"
                            autosize
                            label="船名"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.shipAge"
                            rows="1"
                            autosize
                            label="船龄"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.createTime"
                            rows="1"
                            autosize
                            label="起运时间"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.location"
                            rows="1"
                            autosize
                            label="始发地"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="24">
                        <van-cell-group>
                            <van-field
                            style="padding:.1rem;"
                            v-model="insuranceInfo.destination"
                            rows="1"
                            autosize
                            label="目的地"
                            disabled
                            type="textarea"
                            input-align="right"
                            />
                        </van-cell-group>
                    </van-col>
                </van-row>
            </van-row>
        </van-row>
        <van-row class="btn" v-if="stepStatus==0">
            <van-button type="info" @click="nextStep">{{next}}</van-button>
        </van-row>
        <!-- 选择货物种类 -->
        <!-- <van-popup
            v-model="showGoodsKind"
            position="bottom"
            :style="{ height: '40%' }"
            >
            <van-picker :columns="kindList" @change="onChange" @cancel="showGoodsKind=false"
                @confirm="pickerGoodsKind"/>
        </van-popup> -->
    </div>
</template>

<script>
const kindList={
        '焦煤类': ['煤炭、煤矸石', '焦岩', '可燃性片岩'],
        // '石油及其制品类': [{ text: '原油、罐车装煤油、柴油、润滑油、罐装车油' }, { text: '桶装煤油、柴油、润滑油' }, { text: '沥青焦、石油焦' }, { text: '阴极糊、阳极糊、电极糊炭块' }, { text: '桶装汽油' }],
        // '矿石类': [{ text: '氟石、焦宝石、白云石、矽（硅）石、长石、石英石' }, { text: '滑石、滑石粉' }, { text: '浮石、云母、石膏、石棉' }, { text: '浮石粉、其它非金属矿石、矿砂、矿粉' }],
        // '矿物性建设材料类': [{ text: '泥土、沙、色土、石灰、碴' }, { text: '石料及其制品' }, { text: '矿建材料制的砖、耐火砖、耐酸砖' }, { text: '矿建材料制的瓦、耐火管、耐酸管、缸管、土管' }, { text: '水泥制品、水泥与其它材料混合制品' }, { text: '水泥熟料、菱苦土制品，铸石及其制品、水磨石、水磨石制品' }, { text: '石膏板' }, { text: '袋装水泥' }, { text: '陶粒、矿潭棉、蛭石及其制品、石棉制品' }, { text: '膨胀珍珠岩及其制品' }, { text: '玻璃' }],
        // '钢铁、有色金属材料': [{ text: '袋装的铝粉、镁粉及其它有色金属' }, { text: '生铁、铸铁、钢锭、钢坯' }, { text: '钢铁的板、管、条、皮、丝、绳、钢轨、废钢铁镀锌铁丝' }, { text: '罗纹钢、不锈钢' }, { text: '有色金属及其合金的块、锭、板、管、条、线' }, { text: '有色金属制品、合金制品、五金工具' }, { text: '铁锅、铁火炉、台钳、弯头、三通等生铁制品' }],
        // '木材类': [{ text: '原木及制材、枕木、坑木、电杆木、木脚手杆杂木棍、木抬杆' }, { text: '胶合板、纤维板、木丝板、刨花板' }, { text: '木柴、木炭、板皮、锯末、刨花、木丝' }, { text: '木粉、软木粉' }],
        // '粮食、油料作物类': [{ text: '粮食（袋装）' }, { text: '油料作物' }, { text: '种籽（袋装）' }],
        // '糠、渣、壳、糟粕': [{ text: '酒糟渣、豆渣、不带壳的榨油饼' }, { text: '混合饲料' }],
        // '棉、麻、烟草、甘蔗、甜菜类': [{ text: '籽棉、皮棉、棉短绒、飞棉（废棉花）' }, { text: '木棉、丝棉' }, { text: '人造棉花、化纤棉花' }, { text: '絮棉、棉胎、旧棉' }, { text: '烟草' }],
        // '盐类': [{ text: '盐、盐卤' }],
        // '肥料及农药类': [{ text: '普通农药、化肥、其它肥料' }, { text: '农药中的烈性危险品' }, { text: '氨水' }],
        // '工业机械、电器、仪器、仪表类': [{ text: '普通机器设备及其零配件、锅炉、水泵、电动机、内燃机' }, { text: '电讯设备、电力设备、普通机床' }, { text: '电讯器材、日用电器、医疗器械、钟表、一般仪器、仪表、电视机' }, { text: '节器、电扇、冷风机、洗衣机' }, { text: '日光灯、灯泡' }],
        // '农业机械、器具类': [{ text: '拖拉机、播种机、插秧机、旋耕机、深耕机' }],
        // '运输工具类': [{ text: '组成的自行车、手推车、残疾人用车' }]
    };
import {addInsurance} from '@/api/index';
// import {goodskind} from '@/mixin/kindList';
export default {
    // mixins:[goodskind],
    data() {
        return {
            columns: [
                {
                values: Object.keys(kindList),
                className: 'column1'
                },
                {
                values: kindList['焦煤类'],
                className: 'column2',
                defaultIndex: 2
                }
            ],
            showGoodsKind:false,
            flag:0,
            next:'下一步',
            stepStatus:0,
            step:[
                {
                    name:'填写投保信息'
                },{
                    name:'填写货物信息'
                },{
                    name:'填写运输信息'
                },{
                    name:'生成保单'
                }
            ],
            formDate:[
                {
                    name:'投保人信息',
                    placeholder:'投保人信息',
                    val:'',
                    disabled:''
                },
                {
                    name:'投保人身份证号码',
                    placeholder:'投保人身份证号码',
                    val:'',
                    disabled:''
                },
                {
                    name:'投保人电话',
                    placeholder:'投保人电话',
                    val:'',
                    disabled:''
                },
                {
                    name:'被保人姓名',
                    placeholder:'被保人姓名',
                    val:'',
                    disabled:''
                },
                {
                    name:'被保人身份证号码',
                    placeholder:'被保人身份证号码',
                    val:'',
                    disabled:''
                },
                {
                    name:'被保人电话',
                    placeholder:'联系电话',
                    val:'',
                    disabled:''
                }
            ],
            insuranceInfo:{}
        }
    },
    created() {
        if(this.$route.query.jumpStatus==1){
            this.flag=3;
            this.stepStatus = 1;
            this.formDate=[];
            this.insuranceInfo = this.$route.query.insurance;
        }
    },
    methods: {
        // pickerGoodsKind(){
        // },
        nextStep(){
            if(this.flag==0){
                this.insuranceInfo.applicantName=this.formDate[0].val;
				this.insuranceInfo.applicantIdCard=this.formDate[1].val;
				this.insuranceInfo.applicantPhone=this.formDate[2].val;
				this.insuranceInfo.recognizeeName=this.formDate[3].val;
				this.insuranceInfo.recognizeeIdCard=this.formDate[4].val;
                this.insuranceInfo.recognizeePhone=this.formDate[5].val;
                for(var i = 0;i<this.formDate.length;i++){
                    if(!this.formDate[i].val.trim()){
                        return this.$toast('请输入'+this.formDate[i].name);
                    }
                    if(this.formDate[i].name=="投保人身份证号码"||this.formDate[i].name=="被保人身份证号码"){
                        if(!/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(this.formDate[i].val)){return this.$toast('请检查'+this.formDate[i].name)};
                    }
                    if(this.formDate[i].name=="投保人电话"||this.formDate[i].name=="被保人电话"){
                        if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formDate[i].val)){return this.$toast('请检查'+this.formDate[i].name)};
                    }
                }
            } else if(this.flag==1){
                this.insuranceInfo.cargoName=this.formDate[0].val;
				this.insuranceInfo.cargoType=this.formDate[1].val;
				this.insuranceInfo.cargoNum=this.formDate[2].val;
				// this.insuranceInfo.cargoOrder=this.formDate[3].val;货物重量
                for(var i = 0;i<this.formDate.length;i++){
                    if(!this.formDate[i].val.trim()){
                        return this.$toast('请输入'+this.formDate[i].name)
                    }
                }
            } else if(this.flag==2){
                this.insuranceInfo.shipName=this.formDate[0].val;
				this.insuranceInfo.shipAge=this.formDate[1].val;
				this.insuranceInfo.createTime=+new Date()||this.formDate[2].val;
				this.insuranceInfo.location=this.formDate[3].val;
				this.insuranceInfo.destination=this.formDate[4].val;
                for(var i = 0;i<this.formDate.length;i++){
                    if(!this.formDate[i].val.trim()){
                        return this.$toast('请输入'+this.formDate[i].name)
                    }
                }
            }
            if(this.flag==3){
               return addInsurance(this.insuranceInfo,localStorage.getItem('token')).then(res=>{
                    console.log(res);
                    if(res.data.code==200){
                        this.stepStatus = 1;
                        return this.$toast('已提交保险订单，你的客户经理会及时联系您！');
                    }
                })
            }
            this.flag++;
            if(this.flag==1){
                this.formDate = [
                    {
                        name:'货物名称',
                        placeholder:'货物名称',
                        val:'',
                        disabled:''
                    },
                    {
                        name:'货物种类',
                        placeholder:'货物种类',
                        val:'',
                        disabled:''
                    },
                    {
                        name:'货物重量(吨)',
                        placeholder:'货物重量',
                        val:'',
                        disabled:''
                    },
                    // {
                    //     name:'货物单据号',
                    //     placeholder:'货物单据号',
                    //     val:'',
                    //     disabled:''
                    // }
                ]
            } else if(this.flag==2){
                this.formDate = [
                    {
                        name:'船名',
                        placeholder:'船名',
                        val:'',
                        disabled:''
                    },
                    {
                        name:'船龄',
                        placeholder:'船龄(年)',
                        val:'',
                        disabled:''
                    },
                    {
                        name:'起运时间',
                        placeholder:'起运时间',
                        val:'',
                        disabled:''
                    },
                    {
                        name:'始发地',
                        placeholder:'始发地',
                        val:'',
                        disabled:''
                    },
                    {
                        name:'目的地',
                        placeholder:'目的地',
                        val:'',
                        disabled:''
                    }
                ]
            } else if(this.flag==3){
                this.formDate=[];
                this.next = "生成保单";
            }
        },
        checked(item){
            console.log(item)
            // if(item.name=="货物种类"){
            //     this.showGoodsKind = true
            // }
        }
    },
}
</script>

<style lang="less" scoped>
    .insurance {
        .step {
            background: #fff;
            margin-bottom: .2rem;
            .stepNav {
                display:flex;
                justify-content: space-around;
                flex-direction: column;
                padding-bottom: .2rem;
            }
            .stepItem {
                margin:.2rem;
                width:.6rem;
                height:.6rem;
                color: #fff;
                border-radius:50%;
                background:#eee;
                align-self: center;
                line-height: .6rem;
            }
            .bgcBlue {
                background: #2BA2F8;
            }
        }
        .form {

        }
        .GeneratePolicy {
            padding-bottom: 1rem;
            .GeneratePolicy_item {
                background: #fff;
                margin-top:.2rem;
            }
            .formtitle {
                padding:.2rem .4rem;
                color:#2BA2F8;
                border-bottom:.5px solid #2BA2F8;
            }
            .InsuranceManager {
                padding:.1rem;
                .InsuranceManager_info {
                    text-align:start;
                    .van-row {
                        padding:.1rem;
                    }
                }
            }
        }
    }
</style>
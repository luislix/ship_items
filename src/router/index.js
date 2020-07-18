import Vue from "vue";
import VueRouter from "vue-router";
import { Toast } from "vant";
import { Dialog } from "vant";

Vue.use(VueRouter);
Vue.use(Toast, Dialog);

const routes = [{
        path: "/",
        redirect: "/bootpage"
    },
    {
        path: "/userType",
        name: "userType",
        component: () =>
            import ("../views/login/userType.vue")
    },
    {
        path: "/changePwd",
        name: "changePwd",
        component: () =>
            import ("../views/login/changePwd.vue"),
        meta: { title: "修改密码" }
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("../views/login/register.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("../views/login/login.vue")
    },
    {
        path: "/index",
        name: "index",
        redirect: "/index/home",
        component: () =>
            import ("../views/index/index.vue"),
        meta: { keepAlive: false },
        children: [{
                path: "home",
                name: "home",
                component: () =>
                    import ("@/views/home/home.vue"),
                meta: { keepAlive: false }
            },
            {
                path: "socialContact",
                name: "socialContact",
                component: () =>
                    import ("@/views/socialContact/socialContact.vue"),
                meta: { title: "社交" }
            },
            {
                path: "issue",
                name: "issue",
                component: () =>
                    import ("@/views/issue/issue.vue")
            },
            {
                path: "order",
                name: "order",
                component: () =>
                    import ("@/views/order/order.vue"),
                meta: { title: "我的订单" }
            },
            {
                path: "myData",
                name: "myData",
                component: () =>
                    import ("@/views/myData/myData.vue"),
                meta: { keepAlive: false }
            }
        ]
    },
    {
        path: "/cargoRecommendDetails",
        name: "cargoRecommendDetails",
        component: () =>
            import ("@/views/ship/recommend/cargoRecommendDetails.vue")
    },
    {
        path: "/shipManagement",
        name: "shipManagement",
        component: () =>
            import ("@/views/ship/shipManagement/shipManagement.vue"),
        meta: { title: "选择船只" }
    },
    {
        path: "/shipDetail",
        name: "shipDetail",
        component: () =>
            import ("@/views/goods/shipDetail.vue"),
        meta: { title: "船只详情" }
    },
    {
        path: "/shipMessage",
        name: "shipMessage",
        component: () =>
            import ("@/views/goods/shipMessage.vue"),
        meta: { title: "船只信息" }
    },
    {
        path: "/recAddress",
        name: "recAddress",
        component: () =>
            import ("@/views/goods/goodsprocess/recAddress.vue"),
        meta: { title: "地址管理" }
    },
    {
        path: "/chooseGoods",
        name: "chooseGoods",
        component: () =>
            import ("@/views/goods/chooseGoods.vue"),
        meta: { title: "选择货源" }
    },
    {
        path: "/releaseGoods",
        name: "releaseGoods",
        component: () =>
            import ("@/views/goods/releaseGoods.vue"),
        meta: { title: "发布货源" }
    },
    {
        path: "/goodsDetail",
        name: "goodsDetail",
        component: () =>
            import ("@/views/order/goodsDetail.vue"),
        meta: { title: "货物详情" }
    },
    {
        path: "/goodsRecDetail",
        name: "goodsRecDetail",
        component: () =>
            import ("@/views/goods/goodsprocess/goodsRecDetail.vue"),
        meta: { title: "货源详情" }
    },
    {
        path: "/shipOrderDetails",
        name: "shipOrderDetails",
        component: () =>
            import ("@/views/ship/shipOrderDetails/shipOrderDetails.vue"),
        meta: { title: "船源信息" }
    },
    {
        path: "/editShipOrderInfo",
        name: "editShipOrderInfo",
        component: () =>
            import ("@/views/ship/editShipOrderInfo/editShipOrderInfo.vue"),
        meta: { title: "修改船源信息" }
    },
    {
        path: "/addShip",
        name: "addShip",
        component: () =>
            import ("@/views/ship/addShip/addShip.vue"),
        meta: { title: "添加船只" }
    },
    {
        path: "/issueShip",
        name: "issueShip",
        component: () =>
            import ("@/views/ship/issueShip/issueShip.vue"),
        meta: { title: "发布船源" }
    },
    {
        path: "/waitShipment",
        name: "waitShipment",
        component: () =>
            import ("@/views/goods/goodsprocess/waitShipment.vue"),
        meta: { title: "订单详情" }
    },
    {
        path: "/orderDetails",
        name: "orderDetails",
        component: () =>
            import ("@/views/ship/orderDetails/orderDetails.vue"),
        meta: { title: "订单详情" }
    },
    {
        path: "/cancelGoods",
        name: "cancelGoods",
        component: () =>
            import ("@/views/goods/goodsprocess/cancelGoods.vue"),
        meta: { title: "取消订单" }
    },
    {
        path: "/orderRate",
        name: "orderRate",
        component: () =>
            import ("@/views/goods/goodsprocess/orderRate.vue"),
        meta: { title: "123" }
    },
    // 合同
    {
        path: "/buyContract",
        name: "buyContract",
        component: () =>
            import ("@/views/addedServices/buyContract/buyContract.vue"),
        meta: { title: "合同" }
    },
    {
        path: "/serviceIntroduce",
        name: "serviceIntroduce",
        component: () =>
            import ("@/views/addedServices/serviceIntroduce.vue"),
        meta: { title: "合同服务" }
    },
    {
        path: "/buyService",
        name: "buyService",
        component: () =>
            import ("@/views/addedServices/buyService.vue"),
        meta: { title: "合同订单" }
    },
    {
        path: "/contract",
        name: "contract",
        component: () =>
            import ("@/views/addedServices/contract.vue"),
        meta: { title: "合同签订" }
    },
    {
        path: "/pay",
        name: "pay",
        component: () =>
            import ("@/views/addedServices/pay.vue"),
        meta: { title: "合同支付" }
    },
    {
        path: "/insurance",
        name: "insurance",
        component: () =>
            import ("@/views/addedServices/insurance/insurance.vue"),
        meta: { title: "投保信息" }
    },

    // 地图
    {
        path: '/map',
        name: 'map',
        component: () =>
            import ('@/views/map/map.vue'),
        meta: { title: "地图" }
    },

    // -----------------------------------------------------------------------------------------------------------------------------------
    {
        path: "/uploading",
        name: "uploading",
        component: () =>
            import ("@/views/enterprise/uploading.vue"),
        meta: { title: "批量船源" }
    },
    {
        path: "/uploadingcargo",
        name: "uploadingcargo",
        component: () =>
            import ("@/views/enterprise/uploadingcargo.vue"),
        meta: { title: "批量货源" }
    },

    {
        path: "/uploadShip",
        name: "uploadShip",
        component: () =>
            import ("@/views/enterprise/uploadShip.vue"),
        meta: { title: "批量船源" }
    },


    {
        path: "/uploadGoods",
        name: "uploadGoods",
        component: () =>
            import ("@/views/enterprise/uploadGoods.vue"),
        meta: { title: "批量货源" }
    },


    {
        path: "/modifyship",
        name: "modifyship",
        component: () =>
            import ("@/views/enterprise/modify/modifyship.vue"),
        meta: { title: "修改船只" }
    },


    {
        path: "/modifyhuo",
        name: "modifyhuo",
        component: () =>
            import ("@/views/enterprise/modify/modifyhuo.vue"),
        meta: { title: "修改货物" }
    },

    {
        path: "/Enterprisesourcedetails",
        name: "Enterprisesourcedetails",
        component: () =>
            import ("@/views/enterprise/modify/Enterprisesourcedetails.vue"),
        meta: { title: "查看船只信息" }
    },

    {
        path: "/Enterprisecargodetails",
        name: "Enterprisecargodetails",
        component: () =>
            import ("@/views/enterprise/modify/Enterprisecargodetails.vue"),
        meta: { title: "查看货物信息" }
    },



    {
        path: "/Editship",
        name: "Editship",
        component: () =>
            import ("@/views/enterprise/modify/Editship.vue"),
        meta: { title: "编辑船只信息" }
    },

    {
        path: "/Editgoods",
        name: "Editgoods",
        component: () =>
            import ("@/views/enterprise/modify/Editgoods.vue"),
        meta: { title: "编辑货物信息" }
    },




    // -----------------------------------------------------------------------------------------------------------------------------------------

    // 我的页面数据
    {
        path: "/myIssue",
        name: "myIssue",
        component: () =>
            import ("@/views/ship/myIssue/myIssue.vue"),
        meta: { title: "我的发布" }
    },
    // 签名测试页面
    {
        path: "/signature",
        name: "signature",
        component: () =>
            import ("@/views/addedServices/signature.vue"),
        meta: { title: "签名" }
    },
    // {
    //     path: '/cancelGoods',
    //     name: 'cancelGoods',
    //     component: () =>
    //         import ('@/views/goods/goodsprocess/canelOrder.vue'),
    //     meta: { title: "待运货" }
    // },
    {
        path: "/searchOrder",
        name: "searchOrder",
        component: () =>
            import ("@/views/home/searchOrder.vue"),
    },
    {
        path: "/Authentication",
        name: "Authentication",
        component: () =>
            import ("@/views/myData/Authentication/Authentication.vue"),
        meta: { title: "个人认证" }
    },
    {
        path: "/evaluate",
        name: "evaluate",
        component: () =>
            import ("@/views/order/evaluate/evaluate.vue"),
        meta: { title: "订单评价" }
    },
    {
        path: "/coupon",
        name: "coupon",
        component: () =>
            import ("@/views/myData/coupon/coupon.vue"),
        meta: { title: "优惠券" }
    },
    {
        path: "/aboutUs",
        name: "aboutUs",
        component: () =>
            import ("@/views/myData/aboutUs/aboutUs.vue"),
        meta: { title: "关于我们" }
    },
    // {
    //     path: "/aboutUs",
    //     name: "aboutUs",
    //     component: () =>
    //         import ("@/views/myData/aboutUs/aboutUs.vue"),
    //     meta: { title: "用户反馈" }
    // },
    {
        path: "/myfeedback",
        name: "myfeedback",
        component: () =>
            import ("@/views/myData/myfeedback/myfeedback.vue"),
        meta: { title: "用户反馈" }
    },
    {
        path: "/forgetPwd",
        name: "forgetPwd",
        component: () =>
            import ("@/views/login/forgetPwd.vue"),
        meta: { title: "忘记密码" }
    },
    {
        path: "/myContract",
        name: "myContract",
        component: () =>
            import ("@/views/myData/myContract/myContract.vue"),
        meta: { title: "我的合同" }
    },
    {
        path: "/myEvaluation",
        name: "myEvaluation",
        component: () =>
            import ("@/views/myData/myEvaluation/myEvaluation.vue"),
        meta: { title: "我的评价" }
    },
    {
        path: "/rapidly",
        name: "rapidly",
        component: () =>
            import ("@/views/rapidly/rapidly.vue"),
        meta: { title: "急速找单" }
    },
    // {
    //     path: '/personalEetails',
    //     name: 'personalEetails',
    //     component: () =>
    //         import ('@/views/myData/personalEetails/personalEetails.vue'),
    //     meta: { title: "个人信息" }
    // },

    // 通讯
    {
        path: "/singleSation",
        name: "singleSation",
        component: () =>
            import ("@/views/socialContact/singleSation.vue"),
        meta: { title: "" }
    },
    {
        path: "/friends",
        name: "friends",
        component: () =>
            import ("@/views/socialContact/friends.vue"),
        meta: { title: "新的朋友" }
    },
    {
        path: "/userInfo",
        name: "userInfo",
        component: () =>
            import ("@/views/socialContact/userInfo.vue")
    },
    //船舶档案
    {
        path: "/archivalInformation",
        name: "archivalInformation",
        component: () =>
            import ("@/views/archives/archivalInformation.vue"),
    },
    {
        path: "/fileRegistration",
        name: "fileRegistration",
        component: () =>
            import ("@/views/archives/fileRegistration.vue"),
        meta: { title: "档案信息" }
    },
    {
        path: "/shipArchival",
        name: "shipArchival",
        component: () =>
            import ("@/views/archives/shipArchival.vue"),
        meta: { title: "船舶档案" }
    },
    //码头服务
    {
        path: "/wharfServices",
        name: "wharfServices",
        component: () =>
            import ("@/views/wharf/wharfServices.vue"),
        meta: { title: "码头服务" }
    },
    {
        path: "/details",
        name: "details",
        component: () =>
            import ("@/views/wharf/details.vue"),
        meta: { title: "商家详情" }
    },
    {
        path: "/service",
        name: "service",
        component: () =>
            import ("@/views/service/service.vue"),
        meta: { title: "服务发布" }
    },
    {
        path: "/address",
        name: "address",
        component: () =>
            import ("@/views/service/address.vue"),
        meta: { title: "地址管理" }
    },
    {
        path: "/wharfMap",
        name: "wharfMap",
        component: () =>
            import ("@/views/wharf/wharfMap.vue")
    },
    //水运专线
    {
        path: "/shipLine",
        name: "shipLine",
        component: () =>
            import ("@/views/ship/shipLine/shipLine.vue"),
        meta: { title: "水运专线" }
    },
    {
        path: "/waterWay",
        name: "waterWay",
        component: () =>
            import ("@/views/ship/shipLine/waterWay.vue"),
        meta: { title: "详细信息" }
    },
    //救援
    {
        path: "/shipRescue",
        name: "shipRescue",
        component: () =>
            import ("@/views/rescue/shipRescue.vue"),
        meta: { title: "船舶救援" }
    },
    // 货源
    {
        path: "/goodsSource",
        name: "goodsSource",
        component: () =>
            import ("@/views/goods/goodsSource/goodsSource.vue")
            // meta: { title: "货源" }
    },
    //船源
    {
        path: "/shipSource",
        name: "shipSource",
        component: () =>
            import ("@/views/ship/shipSource/shipSource.vue")
    },
    {
        path: "/bootpage",
        name: "bootpage",
        component: () =>
            import ("@/views/bootpage/bootpage.vue")
    },
    //邀请好友
    {
        path: "/invitate",
        name: "invitate",
        component: () =>
            import ("@/views/myData/invitationFriend/invitate.vue"),
        meta: { title: "邀请好友" }
    },
    //邀请好友111
    {
        path: "/invitates",
        name: "invitates",
        component: () =>
            import ("@/views/myData/invitationFriend/invitate.vue"),
        meta: { title: "邀请好友" }
    },
    //邀请好友2222
    {
        path: "/invitate33",
        name: "invitate33",
        component: () =>
            import ("@/views/myData/invitationFriend/invitate.vue"),
        meta: { title: "邀请好友" }
    }

]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
});

const whiteList = [
    "/login",
    "/register",
    // "/index/socialContact",
    "/index/myData",
    // "/index/order",
    // "/index/issue",
    "/aboutUs",
    "/userType",
    "/forgetPwd",
    "/index/home",
    "/searchOrder",
    "/bootpage"
];

router.beforeEach((to, from, next) => {
    const hasToken = localStorage.getItem("token");
    const flag = localStorage.getItem("flag");
    console.log("beforeEach", hasToken);
    if (flag == 1) {
        if (to.path == "/bootpage") {
            next();
        }
    }
    if (hasToken) {
        console.log(hasToken);
        if (to.path === "/login") {
            next();
        } else {
            const hasGetUserInfo = localStorage.getItem("userInfo");
            if (hasGetUserInfo) {
                next();
            } else {
                try {
                    next();
                } catch (error) {
                    next(`/login`);
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            Dialog.confirm({
                    title: "嘟嘟船讯提醒您！",
                    message: "登录后可查看更多信息,点击确认前往登录"
                })
                .then(() => {
                    next(`/login`);
                })
                .catch(() => {});
            setTimeout(function() {}, 1000);
        }
    }
});
export default router;
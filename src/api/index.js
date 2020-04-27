import request from './axios.js'

export function login(params) {
    return request({
        url: '/user/login',
        method: 'get',
        params
    })
}
// 获取推荐订单-游客
export function recommendedOrder(data) {
    return request({
        url: '/goodsOrder/queryShipOrderList',
        method: 'post',
        data: data
    })
}
// 获取我的发布-货
export function shipRecommendedOrder(data, token) {
    return request({
        url: `goodsOrder/queryGoodOrderDTOList/7?token=${token}`,
        method: 'post',
        data: data
    })
}
//获取推荐订单-货主
export function goodsRecommendedOrder(data, token) {
    return request({
        url: `shipOrder/queryShipOrderListByPageDTO/7?token=${token}`,
        method: 'post',
        data: data
    })
}
export function register(params) {
    return request({
        url: '/user/register',
        method: 'get',
        params
    })
}
// 获取轮播图
export function getSwipe(params) {
    return request({
        url: '/describe/queryAllCarouselWeChat',
        method: 'get',
        params
    })
}
// 获取我的发布
export const getMyIssue = (data, token) => { return request.post(`/shipOrder/queryShipOrderListByPageDTO/7?token=${token}`, data) }

export function Code(params) {
    return request({
        url: '/sms/verificationCode',
        method: 'get',
        params
    })
}

//获取空船详情订单
export function getEmptyShip(id, params) {
    return request({
        url: `/shipOrder/queryEmptyShipOrderDTOById/${id}`,
        method: 'get',
        params
    })
}

//选择空船只
export function queryEmptyShip(token, data) {
    return request({
        url: `/shipInfo/queryEmptyShip?token=${token}`,
        method: 'post',
        data: data
    })
}

// 添加船只
export function addShipInfo(data, token) {
    return request({
        url: `/shipInfo/addShipInfoDTO?token=${token}`,
        method: 'post',
        data: data
    })
}
//货主-更新货物详情
export function updateGoods(data, token) {
    return request({
        url: `/goodsOrder/updateGoodsOrderDTO?token=${token}`,
        method: 'post',
        data: data
    })
}
// 新增空船订单
export const addEmptyShipOrder = (data, token) => { return request.post(`/shipOrder/addEmptyShipOrder?token=${token}`, data) }

//新增船舶档案
export const addPyShipInfo = (data, token) => { return request.post(`/pyShipInfo/addPyShipInfo?token=${token}`, data) }

//新增港口服务
export const addPyShipPort = (data, token) => { return request.post(`/pyShipPort/addPyShipPort?token=${token}`, data) }

//船舶信息列表
export const queryPyShipInfoByPage = (data, token) => { return request.post(`/pyShipInfo/queryPyShipInfoByPage?token=${token}`, data) }

//货主-查看船只详情
export const getShipsDetails = (emptyShipOrderId, token) => { return request.get(`/shipOrder/queryEmptyShipOrderDTOById/${emptyShipOrderId}?token=${token}`) }
    // 船主-查看货物详情
export const getCargoDetails = (goodsOrderId, token) => { return request.get(`/goodsOrder/queryGoodsOrderById/${goodsOrderId}?token=${token}`) }
    //货主查询订单详情
export const queryOrderDetails = (goodsOrderId, token) => { return request.get(`/goodsOrder/queryGoodsOrderShipOrderById/${goodsOrderId}?token=${token}`) }
    //查询船舶档案详细信息
export const queryPyShipInfo = (pyShipInfoId, token) => { return request.get(`pyShipInfo/queryPyShipInfo/${pyShipInfoId}?token=${token}`) }
    //查询用户对订单的评价
export const queryUserOrderEvaluate = (data, token) => { return request.get(`evaluate/queryUserOrderEvaluate?token=${token}`, data) }
    //查询水运详情
export const queryWaterLineById = (id) => { return request.get(`/waterLine/queryWaterLineById?id=${id}`) }
    //查询港口信息
export const queryPyShipPort = (shipPortId, token) => { return request.get(`/pyShipPort/queryPyShipPort?shipPortId=${shipPortId}&token=${token}`) }
    //查询订单评价
export const getOrderEvaluate = (token, orderId, orderType) => { return request.get(`/evaluate/queryOrderEvaluate?token=${token}&orderId=${orderId}&orderType=${orderType}`) }
    //查询用户评价（分页）[传入的用户id是被评价人id]
export const queryUserEvaluate = (data, token) => { return request.post(`/evaluate/queryUserEvaluate?token=${token}`, data) }

//拨打爬虫用户电话或发送短信
export const SendPythonMsg = (pythonPhone, token) => { return request.get(`/goodsOrder/sendSmsToServer?pythonPhone=${pythonPhone}&token=${token}`) }

//拨打用户订单电话或发送短信
export const SendMsg = (callerUserId, callerUserType, calleeUserId, calleeUserType, phoneNumber, calleeUserOrderId) => { return request.get(`/dial/dialRecord?callerUserId=${callerUserId}&callerUserType=${callerUserType}&calleeUserId=${calleeUserId}&calleeUserType=${calleeUserType}&phoneNumber=${phoneNumber}&calleeUserOrderId=${calleeUserOrderId}`) }

// 船主-确认托运货物
export const shipApplyGoods = (goodsOrderId, shipOrderId, token) => { return request.post(`goodsOrderShipOrder/requestOrder/${goodsOrderId}/${shipOrderId}/3?token=${token}`) }

//船主-获取空船信息（船只空闲状态）pageNum默认为1、pageSize默认为10，sidx默认为create_time，sord默认为desc，如果不填，则使用默认值
export function getEmptyShipList(data, token) {
    return request({
        url: `/shipInfo/queryEmptyShip?token=${token}`,
        method: 'post',
        data: data
    })
}
// 船主-获取当前用户发布的船只列表 pageNum默认为1、pageSize默认为10，sidx默认为create_time，sord默认为desc，如果不填，则使用默认值
export const getShipList = (data, token) => { return request.post(`/shipInfo/queryShipInfoListByPage?token=${token}`, data) }

//船主- 货源
export const getgoodsSource = (data, token) => { return request.post(`/goodsOrder/recommendGoodOrder?token=${token}`, data) }

//货主- 船源
export const getshipSource = (data, token) => { return request.post(`shipOrder/recommendShipOrder?token=${token}`, data) }

//获取邀请码
export const getinvateCode = (token) => { return request.get(`/common/getMyInvitationCode?token=${token}`) }

//上传邀请码
export const upinvateCode = (invitationCode, token) => { return request.get(`/common/updateInvitationCode?invitationCode=${invitationCode}&token=${token}`) }

// 船主-删除船只
export const delShipInfo = (shipInfoId, token) => { return request(`/shipInfo/deleteShipInfoById/${shipInfoId}?token=${token}`) }

// 船主-删除船主发布的订单
// export const delShipOrder = (emptyShipOrderId, token) => { return request.get(`/shipOrder/deleteEmptyShipOrderDTOById/${emptyShipOrderId}?token=${token}`) }

//货主-删除货主的取消单
export const delcancelGoodsOrder = (goodsOrderId, token) => { return request.get(`/goodsOrder/deleteGoodsOrderById/${goodsOrderId}?token=${token}`) }

// 船主-根据船舶id获取船舶信息
export const getEmptyShipInfoById = (shipInfoId, token) => { return request.get(`/shipOrder/queryEmptyShipOrderDTOById/${shipInfoId}?token=${token}`) }

// 船主-获取船只信息
// export const getShipInfo = (shipInfoId, token) => { return request.get(`shipInfo/queryShipInfoById/${shipInfoId}?token=${token}`) }

// 船主-修改船只信息
export const updateShipInfo = (data, token) => { return request.post(`/shipInfo/updateShipInfo?token=${token}`, data) }

// 船主-删除空船订单
export const delEmptyOrder = (shipOrderId, token) => { return request.get(`shipOrder/deleteEmptyShipOrderDTOById/${shipOrderId}?token=${token}`) }

// 船主-修改空船订单
export const editEmptyShipOrder = (data, token) => { return request.post(`/shipOrder/updateEmptyShipOrder?token=${token}`, data) }

//修改密码
export const updatePassword = (loginName, oldPassword, newPassword) => { return request.get(`/user/updatePassword/?loginName=${loginName}&oldPassword=${oldPassword}&newPassword=${newPassword}`) }

//船主-同意/拒绝货主发布的货物
export const shipConsentGoods = (goodsOrderId, shipOrderId, agreeRrNot, token) => { return request.post(`goodsOrderShipOrder/responseOrder/${goodsOrderId}/${shipOrderId}/${agreeRrNot}/2?token=${token}`) }

//船主-货主订单异常，拒绝托运
export const consentCargo = (goodsOrderId, shipOrderId, agreeRrNot, token) => { return request.post(`goodsOrderShipOrder/responseOrder/${goodsOrderId}/${shipOrderId}/${agreeRrNot}/2?token=${token}`) }

// 船主-获取船主订单列表
export const getOrderList = (data, orderStatus, afterServiceStatus, token) => { return request.post(`shipOrder/queryShipOrderListByPageDTOByGoodsOrderList/${orderStatus}/${afterServiceStatus}?token=${token}`, data) }

//货主-获取货主订单列表
export const getGoodsList = (data, orderStatus, afterServiceStatus, token) => { return request.post(`/goodsOrder/queryShipOrderListByPageDTOByGoodsOrderList/${orderStatus}/${afterServiceStatus}?token=${token}`, data) }

// 
export const getOrderDetails = (shipOrderId, token) => { return request.get(`/shipOrder/queryGoodsOrderShipOrderById/${shipOrderId}?token=${token}`) }

// 船主-申请装货
export const shipApplyLoading = (shipOrderId, goodsOrderId, token) => { return request.get(`/shipOrder/askForLoading?emptyShipOrderId=${shipOrderId}&goodOrderId=${goodsOrderId}&token=${token}`) }

// 船主-申请卸货
export const shipApplyUnloading = (shipOrderId, goodOrderId, token) => { return request.get(`shipOrder/askForUnloading?emptyShipOrderId=${shipOrderId}&goodsOrderId=${goodOrderId}&token=${token}`) }

// 船主-重新发布订单
export const republishShipOrder = (shipOrderIdListStr, token) => { return request.get(`/shipOrder/restartShipOrder/${shipOrderIdListStr}?token=${token}`) }

// 单个查询货物信息
export const cargoOrderInfo = (orderId, token) => { return request.get(`goodsOrder/queryGoodsOrderById/${orderId}?token=${token}`) }

// 根据用户Id查询用户信息
export const getUserInfo = (userId, token) => { return request.get(`user/queryByUserId?userId=${userId}&token=${token}`) }

// 根据爬虫货数据Id查询数据信息
export const getPythonCargoInfo = (pythonInfoCargoId, token) => { return request.get(`pythonInfoCargo/queryPythonInfoCargo/${pythonInfoCargoId}?token=${token}`) }

//查询爬虫船数据Id查询数据信息
export const getPythonShipInfo = (pythonInfoShipId, token) => { return request.get(`pythonInfoShip/queryPythonInfoShip/${pythonInfoShipId}?token=${token}`) }

//货主申请船只
export const requestOrder = (goodsOrderId, shipOrderIdListStr, requestType, token) => { return request.post(`goodsOrderShipOrder/requestOrder/${goodsOrderId}/${shipOrderIdListStr}/${requestType}?token=${token}`) }

//货主发布订单
export function releaseOrder(data, token) {
    return request({
        url: `/goodsOrder/addGoodsOrderDTO?token=${token}`,
        method: 'post',
        data
    })
}

//货主取消与船只的订单
export const goodscancelShip = (goodsOrderId, shipOrderIdListStr, responseType, orderType, token) => { return request.post(`/goodsOrderShipOrder/responseOrder/${goodsOrderId}/${shipOrderIdListStr}/${responseType}/3?token=${token}`) }

//取消订单交易
export const cancelOrder = (shipOrderIdListStr, goodsOrderId, token) => { return request.get(`/goodsOrder/askForCancelTransact?shipOrderIdListStr=${shipOrderIdListStr}&goodsOrderId=${goodsOrderId}&token=${token}`) }

//删除发布订单
export const delGoodsOrder = (goodsOrderId, token) => { return request.get(`goodsOrder/deleteGoodsOrderById/${goodsOrderId}?token=${token}`) }

//货主-同意装货
export const allowLoading = (shipOrderIdListStr, goodOrderId, token) => { return request.get(`/goodsOrder/agreeLoading?shipOrderIdListStr=${shipOrderIdListStr}&goodOrderId=${goodOrderId}&token=${token}`) }

//货主-同意卸货
export const allowUnLoading = (shipOrderIdListStr, goodsOrderId, token) => { return request.get(`/shipOrder/receiptShipOrder?shipOrderIdListStr=${shipOrderIdListStr}&goodsOrderId=${goodsOrderId}&token=${token}`) }

//当订单为爬虫数据时，给爬虫用户发送短信
export const pythonPhoneByShip = (pythonShipOrderId, requestType, token) => { return request.post(`/goodsOrderShipOrder/sendMessageToPhone/${pythonShipOrderId}/${requestType}?token=${token}`) }

// 船主点击拨打电话给客服发送短信
export const shipCallPhone = (pythonPhone, token) => request.get(`/goodsOrder/sendSmsToServer?token=${token}&pythonPhone=${pythonPhone}`)

// 订单拨打电话
export const orderSendSmsToServer = (pythonPhone, token) => { request.get(`shipOrder/sendSmsToServer?pythonPhone=${pythonPhone}&token=${token}`) }

// 图片上传
export const uploadImg = (data, name, token) => { return request.post(`/headImgUpload?token=${token}&name=${name}`, data) }

export const headImg = (data) => { return request.post(`/headImgUpload`, data) }

//查询身份认证信息
export const queryIDDetail = (userId) => { return request.get(`/user/selectAuthenticationByuserId/${userId}`) }

//修改身份认证详细信息
export const updatePersonDetail = (data, token) => { return request.post(`/user/identity/update?token=${token}`, data) }

//修改企业认证信息
export const updateCompanyDetail = (data, token) => { return request.post(`/user/company/update?token=${token}`, data) }

//电话拨打
export const dial = (callerUserId, callerUserType, calleeUserId, calleeUserType, phoneNumber, calleeUserOrderId, token) => { return request.get(`/dial/dialRecord?callerUserId=${callerUserId}&callerUserType=${callerUserType}&calleeUserId=${calleeUserId}&calleeUserType=${calleeUserType}&phoneNumber=${phoneNumber}&calleeUserOrderId=${calleeUserOrderId}&token=${token}`) }

//货物地址添加
export const Address = (data, token) => { return request.post(`address/addAddress?token=${token}`, data) }

//分页查询获取用户地址列表信息
export const queryAddress = (pageDTO, token) => { return request.post(`/address/queryAddressListByPage?token=${token}`, pageDTO) }

//获取获取推荐途径地址/热门地址
export const getRecommendHotAddress = (startAddress, endAddress, type, token) => { return request.get(`/address/getRecommendHotAddress/${startAddress}/${endAddress}/${type}?token=${token}`) }

//分页/查询船舶救援信息列表
export const queryRiverRescueByPage = (data, token) => { return request.post(`/riverRescue/queryRiverRescueByPage?token=${token}`, data) }

// 分页查询水运专线
export const queryWaterLine = (data) => { return request.post(`/waterLine/queryWaterLine`, data) }

//分页查询港口信息列表
export const queryPyShipPortByPage = (data, token) => { return request.post(`/pyShipPort/queryPyShipPortByPage?token=${token}`, data) }

// 添加保险订单
export const addInsurance = (data, token) => { return request.post(`/insurance/addInsurance?token=${token}`, data) }

//通讯

//生成签名
export const Signature = (appkey, timestamp, secret, randomStr) => { return request.get(`common/md5?appkey=${appkey}&timestamp=${timestamp}&secret=${secret}&randomStr=${randomStr}`) }
    //上传通讯头像
export const upLoadImg = (path, fileType) => { return request.get(`/IM/uploadFile?path=${path}&fileType=${fileType}`) }

//船主-申请装货
export const applicationShip = (emptyShipOrderId, goodOrderId, token) => { return request.get(`/shipOrder/askForLoading?emptyShipOrderId=${emptyShipOrderId}&goodOrderId=${goodOrderId}&token=${token}`) }


// 获取我的优惠券
export const getMyCoupon = (data, token) => { return request.post(`/coupons/queryMyCouponsByPage?token=${token}`, data) }

// 删除优惠券
export const delCoupon = (ids, token) => { return request.get(`/coupons/deleteCoupons?ids=${ids}&token=${token}`) }

// 使用优惠券
export const useCoupon = (data, type, token) => { return request.post(`/coupons/updateCoupons?token=${token}&type=${type}`, data) }

// 支付宝支付
export const aliPay = (orderNumber, token, price, useCoupons, couponsId) => { return request.get(`/alipay/signParams?token=${token}&price=${price}&orderNumber=${orderNumber}&useCoupons=${useCoupons}`) }

// 微信支付
export const weChatPay = (orderNumber, token, price) => { return request.get(`/weChat/weChatPay?token=${token}&price=${price}&orderNumber=${orderNumber}`) }

// 支付完成-签订合同
export const addContract = (data, aliPayOrWeChatPay, token) => { return request.post(`/contract/addContract/${aliPayOrWeChatPay}?token=${token}`, data) }

// 查询我的合同
export const getMyContractList = (sendOrAccept, data, token) => { return request.post(`/contract/queryMySendContractByPage/${sendOrAccept}?token=${token}`, data) }

// 修改合同
export const upDateContract = (data, token) => { return request.post(`/contract/updateContract?token=${token}`, data) }

// 删除合同
export const delContract = (ids, token) => { return request.get(`/contract/deleteContractById?token=${token}&ids=${ids}`) }

// 分页查询保险列表 
export const getInsuranceList = (data, token) => { return request.post(`/insurance/queryByPage?token=${token}`, data) }

// 用户上传头像
export const userPhoto = (data, name, token) => { return request.post(`/userPortraitUpload?token=${token}&name=${name}`, data) }

// 用户身份证认证
export const Authentication = (data, token) => { return request.post(`/user/identity/add?token=${token}`, data) }

// 企业认证
export const companyInfo = (data, token) => { return request.post(`/user/company/add?token=${token}`, data) }

// 订单评价
export const orderEvaluate = (data, token) => { return request.post(`evaluate/addOrderEvaluate?token=${token}`, data) }

// 查询订单评价-评价我的
export const evaluateOfMy = (data, userId, token) => { return request.post(`/evaluate/queryUserEvaluate?token=${token}&userId=${userId}`, data) }

// 查询订单评价-我评价的
export const myEvaluate = (data, userId, token) => { return request.post(`/evaluate/queryUserOrderEvaluate?token=${token}&userId=${userId}`, data) }

// 获取用户通话记录
export const getRecordCallLog = (data, token) => { return request.post(`/addresslist/recordCallLog?token=${token}`, data) }

//  ------------------map页面接口配置--------------------------
// 进页面初始默认附近船货
export const rinitialposition = (data, token) => { return request.post(`/map/nearby?token=${token}`, data) }

//区域搜索
export const Regionalvessels = (str, token) => { return request.get(`map/getNearbyShip?bbox=Polygon((${str}))&token=${token}`) }

// 我的订单
export const Myorder = (token) => { return request.get(`map/getMyOrderLocation?token=${token}`) }

//船主-申请装货
// export const applicationShip = (emptyShipOrderId, goodOrderId, token) => { return request.get(`/shipOrder/askForLoading?emptyShipOrderId=${emptyShipOrderId}&goodOrderId=${goodOrderId}&token=${token}`) }

//船主-申请装货
// export const applicationShip = (emptyShipOrderId, goodOrderId, token) => { return request.get(`/shipOrder/askForLoading?emptyShipOrderId=${emptyShipOrderId}&goodOrderId=${goodOrderId}&token=${token}`) }

//  搜索框搜索船名

export const Searchforships = (str, token) => { return request.get(`map/getShipInfo?shipName=${str}&token=${token}`) }

// 文本框输入框下拉框

export const downlist = (data, token) => { return request.get(`map/getShipList1?shipName=${data}&token=${token}`) }

// 我的订单下拉掉列表接口   Orderpulldown
export const Orderpulldown = (data, token) => { return request.post(`shipOrder/queryShipOrderListByPageDTOByGoodsOrderList/2/0?token=${token}`, data) }

// 我的订单下拉掉列表接口   Orderpulldown
export const Orderpulldowngoods = (data, token) => { return request.post(`goodsOrder/queryShipOrderListByPageDTOByGoodsOrderList/2/0?token=${token}`, data) }



//  船只轨迹接口
export const Shiptrajectory = (data, token) => { return request.get(`map/getTrajectory?mmsi=${data}&token=${token}`) }

// ------------------------------企业发布-------------------------------

// 企业船源
export const Enterpriseshipource = (data, excelType, token) => { return request.post(`/Excel/importExcel?token=${token}&excelType=${excelType}`, data) }


// 存数据船
export const StorageShip = (data, token) => { return request.post(`/Excel/insertShipInfo?token=${token}`, data) }

// 存数据货
export const StorageCargos = (data, token) => { return request.post(`/Excel/insertCargoInfo?token=${token}`, data) }

//  发布船
export const Releaseship = (data, token) => { return request.post(`/Excel/queryEnterprisePublish?token=${token}`, data) }

// 删除批量船只订单
export const Deletebulkship = (data, token) => { return request.get(`/pythonInfoShip/deletePythonInfoShip/${data}?token=${token}`) }

// 删除批量货源订单
export const Deletebulkcargod = (data, token) => { return request.get(`/pythonInfoCargo/deletePythonInfoCargo/${data}?token=${token}`) }

// 修改爬虫船只数据

export const Modifyreptileship = (data, token) => { return request.post(`/pythonInfoShip/updatePythonInfoShip?token=${token}`, data) }

// 修改货物数据

export const ModifyreptileCargo = (data, token) => { return request.post(`/pythonInfoCargo/updatePythonInfoCargo?token=${token}`, data) }

// /shipOrder/deleteEmptyShipOrderDTOById/{emptyShipOrderId}
// 正常船只删除订单接口
export const Deleteshipnormally = (data, token) => { return request.get(`/shipOrder/deleteEmptyShipOrderDTOById/${data}?token=${token}`) }


// /goodsOrder/deleteGoodsOrderById/{goodsOrderId}
// 正常货物删除订单接口
export const Normaldeletionofgoods = (data, token) => { return request.get(`/goodsOrder/deleteGoodsOrderById/${data}?token=${token}`) }


// 更新正常船
// Renew normal ship
// Renew normal ship
export const Renewnormalship = (data, token) => { return request.post(`/shipOrder/updateEmptyShipOrder?token=${token}`, data) }


// 更新正常发布货源
export const Updatenormal = (data, token) => { return request.post(`/goodsOrder/updateGoodsOrderDTO?token=${token}`, data) }


// ------------------------------------------------------------------------------
//查询群聊记录
export const queryGroupMsg = (groupId) => { return request.get(`/IM/GetGroupMessageList?groupId=${groupId}`) }
    //查询单聊历史记录
export const querySingleMsg = (targetId, fromId) => { return request.get(`/IM/GetUserMessageList?targetId=${targetId}&fromId=${fromId}`) }

// 获取用户通讯录
export const getRecordAddressList = (data, token) => { return request.post(`/addresslist/recordAddressList?token=${token}`, data) }

//发起好友请求/拒绝事件
export const requestFriend = (applicant, respondent, code) => { return request.get(`/IM/GetFriendsEvent?applicant=${applicant}&respondent=${respondent}&code=${code}`) }
    //查询好友请求列表
export const queryRequestList = (applicant) => { return request.get(`/IM/GetFriendsEventList?applicant=${applicant}`) }
    //用户反馈
    // export const feedBack = (token,userFeedbackDTO) => { return request.post(`/feedback/addUserFeedback?token=${token}`,userFeedbackDTO) }
export function feedBack(token, data) {
    return request({
        url: `/feedback/addUserFeedback?token=${token}`,
        method: 'post',
        data: data
    })
}

//忘记密码
export const forgetPwd = (mobilePhone, newPassword, code) => { return request.get(`/user/forgetPassword?mobilePhone=${mobilePhone}&newPassword=${newPassword}&code=${code}`) }

//急速找单
export function searchOrder(type, text, phone) {
    return request({
        url: `/recommendOrder/recommendOrderBySentence/${type}?text=${text}`,
        method: 'post',
        data: phone
    })
}

//首页搜索
export function searchInput(data) {
    return request({
        url: `/solr/queryALL`,
        method: 'post',
        data: data
    })
}
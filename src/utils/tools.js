import Vue from 'vue'
import store from '../store/index'
import { Toast, Dialog } from 'vant'
Vue.use(Toast, Dialog);
Vue.use(store)

const tools = {};

tools.regPhone = (phone, message = '') => {
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
        Toast(message || '请核实手机号')
        return false
    } else {
        return true
    }
}

tools.regPassword = (password = '', message = '') => {
    if (password.trim().length > 11 || password.trim().length < 6) {
        Toast(message || '请确认密码')
        return false
    } else {
        return true
    }
}

tools.formatTime = (time, formData) => {
    let yy = new Date(time).getFullYear()
    let mm = new Date(time).getMonth() + 1
    let dd = new Date(time).getDate()
    let h = new Date(time).getHours()
    let m = new Date(time).getMinutes()
    let s = new Date(time).getSeconds()
    if (formData == 'yy-mm-dd h:m:s') {
        return `${yy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd} ${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
    } else if (formData == 'mm-dd') {
        return `${mm < 10 ? '0' + mm : mm}月${dd < 10 ? '0' + dd : dd}日`
    }
    return `${yy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`
}

// 拨打电话
tools.callPhone = (phone) => {
    return Dialog.confirm({
        title: "嘟嘟船讯提醒您!",
        message: `是否联系:${phone}`
    }).then(() => {
        window.location.href = "tel:" + phone
    }).catch(() => {});
}

Vue.prototype.$tools = tools
export default tools
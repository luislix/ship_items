import Axios from 'axios';
import Vue from 'vue';
import router from '../router'
import { Toast } from 'vant'
import { Dialog } from 'vant';
Vue.use(Toast, Dialog)

// 创建一个axios实例
// let baseUrl = 'https://192.168.0.160:443/xcx/';
// let baseUrl = 'https://192.168.0.129:443/xcx/';
let baseUrl = "https://www.aiship.top/web/";
// let baseUrl = "https://www.oship.com.cn:443/xcx/";
// let baseUrl = "https://192.168.0.170:443/web/";
// let baseUrl = 'https://oship.com.cn/web/';
var service = Axios.create({
        baseURL: baseUrl,
        // config里面有这个transformRquest， 这个选项会在发送参数前进行处理。 这时候我们通过Qs.stringify转换为表单查询参数
        // transformRequest: [function (data) {
        /*   data = Qs.stringify(data);
            return data;
        }], */
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json'
        },
        "Content-Type": "text/html;charset=UTF-8",
        imeout: 5000
    })
    // 添加请求拦截器
service.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
//  响应拦截
service.interceptors.response.use(res => {
    if (res.data.message == '登录失败!') {
        localStorage.clear();
        if (router.history.current.path == '/login') {
            return Toast('登录失败')
        }
        return Dialog.confirm({
            title: '嘟嘟船讯提醒您！',
            message: '登录状态失效，请重新登录！'
        }).then(() => {
            router.push('/login')
        }).catch(() => {});
    } else if (res.data.code == 200 || res.status == 200) {
        return res;
    }
    return Promise.reject(res);
}, err => {
    console.log('响应失败', err);
    Toast('网络连接错误，请稍后重试!')
    return Promise.reject(err);
})

// Vue.prototype.$axios = axios;
export default service
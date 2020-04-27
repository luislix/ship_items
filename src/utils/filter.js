import Vue from 'vue'
Vue.filter('formatTime', function(time, formData) {
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
})
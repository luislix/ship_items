import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/index.css";
import "./registerServiceWorker";
import tools from "./utils/tools";
import "./utils/filter";
import myheader from "./components/Header";
Vue.use(tools);
import Vant from "vant";
import { Dialog } from "vant";
import "vant/lib/index.css";
import { timeToLocaleString } from "@/assets/js/index";
import pinyin from "js-pinyin";
import md5 from "js-md5";

import vueSignature from "vue-signature";
import 'default-passive-events'
Vue.use(vueSignature);

// 引入iconfont
import "./assets/iconfont/iconfont.css";
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "UGKgOKQlf3RFrgKml8DZHzo03efNZgkO"
});

// var appUpdate = cordova.require("cordova-plugin-app-update.AppUpdate");
// var updateUrl = "https://www.aiship.top:8443/version.xml";
// window.AppUpdate.checkAppUpdate(onSuccess, onFail, updateUrl);
// 全局注册
Vue.prototype.md5 = md5;
Vue.use(Dialog);
Vue.use(Vant, Dialog);
Vue.use(store);
Vue.component("myheader", myheader);
export default {
  name: "App"
};
Vue.filter("myDate", function(value) {
  // 返回处理后的值
  value = timeToLocaleString(value);
  return value;
});
// Vue.prototype.JIM = JIM;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  data() {
    return {};
  },
  render: h => h(App)
}).$mount("#app");

<template>
  <div class="register">
    <div class="type">
      <div class="top">
        <van-nav-bar
          title="注册"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
          :right-text="this.switch"
        >
          <!-- <van-icon name="search" slot="right" /> -->
        </van-nav-bar>
      </div>
      <div class="border">
        <img :src="userIcon" alt />
      </div>
      <h3 class="name">{{ userType }}</h3>
    </div>

    <ul class="center">
      <li>
        <input v-model="phone" type="text" placeholder="请输入手机号" />
      </li>
      <li>
        <div class="code">
          <input v-model="code" type="text" placeholder="请输入短信验证码" />
        </div>
        <button @click="getCode" type="button" class="getCode">
          {{ getCodeTip }}
        </button>
      </li>
      <li>
        <div class="disPlay" style="border-bottom: 1px #ccc solid;">
          <van-cell-group style="text-align:left;">
            <van-field
              v-if="this.$route.query.flag != 1"
              label="原密码"
              v-model="password"
              :type="inputType"
              placeholder="填写原密码"
              :right-icon="iconName"
              @blur="regPassword"
              @click-right-icon="showPassword"
            ></van-field>
          </van-cell-group>
        </div>
      </li>
      <li>
        <div class="disPlay" style="border-bottom: 1px #ccc solid;">
          <van-cell-group style="text-align:left;">
            <van-field
              label="确认密码"
              placeholder="再次填写确认"
              v-model="pwd"
              :type="input"
              :right-icon="icon"
              @blur="regPassword"
              @click-right-icon="Password"
            />
          </van-cell-group>
        </div>
      </li>
      <li>
        <van-col span="24" @click="isCheckProtocol"
          ><van-checkbox v-model="checkProtocol"
            ><a class="protocol" @click.stop="showProtocol"
              >用户协议、服务条款</a
            ></van-checkbox
          ></van-col
        >
      </li>
      <li>
        <button @click="register" class="reg" type="button">注册</button>
      </li>
    </ul>
    <div class="protocolContent">
      <van-dialog
        @confirm="confirm"
        v-model="show"
        width="100%"
        title="用户使用服务条例"
        show-cancel-button
      >
        <div class="protocolText">
          <ul>
            <li>
              <p>
                <strong>第1条嘟嘟船讯平台用户注册协议的接受</strong><br />
                本协议是您与奥沃希浦（湖北）科技有限公司之间就嘟嘟船讯平台服
                务等相关事宜所订立的契约。您在申请注册流程中点击同意签署本协
                议之前，务必审慎阅读、充分理解各条款内容，特别是免责声明条款、
                法律适用和争议解决条款。如您对协议有任何疑问，可向平台客服咨
                询。当您按照注册页面提示填写信息、阅读并同意本协议且完成全部
                注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，
                并与我们达成一致，成为嘟嘟船讯平台用户。阅读本协议的过程中，
                如果您不同意本协议或其中任何条款约定，请勿输入手机验证码注册
                及登录。您输入手机验证码点击“完成”，本协议即构成对双方有约
                束力的法律文件。<br />
                <strong>第2条嘟嘟船讯平台服务及资费</strong><br />
                2.1嘟嘟船讯平台通过互联网依法为您提供互联网信息等服务，包括
                但不限于嘟嘟船讯APP端，微信小程序端，移动增值服务等。本平台
                网络服务的具体内容由嘟嘟船讯平台据实际情况提供，嘟嘟船讯平台
                保留变更、中断或终止部分或全部网络服务的权利。<br />
                2.2您理解并确认，嘟嘟船讯平台仅提供相关的网络服务，除此之外
                与相关网络服务有关的设备（如电脑、调制解调器、移动电话及其他
                有关的装置）及所需的费用（如为接入互联网而支付的电话费、手机
                流量费及上网费等）均应由您自行负担。<br />
                <strong>第3条嘟嘟船讯平台账号注册及使用规则</strong><br />

                3.1您确认，在您开始注册程序使用嘟嘟船讯平台服务前，您应当具
                备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您
                不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依
                照法律规定承担因此而导致的一切后果。<br />
                3.2您应自行诚信向本平台提供注册资料，您确保您提供的注册资料
                真实、准确、完整、合法有效，您注册资料如有变动的，应及时更新
                其注册资料。如果您提供的注册资料不合法、不真实、不准确、不详
                尽的，您需承担因此引起的相应责任及后果，并且嘟嘟船讯平台保留
                终止您使用嘟嘟船讯平台各项服务的权利。<br />
                3.3嘟嘟船讯平台并不保证您提交申请后一定能获得通过审核，嘟嘟
                船讯平台有权不做任何解释而拒绝为您提供服务。<br />
                3.4您注册的嘟嘟船讯平台帐号及相应的密码信息，由您负责保管，
                您可以根据本平台规定改变自己的密码。嘟嘟船讯平台提醒您，您应
                谨慎合理的保存、使用其用户名和密码，应当对以您帐号进行的所有
                活动和事件负法律责任。您若发现任何非法使用用户账号或存在安全
                漏洞的情况，请立即通知本平台并向相关机关举报。<br />
                3.5您同意，嘟嘟船讯平台拥有通过邮件、短信、电话、微信等形式，
                向在本平台注册用户发送信息等告知信息的权利。<br />
                3.6您不得将在本平台注册获得的账户借给他人使用，不得与其他法
                人或自然人共享注册帐户，否则您应承担由此产生的全部责任，并与
                实际使用人承担连带责任。<br />
                3.7您同意，嘟嘟船讯平台有权使用您的注册信息、用户名、密码等
                信息，登录进入您的注册账户，进行证据保全，包括但不限于公证、
                见证等。<br />
                <strong>第4条嘟嘟船讯平台用户依法言行的义务</strong><br />
                4.1您在使用嘟嘟船讯平台网络服务过程中，必须遵循以下义务：<br />
                （a）遵守中国有关的法律和法规；<br />
                （b）不得为任何非法目的而使用网络服务系统；<br />
                （c）遵守所有与网络服务有关的网络协议、规定和程序；<br />
                （d）不得利用嘟嘟船讯平台网络服务系统进行任何可能对互联网的
                正常运转造成不利影响的行为；<br />
                （e）不得利用嘟嘟船讯平台网络服务系统进行任何可能对港口、船
                舶的安全及运营造成不利影响的行为；<br />
                （f）不得利用嘟嘟船讯平台网络服务系统进行任何不利于嘟嘟船讯
                平台的行为；<br />
                （g）不得利用嘟嘟船讯平台网络服务以任何形式侵害任何人之专利、
                商标、商业秘密、著作权或其他专属权利的行为；<br />
                （h）应遵循的其他义务。<br />
                4.2您应不时关注并遵守本平台不时公布或修改的各类合法规则规
                定。<br />
                4.3本平台保有删除站内各类不符合法律政策或不真实的信息内容而
                无须通知用户的权利。<br />
                4.4若您未遵守以上规定的，本平台有权作出独立判断并采取暂停或
                关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责
                任。<br />
                <strong>第5条嘟嘟船讯平台所有权</strong><br />
                5.1您同意并已充分了解本协议的条款，承诺不将已发表于本平台的
                信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限
                于在各类网站、媒体上使用）。<br />
                5.2奥沃希浦（湖北）科技有限公司是本平台的制作者,拥有此网站
                内容及资源的著作权等合法权利,受国家法律保护,有权不时地对本
                协议及本平台的内容进行修改，并在本平台张贴，无须另行通知用户。
                在法律允许的最大限度范围内，奥沃希浦（湖北）科技有限公司对本
                协议及本平台内容拥有解释权。<br />
                5.3除法律另有强制性规定外，未经奥沃希浦（湖北）科技有限公司
                明确的特别书面许可,任何单位或个人不得以任何方式非法地全部或
                部分复制、转载、引用、链接、抓取或以其他方式使用本平台的信息
                内容，否则，奥沃希浦（湖北）科技有限公司有权追究其法律责任。
                5.4嘟嘟船讯平台所刊登的资料信息（诸如文字、标识、图表、图像、
                视频、按钮图标、声音文件片段、数字下载、数据编辑和软件等），
                均是嘟嘟船讯平台或其内容提供者的财产，受中国和国际版权法的保
                护。本平台上所有内容的汇编是嘟嘟船讯平台的排他财产，受中国和
                国际版权法的保护。本平台上所有软件都是奥沃希浦（湖北）科技有
                限公司或其关联公司或其软件供应商的财产，受中国和国际版权法的
                保护。<br />
                <strong>第6条嘟嘟船讯平台用户隐私制度</strong><br />
                6.1保护用户隐私是嘟嘟船讯平台网的一项基本政策，当您注册本平
                台时，您须提供个人信息。嘟嘟船讯平台保证不对外公开或提供您注
                册资料及您在使用网络服务时存储在嘟嘟船讯平台的非公开内容，但
                下列情况除外：<br />
                （a）事先获得您的明确授权；<br />
                （b）根据有关的法律法规要求；<br />
                （c）按照相关政府主管部门的要求；<br />
                （d）为维护社会公众的利益；<br />
                （e）为维护嘟嘟船讯平台的合法权益；<br />
                （f）其他需要公开、编辑或透露个人信息的情况；<br />
                6.2嘟嘟船讯平台可能会与第三方合作向用户提供相关的服务，在此
                情况下，如该第三方同意承担与嘟嘟船讯平台同等的保护用户隐私的
                责任，则嘟嘟船讯平台可将您的注册资料等提供给该第三方；<br />
                6.3在不透露单个用户隐私资料的前提下，嘟嘟船讯平台有权对整个
                用户数据库进行分析并对用户数据库进行商业上的利用；<br />
                6.4嘟嘟船讯平台包含指向其它网站的链接。对于其它这些网站的隐
                私权措施，我们不承担任何责任。我们建议您在离开我们的网站时应
                留意阅读收集个人识别信息的每个网站上的隐私权声明。本隐私权声
                明仅适用于嘟嘟船讯平台上收集的信息。<br />
                <strong>第7条嘟嘟船讯平台黑名单制度</strong><br />
                本平台坚信“信誉比金子重要”的理念，通过建立黑名单制度的形式
                打造诚信网络服务平台。您在本平台所做的一切活动，都应恪守诚实
                信用原则。如果您违背诚实信用原则，扰乱本平台正常运行秩序，本
                平台有权将您拉入本平台的黑名单系统，并不限于通过网络、媒体的
                途径予以曝光。<br />
                <strong>第8条嘟嘟船讯平台免责声明</strong><br />
                8.1关于网站<br />
                （a）嘟嘟船讯平台刊载的文章（包括转贴文章）的版权仅归原作者
                所有，若作者有版权声明的或文章从其它网站转载而附带有原所有站
                的版权声明者，其版权归属以附带声明为准。由此而导致的任何法律
                争议和后果，嘟嘟船讯平台均予以免责；<br />
                （b）由于与嘟嘟船讯平台链接的其它网站所造成之用户资料泄露及
                由此而导致的任何法律争议和后果，嘟嘟船讯平台均予以免责；<br />
                （c）由于用户将密码告知他人或与他人共享注册帐户，由此导致的
                任何用户资料泄露以及引起的后果，嘟嘟船讯平台不负任何责任；<br />
                （d）当政府司法机关依照法定程序要求嘟嘟船讯平台披露用户资料
                时，我们将根据执法单位之要求或为公共安全之目的提供用户资料。
                在此情况下之所做的任何披露，嘟嘟船讯平台均得免责；<br />
                （e）用户明确同意其使用嘟嘟船讯平台服务所存在的风险将完全由
                其自己承担。因其使用这些服务而产生的一切后果也由其自己承担，
                嘟嘟船讯平台对用户不承担任何责任。<br />
                8.2关于网站运行<br />
                （a）嘟嘟船讯平台如因系统维护或升级而需暂停服务时，将事先公
                告。若因线路及非江苏物润船联网络股份有限公司控制范围外的硬件
                故障或其它不可抗力而导致暂停服务，暂停服务期间造成的一切不便
                与损失，嘟嘟船讯平台不负任何责任；<br />
                （b）任何由于黑客攻击、计算机病毒侵入或发作、因政府管制而造
                成的暂时性关闭等影响网络正常经营的不可抗力而造成的用户资料
                泄露、丢失、被盗用或被窜改等，嘟嘟船讯平台均得免责。<br />
                8.3关于法律责任<br />
                （a）嘟嘟船讯平台用户因为违反本声明的规定而触犯中华人民共和
                国法律法规的，一切后果自己负责，嘟嘟船讯平台不承担任何责任；
                （b）凡以任何方式登嘟嘟船讯平台或直接、间接使用嘟嘟船讯平台
                资料者，视为自愿接受嘟嘟船讯平台声明的约束；<br />
                （c）本声明未涉及的问题参照国家有关法律法规，当本声明与国家
                法律法规冲突时，以国家法律法规为准；<br />
                8.4关于船舶信息及数字电子航道图及其他服务<br />
                嘟嘟船讯平台提供的所有数据不具任何法律约束力或责任性，嘟嘟船
                讯平台不承担任何责任或作出任何保证，仅供参考用途。<br />
                <strong>第9条嘟嘟船讯平台服务变更、中断或终止</strong><br />
                9.1如因系统维护或升级的需要而需暂停网络服务，嘟嘟船讯平台将
                尽可能事先进行通告。<br />
                9.2如发生下列任何一种情形，嘟嘟船讯平台有权随时中断或终止向
                用户提供本协议项下的网络服务而无需通知用户：<br />
                （a）用户提供的资料不真实；<br />
                （b）用户违反本协议中规定的使用规则。<br />
                9.3嘟嘟船讯平台提供的免费服务，嘟嘟船讯平台保留在不事先通知
                用户的情况下单方面中断或终止服务的权利，由此产生的任何损失，
                嘟嘟船讯平台不承担任何责任。<br />
                9.4嘟嘟船讯平台用户未能及时付费，导致的服务中断或终止，由此
                产生的任何损失，嘟嘟船讯平台不承担任何责任。<br />
                9.5除前款所述情形外，嘟嘟船讯平台同时保留在不事先通知用户的
                情况下随时中断或终止部分或全部网络服务的权利，对于所有服务的
                中断或终止而造成的任何损失，嘟嘟船讯平台无需对用户或任何第三
                方承担任何责任。<br />
                <strong>第10条嘟嘟船讯平台违约的认定及处理</strong><br />
                10.1您同意保障和维护嘟嘟船讯平台、嘟嘟船讯平台合作伙伴及其
                他用户的利益，发生如下情形之一的，视为您违约：<br />
                （a）使用嘟嘟船讯平台平台服务时违反有关法律法规规定的；<br />
                （b）违反本协议或本协议补充协议约定的。<br />
                为适应电子商务发展和满足海量用户对高效优质服务的需求，您理解
                并同意，嘟嘟船讯平台可在本平台规则中约定违约认定的程序和标
                准。如：嘟嘟船讯平台可依据您的用户数据与海量用户数据的关系来
                认定您是否构成违约；您有义务对您的数据异常现象进行充分举证和
                合理解释，否则将被认定为违约<br />
                10.2您在本平台上发布的信息构成违约的，本平台可根据相应规则
                立即采取对相应信息进行删除、屏蔽处理等措施。<br />
                10.3如您的行为使嘟嘟船讯平台或其关联公司遭受损失（包括自身
                的直接经济损失、商誉损失及对外支付的赔偿金、律师费、诉讼费等
                间接经济损失），您应赔偿嘟嘟船讯平台或其关联公司的上述全部损
                失。如您的行为使嘟嘟船讯平台或其关联公司遭受第三人主张权利，
                嘟嘟船讯平台或其关联公司可在对第三人承担金钱给付等义务后就
                全部损失向您追偿。<br />
                <strong>第11条嘟嘟船讯平台修改协议</strong><br />
                11.1嘟嘟船讯平台将可能不时的修改本协议的有关条款，一旦条款
                内容发生变动，嘟嘟船讯平台将会在相关的页面提示修改内容。<br />
                11.2如果您不同意嘟嘟船讯平台对服务条款所做的修改，您有权停
                止使用网络服务。如果您继续使用网络服务，则视为用户接受服务条
                款的变动。<br />
                <strong>第12条嘟嘟船讯平台法律管辖</strong><br />
                12.1本协议的订立、执行和解释及争议的解决均应适用中国法律。<br />
                12.2如双方就本协议内容或其执行发生任何争议，双方应尽量友好
                协商解决；协商不成时，双方同意向奥沃希浦（湖北）科技有限公司
                住所地的人民法院提起诉讼。<br />
                <strong>第13条嘟嘟船讯平台其他规定</strong><br />
                13.1本协议构成双方对本协议之约定事项及其他有关事宜的完整协
                议，除本协议规定的之外，未赋予本协议各方其他权利。<br />
                13.2如本协议中的任何条款无论因何种原因完全或部分无效或不具
                有执行力，本协议的其余条款仍应有效并且有约束力。<br />
                13.3本协议的最终修改及解释权属于奥沃希浦（湖北）科技有限公 司。
              </p>
            </li>
          </ul>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
import { Code, register } from "@/api/index.js";
import md5 from "js-md5";
Vue.use(Tab)
  .use(Tabs);
export default {
  name: "register",
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      newPwd: "",
      userSource: 0,
      clientId: "",
      appId: "ef9LGBiOVr9CIuVI4Mrpc7",
      appKey: "glPBr7Bk3u9RVDodLsAxH5",
      masterSecret: "3DHbeuYzZY8WCPQ0Jzibg7",
      appType: "",
      token: 1,
      oldVersionNumber: "",
      pwds: "",
      pwd: "",
      flag: true,
      flag1: true,
      url: require(`@/assets/image/eye.png`),
      url2: require(`@/assets/image/eye.png`),
      userInfo: {
        clientId: "",
        appId: "ef9LGBiOVr9CIuVI4Mrpc7",
        appKey: "glPBr7Bk3u9RVDodLsAxH5",
        masterSecret: "3DHbeuYzZY8WCPQ0Jzibg7",
        appType: "",
        token: 1,
        oldVersionNumber: "1.0",
        phoneId: "1",
        loginName: "",
        password: ""
      },
      userIcon: require("../../assets/image/shipowner.png"),
      switch: "切换货主",
      userType: "船主",
      checked: true,
      checkProtocol: false, //选择服务条款
      show: false, //显示弹框
      regCode: "",
      getCodeTip: "获取验证码",
      inputType: "password",
      iconName: "closed-eye",
      iconNames: "closed-eye",
      icon: "closed-eye",
      type: "password",
      input: "password",
    };
  },
  created() {
    this.Signatures();
    this.userType =
      this.$route.query.userType == 3
        ? "船主"
        : this.$route.query.userType == 2
        ? "货主"
        : "企业用户";
    console.log(this.userType);
    if (localStorage.getItem("clientId")) {
      this.clientId = localStorage.getItem("clientId");
    }
    if (this.userType == 2) {
      this.userIcon = require("@/assets/image/shipper.png");
    } else if (this.userType == 3) {
      this.userIcon = require("@/assets/image/shipowner.png");
    } else if (this.userType == 8) {
      this.userIcon = require("@/assets/image/qiyeyonghu.png");
    }
    if(localStorage.getItem('device')){
      this.token = JSON.parse(localStorage.getItem('device')).platform == "Android"?1:0
    }
  },
  mounted() {},
  watch: {},
  methods: {
    getCode() {
      if (this.getCodeTip != "获取验证码") {
        return;
      }
      if (!/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.phone.trim())) {
        return this.$toast("请输入正确手机号");
      }
      if (this.phone != "") {
        Code({ phoneNumber: this.phone, userSource: this.userSource }).then(
          res => {
            if (res.data.code == 200) {
              this.$toast("验证码发送成功");
              let flag = 60;
              setInterval(() => {
                flag--;
                if (flag <= 0) {
                  clearInterval();
                  return (this.getCodeTip = "获取验证码");
                }
                this.getCodeTip = flag + "秒后重新获取";
              }, 1000);
            }
            console.log(res);
          }
        );
      }
    },
    //生成随机数
    randoms() {
      var str = "",
        range = 20, //min
        arr = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ];
      // 随机产生
      if (true) {
        range = Math.round(Math.random() * (36 - 20)) + 20;
      }
      for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    },
    //生成签名;
    Signatures() {
      return new Promise((resolve, reject) => {
        var random_str = this.randoms();
        var app_key = "3b25e463cba41aa87f5973f4";
        var timestamp = new Date().valueOf();
        var secret = "ef5be4360ec4af46202f02fc";
        var signature = md5(
          `appkey=${app_key}&timestamp=${timestamp}&random_str=${random_str}&key=${secret}`
        );
        console.log(signature);
        if (signature) {
          JIM.init({
            appkey: app_key,
            random_str: random_str,
            signature: signature,
            timestamp: timestamp,
            flag: 1
          })
            .onSuccess(function(data) {
              console.log("初始化成功!");
              // JIM.loginOut();
              resolve();
            })
            .onFail(function(data) {
              console.log("初始化失败");
            });
        }
      });
    },
    async register() {
      var that = this;
      await this.Signatures().then(res => {
        if (!/^1[3456789]\d{9}$/.test(this.phone)) {
          this.$toast({ type: "warning", message: "输入手机号有误" });
        } else if (this.code == "" || this.code.length < 6) {
          this.$toast({ type: "warning", message: "验证码不能少于六位数" });
        } else if (this.password == "" || this.password.length < 6) {
          this.$toast({ type: "warning", message: "密码不能少于六位数" });
        } else if (!this.checkProtocol) {
          this.$toast({ type: "warning", message: "请阅读用户服务条款！" });
        } else if (this.pwd != this.password) {
          this.$toast({ type: "warning", message: "两次密码不一致" });
        } else {
          register({
            mobilePhone: this.phone,
            password: this.password,
            userType:
              this.userType == "船主" ? 3 : this.userType == "企业用户" ? 8 : 2,
            code: this.code,
            userSource: this.userSource,
            clientId: this.clientId,
            token: this.token,
            appId: this.appId,
            appKey: this.appKey,
            masterSecret: this.masterSecret,
            oldVersionNumber: this.oldVersionNumber
          }).then(res => {
            console.log(res.status, res);
            if (res.status == 200 && res.data.code == 500) {
              this.$toast({ type: "warning", message: res.data.message });
            } else {
              this.$toast({ type: "success", message: "恭喜您,注册成功" });
              that.JIMregister();
            }
          });
        }
      });
    },
    showPassword() {
      this.iconName = this.iconName == "closed-eye" ? "eye-o" : "closed-eye";
      this.inputType = this.inputType == "password" ? "string" : "password";
    },
    regPassword() {
      if (!this.$tools.regPassword(this.password)) {
        return false;
      }
    },
    shownewPassword() {
      this.iconNames = this.iconNames == "closed-eye" ? "eye-o" : "closed-eye";
      this.type = this.type == "password" ? "string" : "password";
    },
    Password() {
      this.icon = this.icon == "closed-eye" ? "eye-o" : "closed-eye";
      this.input = this.input == "password" ? "string" : "password";
    },
    again() {
      this.flag = !this.flag;
      if (this.flag) {
        this.url2 = require(`@/assets/image/eye.png`);
        console.log(this.pwd);
        this.pwds = this.pwd;
      } else {
        this.url2 = require(`@/assets/image/eye2.png`);

        this.pwd = this.pwds;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      if (this.switch == "切换货主") {
        this.switch = "切换企业";
        this.userInfo.appType = 2;
        this.userIcon = require("@/assets/image/shipper.png");
        this.userType = "货主";
      } else if (this.switch == "切换企业") {
        this.switch = "切换船主";
        this.userInfo.appType = 8;
        this.userIcon = require("@/assets/image/qiyeyonghu.png");
        this.userType = "企业用户";
      } else if (this.switch == "切换船主") {
        this.switch = "切换货主";
        this.userInfo.appType = 3;
        this.userIcon = require("@/assets/image/shipowner.png");
        this.userType = "船主";
      }
      // console.log(this.userInfo);
      // this.userInfo.appType = this.userInfo.appType == 3 ? 2 : (this.userInfo.appType == 8?3:8);
      // console.log(this.userInfo.appType);
      // this.userType = this.userType == "船主" ? "货主" :( this.userType == "企业用户" ?"船主":"企业用户");
      // console.log(
      //   "img",
      //   this.userIcon == require("@/assets/image/shipowner.png")
      // );
      // this.userIcon =
      //   this.userIcon == require("@/assets/image/shipowner.png")
      //     ? require("@/assets/image/shipper.png")
      //     : require("@/assets/image/shipowner.png");
      // this.switch = this.switch == "切换货主" ? "切换船主" : (this.switch == "企业用户"?"切换船主":"企业用户");
    },
    JIMregister() {
      var that = this;
      var str = '嘟嘟船讯'+ this.phone.slice(0,4);
      JIM.register({
        username: this.phone,
        password: "123456",
        nickname: str,
        media_id:
          "http://oship-images.oss-cn-beijing.aliyuncs.com/image/1572947648406.jpg?x-oss-process=style/imgSize",
        extras: { userType: this.userInfo.appType },
        is_md5: false,
        extras: { key1: "val1", key2: "val2" }
      })
        .onSuccess(function(data) {
          //data.code 返回码
          //data.message 描述
          console.log("注册成功", data.code);
          if (data.code == 0) {
            that.regCode = data.code;
            setTimeout(function() {
              that.$router.push({
                path: "/login",
                name: "login",
                params: {
                  mobilePhone: that.phone,
                  password: that.password,
                  regCode: that.regCode
                }
              });
            }, 1500);
          }
        })
        .onFail(function(data) {
          // 同上
          console.log("注册失败");
        });
    },
    // 同意服务条款
    isCheckProtocol() {
      console.log(111);
    },
    // 阅读服务条款
    showProtocol() {
      this.show = true;
    },
    //
    confirm() {
      console.log("tru");
      this.checkProtocol = true;
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  height: 100%;
  [class*=van-hairline]::after{
    border: none;
  }
  .van-cell{
    padding:0;
  }
}
.top {
  height: 1.5rem;
}
.type {
  height: 5.6rem;
  background: url("../../assets/image/login-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.border {
  border-radius: 50%;
  width: 2.6rem;
  height: 2.6rem;
  margin: 0 auto;
  background: #fff;
}
.border img {
  display: block;
  padding-top: 0.3rem;
  margin: 0 auto;
  width: 2rem;
  height: 2rem;
}
.name {
  font-size: 0.3rem;
  color: #fff;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
}
.center {
  width: 86%;
  /* height: 3rem; */
  background: #fff;
  border-radius: 5px;
  margin: 0 auto;
}
.center li {
  padding: 0.3rem;
  position: relative;
}
.center li p {
  font-size: 0.25rem;
  font-weight: bold;
}
.center li input {
  display: block;
  width: 100%;
  font-size: 0.3rem;
  border: none;
  border-bottom: 1px #ccc solid;
}
input::placeholder {
  font-size: 0.25rem;
}
.getCode {
  width: 1.6rem;
  height: 0.6rem;
  position: absolute;
  right: 0.3rem;
  bottom: 0.36rem;
  font-size: 0.2rem;
  background: radial-gradient(farthest-side at 0 0, #0b6eff 0%, #68aaff 100%);
  color: #fff;
  border: none;
}
.reg {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  background: radial-gradient(farthest-side at 0 0, #0b6eff 0%, #68aaff 100%);
  color: #fff;
  font-size: 0.35rem;
  margin: 0 auto;
  border: none;
  border-radius: 10px;
}
.watch {
  width: 0.3rem;
  position: absolute;
  right: 0;
}
.disPlay {
  position: relative;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.protocol {
  color: #00a0e8;
}
.protocolText {
  height: 500px;
  overflow: auto;
  text-align: start;
}
.pre {
  white-space: pre;
}
.van-dialog__header {
  padding-top: 44px;
}
</style>

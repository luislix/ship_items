<template>
  <div class="Authentication pageCommonStyle">
    <myheader></myheader>
    <van-row class="align_center commonColor">
      <van-col span="6" class="float_r">
        <img src="@/assets/image/chahua@2x.png" alt="" />
      </van-col>
      <van-col span="18">
        <van-row style="font-size:18px;margin-bottom:.2rem;"
          >实名认证能提高您的可信度!</van-row
        >
        <van-row class="textClolor_lightGray"
          >您的实名认证信息将严格保密</van-row
        >
      </van-col>
    </van-row>
    <van-row v-if="$route.query.jumpStatus == 0">
      <van-row class="userInfo">
        <van-row v-if="$route.query.jumpStatus == 0">
          <van-row class="userInfo">
            <van-row>
              <van-col span="24">
                <van-cell-group>
                  <van-field
                    v-model="user.userInfo.userName"
                    rows="1"
                    autosize
                    label="真实姓名"
                    type="textarea"
                    input-align="right"
                    placeholder="请输入您的真实姓名"
                  />
                </van-cell-group>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                <van-cell-group>
                  <van-field
                    v-model="user.userInfo.emergencyMobilePhone"
                    rows="1"
                    autosize
                    label="手机号"
                    type="textarea"
                    input-align="right"
                    placeholder="请输入您的手机号"
                  />
                </van-cell-group>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                <van-cell-group>
                  <van-field
                    v-model="user.userInfo.identityCardNo"
                    rows="1"
                    autosize
                    label="身份证号"
                    type="textarea"
                    input-align="right"
                    placeholder="请输入您的有效身份证号码"
                  />
                </van-cell-group>
              </van-col>
            </van-row>
          </van-row>
          <van-row class="idCardImg commonColor">
            <van-row
              ><van-col class="float_l" span="24" style="margin-bottom:.2rem;"
                >便于审核通过，请务必提交清晰身份证证件照</van-col
              ></van-row
            >
            <van-row span="24">
              <van-col span="12">
                <van-uploader
                  :preview-full-image="flag"
                  style="border-radius: 1rem;"
                  multiple
                  :max-count="1"
                  name="1"
                  :after-read="uploadUserImg"
                >
                <img :src="idCardFrontUrl" alt="" />
                </van-uploader>
              </van-col>
              <van-col span="12">
                <van-uploader
                  :preview-full-image="flag"
                  style="border-radius: 1rem;height: 1.3rem;"
                  multiple
                  name="2"
                  :max-count="1"
                  preview-size="80px"
                  :after-read="uploadUserImg"
                >
                  <img :src="idCardReverseUrl" alt="" />
                </van-uploader>
              </van-col>
            </van-row>
          </van-row>
        </van-row>
      </van-row>
    </van-row>
    <van-row v-else class="companyInfo">
      <van-row class="companyInfo_data">
        <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="user.companyInfo.companyName"
                rows="1"
                autosize
                label="公司名称"
                type="textarea"
                input-align="right"
                placeholder="请输入公司名称"
              />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="user.companyInfo.companyLegalName"
                rows="1"
                autosize
                label="企业法人"
                type="textarea"
                input-align="right"
                placeholder="请输入企业法人名称"
              />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="user.companyInfo.companyEmergencyMobilePhone"
                rows="1"
                autosize
                label="联系电话"
                type="textarea"
                input-align="right"
                placeholder="请输入联系电话"
              />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <van-cell-group>
              <van-field
                v-model="user.companyInfo.companyLicenseNo"
                rows="1"
                autosize
                label="营业执照编号"
                type="textarea"
                input-align="right"
                placeholder="请输入营业执照编号"
              />
            </van-cell-group>
          </van-col>
        </van-row>
      </van-row>
      <van-row class="companyInfo_img">
        <van-row>
          <van-col>请上传公司营业执照</van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <van-uploader
              style="border-radius: 1rem;"
              multiple
              :max-count="1"
              name="1"
              preview-size="1.3rem"
              :after-read="uploadUserImg"
            >
              <img :src="idCardFrontUrl" alt="" />
            </van-uploader>
          </van-col>
          <van-col span="12">
            <img :src="companyInfoExample" alt="" />
          </van-col>
        </van-row>
      </van-row>
    </van-row>
    <van-row class="matters textClolor_lightGray">
      <van-row class="float_l"
        ><van-col class="float_c" span="2" style="font-size:18px;color:#FF9B39;"
          ><van-icon name="warning"/></van-col
        ><van-col span="21" class="float_l textColor_darkGray"
          >上传注意事项</van-col
        ></van-row
      >
      <van-row
        ><van-col span="24" class="float_l tip"
          >1、格式要求：支持jpg、png格式照片,且单张大小不超过4M;</van-col
        ></van-row
      >
      <van-row
        ><van-col class="float_l tip" span="24"
          >2、禁止带有第三方水印;</van-col
        ></van-row
      >
      <van-row
        ><van-col span="24" class="float_l tip"
          >3、上传国家明令禁止的图片，我们将保留追究权利。</van-col
        ></van-row
      >
      <!-- <input type="file" id="camera" capture="environment" accept="image/*">1111 -->
    </van-row>
    <van-row class="btn">
      <van-button
        type="info"
        v-if="userCertificateStatus == 0 && user.entityType == 1"
        @click="Authentication"
      >
        提交信息
      </van-button>
      <van-button
        type="info"
        v-if="companyCertificateStatus == 0 && user.entityType == 2"
        @click="Authentication"
      >
        提交信息
      </van-button>
      <van-button
        type="info"
        v-if="userCertificateStatus == 1 && user.entityType == 1"
        @click="updatePersonDetail"
        >修改信息</van-button
      >
      <van-button
        type="info"
        v-if="companyCertificateStatus == 1 && user.entityType == 2"
        @click="updatePersonDetail"
        >修改信息</van-button
      >
    </van-row>
  </div>
</template>

<script>
import {
  userPhoto,
  Authentication,
  companyInfo,
  getUserInfo,
  headImg,
  queryIDDetail,
  updatePersonDetail,
  updateCompanyDetail
} from "@/api/index";
export default {
  name: "Authentication",
  data() {
    return {
      user: {
        userInfo: {
          userName: "",
          identityCardType: 1, //(证件类型:1身份证,2军官证,3护照)
          emergencyMobilePhone: "",
          identityCardNo: ""
        },
        identityFrontUrl: "",
        identityReverseUrl: "",
        entityType: 1, //1为用户信息认证 ,2为企业信息认证
        userId: JSON.parse(localStorage.getItem("userLoginInfo")).user_id
      },
      idCardFrontUrl: "",
      idCardReverseUrl: "",
      flag: true,
      companyInfoExample: "",
      token: "",
      userCertificateStatus: "",
      companyCertificateStatus: ""
    };
  },
  created() {
    this.idCardFrontUrl = require("@/assets/image/authentication/idCardFront.png");
    console.log(this.identityFrontUrl);
    if (this.$route.query.jumpStatus == 1) {
      this.companyInfoExample = require("@/assets/image/authentication/YYZZ.png");
      this.idCardFrontUrl = require("@/assets/image/authentication/正面.png");
      this.$route.meta.title = "企业认证";
      // 用户企业认证,必填项：需要entityType/认证类型 :1为用户信息认证 ,2为企业信息认证
      // licenseFrontUrl/公司营业执照正面URL
      // userId
      // companyInfo.companyName(企业名称)
      // companyInfo.companyEmergencyMobilePhone(企业紧急联系人)
      // companyInfo.companyLicenseNo(营业执照编号)
      // companyInfo.companyLegalName(企业法人)
      // body示例：
      this.user = {
        entityType: 2,
        licenseFrontUrl: "",
        userId: this.user.userId,
        companyInfo: {
          companyEmergencyMobilePhone: "",
          companyName: "",
          companyLicenseNo: "",
          companyLegalName: ""
        }
      };
      this.queryIDDetail();
    } else {
      this.idCardReverseUrl = require("@/assets/image/authentication/idCardReverse.png");
      this.queryIDDetail();
      this.$route.meta.title = "个人认证";
    }
  },
  methods: {
    // res() {
    //   document.addEventListener(
    //     "deviceready",
    //     function() {
    //       navigator.camera.getPicture(onSuccess, onFail, {
    //         quality: 50,
    //         destinationType: Camera.DestinationType.FILE_URI
    //       });

    //       function onSuccess(imageURI) {
    //         console.log(1111);
    //         var image = document.getElementById("myImage");
    //         image.src = imageURI;
    //       }

    //       function onFail(message) {
    //         console.log(222);
    //         alert("Failed because: " + message);
    //       }
    //     },
    //     false
    //   );
    // },
    Authentication() {
      var that = this;
      console.log(this.user);
      if (this.$route.query.jumpStatus == 0) {
        if (!this.user.userInfo.userName.trim()) {
          return this.$toast("请填写姓名");
        }
        if (
          !/^[1][3-8][0-9]{9}$/.test(
            this.user.userInfo.emergencyMobilePhone.trim()
          )
        ) {
          return this.$toast("请填写有效手机号");
        }
        if (
          !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
            this.user.userInfo.identityCardNo.trim()
          )
        ) {
          return this.$toast("请填写有效的身份证号码");
        }
        Authentication(this.user, localStorage.getItem("token")).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$toast("验证成功");
            this.user = "";
            let userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));
            userLoginInfo.user_certificate_status = 1;
            localStorage.setItem('userLoginInfo',JSON.stringify(userLoginInfo));
            setTimeout(() => {
              this.$router.push({path:'/index/myData',query:{}});
            }, 1000);
          } else {
            this.$toast(res.data.message);
          }
        });
      } else if (this.$route.query.jumpStatus == 1) {
        companyInfo(this.user, localStorage.getItem("token")).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$toast("用户认证成功");
            let userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));
            userLoginInfo.company_certificate_status = 1;
            localStorage.setItem('userLoginInfo',JSON.stringify(userLoginInfo));
            setTimeout(() => {
              this.$router.push({path:'/index/myData',query:{}});
            }, 1000);
          } else {
            this.$toast(res.data.message);
          }
        });
      }
    },
    uploadUserImg(file, detail) {
      var that = this;
      console.log(file, detail);
      if (localStorage.getItem("userLoginInfo")) {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          overlay: true,
          duration: 80000
        });
        let formData = new FormData();
        formData.append("imgfile", file.file);
        console.log(formData);
        headImg(formData).then(res => {
          this.$toast.clear();
          if (res.data.code == 200) {
            console.log(res);
            if (detail.name == 1) {
              this.idCardFrontUrl = res.data.data;
              if (this.$route.query.jumpStatus == 1) {
                this.user.licenseFrontUrl = res.data.data;
              } else {
                this.user.identityFrontUrl = res.data.data;
                this.idCardFrontUrl = res.data.data;
              }
            } else if (detail.name == 2) {
              this.user.identityReverseUrl = res.data.data;
              this.idCardReverseUrl = res.data.data;
            }
          } else {
            this.$toast(res.data.message);
          }
        });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    queryIDDetail() {
      queryIDDetail(this.user.userId, localStorage.getItem("token")).then(
        res => {
          console.log(res.data.data);

          if (this.user.entityType == 2) {
            this.user.companyInfo.companyName =
              res.data.data.companyInfo.companyName;
            this.user.companyInfo.companyLegalName =
              res.data.data.companyInfo.companyLegalName;
            this.user.companyInfo.companyEmergencyMobilePhone =
              res.data.data.companyInfo.companyEmergencyMobilePhone;
            this.user.companyInfo.companyLicenseNo =
              res.data.data.companyInfo.companyLicenseNo;
            this.idCardFrontUrl = res.data.data.licenseFrontUrl;
            this.companyCertificateStatus =
              res.data.data.companyInfo.companyCertificateStatus;
          } else {
            this.user.userInfo.userName = res.data.data.userInfo?res.data.data.userInfo.userName:'';
            this.user.userInfo.identityCardNo =
              res.data.data.userInfo?res.data.data.userInfo.identityCardNo:"";
            this.user.userInfo.emergencyMobilePhone =
              res.data.data.userInfo?res.data.data.userInfo.emergencyMobilePhone:"";
            if (res.data.data.identityFrontUrl != null) {
              this.idCardFrontUrl = res.data.data.identityFrontUrl;
            }
            this.userCertificateStatus =res.data.data.userInfo?res.data.data.userInfo.userCertificateStatus:'';
              if(res.data.data.identityReverseUrl != null)
            this.idCardReverseUrl = res.data.data.identityReverseUrl;
          }
        }
      );
    },
    updatePersonDetail() {
      //   console.log(this.idCardFrontUrl,this.idCardReverseUrl);
      var that = this;
      if (this.user.entityType == 2) {
        this.user.identityFrontUrl = this.idCardFrontUrl;
        this.user.identityReverseUrl = this.idCardReverseUrl;
      } else {
        this.user.idCardFrontUrl = this.idCardFrontUrl;
      }
      if (this.$route.query.jumpStatus == 0) {
        if (!this.user.userInfo.userName.trim()) {
          return this.$toast("请填写姓名");
        }
        if (
          !/^[1][3-8][0-9]{9}$/.test(
            this.user.userInfo.emergencyMobilePhone.trim()
          )
        ) {
          return this.$toast("请填写有效手机号");
        }
        if (
          !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
            this.user.userInfo.identityCardNo.trim()
          )
        ) {
          return this.$toast("请填写有效的身份证号码");
        }
        updatePersonDetail(this.user, localStorage.getItem("token")).then(
          res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$toast("验证成功");
              this.user = "";
              setTimeout(() => {
                that.$router.go(-1);
              }, 1000);
            } else {
              this.$toast(res.data.message);
            }
          }
        );
      } else if (this.$route.query.jumpStatus == 1) {
        updateCompanyDetail(this.user, localStorage.getItem("token")).then(
          res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$toast("修改成功");
              this.$router.push("/index/myData");
            } else {
              this.$toast(res.data.message);
            }
          }
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-field {
  text-align: left;
}
.Authentication {
  .commonColor {
    background: #fff;
    img {
      width: 1.5rem;
    }
  }
  .userInfo {
    margin-top: 0.2rem;
  }
  .idCardImg {
    margin-top: 0.2rem;
    padding: 0.2rem;
    img {
      width: 90%;
    }
  }
  .companyInfo {
    .companyInfo_img {
      background: #fff;
      margin-top: 0.1rem;
      padding: 0.2rem;
      img {
        width: 85%;
        height: 3.8rem;
        margin-top: 0.2rem;
        border-radius: 0.1rem;
      }
    }
  }
  .matters {
    padding: 0.4rem 0.2rem;
    padding-bottom: 1.2rem;
    .tip {
      padding-left: 0.3rem;
      margin-top: 0.2rem;
    }
  }
}
</style>

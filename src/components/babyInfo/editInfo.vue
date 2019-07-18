<template>
  <div>
    <div class="page-header">
      <div class="page-top">
        <h4>个人信息设置</h4>
        <img
          src="../../statics/images/back1.png"
          class="back-img"
          @click="back"
          v-show="!firstHidden"
        >
      </div>
    </div>
    <div class="content" style="padding:0.6rem 0;">
      <el-form id="form">
        <el-form-item class="item-form radio-form form-padding" label="我是    ">
          <el-radio-group id="ralation" v-model="user.indentify">
            <el-radio :label="2" class="radio">母亲</el-radio>
            <el-radio :label="1" class="radio">父亲</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="item-form form-padding">
          <el-input type="text" v-model="user.name" placeholder="请输入您的姓名"></el-input>
          <!-- <el-input placeholder="请输入您的生日" suffix-icon="el-icon-date"  readonly>
          </el-input>-->
        </el-form-item>
        <el-form-item class="item-form form-padding">
          <el-date-picker
            style="width: 100%;padding:0 0.3rem;"
            prefix-icon="date"
            placeholder="请输入您的生日"
            v-model="user.birthday"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="select"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="item-form form-padding">
          <el-input type="number" v-model="user.phone" placeholder="请输入您的手机号码"></el-input>
        </el-form-item>
        <el-form-item class="item-form">
          <el-input placeholder="请输入验证码" v-model="code" class="code-input"></el-input>
          <el-button
            type="text"
            class="code-btn"
            @click="sendCode"
          >{{sendCodeText}}</el-button>
        </el-form-item>
      </el-form>
      <div class="btns">
        <div class="btn" @click="confirmLogin">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
import { setCookie, userInfo } from "../../common/storage.js";
var userinfo = userInfo();
export default {
  name: "editInfo",
  created() {
    if(userinfo.userid && userinfo.userid!=undefined){
       this.$axios.post('/zqfz/user/guardian/get-guardian-info',{},{
           headers: {
              userid: userinfo.userid,
              source: userinfo.source,
              token: userinfo.token
            }
      }).then(res =>{
        if(res.data.result){
          this.$message.error(res.data.message);
        }else{
          this.info = res.data.data;
          if(this.info && this.info!=''&&this.info.id!=0){
               this.firstHidden = false;
               this.user.indentify = res.data.data.role;
               this.user.name = res.data.data.name;
               let year =res.data.data.birth_year;
               let month = res.data.data.birth_month;
               let day=res.data.data.birth_day;
               if(month<10){
                 month = '0'+month;
               }
               if(day<10){
                 day ="0"+day;
               }
               this.user.birthday = year+"-"+month+"-"+day;
               this.user.phone = res.data.data.mobile;
          }else{
            this.$message('不存在用户信息');
          }
        }
      });
    }else{
         this.firstHidden = true;
    }
  },
  data() {
    return {
      user: {
        indentify: 2,
        name: "",
        birthday: "",
        phone: ""
      },
      code: "",
      disabled: false,
      sendCodeText: "发送验证码",
      firstHidden: true
    };
  },
  watch: {
    birthday(val) {
      this.user.birthday = val;
    },
    user(val){
      this.user = val;
    }
  },
  methods: {
    back() {
       this.$router.go(-1);
    },
    select(e) {
      this.user.birthday = e;
    },
    //发送验证码
    sendCode() {
      if(!this.disabled){
      if (!/^1[34578]\d{9}$/.test(this.user.phone)) {
        this.$message.error("请输入合法的手机号码");
        return;
      }
      this.disabled = true;
      this.sendCodeText = 59;
      this.timerId = setInterval(() => {
        this.sendCodeText--;
        if (this.sendCodeText == 0) {
          clearInterval(this.timerId);
          this.sendCodeText = "发送验证码";
          this.disabled = false;
        }
      }, 1000);
      this.$axios
        .post("/zqfz/user/guardian/send-code", { mobile: this.user.phone })
        .then(res => {
          if (res.data.result == 1025) {
            this.$message.error(res.data.message);
            return;
          }
          if (res.data.result == 400) {
            this.$message.error(res.data.message);
            return;
          }
          if (res.data.result == 0) {
            this.$message({
              message: "验证码已成功发送",
              type: "success"
            });
          }
        });
      }else{
         this.$message('不可点击');
      }
    },
    //提交登录信息
    confirmLogin() {
      if (!/^1[34578]\d{9}$/.test(this.user.phone)) {
        this.$message.error("请输入合法的手机号码");
        return;
      }
      if (this.code == "") {
        this.$message.error("验证码不能为空");
        return;
      }
      if (this.user.birthday == "") {
        this.$message.error("生日不能为空");
        return;
      }
      if (this.user.name == "") {
        this.$message.error("姓名不能为空");
        return;
      }
      this.$axios
        .post(
          "/zqfz/user/guardian/bindwx",
          {
            openid: userinfo.openid,
            name: this.user.name,
            role: this.user.indentify,
            birthday: this.user.birthday,
            mobile: this.user.phone,
            code: this.code
          },
          {
            headers: {
              userid: userinfo.userid,
              source: userinfo.source,
              token: userinfo.token
            }
          }
        )
        .then(res => {
          if (res.data.result == 400) {
            this.$message.error(res.data.message);
            return;
          }
          if (res.data.result == 0) {
            this.$message({
              message: "成功",
              type: "success"
            });
            console.log(res.data.data);
            userinfo.token = res.data.data.token;
            userinfo.userid = res.data.data.userid;
            setCookie('token',res.data.data.token);
            setCookie('userid',res.data.data.userid);
            sessionStorage.setItem('user_params', JSON.stringify(userinfo));
          }
          if(this.firstHidden){
             this.$router.push(`/addBaby`);
          }else{
              this.$router.push(`/selectBaby`);
          }
        });
    }
  }
};
</script>
<style>
#relation .radio {
    width: auto;

     border-bottom: 0;
}
.btns {
  margin: 0.8rem auto;
}
.btn {
  margin: 0 1.24rem;
  height: 1rem;
  background: linear-gradient(
    270deg,
    rgba(254, 154, 139, 1) 0%,
    rgba(253, 134, 140, 1) 72%,
    rgba(247, 140, 160, 1) 100%
  );
  box-shadow: 0 0.16rem 0.28rem 0 rgba(236, 204, 215, 0.63);
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.36rem;
  color: rgba(255, 255, 255, 1);
  line-height: 1rem;
}
.code-input {
  width: 60%;
  float: left;
  padding: 0.1rem 0;
}
.code-btn {
  width: 40%;
  float: left;
  background: linear-gradient(
    270deg,
    rgba(254, 154, 139, 1) 0%,
    rgba(253, 134, 140, 1) 72%,
    rgba(247, 140, 160, 1) 100%
  );
  border-radius: 0 0.06rem 0.06rem 0;
  color: #fff;
  font-size: 0.28rem;
  padding: 0.34rem 0;
}
.code-btn.el-button--text {
    color: #FFF;
}
#form {
  padding: 0 1.24rem;
}
#form .item-form {
  width: 100%;
  border: 0.02rem solid #fd908b;
  position: relative;
  border-radius: 0.08rem;
}
#form .form-padding {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
#form .item-form.radio-form {
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
#form .el-form-item {
  margin-bottom: 0.2rem;
  background: #fff;
}
#form .el-form-item__label {
  padding: 0 1rem 0 0;
}
.el-input__suffix {
  right: 10px;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #000;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #fd908b;
  background: #fff;
}
.el-radio__inner::after {
  width: 8px;
  height: 8px;
  background-color: #fd908b;
}
.el-radio.is-focus,
.el-radio.is-checked {
  background: #fff;
}
.el-input--prefix .el-input__inner {
  padding-left: 0;
}
.el-input--suffix .el-input__inner {
  padding-right: 0;
}
.el-input__inner {
  border: 0;
}
.el-input__suffix-inner i {
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 40px;
  font-family: element-icons !important;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
.el-input__suffix-inner i::before {
  content: "\E608";
}
</style>
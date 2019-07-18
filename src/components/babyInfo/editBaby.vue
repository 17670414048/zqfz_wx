<template>
  <div class="wrapper">
    <el-header>
      <!-- <div class="page-header"> -->
      <div class="page-top" style="margin-top:0.6rem;">
        <h4>编辑宝宝信息</h4>
        <img src="../../statics/images/back1.png" class="back-img" @click="back" />
      </div>
      <!-- </div> -->
    </el-header>
    <el-main>
      <div class="couse" style="padding:0.2rem 0 0.6rem;">
        <el-form id="form">
          <span class="form-label">性别</span>
          <el-form-item class="item-form radio-form form-padding" style="text-align:center;">
            <el-radio-group v-model="gender" style="width:100%;display:block;padding:0.24rem 0;">
              <el-radio :label="0" class="radio" style="margin-right:60px;">女</el-radio>
              <el-radio :label="1" class="radio">男</el-radio>
            </el-radio-group>
          </el-form-item>
          <span class="form-label">婴儿姓名</span>
          <el-form-item class="item-form form-padding">
            <el-input type="text" v-model="name" placeholder="请输入婴儿姓名"></el-input>
          </el-form-item>
          <span class="form-label">出生日期</span>
          <el-form-item class="item-form form-padding">
            <el-date-picker
              style="width: 100%;padding:0 0.3rem;"
              prefix-icon="date"
              placeholder="请输入出生日期"
              v-model="birthdate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy/MM/dd"
              @change="select"
            ></el-date-picker>
          </el-form-item>
          <span class="form-label">出生孕周</span>
          <div style="width:100%;display:flex;">
            <el-form-item class="item-form form-padding" style="width:48%;margin-right:2%">
              <el-input type="text" v-model="pregnantweeks" placeholder="请输入出生孕周"></el-input>
              <i>周</i>
            </el-form-item>
            <el-form-item class="item-form form-padding" style="width:48%;margin-left:2%;">
              <el-input type="text" v-model="pregnantdays" placeholder="请输入出生孕周"></el-input>
              <i>天</i>
            </el-form-item>
          </div>
          <span class="form-label">出生身高</span>
          <el-form-item class="item-form form-padding">
            <el-input type="text" v-model="birth_height" placeholder="请输入出生身高"></el-input>
            <i>CM</i>
          </el-form-item>
          <span class="form-label">出生体重</span>
          <el-form-item class="item-form form-padding">
            <el-input type="text" v-model="birth_weight" placeholder="请输入出生体重"></el-input>
            <i>G</i>
          </el-form-item>
          <span class="form-label">出生头围</span>
          <el-form-item class="item-form form-padding">
            <el-input type="text" v-model="birth_headcircle" placeholder="请输入出生头围"></el-input>
            <i>CM</i>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer>
      <div class="footer" @click="babyEdit()">
        <div class="foot-back">确认修改</div>
      </div>
    </el-footer>
  </div>
</template>
<script>
import { userInfo } from "../../common/storage.js";
let userinfo = userInfo();
export default {
  name: "editBaby",
  created() {
    this.babyId = this.$route.query.babyId;
    this.init();
  },
  data() {
    return {
      babyId: "",
      name: "",
      gender: "",
      birthdate: "",
      pregnantweeks: "",
      pregnantdays: "",
      birth_height: "",
      birth_weight: "",
      birth_headcircle: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    select(e) {
      this.bdate = e;
    },
    init() {
      this.$axios
        .post(
          "/zqfz/user/guardian/baby-detail",
          { baby_id: this.babyId },
          {
            headers: {
              userid: userinfo.userid,
              source: userinfo.source,
              token: userinfo.token
            }
          }
        )
        .then(res => {
          if (res.data.result) {
            this.$message.error(res.data.message);
          } else {
            let data = res.data.data;
            this.name = data.name;
            this.gender = data.gender;
            this.birthdate = data.birth_str;
            this.pregnantweeks = data.pregnantweeks;
            this.pregnantdays = data.pregnantdays;
            this.birth_height = data.birth_height;
            this.birth_weight = data.birth_weight;
            this.birth_headcircle = data.birth_headcircle;
          }
        });
    },
    babyEdit() {
      if (
        this.name !== "" &&
        this.gender !== "" &&
        this.birthdate !== "" &&
        this.pregnantweeks !== "" &&
        this.pregnantdays !== "" &&
        this.birth_height !== "" &&
        this.birth_weight !== "" &&
        this.birth_headcircle != ""
      ) {
        this.$axios
          .post(
            "/zqfz/user/guardian/edit-baby",
            {
              baby_id: this.babyId,
              name: this.name,
              gender: this.gender,
              birthdate: new Date(this.birthdate).getTime() / 1000,
              pregnantweeks: this.pregnantweeks,
              pregnantdays: this.pregnantdays,
              birth_height: this.birth_height,
              birth_weight: this.birth_weight,
              birth_headcircle: this.birth_headcircle
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
            if (res.data.result) {
              this.$message.error(res.data.message);
            } else {
              this.$router.push("/selectBaby");
            }
          });
      } else {
        this.$message.error("没有填写完整哦");
        return;
      }
    }
  }
};
</script>
<style scoped>
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
#form {
  padding: 0 1.24rem;
}
#form .item-form {
  width: 100%;
  border: 0.02rem solid #fd908b;
  position: relative;
  border-radius: 0.08rem;
}
.form-label {
  height: 0.34rem;
  font-size: 0.24rem;
  color: rgba(204, 204, 204, 1);
  line-height: 0.34rem;
  margin-bottom: 0.08rem;
}
#form .item-form {
  width: 100%;
  border: 0.02rem solid #fd908b;
  position: relative;
  border-radius: 0.08rem;
}
#form .item-form i {
  position: absolute;
  right: 0.3rem;
  color: #cccccc;
}
#form .form-padding {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
</style>
<style>
#form .el-form-item {
  margin-bottom: 0.15rem;
  margin-top: 0.1rem;
  background: #fff;
}
#form .el-form-item__label {
  padding: 0 1rem 0 0;
}
/* .el-input{
  flex:1;
  height:40px;
  line-height:40px;
  width: 100%;
} */
.el-main {
  flex: none;
  flex-shrink: 1;
  /* position: absolute;
    background: #fcfcfc;
    width: 100%;
    top: 80px;
    z-index: 0;
    bottom: 60px; */
}
/* .el-header{
    position: absolute;
    top: 0;
    z-index: 1;
    background: #fcfcfc;
    width: 100%;
}*/
.el-footer {
  /* position: absolute;
   bottom: 0;
    z-index: 1;
    background: #fcfcfc;
    width: 100%; */
  padding: 0;
  height: 1rem;
}
#form .el-input__suffix {
  right: 10px;
}
#form .el-radio__input.is-checked + .el-radio__label {
  color: #000;
}
#form .el-radio__input.is-checked .el-radio__inner {
  border-color: #fd908b;
  background: #fff;
}
#form .el-radio__inner::after {
  width: 8px;
  height: 8px;
  background-color: #fd908b;
}
#form .el-radio.is-focus,
#form .el-radio.is-checked {
  background: #fff;
}
#form .el-input--prefix .el-input__inner {
  padding-left: 0;
}
#form .el-input--suffix .el-input__inner {
  padding-right: 0;
}
#form .radio {
  width: auto;
  padding: 0;
  border-bottom: 0rem solid #d9d9d9;
}
#form .el-input__inner {
  border: 0;
  width: 100%;
}
#form .el-input__suffix-inner i {
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
#form .el-input__suffix-inner i::before {
  content: "\E608";
}
</style>



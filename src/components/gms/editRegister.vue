<template>
  <div class="wrapper">
    <el-header>
      <!-- <div class="page-header"> -->
      <div class="page-top" style="margin-top:0.6rem;">
        <h4>登记信息</h4>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    <!-- </div> -->
    </el-header>
    <el-main>
    <div class="couse" style="padding:0.2rem 0 0.6rem;">
      <el-form id="register">
        <span class="form-label">母亲身份证号</span>
        <el-form-item class="item-form form-padding">
          <el-input type="text" v-model="motherId" placeholder="请输入"></el-input>
        </el-form-item>
        <span class="form-label">登记号</span>
        <el-form-item class="item-form form-padding">
          <el-input type="text" v-model="registerId" placeholder="请输入" readonly class="read"></el-input>
        </el-form-item>
        <span class="form-label">宝宝姓名</span>
        <el-form-item class="item-form form-padding">
          <el-input type="text" v-model="name" placeholder="请输入婴儿姓名"></el-input>
        </el-form-item>
        <span class="form-label">出生日期</span>
        <el-form-item class="item-form form-padding">
          <el-date-picker
            style="width: 100%;padding:0 0.6rem;"
            placeholder="请输入出生日期"
            v-model="birthdate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy/MM/dd"
            @change="select1"
             class="date-picker"
          ></el-date-picker>
        </el-form-item>
        <span class="form-label">性别</span>
        <el-form-item class="item-form radio-form form-padding" style="text-align:center;">
          <el-radio-group v-model="gender" style="width:100%;display:block;padding:0.24rem 0;">
            <el-radio :label="0" class="radio" style="margin-right:60px;">女</el-radio>
            <el-radio :label="1" class="radio">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <span class="form-label">预产期</span>
        <el-form-item class="item-form form-padding">
          <el-date-picker
            style="width: 100%;padding:0 0.6rem;"
            placeholder="请输入"
            v-model="pagentDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy/MM/dd"
            @change="select2"
            class="date-picker"
          ></el-date-picker>
        </el-form-item>
        <span class="form-label">出生孕周</span>
        <div style="width:100%;display:flex;">
          <el-form-item class="item-form form-padding" style="width:48%;margin-right:2%">
            <el-input type="text" v-model="pregnantweeks" placeholder="请输入"></el-input>
            <i>周</i>
          </el-form-item>
          <el-form-item class="item-form form-padding" style="width:48%;margin-left:2%;">
            <el-input type="text" v-model="pregnantdays" placeholder="请输入"></el-input>
            <i>天</i>
          </el-form-item>
        </div>
        <span class="form-label">出生体重</span>
        <el-form-item class="item-form form-padding">
          <el-input type="text" v-model="birth_weight" placeholder="请输入出生体重"></el-input>
          <i>G</i>
        </el-form-item>
        <span class="form-label">分娩方式</span>
        <div class="box">
          <el-radio-group id="pagentstyle" class="radio-group" v-model="pagentStyle">
            <el-radio
              v-for="(item,index) in type"
              :key="index"
              :label="item"
              :value="item"
              class="radio"
            >
              <span>{{item}}</span>
            </el-radio>
          </el-radio-group>
        </div>
        <span class="form-label">联系电话</span>
        <el-form-item class="item-form form-padding">
          <el-input type="text" v-model="phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <span class="form-label">是否正在住院</span>
        <el-form-item class="item-form radio-form form-padding" style="text-align:center;">
          <el-radio-group v-model="isHospital" style="width:100%;display:block;padding:0.24rem 0;">
            <el-radio :label="1" class="radio" style="margin-right:60px;">是</el-radio>
            <el-radio :label="0" class="radio">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="isHospital">
          <span class="form-label">住院病区</span>
          <el-form-item class="item-form form-padding">
            <el-input type="text" v-model="hospitalArea" placeholder="请输入住院病区"></el-input>
          </el-form-item>
          <span class="form-label">床位号</span>
          <el-form-item class="item-form form-padding">
            <el-input type="text" v-model="hospitalNumber" placeholder="请输入床位号"></el-input>
          </el-form-item>
        </div>
        <span class="form-label">测评项目</span>
        <el-form-item class="item-form form-padding">
          <el-input type="text" v-model="program" readonly class="read"></el-input>
        </el-form-item>
        <!-- <div class="box">
          <el-radio-group id="pagentstyle" class="radio-group" v-model="program" disabled>
            <el-radio :label="1" class="radio">
              <span>GMS</span>
            </el-radio>
            <el-radio :label="2" class="radio">
              <span>AIMS</span>
            </el-radio>
            <el-radio :label="3" class="radio">
              <span>Peabody</span>
            </el-radio>
            <el-radio :label="4" class="radio">
              <span>粗大运动</span>
            </el-radio>
            <el-radio :label="5" class="radio">
              <span>康复指导</span>
            </el-radio>
          </el-radio-group>
        </div>-->
        <span class="form-label">开单医生</span>
        <el-form-item class="item-form form-padding">
          <el-input type="text" v-model="doctor" placeholder="请输入开单医生" readonly class="read"></el-input>
        </el-form-item>
        <span class="form-label">开单门诊</span>
        <el-form-item class="item-form form-padding">
          <el-input type="text" v-model="patientArea" readonly class="read"></el-input>
        </el-form-item>
        <!-- <div class="box">
          <el-radio-group id="pagentstyle" class="radio-group" v-model="patientArea" disabled>
            <el-radio :label="1" class="radio">
              <span>早产儿照护门诊</span>
            </el-radio>
            <el-radio :label="2" class="radio">
              <span>高危儿照护门诊</span>
            </el-radio>
            <el-radio :label="3" class="radio">
              <span>发育行为儿科门诊</span>
            </el-radio>
            <el-radio :label="4" class="radio">
              <span>住院部</span>
            </el-radio>
          </el-radio-group>
        </div>-->
        <span class="form-label">开单日期</span>
        <el-form-item class="item-form form-padding">
          <el-date-picker
            style="width: 100%;padding:0 0.6rem;"
            placeholder="请输入日期"
            v-model="fillDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy/MM/dd"
            @change="select3"
            readonly
             class="date-picker read"
          ></el-date-picker>
        </el-form-item>
        <span class="form-label">门诊诊断</span>
        <el-form-item class="item-form form-padding">
          <el-input type="text" v-model="diag" placeholder="请输入门诊诊断" readonly class="read"></el-input>
        </el-form-item>
        <span class="form-label">高危因素（无高危因素的情况单选，其他可多选）</span>
        <el-checkbox-group v-model="factory" class="checkbox">
          <el-checkbox-button v-for="f in factorys" :label="f" :key="f">{{f}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form>
      <div class="foot-submit" @click="submit()">提&nbsp;&nbsp;&nbsp;交</div>
      </div>
    </el-main>
  </div>
</template>
<script>
import { userInfo, unixToDate,dateToUnix } from "./../../common/storage.js";
var userinfo = userInfo();
export default {
  name: "editRegister",
  data() {
    return {
      id: "", //检查单
      motherId: "", //母亲身份证号
      registerId: "", //登记号
      name: "", //宝宝姓名
      gender: 0, //性别
      birthdate: "", //出生日期
      pagentDate: "", //预产期
      pregnantweeks: "", //出生孕周
      pregnantdays: "", //出生孕周
      birth_weight: "", //出生体重
      pagentStyle: "顺产", //分娩方式
      type: [],
      phone: "", //联系电话
      isHospital: 1, //是否正在住院
      hospitalArea: "", //住院病区
      hospitalNumber: "", //床位号
      program: 1, //测评项目
      doctor: "", //开单医生
      patientArea: 1, //开单门诊
      fillDate: "", //开单日期
      diag: "", //门诊诊断
      factorys: [], //
      factory: [] //高危因素
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getMenu();
    this.init();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    select1(e) {
      this.birthdate = e;
    },
    select2(e) {
      this.pagentDate = e;
    },
    select3(e) {
      this.fillDate = e;
    },
    getMenu() {
      this.$axios
        .post(
          "/gms/user/check/manual",
          {},
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
            this.$message(res.data.message);
          } else {
            this.type = res.data.data.delivers;
            this.factorys = res.data.data.risks;
          }
        });
    },
    init() {
      this.$axios
        .post(
          "/gms/user/check/detail",
          { id: this.id },
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
            this.$message(res.data.message);
          } else {
            this.registerId = res.data.data.registid;
            this.program = res.data.data.project;
            this.doctor = res.data.data.sheet_doctor;
            this.patientArea = res.data.data.sheet_department;
            this.fillDate = unixToDate(res.data.data.start_time);
            this.diag = res.data.data.diag;
            this.motherId = res.data.data.moidcard,
            this.name = res.data.data.baby_name,
            this.birthdate = unixToDate(res.data.data.birthdate);
            this.gender = res.data.data.gender,
            this.pagentDate = unixToDate(res.data.data.predicted_birthdate);
            this.pregnantweeks = res.data.data.pregnantweeks,
            this.pregnantdays = res.data.data.pregnantdays,
            this.birth_weight = res.data.data.birth_weight,
            this.pagentStyle = res.data.data.deliver_desc,
            this.phone = res.data.data.mobile,
            this.factory = res.data.data.risks.split(",");
          }
        });
    },
    submit() {
      if (
        this.motherId == "" ||
        this.name == "" ||
        this.birthdate == "" ||
        this.pagentDate == "" ||
        this.pregnantweeks == "" ||
        this.pregnantdays == "" ||
        this.birth_weight == "" ||
        this.phone == "" ||
        this.factory == ""
      ) {
        this.$message("信息填写不完整");
        return;
      }
      if (this.isHospital == 1) {
        if (this.hospitalArea == "" || this.hospitalNumber == "") {
          this.$message("请填写病区和床位");
          return;
        }
      }
      this.$axios
        .post(
          "/gms/user/check/regist",
          {
            sheet_id: this.id,
            moidcard: this.motherId,
            baby_name: this.name,
            birthdate: new Date(this.birthdate).getTime()/1000,
            gender: this.gender,
            predicted_birthdate: new Date(this.pagentDate).getTime()/1000,
            pregnantweeks: this.pregnantweeks,
            pregnantdays: this.pregnantdays,
            birth_weight: this.birth_weight,
            deliver_type: this.type.indexOf(this.pagentStyle),
            mobile: this.phone,
            hospitalization: this.isHospital,
            hospital_zone: this.hospitalArea,
            hospital_bed: this.hospitalNumber,
            risks: this.factory.join(',')
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
            this.$message(res.data.message);
          } else {
            this.$router.push("/gmsList");
          }
        });
    }
  }
};
</script>
<style>
#register .el-input__inner {
  border: 0;
  color: #4a4a4a;
  height: 30px;
  line-height:30px;
  margin:5px 0;
  text-align: left;
}
#register .el-form-item__content {
    line-height: 30px;
}
#register .el-radio__input.is-checked .el-radio__inner {
  border-color: #29B5AD;
  background: #fff;
}
#register .el-radio__inner::after {
  width: 8px;
  height: 8px;
  background-color: #29B5AD;
}
#register .el-radio__input.is-checked + .el-radio__label {
  color: #29B5AD;
}

.checkbox {
  margin: 0.1rem auto 0;
}
.checkbox .el-checkbox-button,
.checkbox .el-checkbox-button__inner {
  margin: 0rem 0.05rem 0.1rem 0;
}
.checkbox .el-checkbox-button__inner {
  border: 1px solid #cccccc;
  border-radius: 1rem;
  color: #4a4a4a;
  padding: 10px 12px;
  font-size: 0.28rem;
}
.checkbox
  .el-checkbox-button.is-checked:first-child
  .el-checkbox-button__inner {
  border: 1px solid #3dc4bc;
}
.checkbox .el-checkbox-button:first-child .el-checkbox-button__inner {
  border-left: 1px solid #dcdfe6;
  border-radius: 1rem;
}
.el-checkbox-button:last-child .el-checkbox-button__inner {
  border-radius: 1rem;
}
.checkbox .el-checkbox-button.is-focus .el-checkbox-button__inner {
  border-color: #cccccc;
}
.checkbox .el-checkbox-button.is-checked .el-checkbox-button__inner {
  color: #29b5ad;
  background-color: #ebf8f7;
  border-color: #3dc4bc;
  box-shadow: 0 0 0 0 #8cc5ff;
}

.checkbox .el-checkbox-button__inner:hover {
  color: #4a4a4a;
}
 .el-input--prefix .el-input__inner {
     padding-left: 0; 
}
.el-main{
   flex-shrink: 0;
}
</style>

<style scoped>
#register {
  padding: 0 1.24rem;
}
#register .item-form {
  width: 100%;
  border: 0.02rem solid #cccccc;
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

#register .item-form i {
  position: absolute;
  right: 0.3rem;
  color: #cccccc;
}
#register .form-padding {
  /* padding-top: 0.1rem;
  padding-bottom: 0.1rem; */
}
#register .el-form-item {
  margin-bottom: 0.15rem;
  margin-top: 0.1rem;
  background: #fff;
}
#register .el-form-item__label {
  padding: 0 1rem 0 0;
}
.select-leave {
  padding: 0.58rem 0.36rem;
}
.select-leave .select-head {
  height: 40.44rem;
  font-size: 0.32rem;
  color: #29B5AD;
  line-height: 0.44rem;
}
.box {
  margin-top: 0.18rem;
  margin-bottom: 0.42rem;
  border-radius: 0.16rem;
  border: 0.02rem solid rgba(217, 217, 217, 1);
  background: #fff;
}
#pagentstyle {
  width: 100%;
  padding: 0.05rem 0;
}
#pagentstyle .radio {
  width: 100%;
  padding: 0.3rem 0.4rem;
  border-bottom: 0.02rem solid #d9d9d9;
  color: #000;
  font-size: 0.32rem;
  margin-right: 0;
}
#pagentstyle .radio:last-child {
  border-bottom: 0;
}
.radio span {
  font-size: 0.28rem;
}

.foot-submit {
  margin: 1rem auto 0.4rem;
  width: 70%;
  height: 1rem;
  line-height: 1rem;
  background: #3dc4bc;
  box-shadow: 0 0.15rem 0.27rem 0 rgba(61, 196, 188, 0.15);
  border-radius: 0.48rem;
  font-size: 0.36rem;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  position: relative;
}
.read{
  opacity: 0.5;
}

</style>



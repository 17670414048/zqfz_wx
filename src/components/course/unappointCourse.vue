<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-top">
        <h4>预约亲子课</h4>
        <p>请选择适合月龄的课程</p>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    </div>
    <div class="content">
      <div class="select-leave">
        <span class="select-head">课程选择（单选）</span>
        <div class="box">
          <el-radio-group class="radio-group" v-model="course">
            <el-radio label="启蒙综合课" class="radio">
              <span>启蒙综合课（6-12个月）</span>
            </el-radio>
            <el-radio label="亲子多元课" class="radio">
              <span>亲子多元课（13-30个月）</span>
            </el-radio>
            <el-radio label="体能课" class="radio">
              <span>体能课（16-36个月））</span>
            </el-radio>
            <el-radio label="育乐课" class="radio">
              <span>育乐课（13-30个月））</span>
            </el-radio>
            <el-radio label="音乐课" class="radio">
              <span>音乐课（30-36个月）</span>
            </el-radio>
            <el-radio label="蒙氏综合课" class="radio">
              <span>蒙氏综合课（30-36个月）</span>
            </el-radio>
          </el-radio-group>
        </div>
        <span class="select-head">请填写宝宝信息</span>
        <div class="box">
          <el-input type="text" v-model="name" placeholder="请输入宝宝姓名" class="input" style="border-radius:0.16rem;"></el-input>
          <el-date-picker
            style="width: 100%;border-top:0.02rem solid #d9d9d9;"
            prefix-icon="date"
            placeholder="请输入出生年月 例如：2017-05-09"
            v-model="birthday"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="select"
          ></el-date-picker>
          <el-input
            type="number"
            v-model="phone"
            placeholder="请输入联系电话 例如：18902227893"
            class="input"
          ></el-input>
          <el-input
            type="textarea"
            v-model="desc"
            style="min-height
        2rem;padding:0.2rem 0.1rem;"
            resize="none"
            placeholder="请输入家庭住址 例如：北京市朝阳区"
          ></el-input>
        </div>
        <span class="select-head">请选择是否早产(单选）</span>
        <div class="box">
          <el-radio-group class="radio-group" v-model="isproduct">
            <el-radio :label="1" class="radio" size="medium">
              <i>是</i>
            </el-radio>
            <el-radio :label="0" class="radio" size="medium">
              <i>否</i>
            </el-radio>
          </el-radio-group>
          <div v-show="showweek" style="width:100%;display:flex;border-top: 0.02rem solid #d9d9d9;">
            <el-input
              type="number"
              v-model="week"
              placeholder="周期 如：30"
              class="input"
              style="border:0;"
            ></el-input>
            <i style="padding-top:0.34rem;padding-right:0.3rem;">周</i>
            <i style="padding-top:0.34rem;">+</i>
            <el-input
              type="number"
              v-model="day"
              placeholder="天数 如：3"
              class="input"
              style="border:0;"
            ></el-input>
            <i style="padding-top:0.34rem;padding-right:0.3rem">天</i>
          </div>
          <p class="note" v-show="showweek">如是早产请在上方输入早产孕周 例如：30周+3天</p>
        </div>
        <div class="btns">
          <div class="btn" @click="submit">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userInfo } from "../../common/storage.js";
let userinfo = userInfo();
export default {
  name: "unappointCourse",
  data() {
    return {
      course: "启蒙综合课",
      name: "",
      birthday: "",
      phone: "",
      desc: "",
      isproduct: 0,
      showweek: false,
      week: "",
      day: ""
    };
  },
  watch: {
    isproduct(val) {
      if (val == 1) {
        this.showweek = true;
      } else {
        this.showweek = false;
      }
    }
  },
  mounted() {
    // this.init();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    select(e) {
      this.birthday = e;
    },
    submit() {
      if (
        this.name == "" ||
        this.birthday == "" ||
        this.phone == "" ||
        this.desc != ""
      ) {
        this.$message.error("请填写完整");
      }
      if (this.phone != "") {
        if (!/^1[34578]\d{9}$/.test(this.phone)) {
          this.$message.error("请输入合法的手机号码");
          return;
        }
      }
      let weeks = "";
      if (this.isproduct == 1) {
        if (this.week == "" || this.day == "") {
          this.$message.error("请填写孕周");
          return false;
        }
        weeks = this.week + "周+" + this.day + "天";
      }
      this.$axios
        .post(
          "/zqfz/user/appointment/add",
          {
            course_name: this.course,
            name: this.name,
            birthdate: this.birthday,
            mobile: this.phone,
            address: this.desc,
            premature: this.isproduct,
            pregnantweeks: weeks
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
            this.$router.go(-1);
          }
        });
    }
    // init() {
    //   this.$axios
    //     .post(
    //       "/zqfz/user/guardian/current-baby",
    //       {},
    //       {
    //         headers: {
    //           userid: userinfo.userid,
    //           source: userinfo.source,
    //           token: userinfo.token
    //         }
    //       }
    //     )
    //     .then(res => {
    //       if (res.data.result) {
    //         this.$message.error(res.data.message);
    //       } else {
    //         console.log(res.data.data);
    //         if (res.data.data && res.data.data.length != 0) {
    //           this.$router.push(`/appointCourse`);
    //         }
    //       }
    //     });
    // },
  }
};
</script>
<style>
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
.el-textarea__inner {
  border: 0;
  border-radius: 1rem;
}

.note {
  border-top: 0.02rem solid #d9d9d9;
  padding: 0.34rem 0.4rem;
  font-size: 0.28rem;
  color: rgba(253, 144, 139, 1);
  line-height: 0.4rem;
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
.select-leave {
  padding: 0.58rem 0.36rem;
}
.select-leave .select-head {
  height: 40.44rem;
  font-size: 0.32rem;
  color: rgba(253, 144, 139, 1);
  line-height: 0.44rem;
}
.box {
  margin-top: 0.18rem;
  margin-bottom: 0.42rem;
  border-radius: 0.16rem;
  border: 0.02rem solid rgba(217, 217, 217, 1);
  background: #fff;
}
.text-box {
  border: 0;
}
.radio-group {
  width: 100%;
}
.box .radio {
  width: 100%;
  padding: 0.34rem 0.4rem;
  border-bottom: 0.02rem solid #d9d9d9;
  color: #000;
  font-size: 0.32rem;
  margin-right: 0;
}
.radio:last-child {
  border-bottom: 0;
}
.radio span {
  font-size: 0.32rem;
}

.box .input {
  border-bottom: 0.02rem solid #d9d9d9;
    height: 1rem;
    line-height: 1rem;
    padding: 0;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.16rem;
    border: 0;
    width: 100%;
    font-size: 0.28rem;
    color: rgba(255, 255, 255, 1);

}
.box .el-input__inner {
  padding: 0.34rem;
  height: 1rem;
  line-height: 1rem;
  border-radius: 0;
}

.el-textarea__inner::-webkit-input-placeholder,
.el-input__inner::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #fd908b;
}

.el-textarea__inner:-moz-placeholder,
.el-input__inner:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fd908b;
}

.el-textarea__inner::-moz-placeholder,
.el-input__inner::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fd908b;
}

.el-textarea__inner:-ms-input-placeholder,
.el-input__inner:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #fd908b;
}
.el-input--prefix .el-input__inner {
  padding-left: 0.34rem;
}
.box .el-input__inner,.box .el-date-editor .el-input__inner {
  border: 0;
  padding: 0.5rem 0.34rem;
  border-bottom:0.02rem solid #d9d9d9;
   border-radius: 0;
       border-top-left-radius: 0.16rem;
    border-top-right-radius: 0.16rem;
}
.box .el-date-editor .el-input__inner{

    border-radius: 0;
}
</style>



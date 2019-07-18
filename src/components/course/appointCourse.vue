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
  name: "appointCourse",
  data() {
    return {
      course: "启蒙综合课"
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
      submit() {
      this.$axios
        .post(
          "/zqfz/user/appointment/add",
          {
            course_name: this.course
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
            this.$router.push('/myBaby');
          }
        });
    }
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
.radio {
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
</style>



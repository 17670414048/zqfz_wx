<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-top">
        <h4 style="text-align:left;padding-left:0.6rem;">我的报告</h4>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    </div>
    <div class="content">
      <div class="main-card">
        <div class="info-content">
          <h5 class="f-title">深圳市宝安区妇幼保健院</h5>
          <h4 class="s-title">矫正{{info.corrected_age}}婴儿随访报告</h4>
          <div class="item">
            <p class="text">
              评估时间：{{info.time}}
              <br>姓名：{{info.baby_name}}
              <br>性别：{{info.gender}}
              <br>出生日期：{{info.birth}}
              <br>周龄：{{info.week_age}}
              <br>出生孕周：{{info.pregnantweeks}}周+{{info.pregnantdays}}天
              <br>GMS编号：{{info.code}}
            </p>
          </div>
          <div class="item">
            <h5>评估结果：{{info.result}}</h5>
            <p class="text">{{info.result_desc}}</p>
          </div>
          <div class="item">
            <h5>复诊建议：</h5>
            <p class="text">1.门诊随诊 <br/>2.下次评估日期：{{info.next}}</p>
          </div>
          <div class="item">
            <h5>早期干预建议：</h5>
            <p class="text">{{info.suggest}}</p>
          </div>
          <div class="item">
            <h5>注意事项：</h5>
            <p class="text"> 复评请到儿童心理行为康复科。请选择孩子状态良好、身体健康时前来，若当日不能来诊，请于随访日期后一周内完成随访。预约电话27863999-8407.开诊时间周一至周五上午8：00~12：00，下午2：00~5：00.</p>
          </div>
          <div class="item" style="margin-bottom:30px;">
            <img :src="info.sign_url" style="float:right;margin-right:10px;width:120px;height:auto;"/>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userInfo, unixToDate,dateToUnix } from "./../../common/storage.js";
var userinfo = userInfo();
export default {
  name: "lookInfo",
  data() {
    return {
      id:'',
      info:'',
    };
  },
  created() {
     this.id = this.$route.query.id;
    this.init();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    init(){
          this.$axios
        .post(
          "/gms/user/gms-report/detail",
          {sheet_id:this.id},
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
            var data = res.data.data;
            data['time'] = unixToDate(data.gen_time);
            data['birth'] = unixToDate(data.birthdate);
            data['next'] = unixToDate(data.next_time);
            this.info = data;
          }
        });
    }
  }
};
</script>
<style scoped>
.info-content {
  margin: 0.3rem 0.4rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.16rem;
  border: 0.02rem solid rgba(217, 217, 217, 1);
  padding: 0.4rem 0.3rem;
}
.f-title,
.s-title {
  text-align: center;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(70, 70, 70, 1);
  line-height: 0.56rem;
}
.f-title {
  font-size: 0.32rem;
}
.s-title {
  font-size: 0.4rem;
  margin: 0.1rem 0 0.3rem;
}
.t-title {
}
.text {
  font-size: 0.3rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(150, 150, 150, 1);
  line-height: 0.46rem;
}

.item {
  padding: 0.05rem 0 0.4rem;
}
.item h5 {
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(70, 70, 70, 1);
  line-height: 0.56rem;
  font-size: 0.32rem;
}
</style>



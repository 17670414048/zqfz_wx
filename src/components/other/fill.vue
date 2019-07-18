<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-top">
        <h4 style="text-align:left;padding-left:0.5rem;">我的缴费</h4>
        <p style="text-align:left;padding-left:0.5rem;">公众号平台暂时不支持在线缴费，如需购买课时， 请到门诊开单缴费，谢谢！</p>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    </div>
    <div class="content">
      <div class="main-card">
        <!-- <div class="card"> -->
          <p class="no-info">暂无数据......</p>
          <!-- <div class="card-top">
            <h5>￥168</h5>
            <p class="pay">已支付</p>
          </div>
          <p>处方单号：123·2222211111111111</p>
          <p>就诊科室：早期发展科</p>
          <p>就诊医生：马丽亚</p>
          <p>就诊时间：2019-01-02</p>
          <p>就诊指引：门诊楼四楼^儿童早期发展科</p> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "info",
  data() {
    return {};
  },
  methods:{
       back(){
          this.$router.go(-1);
      },
  }
};
</script>
<style scoped>
.main-card {
  margin-top: 0.5rem;
  padding: 0.3rem;
}
.card {
  background: rgba(255, 255, 255, 1);
  border-radius: 0.16rem;
  border: 0.02rem solid rgba(217, 217, 217, 1);
  padding: 0.3rem 0.3rem 0.2rem;
  margin: 0.2rem auto;
}
.card-top {
  margin: 0.1rem 0 0.15rem;
  display: flex;
  justify-content: space-between;
}
.card-top h5 {
  height: 0.44ren;
  font-size: 0.32rem;
  color: rgba(74, 74, 74, 1);
  line-height: 0.44rem;
}
.card-top p.pay {
  height: 0.44rem;
  font-size: 0.28rem;
  color: rgba(253, 144, 139, 1);
  line-height: 0.44rem;
}
.card p {
  font-size: 0.28rem;
  color: rgba(150, 150, 150, 1);
  line-height: 0.44rem;
  margin-bottom: 0.06rem;
}
</style>



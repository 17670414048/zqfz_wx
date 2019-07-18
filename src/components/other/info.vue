<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-top">
        <h4 style="text-align:left;padding-left:0.5rem;">通知公告</h4>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    </div>
    <div class="content">
      <div class="main-card">
        <!-- <div class="card"> -->
                 <p class="no-info">暂无通告......</p>
          <!-- <div class="card-top">
            <h5>早期发展课停课通知</h5>
            <p class="time">2019-01-02</p>
          </div>
          <p>
           {{info}}
          </p>
            <a href="javascript:;" @click="detail">查看详情</a> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "info",
  data() {
    return {
      info:
        "周四-孙老师-启蒙综合科由于上课学生太少，现取消周四的课程，如果仍有学生需要上，将会合并到周五（09:00-10:00）-麻老师-启蒙综合课。周四-孙老师-启蒙综合科",
        
    };
  },
  created() {
    // this.sInfo = this.info.slice(0, 90) + "...";
  },
  // watch: {
  //   info(val) {
  //     this.info = val;
  //   }
  // },
  methods: {
       back(){
          this.$router.go(-1);
      },
    detail(){
      this.isshow = !this.isshow;
    },
  }
};
</script>
<style scoped>
.main-card {
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
.card-top p.time {
  height: 0.44rem;
  font-size: 0.28rem;
  color: rgba(204, 204, 204, 1);
  line-height: 0.44rem;
}
.card p {
  font-size: 0.28rem;
  color: rgba(150, 150, 150, 1);
  line-height: 0.44rem;
  text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;

}
.card  a {
    font-size: 0.28rem;
    display: inline;
  color: #ff8c99;
  text-decoration-line: underline;
}
</style>



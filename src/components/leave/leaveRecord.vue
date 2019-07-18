<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-top">
        <h4 style="text-align:left;padding-left:0.5rem;">请假记录</h4>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    </div>
    <div class="content">
      <div class="cards">
        <p class="no-info" v-if="!list.length">暂无记录......</p>
        <div class="card-list" v-for="(item,index) in list" :key="index">
          <div class="card-header">
            <p>
              申请时间：{{item.time.substr(0,4)}}.{{item.time.substr(5,2)}}.{{item.time.substr(8,2)}} {{item.type_desc}}
              <span class="station" :class="item.status==1?'':'red'">{{item.status_desc}}</span>
            </p>
          </div>
          <div class="card-content">
            <h4>{{item.course_name}} <span style="font-size:14px;">(1节)</span></h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userInfo, unixToDate } from "../../common/storage.js";
let userinfo = userInfo();
export default {
  name: "leaveRecord",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    init() {
      this.$axios
        .post(
          "/zqfz/user/leave-ask/list",
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
            this.$message.error(res.data.message);
          } else {
            this.list = res.data.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i]["time"] = unixToDate(this.list[i].created_at);
            }
          }
        });
    }
  }
};
</script>
<style scoped>
.cards {
  padding: 0.36rem;
}
.card-list {
  background: rgba(255, 255, 255, 1);
  border-radius: 0.16rem;
  border: 0.02rem solid rgba(217, 217, 217, 1);
  margin-bottom: 0.2rem;
}
.card-header {
  border-bottom: 0.02rem solid #f5f5f5;
  padding: 0.24rem 0.42rem;
}
.card-header p {
  height: 0.4rem;
  font-size: 0.28rem;
  color: rgba(150, 150, 150, 1);
  line-height: 0.4rem;
}
.card-header .station {
  float: right;
  height: 0.4rem;
  font-size: 0.28rem;
  color: #969696;
  line-height: 0.4rem;
}
.card-header .red {
  color: rgba(253, 144, 139, 1);
}
.card-content {
  padding: 0.22rem 0.42rem;
}
.card-content h4 {
  height: 0.44rem;
  font-size: 0.32rem;
  color: rgba(74, 74, 74, 1);
  line-height: 0.44rem;
  margin-bottom: 0.08rem;
}
.card-content p {
  height: 0.4rem;
  font-size: 0.28rem;
  color: rgba(74, 74, 74, 1);
  line-height: 0.4rem;
}
</style>



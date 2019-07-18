<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-top">
        <h4 style="text-align:left;padding-left:0.5rem;">课时详情</h4>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    </div>
    <div class="content">
      <div class="cards">
        <div class="card-list" v-for="(item ,index) in list" :key="index">
          <div class="card-header">
            <p>
               {{item.start.substr(0,10)}} &nbsp;{{item.start.substr(11,5)}}-{{item.end.substr(11,5)}}
              <span class="station red" v-show="item.cost!=0">已扣费</span>
            </p>
          </div>
          <div class="card-content">
            <h4>{{item.course_name}}</h4>
            <p>上课老师：{{item.teacher_name}}</p>
            <p>扣费记录：{{item.cost}}</p>
            <p>备注说明：{{item.note}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userInfo ,unixToDate} from "../../common/storage.js";
let userinfo = userInfo();
export default {
  name: "courseDetail",
  data() {
    return {
      list:[],
    };
  },
  created() {
    this.init();
  },
  methods: {
       back(){
          this.$router.go(-1);
      },
      init(){
        this.$axios.post('/zqfz/user/course-time/cost-list',{},{
            headers: {
              userid: userinfo.userid,
              source: userinfo.source,
              token: userinfo.token
            }
        }).then(res => {
          if(res.data.result) {
            this.$message.error('res.data.message');
            }else{
              this.list = res.data.data.list;
              for(var i=0;i<this.list.length;i++){
                this.list[i]['start'] = unixToDate(this.list[i].start_time,true);
                     this.list[i]['end'] = unixToDate(this.list[i].end_time,true);
              }
            }
        });
      },
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

  font-size: 0.28rem;
  color: rgba(150, 150, 150, 1);
  line-height: 0.4rem;
}
.card-header .station {
  float: right;

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
  font-size: 0.32rem;
  color: rgba(74, 74, 74, 1);
  line-height: 0.44rem;
  margin-bottom: 0.04rem;
}
.card-content p {
  font-size: 0.28rem;
  color: rgba(74, 74, 74, 1);
  line-height: 0.4rem;
}
</style>



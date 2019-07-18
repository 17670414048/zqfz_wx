<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-top">
        <h4 style="text-align:left;padding-left:0.5rem;">我要请假</h4>
        <p style="text-align:left;padding-left:0.5rem;">请勾选需要请假的课程并确认</p>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
        <div class="record-right">
          <router-link to="/leaveRecord">
            <p class="leave-record">
              <img src="../../statics/images/notes.png" class="record-icon">请假记录
            </p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="content" style="margin:0.4rem 0.36rem;">
      <div class="record-lists">
        <el-checkbox-group v-model="checkList" size="medium">
          <div class="record-list" v-for="(item,index) in list" :key="index">
            <el-checkbox :label="item.id" size="medium">
              <div class="leave-content">
                <h5>
                  {{item.course_name}}
                  <span>{{item.teacher_name}}</span>
                </h5>
                <p class="time">
                  {{item.start.substr(0,10)}}
                  <span> {{item.start.substr(11,5)}}- {{item.end.substr(11,5)}}</span>
                </p>
              </div>
            </el-checkbox>
          </div>
          <!-- <div class="record-list">
            <el-checkbox label="2">
              <div class="leave-content">
                <h5>
                  蒙氏综合课
                  <span>孙老师</span>
                </h5>
                <p class="time">
                  2019.4.2.
                  <span>10：00-11：30</span>
                </p>
              </div>
            </el-checkbox>
          </div>
          <div class="record-list">
            <el-checkbox label="3">
              <div class="leave-content">
                <h5>
                  蒙氏综合课
                  <span>孙老师</span>
                </h5>
                <p class="time">
                  2019.4.2.
                  <span>10：00-11：30</span>
                </p>
              </div>
            </el-checkbox>
          </div> -->
        </el-checkbox-group>
      </div>
    </div>
    <div class="footer">
      <div class="foot-back go-leave" @click="goleave">已选择{{checkList.length}}节课 去请假</div>
    </div>
  </div>
</template>
<script>
import { userInfo ,unixToDate,dateToUnix } from "../../common/storage.js";
let userinfo = userInfo();
let date =new Date();
export default {
  name: "leaveList",
  created() {
    this.init();
  },
  data() {
    return {
      checkList: [],
      list:[],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    goleave(e) {
      let index = this.checkList.length;
      if(index>0){
        this.$router.push({path:'/selectLeave',query:{number:this.checkList}});
      }else{
        this.$message.error('请选择要请假的课程');
      }
    },
    init() {
      const start = date.getTime()/1000;
      const end = (date.getTime() + 30*24*60*60*1000)/1000;
      this.$axios
        .post(
          "/zqfz/user/course-time/list-by-time",
          {start_time:start,end_time:end},
          {
            headers: {
              userid: userinfo.userid,
              source: userinfo.source,
              token: userinfo.token
            }
          }
        )
        .then(res => {
          if(res.data.result){
            this.$message,error(res.data.message);
          }else{
            this.list = res.data.data.list;
            for(var i=0;i<this.list.length;i++){
              this.list[i]['start'] = unixToDate( this.list[i].start_time,true);
              this.list[i]['end'] = unixToDate( this.list[i].end_time,true);
            }
          }
        });
    }
  }
};
</script>
<style>
.record-right {
  position: absolute;
  top: 0;
  right: 0;
}
.page-top p.leave-record {
  height: 0.4rem;
  font-size: 0.28rem;
  color: rgba(253, 144, 139, 1);
  line-height: 0.4rem;
}
.record-icon {
  width: 0.3rem;
  height: 0.32rem;
  margin-right: 0.12rem;
  margin-top: -0.04rem;
}
/* .record-lists{
    padding: 0 0.36rem;
} */
.record-list {
  background: rgba(255, 255, 255, 1);
  border-radius: 0.16rem;
  border: 0.02rem solid rgba(217, 217, 217, 1);
  padding: 0.22rem 0.3rem;
  margin: 0 auto 0.2rem;
}
.record-list .el-checkbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.el-checkbox__label {
  flex: 1;
  width: 100%;
}
.leave-content {
  width: 100%;
}
.leave-content p.time {
  font-size: 0.28rem;
  color: rgba(204, 204, 204, 1);
  line-height: 0.4rem;
}
.leave-content p.time span {
  color: #969696;
}
.leave-content h5 {
  height: 0.44rem;
  font-size: 0.32rem;
  color: rgba(74, 74, 74, 1);
  line-height: 0.44rem;
}
.leave-content h5 span {
  font-size: 0.28rem;
  color: rgba(150, 150, 150, 1);
  line-height: 0.44rem;
  float: right;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000;
}
.el-checkbox__inner:hover {
  border-color: transparent;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #fd908b;
  border-color: #fd908b;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #fd908b;
}

.go-leave {
  font-size: 0.36rem;
  color: rgba(255, 255, 255, 1);
}
</style>



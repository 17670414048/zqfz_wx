<template>
  <div class="wrapper" v-cloak>
    <div class="page-header">
      <div class="page-top">
        <h4 style="text-align:left;padding-left:0.5rem;">我的课程</h4>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
        <div class="record-right">
          <h5>早期发展科</h5>
          <p>{{text}}{{Math.abs(classHours)}}节课</p>
        </div>
      </div>
    </div>
    <div class="slider">
      <week-slider
        @dateClick="dateClickhandler"
        todayTxtColor="#ff0000"
        :showYear="true"
        :defaultDate.sync="default_date"
      ></week-slider>
      <div class="details">
        <router-link to="/courseDetail">
          <p class="leave-record">
            <img src="../../statics/images/notes.png" class="record-icon">课时详情
          </p>
        </router-link>
      </div>
    </div>
    <div class="content" v-if="true">
      <div>
        <div class="timetable">
          <!-- 渲染时间轴 -->
          <div class="timetable-list" v-for="(item,index1) in filtersTimeTable" :key="index1">
            <div class="timetable-left">{{item}}:00</div>
            <div class="timetable-right">
              <!-- 渲染时间对应的课程 -->
              <div v-for="(course, index2) in courseListsSortOfDays" :key="index2">
                <div>
                  <div
                    class="time-course"
                    v-if="item == getCourseStartTime[index2]"
                    :class="{'back-blue': index1 === 0 || index1 === 2 || index1 === 8,'back-red': index1 === 1 || index1 === 3|| index1 === 10,'back-green': index1 === 4 || index1 === 6,'back-purple': index1 === 5|| index1 === 7,}"
                  >
                    <h5 class="h5-name">
                      {{course.course_name}}
                      <span>{{course.teacher_name}}</span>
                    </h5>
                    <p
                      class="time"
                    >{{getCourseStartTime[index2]}}：00-{{getCourseEndTime[index2]}}：30 {{course.status_desc}}</p>
                    <router-link to="/leaveList">
                    <div class="leave back-purple" v-if="(course.start_time * 1000 - 7200) > (new Date().getTime())">我要请假</div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <router-link to="/appointCourse">
        <div class="foot-back">我要约课</div>
      </router-link>
    </div>
    <!-- 如果课程为空 -->
    <!-- <div class="no-course" v-if="courseLists.length == 0">
      <img src="../../statics/images/none.png">
      <p>暂时还没有课程安排</p>
      <router-link to="/appointCourse">
        <div class="btn">立即约课</div>
      </router-link>
    </div> -->
  </div>
</template>

<script>
import moment from "moment";
import weekSlider from "./../weekSlider.vue";
import {bus} from '../../common/bus.js'
import { userInfo } from "../../common/storage.js";
export default {
  name: "myCourse",
  components: {
    "week-slider": weekSlider
  },
  data() {
    return {
      default_date: moment().format("YYYY-MM-DD"),
      courseLists: [],
      showing: false,
      classHours:0,
    };
  },
  computed: {
    text(){
      if (this.classHours<0) {
        return "欠费"
      } else {
        return "剩余"
      }
    },
    //获取课程结束的小时数
    getCourseEndTime() {
      let timeArr = this.courseListsSortOfDays.map(course => {
        let time = new Date(parseInt(course.end_time) * 1000).getHours();
        return time;
      });
      // return Array.from(new Set(timeArr));
      return timeArr;
    },
    filtersTimeTable() {
      return this.$timeTable.map(time => {
        return parseInt(time.split(":")[0]);
      });
    },
    //获取课程开始的小时数
    getCourseStartTime() {
      let timeArr = this.courseListsSortOfDays.map(course => {
        let time = new Date(parseInt(course.start_time) * 1000).getHours();
        return time;
      });

      // return Array.from(new Set(timeArr));
      return timeArr;
    },
    //将一段时间的课程按选择的天数分类，根据天数渲染不同的数据
    courseListsSortOfDays() {
      return this.courseLists.filter(course => {
        let time = moment(parseInt(course.start_time) * 1000).format(
          "YYYY-MM-DD"
        );
        return this.default_date === time;
      });
    }
  },
  filters: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    dateClickhandler(date) {
      console.log(date,'course.date')
      this.getMyCourses(date);
    },
    //页面初始化
    getMyCourses(date=this.default_date) {
      let userinfo = userInfo()
      let courseOptions = {
        method: "post",
        url: "/zqfz/user/course-time/list-by-time",
        data: {
          start_time: moment(date).startOf('day').unix(),
          end_time: moment(date).endOf('day').unix()
        },
        headers: {
          userid: userinfo.userid,
          source: userinfo.source,
          token: userinfo.token
        }
      };
      this.$axios(courseOptions).then(res => {
        if (res.data.result) {
          this.$message.error(res.data.message);
        } else if (res.data.data.list && res.data.data.list.length !== 0) {
          this.courseLists = res.data.data.list;
        }
      });
    },
  },
  created() {
    this.getMyCourses();
    this.classHours = parseInt(this.$route.params.time) 
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.no-course {
  position: fixed;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  width: 70%;
}
.no-course img {
  widows: 1.2rem;
  height: 1.22rem;
  margin-bottom: 0.18rem;
}
.no-course p {
  font-size: 0.28rem;
  color: rgba(150, 150, 150, 1);
  line-height: 0.4rem;
}
.no-course .btn {
  width: 90%;
  height: 1rem;
  background: linear-gradient(
    270deg,
    rgba(254, 154, 139, 1) 0%,
    rgba(253, 134, 140, 1) 72%,
    rgba(247, 140, 160, 1) 100%
  );
  box-shadow: 0 0.16rem 0.28rem 0 rgba(236, 204, 215, 0.63);
  border-radius: 0.5rem;
  font-size: 0.36rem;
  color: rgba(255, 255, 255, 1);
  line-height: 1rem;
  margin: 0.4rem auto 0;
}
.record-right {
  position: absolute;
  top: -0.2rem;
  right: 0;
}
.page-top h5 {
  font-size: 0.32rem;
  color: rgba(74, 74, 74, 1);
  line-height: 0.44rem;
  margin-bottom: 0.1rem;
}
.slider {
  background: #fff;
  margin-top: 0.4rem;
  position: relative;
}
.timetable {
  width: 100%;
  margin: 0.2rem auto;
}
.timetable-list {
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
}
.timetable-left {
  width: 15%;
  text-align: right;
  height: 1.2rem;
  border-right: 0.02rem solid #e8eaef;
  padding-right: 0.1rem;
  margin-top: -0.15rem;
  font-size: 0.2rem;
  color: rgba(74, 74, 74, 1);
  line-height: 0.28rem;
}

.timetable-right {
  width: 85%;
  height: 1.2rem;
  border-top: 0.02rem solid #e8eaef;
}
.time-course {
  margin-top: -0.1rem;
  margin-right: 0.3rem;
  padding: 0.1rem 0.2rem;
  position: relative;
}
.h5-name {
  font-size: 0.3rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.44rem;
}
.h5-name span {
  float: right;
  font-size: 0.24rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.34rem;
}
.time {
  font-size: 0.24rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.34rem;
}
.leave-record {
  height: 0.4rem;
  font-size: 0.3rem;
  color: rgba(253, 144, 139, 1);
  line-height: 0.4rem;
}
.record-icon {
  width: 0.3rem;
  height: 0.32rem;
  margin-right: 0.12rem;
  margin-top: -0.04rem;
}
.details {
  position: absolute;
  top: 0.5rem;
  right: 0.3rem;
}
.leave {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.02rem 0.2rem;
  font-size: 0.28rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.4rem;
}
</style>
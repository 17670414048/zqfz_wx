 

<template>
  <div class>
    <div class="calendarTraffic" name="CalendarTraffic">
      <!-- 年份/月份 流量查询-->
      <div class="monthHeader">
        <!--绑定click事件，点击按钮；重新刷新当前日期-->
        <button class="lf oprButton oprButton-bg ml5" @click="pickPre(currentYear, currentMonth)">❮</button>
        <span class="oprButton title-data">{{ nowFullYear }}/{{ nowMonth }}/{{ nowDay }}</span>
        <button class="rt oprButton oprButton-bg mr10" @click="pickNext(currentYear,currentMonth)">❯</button>
        <!-- <button class="lf oprButton oprButton-bg ml5"
@click="pickToday(currentYear,currentMonth)">今天</button>
        <button class="rt oprButton oprButton-bg mr10">流量查询</button>-->
      </div>
      <!-- 日历 -->
      <div class="calendar-list calendar-date">
        <!-- 星期 -->
        <ul class="calendar-weekadys clearfix">
          <li class="weekadys-item">Mon</li>
          <li class="weekadys-item">Tue</li>
          <li class="weekadys-item">Wed</li>
          <li class="weekadys-item">Thu</li>
          <li class="weekadys-item">Fri</li>
          <li class="weekadys-item">Sat</li>
          <li class="weekadys-item">Sun</li>
        </ul>
        <!-- 日期 -->
        <ul class="calendar-days clearfix">
          <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
          <li class="daysList" v-for="(dayobject,inedx) in days" :key="dayobject.id">
            <!--本月-->
            <!--如果不是本月 改变类名加灰色-->
            <div
              class="daysList-cont daysList-invalid"
              v-if="dayobject.day.getMonth()+1 != currentMonth"
            >
              <div class="daysList-mid">
                <p class="daysList-item">{{ dayobject.day.getDate() }}</p>
                <!-- <p class="daysList-item">{{ dayobject.parccent}}</p> -->
              </div>
            </div>
            <!-- 如果是本月 判断是不是该月第一天-->
            <div
              class="daysList-cont daysList-normal"
              :class="{active:inedx==number}"
              v-else-if="dayobject.day.getFullYear() == currentYear && //当前年份
((dayobject.day.getMonth()+1 == currentMonth &&//本月且不是系统月份
dayobject.day.getMonth() != new Date().getMonth())&&
dayobject.day.getDate() == currentDay)||
(dayobject.day.getMonth() == new Date().getMonth() &&//当前系统时间
dayobject.day.getDate() ==new Date().getDate())"
              @click="pickDays(currentYear,currentMonth,dayobject.day.getDate(),inedx)"
            >
              <div class="daysList-mid">
                <p class="daysList-item">{{ dayobject.day.getDate() }}</p>
                <!-- <p class="daysList-item">{{ dayobject.parccent}}</p> -->
              </div>
            </div>
            <!-- 如果是本月-->
            <div
              class="daysList-cont daysList-normal"
              v-else
              :class="{active:inedx==number}"
              @click="pickDays(currentYear,currentMonth,dayobject.day.getDate(),inedx)"
            >
              <div class="daysList-mid">
                <p class="daysList-item">{{ dayobject.day.getDate() }}</p>
                <!-- <p class="daysList-item">{{ dayobject.parccent}}</p> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
 

<script>
import { bus } from "../common/bus.js";
export default {
  name: "HelloWorld",
  props: ["date", "show"],
  data() {
    return {
      number: 0, //active样式索引
      currentDay: 1, //当前日
      currentMonth: 1, //当前月份
      currentYear: 1970, //当前年份
      currentWeek: 1, //前星期X
      nowFullYear: 1970, //中间显示当前年
      nowMonth: 1, //中间显示当前月
      nowDay: 1, //中间显示当前日
      days: []
    };
  },
  created() {
    //在vue初始化时调用
    this.initData(this.date);
    bus.$on("dayClick", date => {
      let time = date.split("-");
      let currentMonth = parseInt(time[1], 10);
      this.currentYear = parseInt(time[0]);
      this.currentDay = parseInt(time[2], 10);
      // if (this.currentMonth < currentMonth) {
      //   this.currentMonth = currentMonth - 1
      //   this.pickNext(this.currentYear, this.currentMonth);
      // } else if (this.currentMonth > currentMonth) {
      //   this.currentMonth = currentMonth + 1
      //   this.pickPre(this.currentYear, this.currentMonth);
      // }
      this.pickDays(
        this.currentYear,
        this.currentMonth,
        this.currentDay,
        this.currentDay + 1
      );
    });
  },
  methods: {
    parseVal(val) {
      while (val.charAt(0) == "0") val = val.substring(1, val.length);
      return val;
    },
    initData(cur) {
      let date;
      if (cur) {
        date = new Date(cur);
      } else {
        const now = new Date();
        const d = new Date(
          this.formatDate(now.getFullYear(), now.getMonth(), 1)
        );
        d.setDate(35);
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      }
      // 初始化年月日
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;

      this.nowDay = new Date().getDate();
      this.nowFullYear = date.getFullYear();
      this.nowMonth = date.getMonth() + 1;

      this.currentWeek = date.getDay(); //获取当前星期X(0-6,0代表星期天)
      if (this.currentWeek == 0) {
        this.currentWeek = 7;
      }
      const str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      this.days.length = 0;
      // 例今天是周五，放在第一行第5个位置，前面4个上个月的
      //初始化本周
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        const d = new Date(str);
        d.setDate(d.getDate() - i);
        const dayobject = {}; //用一个对象包装Date对象 以便为以后预定功能添加属性
        dayobject.day = d;
        dayobject.parccent = "100%";
        this.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
      }

      //this.nowDay-1（今天几号索引）this.currentWeek-1（当月第一天周几索引）
      //得到今天的索引值 初始化active样式
      this.number = this.nowDay + this.currentWeek - 2;

      //列表显示的天数6*7减去前星期X
      for (let i = 1; i <= 42 - this.currentWeek; i++) {
        const d = new Date(str);
        d.setDate(d.getDate() + i);
        const dayobject = {};
        dayobject.day = d;
        dayobject.parccent = "100%";
        this.days.push(dayobject);
      }
    },
    //上个月
    pickPre(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      this.nowDay = 1;
      this.number = this.currentWeek - 1; //active样式
    },
    //下个月
    pickNext(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      this.nowDay = 1;
      this.number = this.currentWeek - 1; //active样式
    },
    //今天
    pickToday(year, month) {
      const d = new Date();
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      //this.number=this.currentWeek-1;//active样式
    },
    pickYear(year, month) {
      //alert(year + "," + month);
    },
    //当前日历时间点击
    pickDays(year, month, clickCurrentDay, index) {
      const d = new Date();
      const day = clickCurrentDay;
      //active样式的更改
      this.number = index;
      // 年月日更改
      this.nowFullYear = year;
      this.nowMonth = month;
      this.nowDay = clickCurrentDay;
      this.$emit("shows", year, month, clickCurrentDay);
    },
    // 格式化日期
    formatDate(year, month, day) {
      let y = year;
      let m = month;
      if (m < 10) m = "0" + m;
      let d = day;
      if (d < 10) d = "0" + d;
      return y + "/" + m + "/" + d;
    }
  }
};
</script>
<style lang="scss" scoped>
// @import '../../../common/css/common.scss';
//定义基本长度
$line10: 10px;
$lf: left;
$rt: right;

$color-red: #fd908b;
$color-fff: #ffffff;
//按钮背景颜色
$button-bg: #314d68;
//正文颜色
$text-color: #fff;
//hover蓝色
$table-deepBlue: #0c8ceb;
$table-blue: #289cf4;
//失效颜色
$invalid-color: #2f3f53;
$item-color: #fff;
$item-invalid-color: #cccccc;
//字体居中
$text-center: center;
button {
  outline: none;
  border: none;
}
ul li {
  list-style: none;
}
.lf {
  float: $lf;
}
.rt {
  float: $rt;
}
.topWrap {
  height: $line10 * 33.5;
}
//清楚浮动
.clearfix {
  zoom: 1;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  font-size: 0;
  clear: both;
  overflow: hidden;
}
//日历表头按钮
.calendarTraffic {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    270deg,
    rgba(254, 154, 139, 1) 0%,
    rgba(253, 134, 140, 1) 72%,
    rgba(247, 140, 160, 1) 100%
  );
}
//日历表头
.monthHeader {
  height: $line10 * 6.6;
  line-height: $line10 * 6.6;
  padding-top: $line10 * 1.6;
  padding-bottom: $line10 * 1.6;
  display: flex;
  justify-content: space-between;
  //按钮样式
  .oprButton {
    height: $line10 * 2.5;
    padding: 0 $line10;
    border-radius: $line10/2;
    color: $color-fff;
    line-height: $line10 * 2.5;
    cursor: pointer;
  }
  .oprButton-bg {
    background-color: $button-bg;
  }
  .title-data {
    text-align: $text-center;
    width: 100%;
    font-size: 24px;
  }
  .ml5 {
    margin-left: $line10 * 2;
  }
  .mr10 {
    margin-right: $line10 * 2;
  }
}

//日历
.calendar-list {
  color: $text-color;

  //日历星期头
  .calendar-weekadys {
    // width: 100%;
    margin-bottom: $line10;
    margin-left: $line10;
    margin-right: $line10;
  }
  .calendar-weekadys .weekadys-item {
    height: $line10 * 2.4;
    line-height: $line10 * 2.4;
  }
  .calendar-weekadys .weekadys-item,
  .calendar-days .daysList {
    width: 14%;
    float: $lf;
    text-align: $text-center;
    color: $text-color;
    margin-right: $line10 * 0.1;
    padding: $line10/2 $line10;
  }
  .calendar-days {
    margin-left: $line10;
    margin-right: $line10;
  }
  .calendar-days .daysList {
    cursor: pointer;
    height: $line10 * 4.5;
    color: $item-color;
    .daysList-cont {
      width: 100%;
      float: $lf;
    }
  }
  .calendar-days .daysList-normal .daysList-item:nth-child(2n) {
    color: $item-color;
  }
  .calendar-days .daysList-normal .daysList-item:nth-child(2n + 1) {
    color: $item-color;
  }
  .calendar-days .daysList-mid {
    height: $line10 * 3.4;
    line-height: $line10 * 3.4;
  }
  .calendar-days .daysList-cont.daysList-normal:hover,
  .daysList-normal.active {
    border-radius: $line10;
    background-color: $color-fff;
  }
  .calendar-days .daysList-cont.daysList-normal:hover .daysList-mid,
  .daysList-normal.active .daysList-mid {
    background-color: $color-fff;
    color: $color-red;
    border-radius: $line10 * 2;
  }
  .calendar-days .daysList-cont.daysList-normal:hover p,
  .daysList-normal.active p {
    color: $color-red !important;
  }
  .daysList-item {
    height: $line10 * 1.6;
  }
  // 上个月或者下个月
  .daysList-invalid {
    // background-color: $invalid-color;
    border-radius: $line10/2;
  }
  .daysList-invalid .daysList-item {
    color: $item-invalid-color;
  }
}
</style>
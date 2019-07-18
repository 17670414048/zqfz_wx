<template>
  <div>
    <div class="year_str" v-if="showYear">{{yearMonthStr}}</div>
    <span class="showCalendar"></span>
    <!-- <calendar
      :date="ymd"
      :show="show"
      v-show="show"
      style="position:absolute;top:0;z-index:1"
      @shows="shows"
    ></calendar>-->
    <el-date-picker class="picker" v-model="value1" type="date" placeholder="选择日期" :editable="false"></el-date-picker>
    <div class="week-slider">
      <div
        class="sliders"
        ref="sliders"
        @touchstart="touchstartHandle"
        @touchmove="touchmoveHandle"
        @touchend="touchendHandle"
      >
        <div v-for="(item, index) in dates" :key="index">
          <div
            class="slider"
            :style="getTransform(index)"
            @webkit-transition-end="onTransitionEnd(index)"
            @transitionend="onTransitionEnd(index)"
          >
            <div class="day" v-for="(day,dayIndex) in getDaies(item.date)" :key="dayIndex">
              <div
                @click.stop="dayClickHandle(day.date)"
                :style="buildDateStyle(day.isToday, day.isDay)"
              >
                {{day.week}}
                <br>
                <i>{{day.date.split('-')[2]}}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// import calendar from "./calendar.vue";
import { bus } from "../common/bus.js";
export default {
  name: "weekSlider",
  // components: {
  //   calendar: calendar
  // },
  props: {
    defaultDate: {
      type: String,
      default: moment().format("YYYY-MM-DD")
    },
    showYear: {
      type: Boolean,
      default: false
    },
    activeBgColor: {
      type: String,
      default: "#F78CA0"
    },
    todayBgColor: {
      type: String
    },
    activeTxtColor: {
      type: String,
      default: "rgba(255, 255, 255, 1)"
    },
    todayTxtColor: {
      type: String
    },
    lang: {
      type: String,
      default: "en"
    }
  },
  data() {
    return {
      value1: "",
      show: false,
      dates: [],
      direction: null,
      activeIndex: 1,
      isAnimation: false,
      yearMonthStr: "",
      ymd: "",
      start: {
        x: null,
        y: null
      },
      end: {
        x: null,
        y: null
      },
      distan: {
        x: 0,
        y: 0
      },
      sliderWidth: 0,
      weekLanguages: {
        ch: ["日", "一", "二", "三", "四", "五", "六"],
        en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      }
    };
  },
  watch: {
    dates: {
      handler: function(newVal, oldVal) {
        this.yearMonthStr = moment(newVal[1].date).format("YYYY年MM月");
        this.ymd = moment(newVal[1].date).format("YYYY/MM/DD");
      },
      deep: true
    },
    ymd(newVal, oldVal) {
      this.ymd = newVal;
    },
    //与elementui calendar 建立数据通信
    value1: function(newVal, oldVal) {
      let date = moment(newVal).format("YYYY-MM-DD");
      this.$emit("dateClick", date);
      this.$emit("update:defaultDate", date);
      this.dates = [
        {
          date: moment(date)
            .subtract(7, "d")
            .format("YYYY-MM-DD")
        },
        {
          date: date
        },
        {
          date: moment(date)
            .add(7, "d")
            .format("YYYY-MM-DD")
        }
      ];


      // this.$emit("touchmove")
      // this.$emit("transitionend")
    }
  },
  computed: {
    todayStyle: function() {
      let vm = this;
      return {
        color: vm.todayTxtColor ? vm.todayTxtColor : ""
      };
    }
  },
  mounted() {
    this.sliderWidth = this.$refs.sliders.offsetWidth;
  },
  created() {
    let vm = this;
    this.dates.push(
      {
        date: moment(vm.defaultDate)
          .subtract(7, "d")
          .format("YYYY-MM-DD")
      },
      {
        date: vm.defaultDate
      },
      {
        date: moment(vm.defaultDate)
          .add(7, "d")
          .format("YYYY-MM-DD")
      }
    );
  },
  methods: {
    // shows(year, month, day) {
    //   console.log(year + "--" + month + "--" + day);
    //   this.yearMonthStr = `${year}年0${month}月`;
    //   this.show = false;
    // },
    /**
     *获取制定日期的当前周的日期数据
     */
    getDaies(date) {
      let vm = this,
        arr = [];
      let weekOfDate = Number(moment(date).format("E"));
      let weeks = vm.weekLanguages[vm.lang];
      let today = moment();
      let defaultDay = moment(vm.defaultDate);
      if (weekOfDate === 7) {
        weekOfDate = 0;
      }
      for (var i = 0; i < 7; i++) {
        let _theDate = moment(date).subtract(weekOfDate - i, "d");
        arr.push({
          date: _theDate.format("YYYY-MM-DD"),
          week: weeks[i],
          isToday: _theDate.format("YYYY-MM-DD") === today.format("YYYY-MM-DD"),
          isDay: _theDate.format("DD") === defaultDay.format("DD")
        });
      }
      return arr;
    },
    /**
     *根据索引计算出样式
     */
    getTransform(index) {
      let vm = this;
      let style = {};
      if (index === vm.activeIndex) {
        style["transform"] = "translateX(" + vm.distan.x + "px)";
      }
      if (index < vm.activeIndex) {
        style["transform"] = "translateX(-100%)";
      }
      if (index > vm.activeIndex) {
        style["transform"] = "translateX(100%)";
      }
      style["transition"] = vm.isAnimation ? "transform .5s ease-out" : "none";
      return style;
    },
    /**
     * touchstart handle
     */
    touchstartHandle(event) {
      let vm = this,
        touch = event.touches[0];
      vm.start.x = touch.pageX;
      vm.start.y = touch.pageY;
    },
    /**
     * touchmove handle
     */
    touchmoveHandle(event) {
      let vm = this,
        touch = event.touches[0];
      vm.isAnimation = true;
      vm.end.x = touch.pageX;
      vm.end.y = touch.pageY;
      vm.distan.x = vm.end.x - vm.start.x;
      vm.distan.y = vm.end.y - vm.start.y;
      let dom =
        vm.distan.x < 0
          ? this.$refs.sliders.children[2]
          : this.$refs.sliders.children[0];
      if (vm.distan.x < 0) {
        dom.style["transform"] =
          "translateX(" + (vm.sliderWidth + vm.distan.x) + "px)";
      } else {
        dom.style["transform"] =
          "translateX(" + (-vm.sliderWidth + vm.distan.x) + "px)";
      }
    },
    /**
     * touchend handle
     */
    touchendHandle(event) {
      let vm = this,
        touch = event.changedTouches[0];
      vm.isAnimation = true;
      vm.end.x = touch.pageX;
      vm.end.y = touch.pageY;
      vm.distan.x = vm.end.x - vm.start.x;
      vm.distan.y = vm.end.y - vm.start.y;
      vm.getTouchDirection(vm.distan.x, vm.distan.y);
      if (vm.direction === "left") {
        vm.activeIndex = 2;
      } else if (vm.direction === "right") {
        vm.activeIndex = 0;
      } else {
        for (var i = 0; i < this.$refs.sliders.children.length; i++) {
          this.$refs.sliders.children[i].style["transform"] =
            "translateX(" + (i * 100 - 100) + "%)";
        }
      }
      vm.distan.x = 0;
      vm.distan.y = 0;
      vm.direction = null;
    },
    onTransitionEnd(index) {
      let vm = this;
      vm.isAnimation = false;
      if (index === 1 && this.activeIndex === 2) {
        vm.dates.push({
          date: moment(vm.dates[vm.activeIndex].date)
            .add(7, "d")
            .format("YYYY-MM-DD")
        });
        vm.dates.shift();
        vm.activeIndex = 1;
      } else if (index === 1 && this.activeIndex === 0) {
        vm.dates.unshift({
          date: moment(vm.dates[vm.activeIndex].date)
            .subtract(7, "d")
            .format("YYYY-MM-DD")
        });
        vm.dates.pop();
        vm.activeIndex = 1;
      }
    },
    /**
     * getAngle 计算角度
     */
    getAngle(x, y) {
      return (Math.atan2(y, x) * 180) / Math.PI;
    },
    /**
     * getTouchDirection 获取滑动方向
     */
    getTouchDirection(x, y) {
      let vm = this;
      if (Math.abs(x) > 20) {
        let angle = vm.getAngle(x, y);
        if (angle >= -45 && angle <= 45) {
          //向右
          vm.direction = "right";
        } else if (
          (angle >= 135 && angle <= 180) ||
          (angle >= -180 && angle < -135)
        ) {
          //向左
          vm.direction = "left";
        }
      }
    },
    dayClickHandle(date) {
      this.$emit("dateClick", date);
      this.$emit("update:defaultDate", date);
      this.value1 = new Date(date);
    },
    /**
     *生成日期样式
     */
    buildDateStyle(isToday, isActive) {
      let vm = this;
      let res = {};
      if (isToday) {
        res.color = vm.todayTxtColor || "";
        res.backgroundColor = vm.todayBgColor || "";
      }
      if (isActive) {
        res.color = vm.activeTxtColor || "";
        res.backgroundColor = vm.activeBgColor || "";
      }
      return res;
    }
  }
};
</script>
<style lang="less">
@background: linear-gradient(
  270deg,
  rgba(254, 154, 139, 1) 0%,
  rgba(253, 134, 140, 1) 72%,
  rgba(247, 140, 160, 1) 100%
);
.el-picker-panel__content {
  margin: 0.3rem auto;
}
.el-date-editor {
  -webkit-tap-highlight-color:transparent;
}
.el-date-picker {
  width: 100%;
  -webkit-tap-highlight-color:transparent;
}
.el-picker-panel {
  color: white;
  background: @background;
  top: 2.4rem !important;
  -webkit-tap-highlight-color:transparent;
}
.el-date-picker .el-picker-panel__content {
  width: 90%;
}
.el-date-table {
  font-size: 0.32rem;
}
.el-date-picker__header-label {
  color: white;
}
.el-date-table th {
  color: white;
  border-bottom: none;
}
.el-date-table td.today span {
  border: 1px solid white;
  line-height: 0.64rem;
  font-weight: 700;
  color: white;
  // position: relative;
}
.el-date-table td div{
  height: 34px;
} 
.el-date-table td.today span::after {
  content: ""; 
  display: block;
  width: 6px;
  height: 6px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  bottom: -9px;
  transform: translateX(-50%);
  border-radius: 50%;
}
.el-icon-d-arrow-left:before,.el-icon-d-arrow-right:before {
    display: none;
}
.el-date-table td span {
    width: 0.64rem;
    height: 0.64rem;
    line-height: 0.64rem;
    border-radius: 0.12rem;
}
.el-date-table td.current:not(.disabled) span {
  color: rgba(253, 134, 140, 1);
  background-color: white;
}
.el-date-table td.current:not(.disabled) span::after {
    content: ""; 
  display: block;
  width: 6px;
  height: 6px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  bottom: -9px;
  transform: translateX(-50%);
  border-radius: 50%;
}
.el-picker-panel__icon-btn {
  color: white;
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(253, 134, 140, 1);
}
.el-date-editor.picker.el-input,
.el-date-editor.picker.el-input__inner {
  width: 4rem;
  position: absolute;
  left: 0.1rem;
  top: 0.4rem;
  z-index: 9999;
  opacity: 0;
  height: 0.7rem;
}
</style>

<style lang="less" scoped>
// .el-date-editor.el-input, .el-date-editor.el-input__inner {
//     width: 0;
//     visibility: hidden;
// }
.year_str {
  height: 60px;
  text-align: left;
  padding: 15px 10px 10px;
  font-size: 24px;
  color: rgba(253, 144, 139, 1);
  line-height: 40px;
}
// .year_str:after {
//   content: "";
//   position: absolute;
//   top: 29px;
//   margin-left: 10px;
//   width: 16px;
//   height: 12px;
//   background: url(./../statics/images/down.png);
// }
.showCalendar {
  position: absolute;
  top: 29px;
  left: 140px;
  margin-left: 10px;
  width: 16px;
  height: 12px;
  background: url(./../statics/images/down.png);
}
.week-slider {
  height: 90px;
  overflow: hidden;
  padding: 10px 0 20px;
  margin: 0 10px;
  .sliders {
    position: relative;
    .slider {
      height: 80px;
      width: 100%;
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      .day {
        flex: 1;
        margin: 0 2px;
        div {
          padding: 4px 0;
          margin: auto;
          text-align: center;
          line-height: 20px;
          font-size: 12px;
          border-radius: 8px;
          color: #fd908b;
          border: 2px solid #fd908b;
          &.sameDay {
            background-color: #999;
            color: #fff;
          }
          i {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
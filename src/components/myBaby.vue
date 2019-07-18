<template>
  <div id="content" v-if="info!=null">
    <div class="redback"></div>
    <div class="info">
      <div class="info-top">
        <div class="info-f">
          <p class="jiance">监测中</p>
          <router-link to="/selectBaby">
            <img src="../statics/images/edit.png" class="edit">
          </router-link>
        </div>
        <h3 class="baby-name">
          {{info.name}}
          <img
            :src="info.gender==1?require('../statics/images/boy.png'):require('../statics/images/girl.png')"
            class="sex"
          >
        </h3>
        <div class="detail-info">
          <div>
            <p>
              出生日期：
              <span>{{info.birth_str.substr(0,4)}}.{{info.birth_str.substr(5,2)}}.{{info.birth_str.substr(8,2)}}</span>
            </p>
            <p>
              年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 龄：
              <span>{{info.age}}</span>
            </p>
          </div>
          <div v-if="info.premature">
            <p>
              出生孕周：
              <span>{{info.pregnantweeks}}周+{{info.pregnantdays}}</span>
            </p>
            <p>
              矫正年龄：
              <i>{{info.corrected_age}}</i>
            </p>
          </div>
        </div>
        <div class="detail-list">
          <div class="detail">
            <p>出生身高</p>
            <h4>{{info.birth_height}}CM</h4>
          </div>
          <div class="detail">
            <p>出生体重</p>
            <h4>{{info.birth_weight}}G</h4>
          </div>
          <div class="detail">
            <p>出生头围</p>
            <h4>{{info.birth_headcircle}}CM</h4>
          </div>
        </div>
      </div>
      <p class="info-title">科学育儿</p>
      <!-- <el-scrollbar style="height:100%;"> -->
        <div class="info-menu">
          <div class="menu-one">
            <router-link :to="`/myCourse/${info.time}`">
              <img src="../statics/images/mycourse.png" class="menu-img">
              <p>我的课程</p>
            </router-link>
          </div>
          <div class="menu-one">
            <router-link to="/leaveList">
              <img src="../statics/images/myleave.png" class="menu-img">
              <p>我要请假</p>
            </router-link>
          </div>
          <!-- <div class="menu-one">
            <router-link to="/fill">
              <img src="../statics/images/myjiaofei.png" class="menu-img">
              <p>我的缴费</p>
            </router-link>
          </div> -->
          <div class="menu-one">
            <router-link to="/info">
              <img src="../statics/images/myinfo.png" class="menu-img">
              <p>我的消息</p>
            </router-link>
          </div>
          <div class="menu-one">
            <router-link to="/appointCourse">
              <img src="../statics/images/myclass.png" class="menu-img">
              <p>我要约课</p>
            </router-link>
          </div>
        </div>
      <!-- </el-scrollbar> -->
      
      <p class="info-title">发育行为儿科</p>
      <div class="info-menu">
        <div class="menu-one" @click="goGms">
            <img src="../statics/images/gmsPingu.png" class="menu-img">
            <p>GMS评估</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfo } from "../common/storage.js";
export default {
  name: "myBaby",
  // created:function(){
  //   this.init();
  // },
  data() {
    return {
      info: null,
      isPremature:false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    goGms(){
         this.$router.push('/gmsList?id='+this.info.id);
    },
    init() {
      var userinfo = userInfo();
      console.log(userinfo.userid);
      this.$axios
        .post(
          "/zqfz/user/guardian/current-baby",
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
            //         if(res.data.result == '20009'){
            //  window.location.href = 'http://xinshengerke.hbb.net:8080/frontent/wx/auth?origin='+encodeURIComponent(window.location.href);
            //         }else{
            this.$message.error(res.data.message);
            // }
          } else {
            if (res.data.data && res.data.data.id != 0) {
              this.info = res.data.data;
            } else {
              this.$message('宝宝不存在请重新添加');
              this.$router.push(`/addBaby`);
            }
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
  white-space: nowrap;
}
</style>

<style scoped>
@import "./../statics/css/infoCard.css";
.redback {
  width: 100%;
  height: 3.16rem;
  background: linear-gradient(
    270deg,
    rgba(254, 154, 139, 1) 0%,
    rgba(253, 134, 140, 1) 72%,
    rgba(247, 140, 160, 1) 100%
  );
}
.info {
  position: absolute;
  top: 0;
  width: 100%;
  padding: 0.52rem 0.36rem;
}

.info-title {
  height: 0.44rem;
  font-size: 0.32rem;
  color: #cccccc;
  line-height: 0.44rem;
  margin: 0.5rem 0.3rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}
.info-menu {
  margin: 0 0.18rem;

}
.menu-one{
  text-align: center;
  margin-bottom: 0.2rem;
  display: inline-block;
  margin: 0 0 0.2rem 1.33%;
  width: 24%;
}
.info-menu .menu-one:first-child{
  margin-left: 0rem;
}
.info-menu .menu-one:last-child{
  margin-right: 0rem;
}

.menu-img {
  width: 0.66rem;
  height: 0.68rem;
  margin-bottom: 0.1rem;
}
.menu-right {
  margin-right: 0;
}
.menu-one p {
  height: 0.44rem;
  font-size: 0.32rem;
  color: #969696;
  line-height: 0.44rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}
</style>

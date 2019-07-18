<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-top">
        <img :src="info.headimgurl" class="touxiang">
        <router-link to="/editInfo">
          <h4>
           {{info.name}}
            <img src="../../statics/images/settings.png" class="setting">
          </h4>
        </router-link>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    </div>
    <div class="content">
      <div class="card" id="card">
        <div v-for="(item,index) in list" :key="index" class="info-top" :class="item.is_active==1?'border-back':''">
          <div class="info-f">
            <p class="jiance" v-if="item.is_active==1">监测中</p>
            <p v-else></p>
            <img src="../../statics/images/write.png" class="edit" @click="gowrite(item.id)">
          </div>
          <h3 class="baby-name">
            {{item.name}}
            <img :src="item.gender==1?require('../../statics/images/boy.png'):require('../../statics/images/girl.png')" class="sex">
          </h3>
          <div class="detail-info"  @click="change(item.id)">
            <div>
              <p>
                出生日期：
                <span>{{item.birth_str.substr(0,4)}}.{{item.birth_str.substr(5,2)}}.{{item.birth_str.substr(8,2)}}</span>
              </p><p>
                年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 龄：
                <span>{{item.age}}</span>
              </p>
             
            </div>
            <div v-if="item.premature">
               <p>
                出生孕周：
                <span>{{item.pregnantweeks}}周+{{item.pregnantdays}}</span>
              </p>
              <p>
                矫正年龄：
                <i>{{item.corrected_age}}</i>
              </p>
            </div>
          </div>
          <div class="detail-list" @click="change(item.id)">
            <div class="detail">
              <p>出生身高</p>
              <h4>{{item.birth_height}}CM</h4>
            </div>
            <div class="detail">
              <p>出生体重</p>
              <h4>{{item.birth_weight}}G</h4>
            </div>
            <div class="detail">
              <p>出生头围</p>
              <h4>{{item.birth_headcircle}}CM</h4>
            </div>
          </div>
        </div>
   
      </div>
    </div>
    <div class="footer">
      <router-link to="/addBaby">
        <div class="foot-back">
          <img src="../../statics/images/add1.png" class="add-img">添加宝宝
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { userInfo } from "../../common/storage.js";
     var userinfo = userInfo();
export default {
  name: "editBaby",
  created() {
    this.init();
  },
  data() {
    return {
      list:[],
      info:'',
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    gowrite(id) {
      this.$router.push(`/editBaby?babyId=${id}`);
    },
    init() {
      this.$axios.post('/zqfz/user/guardian/get-guardian-info',{},{
           headers: {
              userid: userinfo.userid,
              source: userinfo.source,
              token: userinfo.token
            }
      }).then(res =>{
        if(res.data.result){
          this.$message.error(res.data.message);
        }else{
          this.info = res.data.data;
        }
      });
      this.$axios
        .post(
          "/zqfz/user/guardian/baby-list",
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
          if(res.data.result){
            this.$message.error(res.data.message);
          }else{
            if(res.data.data.length){
                this.list = res.data.data;
            }else{
                   this.$router.push('/addBaby');
            }
          }
        });
    },
    change(id){
  this.$axios
        .post(
          "/zqfz/user/guardian/switch-baby",
          {baby_id:id},
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
            this.$message.error(res.data.message);
          }else{
            this.$router.push('/myBaby');
          }
        });
    },
  }
};
</script>
<style scoped>
@import "./../../statics/css/infoCard.css";
.touxiang {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100%;
  margin-bottom: 0.1rem;
}
.setting {
  width: 0.34rem;
  height: 0.36rem;
  position: absolute;
  top: 0.1rem;
  margin-left: 0.1rem;
}
.card {
  margin: 0.4rem 0.36rem;
}
.border-back {
  box-shadow: 0 0.1rem 0.2rem 0 rgba(0, 0, 0, 0.08);
  border: 0.02rem solid rgba(255, 182, 188, 1);
}

.add-img {
  width: 0.44rem;
  height: 0.46rem;
  display: inline-block;
  margin-right: 0.2rem;
  margin-top: -0.1rem;
}
</style>



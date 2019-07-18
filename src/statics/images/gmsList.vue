<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-top">
        <ul class="top-tab">
          <li :class="nav==0?'active':''" @click="tab(0)">进行中（{{list.length}}）</li>
          <li :class="nav==1?'active':''" @click="tab(1)">已完成（{{list2.length}}）</li>
        </ul>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    </div>
    <div class="content">
      <div class="main-card">
        <p v-if="nav==0 && !list.length" style="margin-top:0.4rem;" class="no-info">暂无列表信息。。。</p>
        <p v-if="nav==1 &&  !list2.length" style="margin-top:0.4rem;" class="no-info">暂无列表信息。。。</p>
        <div id="first" class="lists" v-if="nav==0">
          <div class="list" v-for="(item,index) in list" :key="index">
            <div class="list-content">
              <h4>{{item.start}}</h4>
              <p>开单医生：{{item.sheet_doctor}}</p>
              <p>宝宝姓名：{{item.baby_name}}</p>
              <p>出生日期：{{item.birthday}}</p>
              <p>矫正{{item.week_age}}</p>
              <div class="notice" v-if="item.lifecircle==5">审核未通过，请重新上传</div>
            </div>
            <div class="list-btns" v-if="item.visit_flag==0">
              <div class="btnf text-blue" @click="menzhen(item.sheet_id)">门诊报到</div>
            </div>
            <div class="list-btns" v-else-if="item.attention.length!=0">
              <div class="btnf">
                <P>{{item.attention}}</P>
              </div>
            </div>
            <div class="list-btns">
              <div class="btnf text-gray" v-if="item.lifecircle==2">已申请院内拍摄</div>
              <div
                class="btnf"
                v-if="item.lifecircle==3 || item.lifecircle==4 || item.lifecircle==5"
                @click="dialog=true"
              >拍摄标准</div>
              <div
                class="btnf"
                v-if="item.lifecircle==3 || item.lifecircle==5"
                @click="goHospital(item.sheet_id)"
              >申请院内拍摄</div>
              <div
                class="btnf text-blue"
                v-if="item.lifecircle==3 || item.lifecircle==5"
                @click="upload(item.sheet_id)"
              >
                <input
                  type="file"
                  style="display:none;"
                  id="video"
                  accept="video/*"
                  capture="camcorder"
                >去上传
              </div>
              <div
                class="btnf text-gray"
                v-if="item.lifecircle==4"
                style="width:12rem;margin: 0 0.3rem;"
              >已上传，请等待审核…</div>
            </div>
          </div>
          <!-- <div class="list">
            <div class="list-content">
           <h4></h4>
              <p>开单医生：</p>
              <p>宝宝姓名：</p>
              <p>出生日期：</p>
              <p>矫正</p>
           
            </div>
            <div class="list-btns">
                <div class="btnf text-blue" @click="menzhen(21)">门诊报到</div>
            </div>
           
          </div>-->
        </div>
        <div id="first" class="lists" v-if="nav==1">
          <div class="list" v-for="(item,index) in list2" :key="index">
            <div class="list-content">
              <h4>{{item.start}}</h4>
              <p>开单医生：{{item.sheet_doctor}}</p>
              <p>宝宝姓名：{{item.baby_name}}</p>
              <p>出生日期：{{item.birthday}}</p>
              <p>矫正{{item.week_age}}</p>
            </div>
            <div class="list-btns">
              <div class="btnf" v-if="item.lifecircle==6" @click="lookReadInfo(item.sheet_id)">报告解读</div>
              <div
                class="btnf text-blue"
                v-if="item.lifecircle==6"
                @click="lookInfo(item.sheet_id)"
              >查看报告</div>
            </div>
          </div>
          <!-- <div class="list">
            <div class="list-content">
              <h4></h4>
              <p>开单医生：</p>
              <p>宝宝姓名：</p>
              <p>出生日期：</p>
              <p>矫正</p>
            </div>
            <div class="list-btns">
              <div class="btnf"  @click="lookReadInfo()">报告解读</div>
              <div class="btnf text-blue"  @click="lookInfo(21)">查看报告</div>
            </div>
          </div>-->
        </div>
      </div>
    </div>
    <el-dialog
      title="GMs评估视频录制要求"
      :visible.sync="dialog"
      width="96%"
      height="60%"
      top="20%"
      class="standard"
      custom-class="dialogClass"
    >
      <standard></standard>
    </el-dialog>
  </div>
</template>
<script>
import standard from "./standard";
import "../../statics/js/cos-js-sdk-v5.min.js";
import { userInfo, unixToDate } from "./../../common/storage.js";
export default {
  name: "gmsInfo",
  data() {
    return {
      nav: 0,
      cos: null, // 腾讯云sdk cos对象的实例
      uploadId: "", //上传视频的id
      babyId: 0,
      list: [],
      list2: [],
      dialog: false,
      showModal:false,
    };
  },
  components: {
    standard: standard
  },
  created() {
    this.babyId = this.$route.query.id;
    this.init(0);
    this.init(1);
  },
  watch: {
    nav(val) {
      this.nav = val;
      this.init(this.nav);
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    tab(index) {
      this.nav = index;
    },
    menzhen(id) {
      this.$router.push("/editRegister?id=" + id);
    },
    //转院内
    goHospital(id) {
      this.$axios
        .post(
          "/gms/user/check/to-hospital",
          { id: id },
          {
            headers: {
              userid: userInfo().userid,
              source: userInfo().source,
              token: userInfo().token
            }
          }
        )
        .then(res => {
          if (res.data.result) {
            this.$message(res.data.message);
          } else {
            this.init(0);
          }
        });
    },
    //查看报告解读
    lookReadInfo() {
      confirm("正在完善中。。。");
    },
    //查看报告
    lookInfo(id) {
      this.$router.push("/lookInfo?id=" + id);
    },
    init(status) {
      this.$axios
        .post(
          "/gms/user/check/list",
          { status: status },
          {
            headers: {
              userid: userInfo().userid,
              source: userInfo().source,
              token: userInfo().token
            }
          }
        )
        .then(res => {
          if (res.data.result) {
            this.$message(res.data.message);
          } else {
            for (var i = 0; i < res.data.data.list.length; i++) {
              res.data.data.list[i]["start"] = unixToDate(
                res.data.data.list[i].start_time,
                false,
                "/"
              );
              res.data.data.list[i]["birthday"] = unixToDate(
                res.data.data.list[i].birthdate,
                false,
                "/"
              );
            }
            if (status == 0) {
              this.list = res.data.data.list;
            }
            if (status == 1) {
              this.list2 = res.data.data.list;
            }
          }
        });
    },
    upload(id) {
      var self = this;
      document.getElementById("video").click();
      // 监听上传文件
      document.getElementById("video").onchange = function(e) {
        var file = document.getElementById("video").files[0];
        if (!file) {
          confirm("未选择上传文件");
          return;
        }
        self.$axios
          .post(
            "/gms/user/gms-report/get-sts",
            { sheet_id: id },
            {
              headers: {
                userid: userInfo().userid,
                source: userInfo().source,
                token: userInfo().token
              }
            }
          )
          .then(res => {
            if (res.data.result) {
              self.message(res.data.message);
            } else {
              var result = res.data.data;
              // 获取临时密匙
              self.cos = new COS({
                getAuthorization: function(options, callback) {
                  callback({
                    TmpSecretId: result.credentials.tmpSecretId,
                    TmpSecretKey: result.credentials.tmpSecretKey,
                    XCosSecurityToken: result.credentials.sessionToken,
                    ExpiredTime: result.expiredTime
                  });
                },
                // 可选参数
                FileParallelLimit: 20, // 控制文件上传并发数
                ChunkParallelLimit: 20, // 控制单个文件下分片上传并发数
                ProgressInterval: 1000 // 控制上传的 onProgress 回调的间隔
              });
              let bucket = result.bucket;
              let region = result.region;
              let path = result.path;
              let requestId = result.requestId;
                let loading = self.$loading({
                      lock: true,
                      text: "正在上传中。请稍等",
                      spinner: "el-icon-loading",
                      background: "rgba(0, 0, 0, 0.5)"
                    });
                    // setTimeout(() => {
                    //   loading.close();
                    // }, 2000);
              //上传数据对象
              self.cos.putObject(
                {
                  Bucket: bucket,
                  Region: region,
                  Key: path + file.name,
                  Body: file,
                  onProgress: function(progressData) {
                    console.log(progressData);
                  }
                },
                //上传成功或者失败的回调函数
                function(err, data) {
                  console.log(err || data);
                   loading.close();
                  if (err) {
                    self.$message.error({
                      message: err.error.Message
                    });
                  } else {
                    self.$axios
                      .post(
                        "/gms/user/gms-report/uploaded",
                        {
                          bucket: bucket,
                          region: region,
                          path: path,
                          filename: file.name,
                          requestid: requestId,
                          sheet_id: id
                        },
                        {
                          headers: {
                            userid: userInfo().userid,
                            source: userInfo().source,
                            token: userInfo().token
                          }
                        }
                      )
                      .then(res => {
                        if (res.data.result) {
                          this.$message.error(res.data.message);
                        } else {
                          self.uploadId = res.data.data.media_id;
                          self.init(0);
                        }
                      });
                    self.$message.success({
                      message: "上传成功"
                    });
                  }
                }
              );
            }
          });
      };
    }
  }
};
</script>
<style>
.el-dialog.dialogClass {
  height: 80%;
}
.el-dialog.dialogClass .el-dialog__body {
  overflow-y: scroll;
  height: 85%;
  padding: 10px 20px 20px;
}
.el-dialog.dialogClass .el-dialog__title {
  font-size: 0.36rem;
  color: #303133;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(74, 74, 74, 1);
  line-height: 0.5rem;
}
</style>

<style scoped>
.page-header {
  padding-bottom: 0.2rem;
  border-bottom: 0.02rem solid #f5f5f5;
}
.top-tab {
  display: flex;
  justify-content: space-around;
}
.top-tab li {
  padding: 0 0 0.1rem;
  font-size: 0.36rem;
  color: rgba(150, 150, 150, 1);
  line-height: 0.5rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}
.top-tab li.active {
  color: rgba(74, 74, 74, 1);
  position: relative;
}
.top-tab li.active:after {
  content: "";
  position: absolute;
  bottom: -0.2rem;
  left: 15%;
  right: 0;
  width: 1.3rem;
  height: 0.08rem;
  background: #3dc4bc;
  border-radius: 0.06rem;
}

#first,
#second {
  padding: 0.4rem 0.36rem;
}
.lists .list {
  background: rgba(255, 255, 255, 1);
  border-radius: 0.16rem;
  border: 0.02rem solid rgba(217, 217, 217, 1);
  margin: 0.15rem auto;
}
.lists .list .list-content {
  padding: 0.2rem 0.3rem;
  border-bottom: 0.02rem solid #f5f5f5;
  position: relative;
}
.lists .list .list-content h4 {
  height: 0.5rem;
  font-size: 0.32rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(74, 74, 74, 1);
  line-height: 0.5rem;
  margin-bottom: 0.04rem;
}
.lists .list .list-content p {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(150, 150, 150, 1);
  line-height: 0.44rem;
}
.lists .list .list-btns {
  display: flex;
  justify-content: space-around;
}
.lists .list .list-btns .btnf {
  padding: 0.3rem 0;
  border-right: 0.02rem solid #f5f5f5;
  text-align: center;
  width: 100%;
  font-size: 0.32rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(70, 70, 70, 1);
  min-width: 2rem;
}
.lists .list .list-btns .btnf p {
  padding: 0 0.3rem;
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(150, 150, 150, 1);
  line-height: 0.4rem;
  text-align: left;
}
.lists .list .list-btns .btnf:last-child {
  border-right: 0;
}
.lists .list .list-btns .text-blue {
  color: #3dc4bc;
}
.lists .list .list-btns .text-gray {
  color: #cccccc;
}

.notice {
  position: absolute;
  top: 0.2rem;
  right: 0;
  background: #eb7575;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.28rem;
  color: #fff;
  padding: 0 0.3rem;
}
</style>



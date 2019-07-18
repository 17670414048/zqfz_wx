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
            <div class="list-btns" v-else>
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
                @click="selectSheet(item.sheet_id)"
              >去上传</div>
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
<!--    <input type="file" style="display:none;" id="video" accept="video/*" capture="camcorder">-->
    <input type="file" style="display:none;" id="video">
    <div id="modal" v-show="showModal">
      <div class="modal-backdrop">
        <div class="modal" style="width:100%;height:100%;">
          <div class="modal-body">
            <video id="replay" class="carmal" x-webkit-airplay="allow"  playsinline="true" x5-video-player-type="h5" preload="auto" controls>不好意思，不能播放</video>
          </div>
          <div class="modal-footer">
            <div class="btns-list">
              <div class="btn-list">
                <!-- //拍摄时出现的下拉图标 -->
                <!-- <div class="b u-down"><img src="./../statics/images/uploaddown.png"/></div> -->
                <div class="b u-back hidden" @click="cancel">
                  <img src="../../statics/images/upload-back.png">
                </div>
                <!-- <div class="b u-btn" @click="chooseFile">
                  <img src="../../statics/images/cicril-fill.png">
                </div> -->
                <div class="b u-confirm" @click="upload">
                  <img src="../../statics/images/confirm.png">
                </div>
              </div>

              <div class="upload-notice">
                <el-checkbox v-model="checked" class="check-notice">
                </el-checkbox>
                 <span class="xieyi" @click="dialogVisible = true">
                  使用即同意
                  <i>协议</i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="90%" :before-close="closeDialog" class="dialog">
      <h5 class="head">关于全身运动（GMs）评估录像资料使用的知情同意书</h5>
      <span class="h">尊敬的家长：</span>
      <p
        class="cont"
      >您孩子接受欧洲GMs评估时的录像当存在评估疑难时，我科将请欧洲专家予以指导，同时可能纳入临床教学和研究，在使用时，我科承诺会保护您孩子和家庭的隐私，不会将相关信息提供给无关人员。感谢您的理解和支持！</p>
      <span slot="footer" class="dialog-footer">
        <el-button style="background:#FD908B;color:#fff;font-size:12px;" @click="dialogVisible = false">我知道了</el-button>
      </span>
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
      sheet_id: 0, //选中的检查单
      showModal: false,
      checked: false,
      replay: null,
      filecon: null,
      file: null,
      dialogVisible: false,
      player:null
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
  mounted() {
      var self = this;
      this.replay = document.getElementById("replay");
      this.filecon = document.getElementById("video");
      this.filecon.onchange = function(e) {
          self.showModal = true;
          if (e.target.files.length) {
            self.file = e.target.files[0];
            self.replay.src = URL.createObjectURL(self.file);
          } else {
            self.file = null;
          }
       };

  },

  watch: {
    nav(val) {
      this.nav = val;
      this.init(this.nav);
    }
  },
  methods: {
    upload() {
      var self = this;
      if (!this.checked) {
        this.$message("要上传必须同意使用协议!");
        return;
      }

      //没有视频文件直接return
      if (!this.file) {
        this.$message("请先拍摄视频");
        return;
      }

      //申请sts
      this.$axios
        .post(
          "/gms/user/gms-report/get-sts",
          { sheet_id: this.sheet_id },
          {
            headers: {
              userid: userInfo().userid,
              source: userInfo().source,
              token: userInfo().token
            }
          }
        )
        .then(function(res) {
          if (res.data.result) {
            self.$message(res.data.message);
          } else {
            var result = res.data.data;
            self.initCos(result);

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

            //上传数据对象
            self.cos.putObject(
              {
                Bucket: bucket,
                Region: region,
                Key: path + self.file.name,
                Body: self.file,
                onProgress: function(progressData) {
                  console.log(progressData);
                  loading.text = progressData.percent * 100 + "%";
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
                  self.uploaded(bucket, region, path, requestId);
                }
              }
            );
          }
        });
      //实例化cos
      //cos上传
      //上传回调
    },

    uploaded(bucket, region, path, requestid) {
      var self = this;
      this.$axios
        .post(
          "/gms/user/gms-report/uploaded",
          {
            bucket: bucket,
            region: region,
            path: path,
            filename: this.file.name,
            requestid: requestid,
            sheet_id: this.sheet_id
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
            self.$message.error(res.data.message);
          } else {
            self.cancel();
            self.uploadId = res.data.data.media_id;
            self.init(0);
            self.$message.success({
              message: "上传成功"
            });
          }
        });
    },

    initCos(result) {
      // 获取临时密匙
      this.cos = new COS({
        getAuthorization: function(options, callback) {
          callback({
            TmpSecretId: result.credentials.tmpSecretId,
            TmpSecretKey: result.credentials.tmpSecretKey,
            XCosSecurityToken: result.credentials.sessionToken,
            ExpiredTime: result.expiredTime
          });
        }
        // 可选参数
        // FileParallelLimit: 20, // 控制文件上传并发数
        // ChunkParallelLimit: 20, // 控制单个文件下分片上传并发数
        // ProgressInterval: 1000 // 控制上传的 onProgress 回调的间隔
      });
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    chooseFile() {
      // if(this.checked == true){
      document.getElementById("video").click();
      // }else{
      //   this.$message('请勾选以下协议');
      // }
    },
    selectSheet(sheet_id) {
      this.sheet_id = sheet_id;
        document.getElementById("video").click();
      // this.showModal = true;
    },
    cancel() {
      this.showModal = false;
      this.replay.pause();
      // this.replay.src = '';
    },
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
    }
    // upload(id) {
    //   var self = this;
    //   // 监听上传文件
    //   document.getElementById("video").onchange = function(e) {
    //     var file = document.getElementById("video").files[0];
    //     if (!file) {
    //       confirm("未选择上传文件");
    //       return;
    //     }
    //     self.$axios
    //       .post(
    //         "/gms/user/gms-report/get-sts",
    //         { sheet_id: id },
    //         {
    //           headers: {
    //             userid: userInfo().userid,
    //             source: userInfo().source,
    //             token: userInfo().token
    //           }
    //         }
    //       )
    //       .then(res => {
    //         if (res.data.result) {
    //           self.message(res.data.message);
    //         } else {
    //           var result = res.data.data;
    //           // 获取临时密匙
    //           self.cos = new COS({
    //             getAuthorization: function(options, callback) {
    //               callback({
    //                 TmpSecretId: result.credentials.tmpSecretId,
    //                 TmpSecretKey: result.credentials.tmpSecretKey,
    //                 XCosSecurityToken: result.credentials.sessionToken,
    //                 ExpiredTime: result.expiredTime
    //               });
    //             },
    //             // 可选参数
    //             FileParallelLimit: 20, // 控制文件上传并发数
    //             ChunkParallelLimit: 20, // 控制单个文件下分片上传并发数
    //             ProgressInterval: 1000 // 控制上传的 onProgress 回调的间隔
    //           });
    //           let bucket = result.bucket;
    //           let region = result.region;
    //           let path = result.path;
    //           let requestId = result.requestId;
    //             let loading = self.$loading({
    //                   lock: true,
    //                   text: "正在上传中。请稍等",
    //                   spinner: "el-icon-loading",
    //                   background: "rgba(0, 0, 0, 0.5)"
    //                 });
    //                 // setTimeout(() => {
    //                 //   loading.close();
    //                 // }, 2000);
    //           //上传数据对象
    //           self.cos.putObject(
    //             {
    //               Bucket: bucket,
    //               Region: region,
    //               Key: path + file.name,
    //               Body: file,
    //               onProgress: function(progressData) {
    //                 console.log(progressData);
    //               }
    //             },
    //             //上传成功或者失败的回调函数
    //             function(err, data) {
    //               console.log(err || data);
    //                loading.close();
    //               if (err) {
    //                 self.$message.error({
    //                   message: err.error.Message
    //                 });
    //               } else {
    //                 self.$axios
    //                   .post(
    //                     "/gms/user/gms-report/uploaded",
    //                     {
    //                       bucket: bucket,
    //                       region: region,
    //                       path: path,
    //                       filename: file.name,
    //                       requestid: requestId,
    //                       sheet_id: id
    //                     },
    //                     {
    //                       headers: {
    //                         userid: userInfo().userid,
    //                         source: userInfo().source,
    //                         token: userInfo().token
    //                       }
    //                     }
    //                   )
    //                   .then(res => {
    //                     if (res.data.result) {
    //                       this.$message.error(res.data.message);
    //                     } else {
    //                       self.uploadId = res.data.data.media_id;
    //                       self.init(0);
    //                     }
    //                   });
    //                 self.$message.success({
    //                   message: "上传成功"
    //                 });
    //               }
    //             }
    //           );
    //         }
    //       });
    //   };
    //   document.getElementById("video").click();
    // }
  }
};
</script>
<style>
.carmal {
  width: 100%;
  height: 100%;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background-color: #eee;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 0;
}
.modal-header {
  border-bottom: 1px solid #eee;
  color: #313131;
  justify-content: space-between;
  padding: 15px;
  display: flex;
}
.modal-footer {
  border-top: 1px solid #eee;
  justify-content: flex-start;
  padding: 15px;
  display: flex;
  background: #161616;
  height: 20%;
}
.modal-body {
  position: relative;
  height: 80%;
}

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
.dialog .el-dialog__header {
  padding: 0;
}
.dialog .el-dialog__body {
  padding: 30px 20px 20px;
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

.carmal {
  flex: 0 0 80%;
  background: #aaa;
}
.btns-list {
  padding: 5px 20px 0;
  background: #161616;
  width: 100%;
}
.btn-list {
  display: flex;
  justify-content: space-between;
}
.btn-list .b {
  text-align: center;
  border-radius: 100%;

  display: block;
  padding: 15px;
}
.upload-notice {
margin-top:20px;
}
.upload-notice i {
  color: #fd908b;
  margin-left: -3px;
}
.upload-notice .xieyi {
  color: #aaa;
  margin-left: -25px;
}
.btn-list .b.u-btn {
  background: #a2a2a2;
  padding: 0;
  width: 72px;
  padding: 6px;
}
.btn-list .b.u-back.hidden {
  background: #5c5756;
}
.btn-list .b.u-confirm {
  background: #fff;
}
.u-btn img {
  width: 60px;
}

.dialog .head {
  margin-top: -10px;
  margin-bottom: 20px;
  color: #333;
  font-size: 14px;
  padding: 0 20px 0 0;
  line-height: 20px;
}
.dialog span.h {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 30px;
}
.dialog .cont {
  color: #666;
  font-size: 14px;
  line-height: 24px;
  text-indent: 25px;
}
</style>
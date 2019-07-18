<template>
  <div>
    <div class="page-header">
      <div class="page-top">
        <h4>添加宝宝</h4>
        <p>查询发育曲线，管理发育记录</p>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    </div>
    <div class="content">
      <el-form class="div-input">
         <el-form-item>  <el-input v-model="number" placeholder="请输入就诊人登记号" class="input"></el-input></el-form-item>
      <el-form-item>        <el-input v-model="name" placeholder="请输入就诊人姓名" class="input"></el-input></el-form-item>

        <a href="javascript:;" class="question" @click="open">
          <img src="../../statics/images/why.png" class="why-icon">什么是就诊人登记号
        </a>
      </el-form>
      <div class="btns">
        <div class="btn" @click="submit">提交</div>
      </div>
    </div>
    <el-dialog :visible.sync="centerDialogVisible" width="90%" center custom-class="dialogs">
      <h4>红框内为需要输入的登记号</h4>
      <p>注：如果绑定不成功，请核对卡号与姓名是否对应，如有信息错误或遗忘请去医院窗口修改。</p>
      <img src="../../statics/images/question.png" style="width:100%;">
      <span slot="footer" class="dialog-footer">
        <div class="confirm" @click="centerDialogVisible = false">我知道了</div>
        <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { userInfo } from "../../common/storage.js";
export default {
  name: "addBaby",
  data() {
    return {
      number: "",
      name: "",
      centerDialogVisible: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    open() {
      this.centerDialogVisible = true;
    },
    submit() {
      if (this.number== "") {
        this.$message.error("登记号不能为空");
        return;
      }
       if (this.name == "") {
         this.$message.error("姓名不能为空");
        return;
      }
      var userinfo = userInfo();
      this.$axios
        .post(
          "/zqfz/user/guardian/add-baby",
          { registid: this.number, name: this.name },
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
            this.$message({
              message: "成功",
              type: "success"
            });
            this.$router.push(`/myBaby`);
          }
        });
    }
  }
};
</script>
<style>
.dialogs {
  background: rgba(255, 255, 255, 1);
  border-radius: 0.16rem;
  margin-top: 50% !important;
}
.dialogs h4 {
  height: 0.56rem;
  font-size: 0.38rem;
  color: rgba(74, 74, 74, 1);
  line-height: 0.56rem;
  margin-bottom: 0.16rem;
}
.dialogs p {
  margin-bottom: 0.2rem;
  font-size: 0.28rem;
  color: rgba(150, 150, 150, 1);
  line-height: 0.4rem;
}
.dialogs .el-dialog__header {
  display: none;
}
.confirm {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: linear-gradient(
    270deg,
    rgba(254, 154, 139, 1) 0%,
    rgba(253, 134, 140, 1) 72%,
    rgba(247, 140, 160, 1) 100%
  );
  position: absolute;
  bottom: 0;
  left: 0;
  border: 0;
  border-radius: 0 0 0.16rem 0.16rem;
  color: #fff;
  font-size: 0.32rem;
}

.btns {
  margin: 0.8rem auto;
}
.btn {
  margin: 0 1.24rem;
  height: 1rem;
  background: linear-gradient(
    270deg,
    rgba(254, 154, 139, 1) 0%,
    rgba(253, 134, 140, 1) 72%,
    rgba(247, 140, 160, 1) 100%
  );
  box-shadow: 0 0.16rem 0.28rem 0 rgba(236, 204, 215, 0.63);
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.36rem;
  color: rgba(255, 255, 255, 1);
  line-height: 1rem;
}
.div-input {
  margin-top: 0.4rem;
  padding: 0.2rem 1.24rem;
}
.div-input .el-form-item {
    margin-bottom: 0.22rem;
}
.div-input  .input {
  margin: 0 auto 0.24rem;
  height: 1rem;
  line-height: 1rem;
  padding: 0 0.1rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.08rem;
  border: 0.02rem solid rgba(253, 144, 139, 1);
  width: 100%;
  font-size: 0.28rem;
  color: rgba(253, 144, 139, 1);
  outline: none;
}
.question {
  height: 0.4rem;
  font-size: 0.28rem;
  color: rgba(253, 144, 139, 1);
  line-height: 0.4rem;
  position: relative;
  display: block;
}
.why-icon {
  height: 0.3rem;
  width: 0.3rem;
  margin: 0 0.1rem 0 0;
}
.el-input__inner {
  border: 0;
}
</style>


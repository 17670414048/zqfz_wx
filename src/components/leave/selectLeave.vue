<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-top">
        <h4 style="text-align:left;padding-left:0.5rem;">共{{number.length}}节课，正在请假…</h4>
        <p style="text-align:left;padding-left:0.5rem;">开课前两个小时不可以请假，谢谢理解</p>
        <img src="../../statics/images/back1.png" class="back-img" @click="back">
      </div>
    </div>
    <div class="content">
        <div class="select-leave">
                <span class="title">请选择请假类型(必填）</span>
            <div class="box">
    <el-radio-group class="radio-group" v-model="thing">
      <el-radio :label="0" class="radio" size="medium"><i>病假</i></el-radio>
      <el-radio :label="1" class="radio" size="medium"><i>事假</i></el-radio>
    </el-radio-group>
    </div>
        <span class="title">请填写请假详情(必填)</span>
    <div class="box text-box">
    <el-input type="textarea" v-model="desc" rows="5" resize="none"></el-input>
    </div>
        </div>
    </div>
    <div class="footer">

        <div class="foot-back" @click="submit">
          提 交
        </div>
    </div>
  </div>
</template>
<script>
import { userInfo } from "../../common/storage.js";
let userinfo = userInfo();
export default {
  name: "selectLeave",
  created(){
    this.number = this.$route.query.number;
    
  },
  data() {
    return {
        number:'',
        thing: 0,
        desc:'',
    };
  },
  methods:{
       back(){
          this.$router.go(-1);
      },
      submit(){
        if(this.desc==''){
          this.$message.error('请简述一下您的请假');
          return false;
        }
        this.$axios.post('/zqfz/user/leave-ask/add',{ids:this.number.join(','),type:this.thing,note:this.desc},{
           headers: {
              userid: userinfo.userid,
              source: userinfo.source,
              token: userinfo.token
            }
        }).then(res => {
          if(res.data.result){
       this.$message.error(res.data.message);
          }else{

            this.$router.push('/myBaby');
          }
        });

      }
  }
};
</script>
<style>
.select-leave{
    padding: 0.58rem 0.36rem;
}
.select-leave .title{

font-size:0.32rem;
color:rgba(253,144,139,1);
line-height:0.44rem;
}
.box{
    margin-top: 0.18rem;
    margin-bottom: 0.42rem;
border-radius:0.16rem;
border:0.02rem solid rgba(217,217,217,1);
background: #fff;
}
.text-box{
    border: 0;
}
.radio-group{
    width: 100%;
}
.radio{
    width: 100%;
    padding: 0.34rem 0.4rem;
    border-bottom: 0.02rem solid #D9D9D9;
    color: #000;
    font-size:0.32rem;
}
.radio:last-child{
    border-bottom: 0;
}
.radio i{
      font-size:0.32rem;
}
.radio .el-radio__input.is-checked .el-radio__inner {
    border-color: #FD908B;
    background: #FFF;
}
.radio .el-radio__input.is-checked+.el-radio__label {
    color: #000;
}
.el-radio__inner::after {
    width: 8px;
    height: 8px;
    background-color: #fd908b;
}
</style>



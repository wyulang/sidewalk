<template>
  <div class='w-all'>
    <div class="rel bb-e h-190">
      <div class="topbg rel zi-100"></div>
      <div class="abs w-all zi-120 at0 pt20">
        <div class="topbody flex fd-c ai-c">
          <div :style="{'background-image': 'url('+(userinfo.sex==0?require('../../assets/girl.png'):require('../../assets/boy.png'))+')'}" style="border: 1px solid #ff8600;" class="h-67 bs-c w-67 mt10 ra-all"></div>
          <span class="mt10">{{userinfo.name}}</span>
          <div class="flex w-all pl13 pr13 jc-b mt20 fs-13">
            <div class="flex jc-c">
              <i class="icon iconfont iconschool fs-13 jb-fc"></i>
              <span class="flex-1 w-100 fc-999 fs-12 ml5">{{userinfo.school || '暂无'}}</span>
            </div>
            <div class="flex jc-c">
              <i class="icon iconfont fs-13 iconbook jb-fc"></i>
              <span class="fc-999 ml5">{{[,'高一','高二','高三'][userinfo.studentClass]}}</span>
            </div>
            <div class="flex jc-c">
              <i class="icon iconfont fs-13 iconaddress jb-fc"></i>
              <span class="fc-999 ml5">{{userinfo.city||'暂无'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pl15 fs-15 pr15">
      <div class="flex ai-c jc-b h-45 bb-e">
        <span>姓名</span>
        <span class="fc-999">{{userinfo.name}}</span>
      </div>
      <div @click="$router.push({name:'user-info'})" class="flex ai-c jc-b h-45 bb-e">
        <span>个人信息</span>
        <span class="iconfont iconright fc-aaa fs-13"></span>
      </div>
      <div @click="$router.push({name:'user-rank'})" class="flex ai-c jc-b h-45 bb-e">
        <span>成绩和位次号</span>
        <span class="iconfont iconright fc-aaa fs-13"></span>
      </div>
      <div @click="$router.push({name:'user-order'})" class="flex ai-c jc-b h-45 bb-e">
        <span>我的订单</span>
        <span class="iconfont iconright fc-aaa fs-13"></span>
      </div>
      <div @click="outLogin" class="flex ai-c jc-b h-45 bb-e">
        <span>退出登录</span>
      </div>
    </div>

    <div v-if="$config.type==1" class="flex ai-c w-all jc-c mt20">
      <div @click="toPay" class="btn-vip"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { MessageBox } from 'mint-ui';
export default {
  computed: {
    ...mapState(['userinfo'])
  },
  data() {
    return {
    }
  },
  methods: {
    outLogin() {
      MessageBox.confirm('确认要退出吗?').then(action => {
        this.$store.commit('setOutLogin',null);
        this.$router.push({ name: 'index' });
      })
    },
    toPay(){
      this.$router.push({name:'pay'});
    }
  }
}
</script>

<style lang='less' scoped>
@import "~@css/base.less";
.topbg {
  height: 3.12rem;
  position: relative;
  overflow: hidden;
  background-image: -webkit-linear-gradient(left, #ffa440 0%, #ff8600 100%);
  background-image: linear-gradient(90deg, #ffa440 0%, #ff8600 100%);
  border-bottom-left-radius: 30%;
  border-bottom-right-radius: 30%;
}
.topbody {
  width: 618 / @bs75;
  height: 314 / @bs75;
  background-image: url("../../assets/mine_bg.png");
  background-size: 100% 100%;
  margin: 0 auto;
}
.btn-vip {
  background-image: url("../../assets/btn_vip1.png");
  background-size: 100%;
  width: 493 / @bs75;
  height: 95 / @bs75;
  background-repeat: no-repeat;
}
</style>

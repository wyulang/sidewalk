<template>
  <div class='w-all h-all fs-14 contact'>
    <div class="h-200 mb20"></div>
    <div class="pl30 pr30 flex ai-c jc-b">
      <div class="jb-fc ai-c flex-line">
        <span class="iconfont iconaddress fs-18 mr5"></span>
        <span class="fs-16">{{this.userinfo.city}}</span>
      </div>
      <span class="jb-fc ff-b">修改</span>
    </div>

    <div class="flex jc-c ai-c mt20">
      <div class="flex ai-c jc-c sha-6 mr20 pb10 fd-c">
        <img class="qrcode" src="../assets/qr_hz.png" v-if="this.userinfo.city == '杭州市'">
        <img class="qrcode" src="../assets/qr_huz.png" v-else-if="this.userinfo.city == '湖州市'">
        <img class="qrcode" src="../assets/qr_jh.png" v-else-if="this.userinfo.city == '金华市'">
        <img class="qrcode" src="../assets/qr_jx.png" v-else-if="this.userinfo.city == '嘉兴市'">
        <img class="qrcode" src="../assets/qr_ls.png" v-else-if="this.userinfo.city == '丽水市'">
        <img class="qrcode" src="../assets/qr_nb.png" v-else-if="this.userinfo.city == '宁波市'">
        <img class="qrcode" src="../assets/qr_qz.png" v-else-if="this.userinfo.city == '衢州市'">
        <img class="qrcode" src="../assets/qr_sx.png" v-else-if="this.userinfo.city == '绍兴市'">
        <img class="qrcode" src="../assets/qr_tz.png" v-else-if="this.userinfo.city == '台州市'">
        <img class="qrcode" src="../assets/qr_wz.png" v-else-if="this.userinfo.city == '温州市'">
        <img class="qrcode" src="../assets/qr_zs.png" v-else-if="this.userinfo.city == '舟山市'">
        <span v-if="this.userinfo" class="jb-fc">扫一扫，加入群</span>
      </div>
      <div class="flex ai-c jc-c sha-6 pb10 fd-c">
        <img src="../assets/qr_z.png" class="qrcode" alt="">
        <span class="jb-fc">扫一扫，加入群</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['userinfo'])
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
@import "~@css/base.less";
.contact {
  background: url("../assets/contact.png") no-repeat top;
  background-size: 100%;
}
.qrcode {
  height: 178 / @bs;
  width: 153 / @bs;
}
</style>

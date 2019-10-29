<template>
  <div :class="{'h-all hidden hi-all-no':$store.state.isHeight}" class="w-all fs-14 hi-all flex fd-c">
    <header v-if="$store.state.isHeader" class="bc-fff h-70 w-all sha-b fixed at0">
      <div class="w-1200 m-auto h-70 flex ai-c">
        <div @click="$router.push({name:'index'})" class="hand"><img src="./assets/one-banner/logn.png" alt=""></div>
        <div @click="$router.push({name:'index'})" class="ml10 hand">
          <h1 class="jb-fc fs-25 fb-4">浙考一点通</h1>
          <div class="fs-12 fc-111">专注服务于浙江省地区新高考政策下高中生升学生涯规划及高考志愿填报</div>
        </div>
        <div class="flex-1"></div>
        <div class="h-all flex ai-c fs-16">
          <div :class="{'h-nav':nav==1}" @click="$router.push({name:'index'})" class="h-all flex ai-c pl10 pr10 hand">首页</div>
          <div :class="{'h-nav':nav==2}" @click="toUser" class="h-all flex ai-c ml20  pl10 pr10 hand">个人中心</div>
        </div>
        <div v-if="!(this.userinfo && ['1','3'].includes(this.userinfo.userSource))" class="ml20 rel qrcode h-all flex ai-c hand">
          <span class="iconfont iconphone fs-25 mr5"></span>
          <span>新高考手机版</span>
          <div class="abs at60 al-12 sha-all centent pp7 bc-fff ra-5 hide">
            <img class="w-150 h-150" src="./assets/one-banner/qrcode.png" alt="">
            <span>扫一扫，登录手机端</span>
          </div>
        </div>
        <div v-if="!(this.userinfo && ['1','3'].includes(this.userinfo.userSource))" class="h-all ai-c flex ml40">
          <div @click="$store.commit('setShowLogin',true);user.captcha=''" v-if="!userinfo" class="ra-3 pt6 pb6 pl10 pr10 bc-base jb-fc hand">登录/注册</div>
          <div @click="outLogin()" v-if="userinfo" class="ra-3 pt6 pb6 pl10 pr10 bc-base jb-fc hand">退出登录</div>
        </div>
      </div>
    </header>

    <transition enter-active-class="wrapper">
      <router-view class="flex-1" :class="{'mt70':$store.state.isHeader==1}"></router-view>
    </transition>

    <footer v-if="$store.state.isFooter" class="jb-bbc">
      <div class="w-1200 m-auto flex pt20 pb20">
        <div class="flex fd-c" style="width:430px;">
          <div class="flex ai-c">
            <span class="iconfont fs-20 fc-fff mr10 iconjichu-xiuli"></span>
            <span>技术支持：浙江联通金榜题名高考志愿服务平台</span>
          </div>
          <div class="flex ai-c mt20">
            <span class="iconfont fs-18 fc-fff mr10 iconmeiti"></span>
            <span>媒体合作：浙江省教育报刊总社浙考一点通微信公众号</span>
          </div>
        </div>
        <div class="flex" style="width:333px;">

        </div>
        <div class="w-300">
          <div class="flex">
            <i class="icon iconfont iconweixin"></i>
            <span class="flex-1 ml10">微信公众号：zjgkwx</span>
          </div>
        </div>
        <div><img class="w-92 h-92" src="./assets/one-banner/wxtwo.png" alt=""></div>
      </div>
    </footer>

    <section v-if="$store.state.isVedio.show" class="videoDig">
      <div @click="$store.state.isVedio.show=false;$store.state.isVedio.src=''" class="dig-close"></div>
      <div class="dig-body">
        <video ref="video" :src="$store.state.isVedio.src" id="homeVideo" controls="controls">
          您的浏览器不支持 video 标签。
        </video>
      </div>
    </section>

    <section v-if="isLogin" class="fixed ar0 ab0 at0 al0 login-bc flex ai-c jc-c">
      <div class="bc-fff ra-6 w-450 pl20 pr20 pt20">
        <div class="w-all flex jc-e rel">
          <i @click="$store.commit('setShowLogin',false);user.captcha=''" class=" abs at-10 hand fs-15  ar-10 fc-999">关闭</i>
        </div>
        <div class="jb-fc fs-22">已有手机/账号快速通道</div>
        <input @blur="checkVip" v-model="user.phone" placeholder="手机号码 / 账号" class="b-d fs-16 w-all h-45 pt15 pb15 pl10 pr10 mt15 mb10" type="text">
        <div v-if="vipType!=2" class="w-all red">
          <i class="el-icon-warning ml3"></i>
          <span v-if="vipType==0" class="pl5">你是体验用户，点击“购买”按钮升级成为VIP用户</span>
          <span v-if="vipType==1" class="pl5">您是VIP用户，请享受VIP权益</span>
        </div>
        <div class="flex bo-dis ai-c jc-c">
          <input v-model="user.captcha" placeholder="输入验证码 / 密码" class="b-d fs-16 w-270 h-45 pt15 pb15 pl10 pr10 mt15 mb15" type="text">
          <button :disabled="countDown.disabled" @click="setCap" class="flex-1 fs-16 flex ai-c jc-c ml20 h-45 jb-bc">{{countDown.title}}</button>
        </div>
        <div v-if="countDown.disabled" class="red mb15">
          <i class="el-icon-warning ml3 mr5"></i>若您5分钟内还未收到验证码，请您去您的垃圾短信寻找，或将系统号码拉进白名单
        </div>
        <div @click="goLogin" class="h-50 hand flex ai-c jc-c jb-bc fs-18 mb20 mt10">注册/登录</div>
      </div>
    </section>

  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex';
import { isMobile } from 'lib/validator';
export default {
  computed: {
    ...mapState(['isVedio', 'countDown', 'isLogin', 'userinfo']),
    ishz() {
      if (this.userinfo && this.userinfo.userSource == 3) {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {
      transFrom: '',
      vipType: 2,
      nav: 1,
      user: {
        captcha: '',
        phone: '',
        type: '100'
      },
    }
  },
  methods: {
    ...mapActions(['getCaptcha', 'toLogin', 'getVip', 'getlistTimeLineText']),
    checkVip() {
      if (this.user.phone.length > 3) {
        this.getVip({ phone: this.user.phone }).then(res => {
          if (res.code == 20000) {
            this.vipType = res.dt;
          }
        })
      }
    },
    setCap() {
      if (!isMobile(this.user.phone)) {
        this.$message.error('您输入的并不是手机号，账号密码登录不需要获取验证码');
        return;
      }
      this.$store.commit('setCountDown', {});
      this.getCaptcha(this.user);
    },
    goLogin() {
      if (!this.user.phone) {
        this.$message.error('请输入手机号码或账号');
        return;
      }
      if (this.user.captcha.length < 4) {
        this.$message.error('请输入正确的验证码或密码');
        return;
      }
      if (/^\d+$/g.test(this.user.phone) && !isMobile(this.user.phone)) {
        this.$message.error('请输入正确的手机号');
        return;
      }
      this.user.type = isMobile(this.user.phone) ? 1 : 0;
      this.toLogin(this.user).then(res => {
        if (res.code == 20000) {
          if (res.data.isOverDate > 0) {
            this.$alert(`你的原有手机号码将于${res.data.isOverDate || 0}天后过期，请尽快使用金榜题名联通卡卡进行登入。`, '', {
              confirmButtonText: '好的，知道了', type: 'warning', confirmButtonClass: 'dig-alert-ok'
            })
          }
          if (!!this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect)
            return
          }
          if (res.data.examType == 0) {
            this.$router.push({ name: 'user-info' });
          }
        }
      })
    },
    toUser() {
      if (!this.userinfo) {
        this.$store.commit('setShowLogin', true);
      } else {
        this.$router.push({ name: 'user-info' });
      }
    },
    outLogin() {
      this.user.captcha = '';
      this.$store.commit('setOutLogin', {});
      this.$router.push({ name: 'index' });
    }
  },
  created() {
    this.getlistTimeLineText();
  },
  watch: {
    '$route'() {
      if (this.$route.name.includes('user')) {
        this.nav = 2;
      } else {
        this.nav = 1;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = require('./assets/icon/favicon2.ico');
      document.getElementsByTagName('head')[0].appendChild(link);
    })
  }
}
</script>

<style lang="less">
// 关于移动端使用position:fixed/absolute出现随屏幕滚动情况
// -webkit-transform: translateZ(0);
@import "../../css/pc.less";
@color: #98010c;
@query-bc: #de767d;
.query-top {
  border-top: 25px solid @color;
}
.bo-dis {
  button {
    &:disabled {
      opacity: 0.8;
      cursor: not-allowed;
      background-color: #555 !important;
    }
  }
}

.shcool-nav {
  color: #999;
  font-size: 16px;
  padding: 0 5px;
  cursor: pointer;
  &.active {
    position: relative;
    color: @color;
    &:after {
      content: " ";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -10px;
      width: 24px;
      height: 3px;
      background-color: @color;
    }
  }
}

.confirmBtn {
  .el-button--primary {
    background-color: @color;
    color: #fff;
    border-color: @color;
  }
  .el-button--default {
    padding: 9px 25px;
  }
}

html {
  min-width: 1200px;
}
.query-tip {
  width: auto !important;
  background-color: #1da7c3 !important;
  color: #fff;
}

header {
  z-index: 1333;
}
.bc-fdb813 {
  background-color: @query-bc;
  color: #fff;
}
.dig-alert-ok {
  background-color: @color !important;
  border: 0 !important;
}
.jb-bc {
  background-color: @color;
  color: #fff;
}
.bd-color {
  border-color: @color !important;
}
.nav {
  .active {
    color: @color;
    border-bottom: 3px solid @color;
  }
}
.user-nav {
  li {
    &.active {
      border-left: 3px solid @color !important;
      color: @color;
      background-color: #fff;
    }
  }
}
.jbbc {
  background-color: #f0f4f7;
}
.jb-bb {
  border: 1px solid @color;
}
.jb-fc {
  color: @color;
}
.jb-btn {
  background-color: @color;
  border: 1px solid @color;
  color: #fff;
  padding: 0 25px;
  display: inline-block;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: @color;
  }
}
.pub-confirm {
  background-color: @color !important;
  border: 0 !important;
  outline: none;
  &:hover {
    background-color: @color !important;
    outline: none;
  }
}
.hover {
  &:hover {
    color: @color;
  }
}
.h-nav {
  color: @color;
  border-bottom: 3px solid @color;
  padding-top: 3px;
  font-weight: 700;
}
.qrcode {
  &:hover {
    .sha-all {
      display: block;
      transition: all 0.6s;
    }
  }
}
.bc-base {
  border: 1px solid @color;
}
.jb-bbc {
  background-color: #2c415a;
  color: #fff;
}

.login-bc {
  background: rgba(0, 0, 0, 0.5);
  z-index: 1355;
}

.videoDig {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background: rgba(2, 2, 2, 0.55);
  .dig-close {
    width: 64px;
    height: 64px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAACGVs+MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgRmlyZXdvcmtzIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNkY5NUY4RDM3RDgxMUU3QjQyMUZENTIwNDY5OTFDNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNkY5NUY4RTM3RDgxMUU3QjQyMUZENTIwNDY5OTFDNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE2Rjk1RjhCMzdEODExRTdCNDIxRkQ1MjA0Njk5MUM0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE2Rjk1RjhDMzdEODExRTdCNDIxRkQ1MjA0Njk5MUM0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Aaf3PgAAANpJREFUeNrMl0EOgyAQRaEbexQP5Cl6Ck/RK8ztWLcrlEQSQ0WYYT70J8YEdN6TqIAxR7z3tB/OgBMYgZU2BniMA8NjKDbO/jcODI+ZY+eClMjAl/QiiEQVHCXBgmtLiOBaEk3wVgkVuFRCFV6QoIvrSB1+Kv6+k4DCCxDqAi9IpFnRs9mdBHHrWaHEZz9NSfPXWvvk1npIRuACHjJJRgDxDlBPeO4roC7w2n4oHCrBLaoqIS2Wue/Fha8tT9L0e66d/SASQ9eEQ1fFQ/cF/7IzGrc3HL073gQYAL2Iz1119SZEAAAAAElFTkSuQmCC")
      no-repeat center center;
    position: absolute;
    top: 66px;
    right: 30px;
    z-index: 100002;
    cursor: pointer;
  }
  .dig-body {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    video {
      width: 60%;
    }
  }
}

.spinner {
  margin: 0 auto;
  padding-bottom: 15px;
  display: block;
  width: 60px;
  height: 60px;
  position: relative;
  text-align: center;
  -webkit-animation: rotate 2s infinite linear;
  animation: rotate 2s infinite linear;
  &:before,
  &:after {
    content: "";
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: @color;
    border-radius: 100%;
    -webkit-animation: bounce 2s infinite ease-in-out;
    animation: bounce 2s infinite ease-in-out;
  }
  &:after {
    top: auto;
    bottom: 0px;
    background-color: #289eb8;
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}

.video-wrap {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    transition: all 0.3s;
  }
  &:after {
    content: "";
    width: 40px;
    height: 40px;
    position: absolute;
    background-image: url("./assets/home/s_play.png");
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    width: 100%;
    height: 100%;
    transition: all 0.3s;
  }
  .cover-img {
    width: 100%;
    height: 172px;
    transition: all 0.3s;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &:hover {
    &:before {
      background-color: rgba(0, 0, 0, 0);
    }
    img,
    .cover-img {
      zoom: 1;
      transform: scale(1.05);
    }
  }
}
</style>

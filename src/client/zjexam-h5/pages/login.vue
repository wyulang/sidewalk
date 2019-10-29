<template>
  <div :style="{'min-height':miHeight}" class='w-all login-bg'>
    <div class="h-200 mb40"></div>
    <div class="w-all flex ai-c jc-c pl25 pr25">
      <div class="bc-fff pt20 w-all ra-5 pb20 pl10 pr10">
        <div class="login-input ra-40 ai-c h-45 flex">
          <span class="iconfont iconiphone jb-fc fs-23 ml10"></span>
          <input v-model="user.phone" @blur="scollbar" placeholder="输入手机号/账号" class="pl10 fs-16 pt10 flex-1 mr15 pb10" type="text">
        </div>
        <div class="login-input ra-40 ai-c h-45 mt15 flex">
          <span class="iconfont iconanquan jb-fc fs-20 ml10"></span>
          <input v-model="user.captcha" @blur="scollbar" placeholder="输入验证码/密码" class="pl10 w-150 mr10 fs-16 pt10 pb10" type="text">
          <button @click="getCode()" :disabled="countDown.disabled" class="mt4 flex-1 mb5 ra-30 mr3 h-36 jb-bc">
            <span class="fs-16">{{countDown.title}}</span>
          </button>
        </div>

        <button @click="goLogin()" class="w-all jb-bc mt20 fs-18 pt10 pb10 ra-30"> 注册 / 登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isMobile } from 'lib/validator';
export default {
  computed: {
    ...mapState(['countDown']),
  },
  mounted() {
    this.$nextTick(res => {
      this.miHeight = window.screen.height + 'px';
    })
  },
  data() {
    return {
      user: {
        phone: '',
        captcha: '',
        miHeight: '500px',
        type: 100,
        userSource: 1 //2为浙考一点通
      }
    }
  },
  methods: {
    ...mapActions(['getCaptcha', 'getLogin']),
    scollbar() {
      window.scroll(0, 0);
    },
    getCode() {
      if (!isMobile(this.user.phone)) {
        this.$toast('您输入的并不是手机号');
        return;
      }
      this.$store.commit('setCountDown', {});
      this.getCaptcha(this.user);
    },
    goLogin() {
      if (!this.user.phone) {
        this.$toast('手机号/账号不能为空');
      }
      if (!this.user.captcha) {
        this.$toast('验证码/密码不能为空');
      }
      let isPhone = /[a-zA-Z]/i.test(this.user.phone);
      let sqlData = {};
      if (!isPhone) {
        if (!isMobile(this.user.phone)) {
          this.$toast('您输入的并不是手机号');
          return;
        }
        sqlData = {
          type: 1,
          phone: this.user.phone,
          captcha: this.user.captcha
        }
      } else {
        sqlData = {
          type: 0,
          account: this.user.phone,
          password: this.user.captcha
        }
      }
      this.$indicator.open({ spinnerType: 'fading-circle' });
      this.getLogin(sqlData).then(res => {
        this.$indicator.close();
        if (res.code == 20000) {
          if (!res.data.name) {
            this.$router.push({ name: 'user-info' });
            return;
          }
          this.$router.push({ name: 'user' });
        } else {
          this.$toast(res.message);
        }
      })

    }
  },
  created() {
    this.user.userSource = this.$config.getEnvName();
  }
}
</script>

<style lang='less' scoped>
.login-bg {
  background: #ffbe7a url("../assets/reg_bg.png") no-repeat top;
  width: 100%;
  height: 100%;
  background-size: 100%;
}
.login-input {
  border: 1px solid #ff8600;
}
button:disabled {
  opacity: 0.8;
  cursor: not-allowed;
  background-color: #999;
}
</style>

<template>
  <div id="container" class="w-all login hidden h-all">
    <div class="rel zi-100" id="output"></div>
    <div class="abs at0 ab0 al0 ar0 zi-120">
      <div class="h-all w-all ai-c jc-c flex">
        <div class="w-300 bc-bb jc-c ai-c flex fd-c ra-4 h-200">
          <span class="fs-16 mb15 fc-fff">平行踏未来管理系统</span>
          <div class="w-200 ra-5 pp10 bc-ts">
            <div class="flex ai-c bb-f">
              <span class="icon fc-2a6d94 fs-20 iconyonghu"></span>
              <input v-model="user.username" class="bc-t pp10 w-150 fs-14 fc-2a6d94" autocomplete="new-password" placeholder="用户名/手机号/邮箱" type="text" />
            </div>
            <div class="flex ai-c mt5 mb3 bb-f">
              <span class="icon fc-2a6d94 fs-20 iconpassword"></span>
              <input v-model="user.password" class="bc-t pp10 w-150 fs-14 fc-2a6d94" autocomplete="new-password" placeholder="请输入密码" type="password" />
            </div>
          </div>
          <button @click="goindex" class="buttons w-170 ra-5 fs-16 fc-fff mt20 h-36">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import api from "../store/webapi";
import canvas from "lib/backgroud.js";
export default {
  data() {
    return {
      message: "欢迎登录",
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["getAdminLogin"]),
    goindex() {
      if (!this.user.username) {
        this.$message.error("用户名/手机号/邮箱不为空");
        return;
      }
      if (!this.user.password || this.user.password.length < 5) {
        this.$message.error("密码需大6个字符");
        return;
      }
      this.getAdminLogin(this.user).then(res => {
        if (res.code == 2000) {
          this.session('userinfo',res.data)
          this.$router.push({ name: "manage" });
        } else {
          this.$message.error(res.message);
          this.user.password = "";
        }
      });
    }
  },
  created() {},
  mounted() {
    this.$nextTick(res => {
      canvas("container", "output");
      document.onkeydown = e => {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
          this.goindex();
        }
      };
    });
  }
};
</script>
<style lang="less" scoped>
.login {
  input::-webkit-input-placeholder {
    color: #2a6d94;
  }
  input::-moz-input-placeholder {
    color: #2a6d94;
  }
  input::-ms-input-placeholder {
    color: #2a6d94;
  }
}
.fc-2a6d94 {
  color: #2a6d94;
}
.bc-ts {
  background-color: rgba(255, 255, 255, 0.4);
}
.bb-f {
  border-bottom: 1px solid #2a6d94;
}
.inputs {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.4);
  width: 200px;
  border-radius: 3px;
  padding: 8px 15px;
  margin: 0 auto 10px;
  display: block;
  text-align: center;
  font-size: 13px;
  -webkit-transition-duration: 0.25s;
  transition-duration: 0.25s;
  font-weight: 300;
  &:hover {
    // background-color: rgba(255, 255, 255, 0.4);
  }
  &:focus {
    background-color: #fff;
    // width: 230px;
    color: #333;
  }
}
.buttons {
  background-color: rgba(36, 147, 212, 0.8);
}
</style>
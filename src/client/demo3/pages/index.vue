<template>
  <div class="password-modify">
    <div class="password-nav">
      <!-- <img src="../assets/images/logo.png" alt=""> -->
      <div class="line"></div>
      <span>找回密码</span>
    </div>
    <div class="password-body">
      <div class="password-set">
        <section class="steps">
          <div class="step-title active">
            <i>1</i>
            <div>
              <span>验证身份</span>
            </div>
          </div>
          <div class="step-line">
            <span class="active-line"></span>
            <i :class="{'active-line':step>1}"></i>
          </div>
          <div :class="{'active':step>1}" class="step-title">
            <i>2</i>
            <div>
              <span>重置密码</span>
            </div>
          </div>
          <div class="step-line">
            <span :class="{'active-line':step>1}"></span>
            <i :class="{'active-line':step>2}"></i>
          </div>
          <div :class="{'active':step>2}" class="step-title">
            <i>3</i>
            <div>
              <span>重置密码成功</span>
            </div>
          </div>
        </section>

        <section v-if="step==1" class="step-entry">
          <div class="get-password-type">
            <span :class="{'isPhone':isPhone==1}" @click="isPhone=1">手机号</span>
            <span :class="{'isPhone':isPhone==2}" @click="isPhone=2">邮箱</span>
          </div>
          <div class="entry-line">
            <div class="title">{{isPhone==1?"手机号":"邮箱号"}}</div>
            <input v-model="user.phone" :placeholder="isPhone==1?'请输入手机号':'请输入邮箱号'" type="text" />
          </div>
          <!-- 显示图片验证码条件处理处 -->
          <div v-if="user.phone.length>10" class="entry-line">
            <div class="title">图片验证码</div>
            <input v-model="user.sms_code" placeholder="请输入图片验证码" type="text" />
            <div class="imgcode">
              <img v-if="val_code_url" :src="val_code_url" @click="handleChangeValUrl">
            </div>
          </div>
          <div class="entry-line">
            <div class="title">验证码</div>
            <input v-model="user.captcha" placeholder="请输入验证码" type="text" />
            <button @click="setCountDown()" :disabled="countDown.disabled">
              <span class="fs-16">{{countDown.title }}</span>
            </button>
          </div>
          <p>
            验证码已发送，
            <span style="color:red;">{{countDown.disabled?countDown.title:'60'}}</span>秒内输入有效
          </p>
          <div class="tel">
            <span>短信用不了？您还可以线下联系客服进行申诉</span>
          </div>
          <div @click="btnNext(2)" class="next-btn">下一步</div>
        </section>

        <section v-if="step==2" class="step-entry">
          <div class="entry-line">
            <div class="title">新密码</div>
            <input placeholder="请输入新密码" type="text" />
          </div>
          <div class="entry-line">
            <div class="title">确认密码</div>
            <input placeholder="请输入确认密码" type="text" />
          </div>
          <div style="height:30px;"></div>
          <div @click="btnNext(3)" class="next-btn">确认</div>
        </section>

        <section class="step-entry" v-if="step==3">
          <div class="password-success">
            <span></span>
            <i>您已成功重置密码</i>
          </div>
          <div class="btn-login">
            <span @click.stop="btnNext(3)">立即登录></span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// import * as API_Passport from '@/api/passport'
// import * as API_Common from '@/api/common'
// import { RegExp } from '@/ui-utils'
// import Storage from '@/utils/storage'

export default {
  data() {
    return {
      step: 1,
      isPhone: 1,
      val_code_url: "",
      user: {
        password: "",
        sms_code: "",
        captcha: '',
        phone: ''
      },
      countDown: {
        title: "获取验证码",
        time: 60,
        disabled: false
      }
    };
  },
  methods: {
    /** 改变图片验证码URL */
    handleChangeValUrl() {
      this.val_code_url = API_Common.getValidateCodeUrl(this.uuid, 'LOGIN')
    },
    btnNext(type) {
      this.step = type;
    },
    setCountDown(val = {}) {

      let time = val.time || 60;
      this.countDown = {
        title: `正在发送(${time})`,
        disabled: true
      };
      let timeOut = setInterval(() => {
        time--;
        this.countDown.title = `正在发送(${time})`;
        this.countDown.disabled = true;
        if (time == 0) {
          clearInterval(timeOut);
          this.countDown = {
            title: "获取验证码",
            disabled: false
          };
          return false;
        }
      }, 1000);
    }
  },
  created() { }
};
</script>

<style lang='less' scoped>
.password-modify {
  * {
    box-sizing: border-box;
  }
  width: 1200px;
  margin: 0 auto;
  .password-nav {
    background-color: #f2f2f2;
    padding: 30px 0;
    display: flex;
    align-items: center;
    span {
      font-size: 24px;
    }
    img {
      margin-left: 10px;
    }
    .line {
      height: 50px;
      margin-left: 15px;
      width: 2px;
      background-color: #fff;
      margin-right: 15px;
    }
  }
  .password-body {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.password-set {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 0;
  .next-btn {
    width: 100%;
    text-align: center;
    border-radius: 3px;
    padding: 12px 0;
    background-color: red;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
  }
  .active {
    color: red;
    i {
      background-image: url("data:image/png;base64,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") !important;
    }
  }
  .active-line {
    background-color: red !important;
  }
  .steps {
    display: inline-flex;
    padding-bottom: 15px;
    position: relative;
    padding: 0 20px;
    z-index: 1;
    .step-title {
      display: flex;
      flex-direction: column;
      width: 41px;
      position: relative;
      z-index: 2;
      div {
        position: relative;
        z-index: 111;
        span {
          white-space: nowrap;
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 555;
        }
      }
      i {
        width: 43px;
        height: 43px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 43px;
        color: #fff;
        font-size: 20px;
        background-image: url("data:image/png;base64,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");
      }
    }
    .step-line {
      display: flex;
      padding: 0 5px;
      // margin-right: 5px;
      width: 180px;
      margin-top: 20px;
      i {
        height: 2px;
        width: 50%;
        background-color: #eee;
      }
      span {
        height: 2px;
        width: 50%;
        background-color: #eee;
      }
    }
  }
  .step-entry {
    margin-top: 30px;
    padding: 0 20px;
    p {
      color: #999;
      padding-left: 10px;
      padding-top: 5px;
    }
    .tel {
      margin-top: 20px;
      width: 100%;
      color: #999;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 7px;
    }
    .get-password-type {
      width: 100%;
      display: flex;
      .isPhone {
        border-bottom: 2px solid red;
        font-weight: bold;
      }
      span {
        font-size: 13px;
        cursor: pointer;
        border-bottom: 2px solid #eee;
        width: 50%;
        text-align: center;
        padding: 10px 0;
      }
    }
    .entry-line {
      width: 100%;
      margin-top: 30px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      height: 40px;
      border: 1px solid #ddd;
      border-radius: 3px;
      .title {
        width: 100px;
      }
      input {
        width: 180px;
      }
      button {
        background-color: transparent;
        border: 0;
        span {
          font-size: 12px;
          margin-left: 100px;
        }
      }
      .imgcode {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
      img {
        width: 120px;
        height: 40px;
        background-color: #999;
      }
    }
    .btn-login {
      margin-top: 50px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #3636e2;
        cursor: pointer;
        font-size: 13px;
        margin-left: 20px;
      }
    }
    .password-success {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
      }
      span {
        width: 28px;
        height: 28px;
        background-size: 100%;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEUElEQVRoQ91aTYwURRT+XvWgB6FXg0QOaDx4YpkeMJElERNIMKJmTUiU6MGoMZKw8+NRLwa4aTg5PbMkgInGgwYOZtkoEDfhoCaiCbIzLidP7B4gQOI0aqKZrmeqp2fTzPRMd810DwyTzKnf+973VVfVq3qvCQn9zOrWZ9CUL5PAJgY2wfvz4y14WgawQsAKS6wgI7518pd/TSI0DQryUHVyY8YV00z0LIC9AB7TxLoO4Bwx/9Q05Pzf+aVrmv6todF12lCdXPufK/JMNAPgCV3/HvZXiXn2AUNWb+SX/tLB1BJgVrJ5sJgBeLNOkPi2dAUkZ51CvRrXJ5YAs/r0U5DNYwD2xAUe0m4BInPQyV/6IwonUoBpZ18E6EsA66PAEn5+C+A3nWL9bD/cvgJMO1cEuJwwMU04KjnFRbuXU08BZsV6HYyvNKOlY054wynUvg4DDxXwcHlbTpJ7OR02g6EKNrb+WfptsdO7S4Da3w1p/ALAT0KDBUzBa9kV7vbOfNElwKxYZ8CYToHA8JCEeadQeyUIdIeA1j5PleEjpYhAXAjmiVUBKsP+KzMX00tSSYmiKw+K5lQ7Y68KmChnP2Cij5MKkyYOMX/YKNU/UTE8Af7CvZjg2SZN/gr7qivcKbWgPQETZesgE2bTjtobn21mXCJBh8B4Mg4PYsw0SrVjngDTzp0C+LU4jknbEHh/o1g/7fH41DoMgUPxYtBpp7i4vyWgYt0A49F4jslZBcm3BtJSR/R4J1HCTadQ20DrqrmdJPmH5GjFQ+okv7a8bbMg9xSAyXgIAAt6jvReW1zo/nZJkPciSByhCds6ycC7yVCLRkmMfGsL/YxM2zoH4IXo0MNbJEneZ3NeCfhdZ94NKiMF8orKEpl2tgGQqUHsrGiKGblG7gDzRwBF3o9TIg+AHW0BzPzO7VL9cyX4kdktltsUc6DeySc98oqBJ0BzCkkccd6vHW6/MbNiTYExF1YXSpe8x0BNIf1F3EXM3rJLgOaCU3EE5JWA8wNvo11ZtGrthcQZAGtGRN7fRrXOH3cu9U6i6yq5fYJlpn22UdaDZNjYG4pKZF5RVkp1Bx7o1ykiCJIqeRVIiO3+adRShVXd4uwq1zARqZMHrjvF2sa2ALUtvjXQK/CdgiJGQF5F/cIp1t72LzTZ95jo+DAClC8RjrKLfyDwatrZnZgPNEr1E/fHlVKN3lhf6pWAsS+rKBFjXdhaPdvY1vcjbGTo7hsLTrH2fNCpuzba6sb8fBcaGlFibkFkdnR2bULL635X5rsoxNE+55fCujW9Gxz3RHemPUS9uzT9W0z3QpemT3fGS55R08Dv1szfhYbHsmBjOqwr03cRhwnyir9sHB9Z44Mw75J7IE73PvINBAWNbaM7KGKsPzUICml97GHsY6LdIN6tXRwm3ATTBWK+0DTcb+JMl7DprTWF+i14r0jc5D1xPrfhDC3czi/+GLWBxHn+P9T1AqhMJ7f6AAAAAElFTkSuQmCC");
      }
    }
  }
}
</style>
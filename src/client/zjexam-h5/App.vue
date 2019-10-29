<template>
  <div class="fs-14 h-all auto">
    <transition :name="transitionName">
      <router-view :class="{'pb50':isFooter}" class="w-all child-view"></router-view>
    </transition>
    <footer v-if="isFooter" class="jb-foot flex fc-b h-50 w-all sha-6 jc-b ai-c">
      <div @click="toMenu(1)" :class="{'jb-fc':navTab==1,'fc-999':navTab!=1}" class="flex-line fd-c wb-33 jc-c ai-c">
        <span class="iconfont fs-26  iconhome"></span>
        <span class="fs-12 mt2">首页</span>
      </div>
      <div v-if="[1].includes(examType)" @click="toMenu(2)" :class="{'jb-fc':navTab==2,'fc-999':navTab!=2}" class="flex-line fd-c wb-33 jc-c ai-c">
        <span class="iconfont fs-24 iconqq"></span>
        <span class="fs-12 mt2">加入我们</span>
      </div>
      <div @click="toMenu(3)" :class="{'jb-fc':navTab==3,'fc-999':navTab!=3}" class="flex-line fd-c wb-33 jc-c ai-c">
        <span class="iconfont fs-24 iconuser1"></span>
        <span class="fs-12 mt2">我的</span>
      </div>
    </footer>
  </div>
</template>

<script>
import configs from 'lib/config.js';
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['isFooter', 'userinfo', 'isHeight']),
  },
  watch: {
    $route(to, from) {
      if (to.meta.history < from.meta.history) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      if (this.$route.name.includes('user')) {
        this.navTab = 3;
      } else if (this.$route.name.includes('contact')) {
        this.navTab = 2;
      } else {
        this.navTab = 1
      }
    }
  },
  data() {
    return {
      miHeight: '0',
      transitionName: "slide-left",
      navTab: 1,
      examType: 1
    }
  },
  methods: {
    toMenu(type) {
      if ([2, 3].includes(type) && !this.userinfo) {
        this.$router.push({ name: 'login' });
        return;
      }
      if (type == 3) {
        this.$router.push({ name: 'user' })
      } else if (type == 1) {
        this.$router.push({ name: 'index' })
      } else if (type == 2) {
        this.$router.push({ name: 'contact' })
      }
    }
  },
  mounted() {
    this.$nextTick(res => {
      if (!this.isHeight) {
        this.miHeight = window.screen.height + 'px';
      }
    })
  },
  created() {
    this.examType = configs.getEnvName();
  }
}
</script>
<style lang="less">
@import "../../css/app.less";
.child-view {
  position: absolute;
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}

.jb-page {
  overflow: auto;
  position: static;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.jb-foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fafafa;
  z-index: 10;
}
.jb-bc {
  background-color: #ff8600;
  color: #fff;
}
.jbbc {
  background-color: #f0f4f7;
}
.jb-bb {
  border: 1px solid #ff8600;
}
.jb-fc {
  color: #ff8600;
}
.mint-msgbox {
  .mint-msgbox-btn {
    font-size: 16 / @bs;
  }
}
.btnset {
  background-color: #ff8600;
  color: #fff;
  padding: 10 / @bs;
  padding-bottom: 16 / @bs;
  width: 200 / @bs;
  display: inline-block;
  border-radius: 5 / @bs;
  font-size: 16 / @bs;
  position: relative;
  text-align: center;
  &:after {
    content: "";
    width: 100%;
    border-bottom-left-radius: 5 / @bs;
    border-bottom-right-radius: 5 / @bs;
    height: 3 / @bs;
    background-color: #d67100;
    position: absolute;
    left: 0;
    bottom: 1 / @bs;
  }
}
</style>

<template>
  <div class='w-all ff h-all'>
    <section class="w-all h-all flex">
      <section class="w-220 bc-bs1 hi-100">
        <div class="h-45 bc-bs11 flex fc-fff ai-c sha-b jc-c">
          <span class="icon fs-28 mr10 icongexingtouxiang"></span><span class="fs-14">平安淡然</span>
        </div>
        <div class="mt5">
          <el-menu @select="menuSelect" class="br-0 menu-config">
            <transition v-for="(item, index) in menunave" :key="index">
              <el-submenu v-if="item.children.length" :index="item.name">
                <div slot="title">
                  <i :class="item.meta.icon" class="icon mr12"></i>
                  <span slot="title">{{item.meta.title}}</span>
                </div>
                <el-menu-item-group>
                  <el-menu-item class="menu-config-item" v-for="(child, index) in item.children" :key="index" :index="child.name">
                    <i :class="child.meta.icon" class="icon mr6"></i><span>{{child.meta.title}}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item v-else class="menu-config-title" :index="item.name">
                <i :class="item.meta.icon" class="icon mr12"></i>
                <span slot="title">{{item.meta.title}}</span>
              </el-menu-item>
            </transition>
          </el-menu>
        </div>
      </section>
      <section class="flex-1">
        <div class="h-45 bc-bs10 flex ai-c sha-b jc-b">
          <span></span>
          <div>

          </div>
        </div>
        <router-view></router-view>
      </section>
    </section>
  </div>

</template>

<script>
import { menu } from "./router.js";
export default {
  data() {
    return {
      menunave: []
    }
  },
  methods: {
    menuSelect(value) {
      this.$router.push({ name: value });
    }
  },
  created() {
    let nav = JSON.parse(JSON.stringify(menu));
    nav.forEach(v => {
      if (v.level) {
        v.children = nav.filter(child => { return child.pre == v.level });
        this.menunave.push(v);
      }
    });
  }
}
</script>

<style lang='less'>
@import "~@css/pc.less";
@import "~element-ui/lib/theme-chalk/index.css";
@import "~vue-loading-new/dist/vueLoadingNew.css";
.ff {
  font-family: tahoma, "microsoft yahei", "\5FAE\8F6F\96C5\9ED1" !important;
}
.fc-bs1 {
  color: #587ed1;
}
.fc-bs2 {
  color: #4778c7;
}
.fc-bs3 {
  color: #1eadf3;
}
.fc-bs4 {
  color: #78a7ff;
}
.fc-bs5 {
  color: #c4e4ef;
}
.bc-bs1 {
  background-color: #1b2737;
}
.bc-bs2 {
  background-color: #2b3953;
}
.bc-bs3 {
  background-color: #3d444a;
}
.bc-bs4 {
  background-color: #999999;
}
.bc-bs5 {
  background-color: #f5f5f5;
}
.bc-bs6 {
  background-color: #587ed1;
}
.bc-bs7 {
  background-color: #4778c7;
}
.bc-bs8 {
  background-color: #1eadf3;
}
.bc-bs9 {
  background-color: #78a7ff;
}
.bc-bs10 {
  background-color: #1976d2;
}
.bc-bs11 {
  background-color: #2487e8;
}
.menu-config {
  .el-submenu__title {
    background-color: #1b2737;
    color: #c4e4ef;
    i {
      color: #c4e4ef;
    }
  }
  .el-menu-item-group__title {
    padding: 0;
  }
  .menu-config-item {
    i {
      color: #c4e4ef;
    }
    background-color: #2b3953;
    color: #c4e4ef;
    padding-left: 43px !important;
    &.is-active {
      color: #fff !important;
      position: relative;
      background-color: #1eadf3;
      i {
        color: #fff;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        background-color: #587ed1;
        height: 100%;
      }
    }
  }
  .menu-config-title {
    i {
      color: #c4e4ef;
    }
    background-color: #1b2737;
    color: #c4e4ef;
    &.is-active {
      color: #fff !important;
      position: relative;
      background-color: #1eadf3;
      i {
        color: #fff;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        background-color: #1eadf3;
        height: 100%;
      }
    }
  }
}
</style>

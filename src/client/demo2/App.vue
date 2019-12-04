<template>
  <div class='w-all ff h-all'>
    <section class="w-all h-all flex">
      <section class="w-220 bc-bs1 hi-100">
        <div class="h-45 bc-bs11 flex fc-fff ai-c jc-c">
          <span class="icon fs-30 mr10 fc-bs6 icongexingtouxiang"></span><span class="fs-14">平安淡然</span>
        </div>
        <div class="mt5">
          <el-menu @select="menuSelect" class="br-0 menu-config">
            <transition v-for="(item, index) in menunave" :key="index">
              <el-submenu class="menu-config-title" v-if="item.children.length" :index="item.name">
                <div slot="title">
                  <i :class="item.meta.icon" class="icon mr12"></i>
                  <span class="title" slot="title">{{item.meta.title}}</span>
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
      <section class="flex-1 h-all fd-c flex">
        <div class="h-45 bc-bs10 flex ai-c jc-b">
          <span></span>
          <div class="mr10">
            <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
          </div>
        </div>
        <div class="pp10 bc-bs flex-1 auto">
          <router-view></router-view>
        </div>
      </section>
    </section>
  </div>

</template>

<script>
import Scrollbar from 'smooth-scrollbar';
import { menu } from "./router.js";
export default {
  data() {
    return {
      menunave: []
    }
  },
  mounted() {
    // this.$nextTick(res=>{
    //   Scrollbar.init(this.$refs.scrollbar,{damping:0.1});
    // })
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
.menu-config {
  .menu-config-title {
    background-color: #1b2737;
    border-bottom: 1px solid #000;
    border-top: 1px solid #333f4a;
    line-height: 48px !important;
    color: #c4e4ef;
    i {
      color: #c4e4ef;
    }
    &:first-child {
      border-top: 0;
    }
    .el-submenu__title {
      background-color: #1b2737;
      color: #c4e4ef;
    }
    .el-menu-item-group__title {
      padding: 0;
    }
    .menu-config-item {
      background-color: #2b3953;
      i {
        color: #c4e4ef !important;
      }
      background-color: #2b3953;
      color: #c4e4ef !important;
      padding-left: 40px !important;
    }
    .el-menu--inline {
      border-top: 1px solid #000;
    }
    .is-active {
      position: relative;
      background-color: #314f75;
      &:before {
        content: "";
        height: 100%;
        width: 4px;
        position: absolute;
        background-color: #1976d2;
        top: 0;
        left: 0;
      }
    }
    &.is-active {
      color: #1976d2;
      i {
        color: #1976d2;
      }
      .title {
        color: #1976d2 !important;
      }
    }
  }
}
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
.fc-bs6 {
  color: #1b2737;
}
.fc-bs6 {
  color: #1b2737;
}
.fc-bs7 {
  color: #2b3953;
}
.fc-bs8 {
  color: #3d444a;
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

.table {
  thead tr td {
    padding: 15px 10px;
    background-color: #f5f6f6;
    font-weight: bold;
    font-size: 13px;
    color: #888;
  }
  tbody tr td {
    padding: 15px 10px;
  }
  tbody tr {
    color: #555;
    &:hover {
      background-color: #f2f2f2;
      color: #000;
      cursor: pointer;
    }
  }
}
.active {
  &:hover {
    color: #1eadf3;
  }
}
.module-dialog {
  .el-dialog__headerbtn {
    top: 10px;
    right: 10px;
    font-size: 22px;
  }
  .el-dialog__header {
    padding: 10px 15px 0;
  }
  .el-dialog__body {
    padding: 15px;
  }
  .el-dialog__footer {
    padding: 0 15px 10px;
  }
}
.dialog-table {
  tr td {
    padding: 5px;
    border: 1px solid #f2f2f2;
  }
}
</style>

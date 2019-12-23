<template>
  <div class='w-all wi-1100 ff h-all'>
    <section class="w-all h-all flex">
      <section class="w-220 bc-bs1 hi-100">
        <div class="h-45 bc-bs11 flex fc-fff ai-c jc-s">
          <span class="icon fs-30 mr10 fc-fff pl20 icongexingtouxiang"></span><span class="fs-14">平安淡然</span>
        </div>
        <div class="mt5">
          <el-menu @select="menuSelect" class="br-0 menu-config">
            <transition v-for="(item, index) in menunave" :key="index">
              <el-submenu class="menu-config-title" v-if="item.children.length" :index="item.name">
                <div slot="title">
                  <i :class="item.meta.icon" class="icon mr12"></i>
                  <span class="title" slot="title">{{item.title}}</span>
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
          <div class="mr10 flex ai-c ai-c">
            <span class="icon fc-fff fs-20 mr5 iconyonghu_fill"></span>
            <el-dropdown>
              <span class="fc-fff hand fs-14">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="fc-fff fs-16 ml10">{{user.name}}</span>
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
import Scrollbar from "smooth-scrollbar";
import { menu } from "../router.js";
export default {
  data() {
    return {
      menunave: [],
      user: this.session("userinfo")
    };
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
    let nav = JSON.parse(
      JSON.stringify(
        menu.find(v => {
          return v.name == "manage";
        }).children
      )
    );
    nav.forEach(v => {
      if (v.level) {
        v.children = nav.filter(child => {
          return child.pre == v.level;
        });
        this.menunave.push(v);
      }
    });
  }
};
</script>

<style lang='less'>
</style>

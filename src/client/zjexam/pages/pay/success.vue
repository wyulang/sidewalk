<template>
  <div class='w-1200 m-auto'>
    <div class="pt10 pb10">
      您现在的位置：注册 ＞ 套餐购买 ＞ <span class="jb-fc">{{type==1?'购买成功':'购买失败'}}</span>
    </div>
    <div v-if="type==1" class="mt30 flex ai-c fd-c jc-c">
      <div style="background-color:#f9f9f9" class="h-72 fs-43d18b ai-c flex wb-80">
        <span class="iconfont fs-35 ml20 iconxiaoxi-chenggong"></span>
        <span class="fs-18 ml20">恭喜你，购买成功，请点击“返回首页”按钮直接使用网站功能。</span>
      </div>
      <div @click="$router.push({name:'index'})" class="jb-bc h-40 fs-16 lh-40 mt100 hand ra-3 pl50 pr50">返回首页</div>
    </div>
    <div v-if="type==0" class="mt30 flex ai-c fd-c jc-c">
      <div style="background-color:#f9f9f9" class="h-72 red ai-c flex wb-80">
        <span class="iconfont fs-25 ml20 iconicon-error"></span>
        <span class="fs-16 ml20">对不起，购买失败，请您重试！</span>
      </div>
      <div @click="$router.push({name:'pay',query:{type:$route.query.type}})" class="jb-bc h-40 fs-16 lh-40 mt100 hand ra-3 pl50 pr50">重新购买</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: null
    }
  },
  methods: {
  },
  created() {
    this.type = this.$route.query.r;
  }
}
</script>

<style lang='less' scoped>
.fs-43d18b {
  color: #43d18b;
}
</style>

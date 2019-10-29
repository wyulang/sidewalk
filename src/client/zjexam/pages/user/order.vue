<template>
  <div class='w-all pp20'>
    <div v-if="list.length>0">
      <div v-for="(item, index) in list" :key="index" class="b-d mb20">
        <div class="h-35 flex ai-c jc-b bb-d pl20 pr20">
          <span>订单号：{{item.orderNumber}}</span>
          <span>{{item.createTime}}</span>
        </div>
        <div class="h-35 flex ai-c pl20 pr20">
          <span class="wb-40 flex ai-c h-all br-d">{{item.goodsName}}</span>
          <span class="pl10 fs-15">￥{{item.goodsPrice/100}}</span>
        </div>
      </div>

      <div class="w-all"></div>
    </div>
    <div v-if="list.length==0" class="flex h-350 ai-c jc-c fd-c mb100">
      <span class="iconfont iconNotes fc-ccc fs-100"></span>
      <div><span>没有订单，</span><span @click="$router.push({name:'pay',query:{type:'all'}})" class="jb-fc hand">去预约</span></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['userinfo'])
  },
  data() {
    return {
      list: [],
      canBuyReport: false
    }
  },
  methods: {
    ...mapActions(['getOrderPaidList']),
  },
  created() {
    this.getOrderPaidList().then(res => {
      if (res.code == 20000) {
        this.list = res.data.array;
        let hasProcess = this.list.some(v => { return v.goodsType == 107 });
        this.canBuyReport = hasProcess && this.userinfo.studentClass === 3 && !this.userinfo.isReportPay
      }
    })
  }
}
</script>

<style lang='less' scoped>
</style>

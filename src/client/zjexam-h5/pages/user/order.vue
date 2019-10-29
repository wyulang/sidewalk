<template>
  <div class="w-all fs-14 bc-fff">
    <div v-if="hasOrder" class="w-all">
      <div v-for="(item, idx) in orderList" :key="idx" class=" w-all pt10">
        <div class="flex jc-b mb10 pl15 pr15">
          <span>订单号：{{item.orderNumber}}</span>
          <span>{{item.createTime}}</span>
        </div>
        <div class="mb10 pl15 pr15">购买内容：{{item.goodsName}}</div>
        <div class="pl15 pr15 pb10">购买金额：{{item.goodsPrice/100}}元</div>
        <div v-if="item.orderType==1" class="pl15 pr15 pb10">账号说明：您目前可使用{{item.oldPhone}}账号进行登录使用，联通卡将在您申请后尽快寄出，收到后请采用新联通号码加验证码的方式重新登录使用，您的信息不会有任何变化。收到卡后，您的原号码将在一段时间后失效。</div>
        <div v-if="item.orderType==1" class="pl15 pr15 pb10">您的新手机号：{{item.newPhone}}</div>
        <div class="h-10 bc-f2"></div>
      </div>
      <div v-if="canBuyReport" class="flex jc-c mt25">
        <div @click="payReportOrder" class="btnset">购买报告</div>
      </div>
    </div>
    <div v-if="!hasOrder" class="w-all ">
      <div class="h-50"></div>
      <div class="flex fd-c jc-c ai-c">
        <i class="icon iconfont iconNotes fs-80 fc-ccc"></i>
        <span class="fc-999 mt15">目前没有订单</span>
        <div class="flex jc-c mt25 h-75">
          <div @click="goPaymentPage()" class="w-200 jb-bc flex h-40 ra-5 ai-c jc-c fs-15">去预约</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      orderList: [],
      hasProcess: true,
      userData: null,
      canBuyReport: false,
      hasOrder: true
    }
  },
  methods: {
    ...mapActions(['getOrderList']),
    initData() {
      let that = this
      this.getOrderList().then(res => {
        let _hasProcess = false
        let _orderList = res.data.array
        _orderList.map((item, idx) => {
          if (item.goodsType === 107) {
            _hasProcess = true
          }
          item.createTime = item.createTime.split(' ')[0]
        })

        that.orderList = _orderList
        that.canBuyReport = _hasProcess && that.userData.studentClass === 3 && !that.userData.isReportPay
        that.hasOrder = _orderList.length > 0
      })
    },
    toPay() {

    },
    // 报告支付
    payReportOrder() {
      this.$router.push({ name: 'pay', query: { t: 'report' } })
    },
    // 跳转支付页面
    goPaymentPage() {
      this.$router.push({ name: 'pay', query: { t: 'all' } })
    }
  },
  created(){
    this.initData();
  }
}
</script>

<template>
  <div class="w-all bc-fff">
    <div class="h-150"></div>

    <div v-if="orderState=='ok'">
      <div class="flex jc-c"><span class="icon iconfont iconsuccess fs-70 fc-success"></span></div>
      <div class="centent fs-16 mt30">恭喜您，购买成功！</div>
      <div class="flex jc-c mt60 pt40 fd-c w-all ai-c">
        <div @click="golingtong" class="btnset mb50">去办理联通卡</div>
        <div @click="toHome">返回首页</div>
      </div>
    </div>

    <div v-if="orderState=='cancel'">
      <div class="flex jc-c"><span class="icon iconfont iconcancelcircle fs-70 fc-danger"></span></div>
      <div class="centent fs-16 mt30">对不起，您已取消购买！</div>
      <div class="flex jc-c mt60 pt40">
        <div @click="$router.push({name:'pay'})" class="btnset">重新购买</div>
      </div>
    </div>

    <div v-if="orderState=='fail'">
      <div class="flex jc-c"><span class="icon iconfont iconcancelcircle fs-70 fc-danger"></span></div>
      <div class="centent fs-16 mt30">对不起，您购买失败！</div>
      <div class="flex jc-c mt60 pt40">
        <div @click="$router.push({name:'pay'})" class="btnset">重新购买</div>
      </div>
    </div>

    <div v-if="orderState=='timeout'">
      <div class="flex jc-c"><span class="icon iconfont iconcancelcircle fs-70 fc-danger"></span></div>
      <div class="centent fs-16 mt30">订单超时请重新购买！</div>
      <div class="flex jc-c mt60 pt40">
        <div @click="$router.push({name:'pay'})" class="btnset">重新购买</div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      state: 0,
      time: 3,
      outTradeNo: null,
      loading: false,
      orderQuery: null,
      orderId: null,
      orderState: '',
      isBuy: false
    }
  },
  methods: {
    ...mapActions(['getUserInfo', 'orderByTrandeNo', 'orderByOrderId', 'zkJump', 'zkCheck']),
    golingtong() {
      if (this.isBuy) {
        this.$toast({ message: '您已经购买，无需重复购买', position: 'top' });
        return;
      }
      this.zkJump({}).then(res => {
        if (res.code == 20000) {
          window.location.href = res.message;
        }
      })
    },
    toHome() {
      this.getUserInfo().then(res => {
        if (res.code == 20000) {
          this.$router.push({ name: 'index' });
        }
      });
    },
    getOrderQuery() {
      this.$indicator.open({ spinnerType: 'fading-circle' });
      let that = this
      clearInterval(that.orderQuery)
      that.orderQuery = setInterval(() => {
        if (that.outTradeNo) {
          that.getOrderByTradeNo(that.outTradeNo)
        } else {
          that.getOrderByOrderId(that.orderId)
        }
      }, 2000)
    },
    // 获取支付结果 by trandno
    getOrderByTradeNo(tradeNo) {
      let that = this
      this.orderByTrandeNo({ outTradeNo: tradeNo }).then(res => {
        this.$indicator.close();
        if (res.code == 20000) {
          if (res.data.payStatus == '102') {
            clearInterval(that.orderQuery);
            that.orderState = 'ok'
          } else if (res.data.payStatus == '101') {
            clearInterval(that.orderQuery);
            that.orderState = 'cancel'
          } else if (res.data.payStatus == '103') {
            clearInterval(that.orderQuery);
            that.orderState = 'timeout'
          }
        }
      })
    },
    // 获取支付结果 by order
    getOrderByOrderId(orderId) {
      let that = this
      this.orderByOrderId({ orderId: orderId }).then(res => {
        this.$indicator.close();
        if (res.code == 20000) {
          if (res.data.payStatus == '102') {
            clearInterval(that.orderQuery);
            that.orderState = 'ok'
          } else if (res.data.payStatus == '101') {
            clearInterval(that.orderQuery);
            that.orderState = 'cancel'
          } else if (res.data.payStatus == '103') {
            clearInterval(that.orderQuery);
            that.orderState = 'timeout'
          }
        }
      })
    },
  },
  created() {
    this.outTradeNo = this.$route.query && this.$route.query.out_trade_no
    this.orderId = this.$route.query && this.$route.query.oid
    this.getOrderQuery();
    this.zkCheck().then(res => {
      if (res.code == 20000) {
        this.isBuy = res.message == 0;
      }
    })
  },
}
</script>
<style lang="less">
.btnset {
  background-color: #ff8600;
  color: #fff;
  padding: 25/75rem;
  padding-bottom: 35/75rem;
  width: 5.6rem;
  display: inline-block;
  border-radius: 10/75rem;
  font-size: 14px;
  position: relative;
  text-align: center;
  &:after {
    content: "";
    width: 100%;
    border-bottom-left-radius: 10/75rem;
    border-bottom-right-radius: 10/75rem;
    height: 6/75rem;
    background-color: #d67100;
    position: absolute;
    left: 0;
    bottom: 2/75rem;
  }
}
</style>
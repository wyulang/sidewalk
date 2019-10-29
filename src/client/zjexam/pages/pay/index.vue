<template>
  <div class="w-all">
    <div class='w-1200 m-auto'>
      <div class="pt10 pb10">
        您现在的位置：注册 ＞<span class="jb-fc">套餐购买</span>
      </div>
      <div class="flex jc-c mt20">
        <div class="pay-body">
          <div class="w-all center jb-fc fs-18 fw-7">{{curr.title}}</div>
          <div class="lists bd-color w-all pt10 ra-5 mt20">
            <div class="w-all pp20 fc-000 fs-14">
              <div v-if="curr.id==119" class="abouts">
                <div class="lh-30"><span>特权1：</span><span>购买后即可享受平台三位一体系统、志愿智能辅助报告系统及志愿查询系统。</span></div>
                <div class="lh-30"><span>特权2：</span><span>VIP用户可享受志愿填报相关问题专业咨询。</span></div>
                <div class="lh-30"><span>特权3：</span><span>赠送高一选课系统及院校招生计划查询系统的使用权限。</span></div>
                <div class="red">注意：购买三位一体系统的考生请确保您的综合素质评价等级均为“B”等（含）以上，并且所有科目学考成绩 均须合格。</div>
              </div>
              <div v-if="curr.id==113" class="abouts">
                <div class="lh-30"><span>特权1：</span><span>购买后即可享受平台志愿智能辅助报告系统与志愿查询系统。</span></div>
                <div class="lh-30"><span>特权2：</span><span>VIP用户可享受志愿填报相关问题专业咨询。</span></div>
                <div class="lh-30"><span>特权3：</span><span>赠送高一选课系统及院校招生计划查询系统的使用权限。</span></div>
              </div>
              <div v-if="curr.id==116" class="abouts">
                <div class="lh-30"><span>特权1：</span><span>购买后即可享受平台志愿查询系统。</span></div>
                <div class="lh-30"><span>特权2：</span><span>VIP用户可享受志愿填报相关问题专业咨询。</span></div>
                <div class="lh-30"><span>特权3：</span><span>赠送高一选课系统及院校招生计划查询系统的使用权限。</span></div>
              </div>
            </div>
            <div class="flex fd-c pb20">
              <div @click="getPayList(item)" v-for="(item, index) in list" :key="index" class="flex ai-c mb15 hand pl20">
                <span :class="{'iconradio active':item.select&&!item.isPay,'iconradio back-active':item.select&&item.isPay,'iconradio02':!item.select}" class="iconfont fs-23"></span>
                <div :class="[(item.isPay||item.id!=curr.id)?'nopay':('v-'+item.id)]" class="flex ai-c pl20 pt10 pb10 ra-5 w-400 ml20">
                  <div>
                    <span class="iconfont fs-42 iconVIP"></span>
                  </div>
                  <div class="fd-c flex ml20 fw-7 fc-fff fs-16">
                    <span class="mb10">{{item.txt}}</span>
                    <span class="flex ai-c">￥{{item.price/10}}<span v-if="item.isPay" style="font-weight: 300;" class="fs-12 ml10 fc-fff">(已购买)</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex ai-c jc-c mb30 mt30">
            <button @click="goodsPay" class="h-40 ra-2 outline w-150 jb-bc fs-16 mr20">付款</button>
            <button @click="$router.push({name:'index'})" class="h-40 ra-2 outline w-150 bc-9 fs-16 ml100">暂不购买</button>
          </div>
        </div>

      </div>
    </div>
    <div v-show="isPayShow" class="fixed at0 ab0 al0 ar0 w-all h-all hidden zi-9999 fc-000 ba-5">
      <div class="w-all h-all flex ai-c jc-c">
        <div style="width:648px;" class="pp20 rel bc-fff">
          <div class="abs ar10 at10">
            <span @click="clearTime" class="iconfont fs-25 hand icondelete"></span>
          </div>
          <div class="mt10 center fs-20">您购买金榜题名{{payUrl.title}}套餐：需要支付￥{{payUrl.price/100}}元</div>
          <div ref="isPayShow" class="w-all flex jc-c">
            <div class="flex-line jc-c rel mt20">
              <div class="flex jc-c fd-c mr56">
                <div class="flex-1 pp6 alipay">
                  <qriously :value="payUrl.zfb" :size="194" />
                </div>
                <div class="h-30 lh-27 bc-zfb fc-fff w-all pb3 center">支付宝</div>
              </div>
              <div class="flex fd-c jc-c">
                <div class="wx flex-1 pp6">
                  <qriously :value="payUrl.wx" :size="194" />
                </div>
                <div class="h-30 lh-27 bc-wx fc-fff w-all pb3 center">微信</div>
              </div>
              <div v-if="countDown.disabled" class="abs at0 ab0 al0 ar0 ba-5">
                <div class="w-all h-all flex ai-c fc-fff fs-16 jc-c">支付订单已超时，请重新购买</div>
              </div>
            </div>
          </div>
          <div class="w-all center fs-15 mt20">请选择支付方式扫码付款</div>
          <div class="w-all center mt5 mb10">支付剩余时间: <span class="red">{{countDown.title}}</span> </div>
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
      user: {},
      payUrl: {
        zfb: '',
        wx: '',
        title: '',
        price: ''
      },
      list: [
        { id: 116, payType: 'VIP3', isPay: false, isShow: true, txt: '高考志愿查询', price: 3650, title: '365元VIP服务大礼包', validity: '1年有效期', select: true, year: 1 },
        { id: 113, payType: 'report', isPay: false, isShow: true, txt: '志愿智能辅助报告', price: 6600, title: '660元VIP服务大礼包', validity: '1年有效期', select: false, year: 1 },
        { id: 119, payType: 'three', isPay: false, isShow: true, txt: '三位一体', price: 8600, title: '860元VIP服务大礼包', validity: '1年有效期', select: false, year: 1 },
      ],
      curr: {},
      isPayShow: false,
      countDown: {
        title: '15分0秒',
        disabled: false
      },
      timeOut: null,
      timeQuery: null,
    }
  },
  methods: {
    ...mapActions(['getOrderAdd', 'getOrderPay', 'getOrderQuery', 'getUserInfo']),
    clearTime() {
      clearInterval(this.timeQuery);
      clearInterval(this.timeOut);
      this.isPayShow = false;
    },
    getPayList(item) {
      this.list.forEach(v => { v.select = false });
      item.select = true;
      this.curr = item;
    },
    goodsPay() {
      if (this.curr.isPay) {
        this.$message.error('您已购买，无需购买')
        return;
      }
      if (this.user.userSource == 3) {
        this.$alert('请回到主平台，进行付费升级', '', {
          confirmButtonText: '好的，我知道了',
        })
        return;
      }
      this.isPayShow = true;
      this.$store.state.loadObj.target = this.$refs.isPayShow;
      this.$store.state.loadObj.background = "rgba(255, 255, 255, 1)";
      this.loader = this.$loading(this.$store.state.loadObj);
      this.getOrderAdd({ type: this.curr.id }).then(res => {
        if (res.code == 20000) {
          this.getOrderPay({ orderId: res.data.orderId }).then(os => {
            this.loader.close();
            if (os.code == 20000) {
              this.setHoverDown();
              this.payUrl = {
                zfb: os.data.alipay_qr_code,
                wx: os.data.wx_code_url,
                title: os.data.goodsName,
                price: os.data.orderPrice
              }
              this.timeQuery = setInterval(vs => {
                this.intervalQuery(os.data.orderId);
              }, 1000)
            }
          }).catch(err => {
            this.loader.close();
            this.$message.error(err.message);
          })
        }
      }).catch(v => {
        this.loader.close();
        this.$message.error(v.message);
      })
    },
    intervalQuery(oid) {
      this.getOrderQuery({ orderId: oid }).then(res => {
        if (res.code == 20000 && res.status == 'succ' && res.data.payStatus == '102') {
          this.$message.success('支付成功！');
          clearInterval(this.timeQuery);
          clearInterval(this.timeOut);
          this.getUserInfo();
          this.$router.push({ name: 'pay-success', query: { r: 1 } })
        } else if (res.data.payStatus == '103') {
          clearInterval(this.timeQuery);
          clearInterval(this.timeOut);
          this.$message.success('订单已取消！');
          this.$router.push({ name: 'pay-success', query: { r: 0, type: this.curr.id } })
        }
      })
    },
    setHoverDown() {
      let time = 15 * 60;
      this.countDown = {
        title: `15分0秒`,
        disabled: false
      }
      this.timeOut = setInterval(() => {
        time--;
        let h = parseInt(time / 60);
        let s = time - h * 60;
        this.countDown.title = `${h}分${s}秒`;
        this.countDown.disabled = false;
        if (time == 0) {
          clearInterval(this.timeOut);
          this.countDown = {
            title: '0',
            disabled: true
          }
          return false;
        }
      }, 1000)
    }
  },
  created() {
    if (this.$config.type == 2) {
      this.$message.error('本产品处于测试阶段，暂不支持购买');
      this.$router.push({ name: 'index' });
    }
    this.user = this.storage('userinfo');
    let query = this.$route.query.type;
    if (this.user.isCommonPay != 0) {
      this.list.find(v => { return v.id == 116 }).isPay = true;
    }
    if (this.user.isReportPay != 0) {
      this.list.find(v => { return v.id == 113 }).isPay = true;
    }
    if (this.user.isTrinity != 0) {
      this.list.find(v => { return v.id == 119 }).isPay = true;
    }
    // debugger;
    if (query == '113') {
      this.curr = this.list.find(v => { return v.id == 113 });
    }
    else if (query == '116') {
      this.curr = this.list.find(v => { return v.id == 116 });
    }
    else if (query == '119') {
      this.curr = this.list.find(v => { return v.id == 119 });
    } else {
      this.curr = this.list.find(v => { return !v.isPay });
      if (!this.curr) {
        this.curr = this.list[0];
      }
    }
    this.list.forEach(v => { v.select = false })
    this.curr.select = true;
  }
}
</script>

<style lang='less' scoped>
.pay-body {
  width: 660px;
  .active {
    color: #43d18b !important;
  }
  .v-119 {
    background-image: linear-gradient(90deg, #ff7b4a 0%, #ffa173 100%);
    .iconVIP {
      color: #ffe6d8;
    }
  }
  .v-113 {
    background-image: linear-gradient(90deg, #ff6767 0%, #ffa1b9 100%);
    .iconVIP {
      color: #ffa1b9;
    }
  }
  .v-116 {
    background-image: linear-gradient(90deg, #46acfc 0%, #78d6fd 100%);
    .iconVIP {
      color: #b3eafe;
    }
  }
  .nopay {
    background-color: #ccc;
    .iconVIP {
      color: #fff;
    }
  }
}
.lists {
  border: dashed 1px;
}
.alipay {
  border: 3px #03a0eb solid;
}
.wx {
  border: 3px #86c70d solid;
}
</style>

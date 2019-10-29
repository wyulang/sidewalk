<template>
  <div class='w-all'>
    <div class="w-all center pt15 pb15 fc-000 fs-17">{{curr.title}}</div>

    <div class="w-all pl15 pr15 lh-15 fs-14">
      <div v-if="curr.id==119">
        <div class="flex mb10"><span class="jb-fc w-50">特权1：</span><span class="flex-1">购买后即可享受平台三位一体系统、志愿智能辅助报告系统及志愿查询系统。</span></div>
        <div class="flex mb10"><span class="jb-fc w-50">特权2：</span><span class="flex-1">VIP用户可享受志愿填报相关问题专业咨询。</span></div>
        <div class="flex mb10"><span class="jb-fc w-50">特权3：</span><span class="flex-1">赠送高一选课系统及院校招生计划查询系统的使用权限。</span></div>
        <div class="red">注意：购买三位一体系统的考生请确保您的综合素质评价等级均为“B”等（含）以上，并且所有科目学考成绩 均须合格。</div>
      </div>
      <div v-if="curr.id==113">
        <div class="flex mb10"><span class="jb-fc w-50">特权1：</span><span class="flex-1">购买后即可享受平台志愿智能辅助报告系统与志愿查询系统。</span></div>
        <div class="flex mb10"><span class="jb-fc w-50">特权2：</span><span class="flex-1">VIP用户可享受志愿填报相关问题专业咨询。</span></div>
        <div class="flex mb10"><span class="jb-fc w-50">特权3：</span><span class="flex-1">赠送高一选课系统及院校招生计划查询系统的使用权限。</span></div>
      </div>
      <div v-if="curr.id==116">
        <div class="flex mb10"><span class="jb-fc w-50">特权1：</span><span class="flex-1">购买后即可享受平台志愿查询系统。</span></div>
        <div class="flex mb10"><span class="jb-fc w-50">特权2：</span><span class="flex-1">VIP用户可享受志愿填报相关问题专业咨询。</span></div>
        <div class="flex mb10"><span class="jb-fc w-50">特权3：</span><span class="flex-1">赠送高一选课系统及院校招生计划查询系统的使用权限。</span></div>
      </div>
    </div>

    <div class="h-10 w-all bc-fe mt10 mb15"></div>

    <div class="flex fd-c pl15 pr15">
      <div :class="[(item.isPay||item.id!=curr.id)?'nopay':('v-'+item.id)]" @click="getPayList(item)" v-for="(item, index) in list" :key="index" class="flex pt7 pb7 ra-5 bc-9 ai-c mb15 hand">
        <div class="flex ai-c pt10 pb10 ra-5 ml20">
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

    <div class="h-10 w-all bc-fe"></div>

    <div class="w-all">
      <div class="h-40 flex ai-c bb-e pl15 fs-16">请选择支付方式</div>
      <div v-if="!isWeiXin" @click="toPay('alipay')" class="h-50 bb-e flex ai-c jc-c">
        <div class="flex wb-49 jc-e"><i :style="{'color':isPay?'#aaa':'#0ae'}" class="icon iconfont iconzhifubao fs-30"></i></div>
        <span class="fs-16 flex-1">支付宝</span>
      </div>
      <div @click="toPay('wxpay')" class="h-50 flex ai-c jc-c">
        <div class="flex wb-49 jc-e"><i :style="{'color':isPay?'#aaa':'#3cb034'}" class="icon iconfont iconweixin fs-30 mr11"></i></div>
        <span class="fs-16 flex-1">微&nbsp;&nbsp;&nbsp;&nbsp;信</span>
      </div>
    </div>

    <div class="h-10 w-all bc-fe"></div>

    <div class="flex jc-c bc-fff ai-c pt25 pb25">
      <div @click="$router.push({name:'index'})" class="w-200 center pt10 pb10 jb-bc">暂不购买</div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { isWxBrowser } from 'lib/validator.js';
import api from '../../store/api.js';
export default {
  computed: {
    ...mapState(['userinfo'])
  },
  data() {
    return {
      list: [
        { id: 116, payType: 'VIP3', isPay: false, isShow: true, txt: '高考志愿查询', price: 3650, title: '《365元VIP服务大礼包》', validity: '1年有效期', select: true, year: 1 },
        { id: 113, payType: 'report', isPay: false, isShow: true, txt: '志愿智能辅助报告', price: 6600, title: '《660元VIP服务大礼包》', validity: '1年有效期', select: false, year: 1 },
        { id: 119, payType: 'three', isPay: false, isShow: true, txt: '三位一体', price: 8600, title: '《860元VIP服务大礼包》', validity: '1年有效期', select: false, year: 1 },
      ],
      curr: {},
      isWeiXin: isWxBrowser(),
      code: null,
    }
  },
  methods: {
    ...mapActions(['saveOrder', 'alipayWap', 'saveOrderByWxH5', 'saveOrderByWx', 'getUserInfo', 'getWxOpenidCode']),
    getPayList(item) {
      this.list.forEach(v => { v.select = false });
      item.select = true;
      this.curr = item;
    },
    alipay(orderId) {
      let that = this;
      this.$indicator.open({ spinnerType: 'fading-circle' });
      let url = api.env('payUrl') + "/#/pay/success?oid=" + oid;
      this.alipayWap({ orderId: orderId, retUrl: encodeURIComponent(url) }).then(res => {
        this.$indicator.close();
        that.alipayForm = res
        const alipayFormDiv = document.createElement('div')
        alipayFormDiv.innerHTML = that.alipayForm
        document.body.appendChild(alipayFormDiv)
        document.forms[0].submit()
      })
    },
    wxPay(oid) {
      this.$indicator.open({ spinnerType: 'fading-circle' });
      this.saveOrderByWx({ orderId: oid }).then(res => {
        this.$indicator.close();
        // alert(JSON.stringify(res))
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
          "appId": String(res.appid),
          "timeStamp": String(res.timestatm),
          "nonceStr": res.nonce_str,
          "package": 'prepay_id=' + String(res.prepay_id),
          "signType": "MD5",
          "paySign": String(res.sign2)
        },
          res => {
            this.$router.push({ name: 'success', query: { oid: oid } });
          });
      })
    },
    toPay(type) {
      if (this.curr.isPay) {
        this.$toast('当前选中套餐已购买，无需重新购买');
        return;
      }
      this.$indicator.open({ spinnerType: 'fading-circle' });
      this.saveOrder({ type: this.curr.id, orderType: this.$config.type }).then(res => {
        this.$indicator.close();
        if (res.code == 20000) {
          let oid = res.data.orderId;
          if (type === 'alipay') {
            this.alipay(oid)
          } else {
            if (this.isWeiXin) {
              this.wxPay(oid);
            } else {
              this.saveOrderByWxH5({ orderId: oid }).then(dal => {
                let url = api.env('payUrl') + "/#/pay/success?oid=" + oid;
                location.href = dal.mweb_url + '&redirect_url=' + window.encodeURIComponent(url);
              })
            }
          }
        }
      })
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
      if (r != null) return unescape(r[2]); return null;
    },
  },

  created() {
    if (this.$config.type == 2) {
      this.$toast('本产品处于测试阶段，暂不支持购买');
      this.$router.push({ name: 'index' });
    }
    this.code = this.$route.query.code;
    let query = this.$route.query.type;
    // console.log('ocde', this.code)
    this.$indicator.open({ spinnerType: 'fading-circle' });
    this.getUserInfo().then(res => {
      this.$indicator.close();
      //微信内部网页如果没有OPENID 需要先去拿openid
      if (this.isWeiXin && !this.userinfo.openid && !this.code) {
        let local = api.env('openUrl') + '/#/oauth';
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe5950dd78881d19b&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=' + this.$config.type + 'OAUTH' + query + '&connect_redirect=1#wechat_redirect'
      }
      if (!this.userinfo.openid && this.code) {
        this.getWxOpenidCode({ code: this.code });
      }
      if (this.userinfo.isCommonPay != 0) {
        this.list.find(v => { return v.id == 116 }).isPay = true;
      }
      if (this.userinfo.isReportPay != 0) {
        this.list.find(v => { return v.id == 113 }).isPay = true;
      }
      if (this.userinfo.isTrinity != 0) {
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
    })

  }
}
</script>

<style lang='less' scoped>
.bc-fe {
  background-color: #f0f4f7;
}
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
</style>

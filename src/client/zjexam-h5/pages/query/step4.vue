<template>
  <div class="w-all fs-14 bc-fff resut">
    <div v-if="!isShow &&isVertical" class="pt10 pb10 flex ai-c pl10 pr10 jc-c">
      <span class="jb-fc fs-14 flex-1">结果条数：{{isMaxCot}}条</span>
      <div @click="$router.push({name:'index'})" class="step-all mr10">返回首页</div>
      <div @click="isexp=!isexp;list.forEach(v=>{v.select=isexp})" class="step-all mr10">一键{{isexp?'收起':'展开'}}</div>
      <span @click="share" style="color:#68a5e1" class="iconqq1 icon fs-23 iconfont mr10"></span>
      <span @click="share" style="color:#3cb034" class="iconweixin icon fs-23 iconfont"></span>
    </div>

    <div v-if="!isShow&&isVertical">
      <div v-for="(item, index) in list" :key="index" class="resut-item">
        <div style="background:#ffd9b0;" @click="item.select=!item.select" class="flex ai-c pt7 pb7 pl10 pr10">
          <span class="flex-1">{{item.university}}</span>
          <div class="marks">
            <span :class="{'ic-c':item.policy=='101','ic-w':item.policy=='102','ic-b':!['101','102'].includes(item.policy)}" class="icon iconfont fs-22 iconbookmark2"></span>
            <i>{{ item.policy==101?"冲":(item.policy==102?"稳":"保") }}</i>
          </div>
          <div class="w-150 auto pt5 pb5 ml5">{{item.major}} ({{ item.mlevel=="本科"?"本":"专" }})</div>
          <i :class="{'item-up-show':item.select}" class="icon iconfont iconicon-arrow-bottom2 fs-13 c-555 ml10 item-up"></i>
        </div>
        <div :class="{'item-trans':item.select}" class="item-about">
          <div class="flex jc-b ai-c pt10 pb10 pl10 pr10 fs-13">
            <span class="wb-33">院校代码: {{item.incode}}</span>
            <span class="wb-33">专业代码: {{item.mcode}}</span>
            <span class="wb-33">学制/学费: {{item.year}} / {{item.fee}}</span>
          </div>
          <div class="flex jc-b ai-c pt10 pb10 pl10 pr10 fs-13 bc-f2">
            <span class="wb-50">所在地区: {{item.province}}/{{item.city}}</span>
            <span class="wb-50">主管部门: {{item.dept}}</span>
          </div>
          <div class="flex jc-b ai-c pt10 pb10 pl10 pr10 fs-13">
            <span class="w-all">2018录取最低成绩/位次号: {{item.lowscore2018 ? item.lowscore2018 : '-'}} / {{item.lowrank2018 ? item.lowrank2018 :'-'}}</span>
          </div>
          <div v-if="item && item.remark" class="flex jc-b ai-c pt10 pb10 pl10 pr10 fs-13 bc-f2">
            <span class="w-all lh-16">简注：{{item.remark}}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isShow&&!isVertical" class="w-all flex list-hall fd-c fs-7">
      <div class="flex ai-c  jb-bc">
        <span class="fc-fff  flex-1 ml10">结果条数：{{isMaxCot}}条</span>
        <div @click="$router.push({name:'index'})" class="ra-3 bc-fff pt5 pb5 mt3 mb3 pl10 mr10 pr10 jb-fc fr">返回首页</div>
      </div>
      <div class="flex fs-7 jb-fc bc-e7eef4">
        <div class="w-35 h-20 lh-20 center br-f">院校代码</div>
        <div class="flex-1 lh-20 mi-80 pl2 br-f">院校名称</div>
        <div class="w-35 lh-20 center br-f">专业代码</div>
        <div class="w-90 lh-20 br-f pl2">专业名称 </div>
        <div class="wb-12 lh-20 br-f pl2">主管部门</div>
        <div class="w-35 center lh-20 br-f">所在地区</div>
        <div class="w-35 center lh-20 br-f">学制/学费</div>
        <div class="w-45 jc-c flex ai-c">18年录取最<br />低分数/位次</div>
      </div>
      <div class="flex-1 hv-all auto">
        <div :class="{'bc-f1':index%2}" v-for="(item, index) in list" :key="index" class="flex fd-c fs-6 ai-c bb-e pt4 pb3">
          <div class="flex w-all">
            <div class="w-35 center">{{item.incode}}</div>
            <div class="flex-1 mi-80 pl2">{{item.university}}</div>
            <div class="w-35 center">{{item.mcode}}</div>
            <div class="w-90">
              <div class="rel fl">
                <span :class="{'ic-c':item.policy=='101','ic-w':item.policy=='102','ic-b':!['101','102'].includes(item.policy)}" class="icon iconfont rel zi-100 fs-12 iconbookmark2"></span>
                <i class="abs zi-130 fc-fff al3 at2">{{ item.policy==101?"冲":(item.policy==102?"稳":"保") }}</i>
              </div>
              {{item.major}}({{ item.mlevel=="本科"?"本":"专" }})
            </div>
            <div class="wb-12 pl2">{{item.dept}}</div>
            <div class="w-35 center">{{item.province}}{{item.city==item.province?'':item.city}}</div>
            <div class="w-35 center">{{item.year}} / {{item.fee}}</div>
            <div class="w-45 jc-c flex ">{{item.lowscore2018 ? item.lowscore2018 : '-'}} / {{item.lowrank2018 ? item.lowrank2018 :'-'}}</div>
          </div>
          <div class="w-all pl10 lh-8 pt3 fc-999">
            简注：{{item.remark}}
          </div>
        </div>
      </div>
    </div>

    <div v-if="isShow" class="w-all fs-16">
      <div class="w-all h-250"></div>
      <div class="w-all centent">没有匹配到相关的院校和专业</div>
      <div class="w-all centent mt10">请适当调整你的筛选条件</div>
    </div>

    <div :class="{'share-show':isShare}" class="share fc-fff br-10">
      <div class="w-all pt10 pb10 pl20">
        <div class="mb10">使用浏览器的分享功能，把查询结果分享出去吧！</div>
        <div>ios系统请点击<i class="icon iconfont iconfenxiang fs-22 ml10 mr10"></i> android系统使用 <i class="icon iconfont iconshare_icon fs-22"></i></div>
      </div>
    </div>

    <div v-if="isMaxCot>200" class="share fc-fff fs-12 ra-5 share-show h-70">
      <div class="w-all pt10 pl20 ">
        <div class="mb20 lh-20">当前筛选条件过于宽泛，导致查询结果条数过多，请精简筛选条件，确保查询结果条数在200条以内 <span @click="$router.push({name:'query'})" class="ff-b"> 重新查询>></span> </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { isWxBrowser } from 'lib/validator.js';
export default {
  data() {
    return {
      isexp: false,
      list: [],
      pagesize: 0,
      iswx: isWxBrowser(),
      isShare: false,
      isShow: false,
      isVertical: true,
      isMaxCot: 0
    }
  },
  mounted() {
    let that = this
    window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', () => {
      that.orientationFun()
    }, false)
  },
  methods: {
    ...mapActions(['getResultByCategory', 'getResult', 'saveResult']),
    orientationFun() {
      if (window.orientation === 90 || window.orientation === -90) {
        this.isVertical = false
      } else {
        this.isVertical = true
      }
    },
    initData() {
      this.list = [];
      let sqlData = JSON.parse(JSON.stringify(this.session('serch')));
      delete sqlData.selectSubjce;
      this.$indicator.open({ spinnerType: 'fading-circle' });
      this.getResultByCategory(sqlData).then(res => {
        this.$indicator.close();
        this.isMaxCot = parseInt(res.message || 0);
        if (res.data.array && res.data.array.length > 0) {
          res.data.array.forEach(v => {
            v.select = false;
          });
          this.list = res.data.array;
          this.pagesize = res.data.size;
        }
        this.isShow = !res.data.array.length;
      });
    },
    // QQ & Wx 分享
    share() {
      let that = this
      if (!that.$route.query.uuid) {
        this.saveResult({ result: JSON.stringify(that.list) }).then(res => {
          if (res.code === 20000) {
            that.uuid = res.data.uuid
            if (this.isWxInIos()) {
              that.$router.push({
                name: 'query-step4',
                query: {
                  uuid: that.uuid
                }
              })
            } else {
              setTimeout(() => {
                window.location.href = `/query/step4?uuid=${this.uuid}`
              }, 2000)
            }
          }
        })
      }
      this.isShare = true;
      setTimeout(() => {
        this.isShare = false;
      }, 3000)
    },
    // 分享获取数据
    getShareResult(str) {
      let taht = this
      this.getResult({ uuid: str }).then((res) => {
        if (res.code === 20000) {
          let lists = JSON.parse(res.data.result);
          lists.forEach(v => {
            v.select = false;
          });
          this.list = lists;
          this.pagesize = lists.length;

        }
      })
    },
    // 判断是ios中的微信设备
    isWxInIos() {
      let u = navigator.userAgent
      // ios终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        let ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }
  },
  created() {
    this.orientationFun();
    if (this.$route.query.uuid) {
      this.getShareResult(this.$route.query.uuid)
    } else {
      this.initData();
    }
  }
}
</script>
<style lang="less">
.page-container {
  min-height: 100vh !important;
}
.list-hall{
  
}
.bc-e7eef4 {
  background-color: #e7eef4;
}
.resut {
  font-size: 24/75rem;
  .share {
    position: fixed;
    top: 25%;
    left: calc(50% - 4.666667rem);
    width: 9.33333rem;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.16rem;
    -webkit-transition: 1s all;
    transition: 1s all;
    opacity: 0;
    display: none;
    &.share-show {
      opacity: 1;
      display: block;
    }
  }
  .step-all {
    padding: 10/75rem 10/75rem;
    background-image: -webkit-linear-gradient(left, #ffa440 0%, #ff8600 100%);
    background-image: linear-gradient(90deg, #ffa440 0%, #ff8600 100%);
    color: #fff;
    border-radius: 10/75rem;
  }
  table td {
    font-size: 14/75rem !important;
  }
  .tbheader {
    thead td {
      background-color: #eee;
      vertical-align: middle;
      padding: 10/75rem;
      border: 2px solid #fff;
    }
  }
  .ic-w {
      color: #fed604;
    }
    .ic-b {
      color: #8bb446;
    }
    .ic-c {
      color: #fb2624;
    }
  .resut-item {
    border-bottom: 1px solid #fff;

    tbody td {
      padding: 10/75rem 5/75rem;
      vertical-align: middle;
      .marks i {
        left: 6/75rem !important;
      }
    }
    .twotd {
      td {
        background-color: #f6f6f6;
      }
    }
    .item-up {
      transition: all 0.2s;
      transform: rotate(0deg);
    }
    .item-up-show {
      transform: rotate(180deg);
    }
    .item-about {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
    }
    .item-trans {
      max-height: 9999px !important;
      -webkit-transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
      transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
      -webkit-transition-delay: 0.2s;
      transition-delay: 0.2s;
    }
    
    .marks {
      position: relative;
      i {
        position: absolute;
        left: 10/75rem;
        top: 5/75rem;
        color: #fff;
        font-style: normal;
        font-size: 12px;
      }
    }
  }
}
.swh-item {
  display: table-cell;
  border-right: 1px solid #fff;
  padding: 0.06333rem 0;
  text-align: center;
  color: #ff8600;
  font-size: 13px;
  line-height: 15px;
  vertical-align: middle;
}
</style>

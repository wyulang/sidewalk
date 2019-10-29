<template>
  <div class='w-all hidden'>
    <div class="w-all banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item><img src="../../assets/banner-1.png" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="w-all sha-6 flex fw pt15 pb5">
      <div @click="toMenu(item)" v-for="(item, index) in menu" :key="index" class="wb-33 flex fd-c ai-c mb10 jc-c">
        <img v-if="item.lab" :src="item.img" class="w-53 h-53">
        <span class="fs-14 mt10 fc-888 w-all h-15 pt1 hidden center pl5 pr5" v-if="item.lab">{{item.lab}}</span>
      </div>
    </div>

    <div class="w-all h-10 bc-e"></div>

    <div class="w-all flex ai-c pt5 pb5 bb-e">
      <div class="pl5 jb-fc pr5">通知</div>
      <div class="flex-1 hidden h-28 fs-13 ai-c">
        <vuescroll :data="noticeList" :class-option="{direction: 2,limitMoveNum: 1,hoverStop:false,openTouch:false}" class="w-all h-28 lh-28">
          <div class="nowrap pr20" v-for="(item, index) in noticeList" :key="index">{{item}}</div>
        </vuescroll>
      </div>
    </div>

    <div class="flex w-all pl5 pr5 mt10">
      <img src="../../assets/index-xueshi.png" class="w-35 h-25" alt="">
      <div class="flex fd-c fs-14">
        <span class="fc-000 lh-15">平台将在志愿填报服务期间由专业人员为VIP考生免费提供志愿填报相关问题的咨询。</span>
        <div class="fc-999 lh-18">时间：每日上午8:30 — 晚上10:00</div>
      </div>
    </div>

    <div class="w-all mt15">
      <div class="flex w-all jc-c">
        <div class="flex fd-c ai-c fs-13 jc-c">
          <img src="../../assets/wx-0.png" class="w-92 mb5 h-92" alt="">
          <span>吴老师</span>
          <div class="flex ai-c mt5 jc-c">
            <span class="iconfont fs-16 ra-5 jb-fc iconphonesquare"></span>
            <span>17606740166</span>
          </div>
        </div>
        <div class="flex fd-c ai-c ml40 fs-13 jc-c">
          <img src="../../assets/wx-1.png" class="w-92 mb5 h-92" alt="">
          <span>卢老师</span>
          <div class="flex ai-c mt5 jc-c">
            <span class="iconfont fs-16 ra-5 jb-fc iconphonesquare"></span>
            <span>13056743306</span>
          </div>
        </div>
      </div>
      <div class="flex w-all jc-c mt10">
        <div class="flex fd-c ai-c fs-13 jc-c">
          <img src="../../assets/wx-2.png" class="w-92 mb5 h-92" alt="">
          <span>黄老师</span>
          <div class="flex ai-c mt5 jc-c">
            <span class="iconfont fs-16 ra-5 jb-fc iconphonesquare"></span>
            <span>13306680668</span>
          </div>
        </div>
        <div class="flex fd-c ai-c ml40 fs-13 jc-c">
          <img src="../../assets/wx-3.png" class="w-92 mb5 h-92" alt="">
          <span>童老师</span>
          <div class="flex ai-c mt5 jc-c">
            <span class="iconfont fs-16 ra-5 jb-fc iconphonesquare"></span>
            <span>13306747930</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-all pl20 fs-14 mt20 mb20 red pr20">
      温馨提示：志愿填报期间可能会涉及到电话忙音及微信回复 延后敬请原谅！
    </div>

    <div class="w-all h-10 bc-e"></div>

    <div class="w-all">
      <div class="flex bb-e jc-b ai-c fs-14 h-40 mb10">
        <div class="ml10 flex ai-c">
          <i class="icon iconfont iconnet jb-fc fb fs-25 mr10"></i>
          <span>高考资讯</span>
        </div>
        <div @click="$router.push({name:'new-list'})" class="mr10 fc-999">更多</div>
      </div>

      <div @click="$router.push({name:'new-detail',query:{id:item.id}})" v-for="(item, index) in newsList" :key="index" class="pt10 pb10 flex pl10 pr10 bb-e fs-13 fc-666">
        <div class="mr10"><img class="w-100 h-75 ra-5" :src="item.pic" alt=""></div>
        <div class="flex-1 w-all hidden">
          <div class="w-all flex fd-c">
            <span class="h-20 fc-333 w-all line-1 pt5">{{item.title}}</span>
            <span class="h-35 lh-20 fc-999 line-2">{{item.brief}}</span>
            <div class="h-20 fc-aaa flex jc-e ai-c">
              <i class="icon iconfont iconmiaojiesellerlooked fs-22"></i>
              <span class="">{{item.visitsNumber}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vuescroll from 'vue-seamless-scroll';
import { mapActions, mapState } from 'vuex';
import { MessageBox } from 'mint-ui';
export default {
  computed: {
    ...mapState(['userinfo'])
  },
  components: {
    vuescroll
  },
  data() {
    return {
      noticeList: [],
      scrollText: '',
      newsList: [],
      menu:
        [
          {
            lab: '志愿查询系统',
            img: require('../../assets/menu-0.png'),
            url: 'query/sp/1',
            name: 'query'
          }, {
            lab: '志愿智能辅助报告',
            img: require('../../assets/menu-1.png'),
            url: 'report',
            name: 'report'
          }, {
            lab: '线上线下名师一对一',
            img: require('../../assets/menu-2.png'),
            url: '',
            name: 'nono'
          }, {
            lab: '院校招生计划',
            img: require('../../assets/menu-3.png'),
            url: 'plan',
            name: 'plan'
          }, {
            lab: '院校/专业排行榜',
            img: require('../../assets/menu-4.png'),
            url: 'school',
            name: 'school'
          }, {
            lab: '',
            img: '',
            url: '',
            name: ''
          }
        ],
    }
  },
  methods: {
    ...mapActions(['getListTimeLineText', 'getNews','getUserInfo']),
    initData() {
      this.getListTimeLineText().then(res => {
        if (res.code == 20000) {
          this.noticeList = new Array(2).fill(res.dt.scroll_bar.text)
        }
      });
      this.getNews({ page: 1, pageSize: 10 }).then(res => {
        if (res.code == 20000) {
          this.newsList = res.data.array;
        }
      })
    },
    toMenu(item) {
      if (!item.img) return;
      if (!this.userinfo) {
        this.$toast({ message: '请先登录，再进行操作', duration: 2000, position: 'top' });
        this.$router.push({ name: 'login' })
        return;
      }else{
        this.getUserInfo();
      }
      if (item.name == 'nono') {
        MessageBox('提示', '正在建设中, 敬请期待');
        return;
      }
      if (item.name == 'query') {
        if (!this.userinfo.examType) {
          // 未填写成绩提示并跳转填写成绩页面
          this.$toast({ message: '请先填写成绩，再进行操作', position: 'top' });
          this.$router.push({ name: 'user-rank', query: { redirect: 'index' } });
          return;
        } else {
          if (this.userinfo.type == 102 && this.userinfo.searchStatus == 0) {
            MessageBox('提示', `体验权限已失效，请购买VIP`).then(res => {
              this.$router.push({ name: 'pay' })
            });
            return;
          }
          this.$router.push({ name: item.name })
        }
      }
      if (item.name == 'report') {
        if (this.userinfo.isCommonPay || this.userinfo.isReportPay) {
          MessageBox('提示', '该功能目前只能在PC端查看');
          return;
        }
        if (!this.userinfo.isCommonPay || !this.userinfo.isReportPay) {
          MessageBox('提示', item.url == 'report' ? '智能辅助报告更加精准助力您的志愿填报！请购买后使用。' : `您还没有购买${item.lab}，现在购买`).then(res => {
            this.$router.push({ name: 'pay', query: { t: item.url } })
          });
          return;
        }
      }

      this.$router.push({ name: item.name });
    }
  },
  created() {
    this.noticeList = new Array(3).fill('');
    this.initData();
  },
  mounted() {

  }
}
</script>

<style lang='less'>
@import "~@css/base.less";
.banner {
  height: 240 / @bs75;
  img {
    width: 100%;
    height: 240 / @bs75;
  }
}
</style>

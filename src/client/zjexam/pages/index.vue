<template>
  <div class='w-all jbbc pb20'>
    <!-- banner -->
    <el-carousel v-if="!(this.userinfo && ['1','3'].includes(this.userinfo.userSource))" height="390px" class="w-all" indicator-position="outside">
      <el-carousel-item :class="{'hand':item.href}" v-for="(item, index) in banner" :key="index">
        <!-- <img :src="item.url" @click="gotoServicePage(item)" class="h-390 w-all" alt=""> -->
        <div @click="gotoServicePage(item)" :style="{'background-image':('url('+item.url+')')}" style="background-size: cover;background-position: center;" class="h-390 w-all"></div>
      </el-carousel-item>
    </el-carousel>

    <el-row class="w-1200 m-auto ">
      <!-- 消息滚动 -->
      <div v-if="!(this.userinfo && ['1','3'].includes(this.userinfo.userSource))" class="h-28 flex">
        <div class="w-50 jb-bc h-all flex jc-c ai-c">消息</div>
        <div style="background-color:#ffe1c1;" class="flex-1 h-28 w-all hidden">
          <vuescroll :data="noticeList" :class-option="{direction: 2,limitMoveNum: 1}" class="w-all h-28 lh-28">
            <div class="nowrap">
              <span class="pr30" v-for="(item, index) in noticeList" :key="index">{{item.title}}</span>
            </div>
          </vuescroll>
        </div>
      </div>

      <!-- 图标菜单 -->
      <div class="w-all bc-fff flex jc-b pt25 pb25 pl25 pr25 mt20">
        <div @click="goMenu(item)" class="flex fd-c jc-c ai-c hand hover" v-for="(item, index) in nemuList" :key="index">
          <img class="w-84" :src="item.url" alt="">
          <span class="mt10">{{item.name}}</span>
        </div>
      </div>

      <!-- 美丽校园,金榜题名系统介绍 -->
      <div class="w-all flex bc-fff mt20 pt10 pb20">
        <div class="flex-1">
          <div class="w-all fs-20 fw-7 pl10 title-b4 bd-color mb20 ml15">美丽校园</div>
          <el-carousel class="carousel-beautifulschool" indicator-position="none" arrow="always" height="203px">
            <el-carousel-item v-for="(item, index) in schoolList" :key="index">
              <div class="w-all flex jc-b ai-c h-200 pl70 pr70">
                <div @click="$store.commit('setVedio',{show:true,src:v.videoUrl})" class=" flex fd-c ai-c jc-c hover" v-for="(v, child) in item" :key="child">
                  <div class="video-wrap h-170 w-170">
                    <div class="cover-img h-all w-all bs-all" :style="{'background-image': 'url('+v.pic+')'}"></div>
                  </div>
                  <div class="mt10 ">{{ v.videoName }}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- <div class="w-350 flex fd-c mr20">
          <div class="w-all fs-20 fw-7 pl10 title-b4">金榜题名系统介绍</div>
          <div @click="$store.commit('setVedio',{show:true,src:'http://86edu.oss-cn-hangzhou.aliyuncs.com/jbtm_pic/unicom.mp4'})" class="w-all video-wrap mt20">
            <img class="w-all" src="../assets/home/s_unicom.png" alt="">
          </div>
        </div> -->
      </div>

      <!-- 高考新闻/资讯 -->
      <div class="w-all flex bc-fff mt20 pt10 pb20">
        <div class="w-500">
          <div class="w-all fs-20 fw-7 pl10 title-b4 bd-color ml15">高考新闻/资讯</div>
          <div class="pl15 mt20">
            <!-- list -->
            <div @click="$router.push({name:'newDetail',params:{id:item.id}})" v-for="(item, index) in newList" :key="index" class="flex mb15 bb-c pb15 hand">
              <div class="w-90">
                <img class="w-90 ra-5" :src="item.pic" alt="">
              </div>
              <div class="flex-1 flex w-all hidden fd-c ml10">
                <div class="jb-fc fs-14 w-all line-1">{{item.title}}</div>
                <div class="fs-12 mt10 mb10 fc-999">{{item.date}}</div>
                <div class="line-2 fs-13 w-all lh-22">{{item.brief}}</div>
              </div>
            </div>

          </div>
        </div>

        <!-- 志愿服务咨询台 -->
        <div class="flex-1 pl25">
          <div class="w-all fs-20 fw-7 pl10 title-b4 bd-color">志愿服务咨询台</div>
          <div class="mt18">
            <div class="flex">
              <img class="ml10" src="../assets/home/home-server.png" alt="">
              <div class="flex-1 ml10">
                <div class="fs-14">平台将在志愿填报服务期间由专业人员为VIP考生免费提供志愿填报相关问题的咨询。</div>
                <div class="fc-999">时间：每日上午8:30 — 晚上10:00</div>
              </div>
            </div>
            <div class="flex jc-b pt25 pr20 fs-14">
              <div class="flex jc-c ai-c fd-c">
                <img class="w-140 h140" src="../assets/home/wx2.png" alt="">
                <span class="mt8 mb8">吴老师</span>
                <div><i class="iconfont icontel jb-bc ra-3 pp2 mr5"></i> <span>17606740166</span></div>
              </div>
              <div class="flex jc-c ai-c fd-c">
                <img class="w-140 h140" src="../assets/home/wx30.jpg" alt="">
                <span class="mt8 mb8">卢老师</span>
                <div><i class="iconfont icontel jb-bc ra-3 pp2 mr5"></i> <span>18668265424</span></div>
              </div>
              <div class="flex jc-c ai-c fd-c">
                <img class="w-140 h140" src="../assets/home/wx1.png" alt="">
                <span class="mt8 mb8">黄老师</span>
                <div><i class="iconfont icontel jb-bc ra-3 pp2 mr5"></i> <span>13306680668</span></div>
              </div>
              <div class="flex jc-c ai-c fd-c">
                <img class="w-140 h140" src="../assets/home/wx4.png" alt="">
                <span class="mt8 mb8">童老师</span>
                <div><i class="iconfont icontel jb-bc ra-3 pp2 mr5"></i> <span>13306747930</span></div>
              </div>
            </div>
            <div class="red mt30 fs-14">温馨提示：志愿填报期间可能会涉及到电话忙音及微信回复延后敬请原谅！</div>
          </div>
        </div>
      </div>

      <!-- 院校/专业排行榜 -->
      <div class="w-all mt20 bc-fff pt10 flex pb10">
        <div class="w-500">
          <div class="flex ai-c jc-c">
            <div class="flex-1 fs-20 fw-7 pl10 title-b4 bd-color ml15">院校/专业排行榜</div>
            <div @click="getLogin({name:'school',query:{type:2}})" class="jb-fc hand fs-14">查看完整榜单</div>
          </div>

          <div class="rank mt5">
            <ul class="flex nav jc-b">
              <li @click="btnRank('QJP')" :class="{'active':rankType=='QJP'}">邱均平排名</li>
              <li @click="btnRank('RK')" :class="{'active':rankType=='RK'}">软科排名</li>
              <li @click="btnRank('WS')" :class="{'active':rankType=='WS'}">武书连排名</li>
              <li @click="btnRank('XYH')" :class="{'active':rankType=='XYH'}">校友会排名</li>
            </ul>
            <table class="rank-list w-all">
              <thead>
                <tr>
                  <td class="wb-20">排名</td>
                  <td class="wb-50">院校名称</td>
                  <td class="wb-30">所在地区</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in rankList" :key="index">
                  <td>
                    <img v-if="index==0" src="../assets/home/no1.png" alt="">
                    <img v-else-if="index==1" src="../assets/home/no2.png" alt="">
                    <img v-else-if="index==2" src="../assets/home/no3.png" alt="">
                    <span v-else>{{item.value}}</span>
                  </td>
                  <td>{{item.universityName}}</td>
                  <td>{{['北京','上海','重庆','天津'].includes(item.provinces)?item.provinces:(item.provinces+item.city)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex-1 pl25 pr15">
          <div class="flex-1 fs-20 fw-7 pl10 title-b4 bd-color">心理测试</div>
          <div class="w-all bc-c5ddff ra-8 h-100 mt25 flex jc-b ai-c">
            <img class="ml10" src="../assets/home/test-img.png" alt="">
            <div class="fs-24">性格测试，了解你内心真实的一面！</div>
            <div @click="toTest({url:''})" class="h-30 lh-30 centent bc-fff fc-333 mr20 pl20 pr20 ra-8 hand">点击查看</div>
          </div>

          <div class="w-all">
            <div class="clear"></div>
            <div v-for="(item, index) in testList" :key="index" @click="toTest(item)" class="fl hand h-40 lh-40 pl15 pr15 ra-5 mr20 mt10 bc-b4caea">{{item.name}}</div>
            <div class="clear"></div>
          </div>

          <div class="w-all mt20">
            <div class="flex-1 fs-20 fw-7 pl10 title-b4 bd-color mb10">高考百科</div>
            <div class="clear"></div>
            <div @click="getLogin({name:'baike',params:{id:index}})" v-for="(item, index) in baikeList" :key="index" class="fl fc-999 hand h-35 lh-35 pl15 pr15 ra-5 mr20 mt10 bc-f5">{{item}}</div>
            <div class="clear"></div>
          </div>
        </div>
      </div>

      <div class="banner-bottom mt20 flex ai-c jc-c">
        <span class="fc-fff">{{bannerText}}</span>
      </div>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import vuescroll from 'vue-seamless-scroll';
export default {
  computed: {
    ...mapState(['userinfo']),
  },
  components: {
    vuescroll
  },
  data() {
    return {
      isPop: true,
      noticeList: [],
      schoolList: [],
      newList: [],
      rankType: 'QJP',
      bannerText: '',
      rankList: [],
      testUrl: 'http://interest.test.86edu.net/',
      testList: [
        { name: "霍兰德职业测试", url: "holland" },
        { name: "MBTI心理测试", url: "mbti" },
        { name: "国际标准逆商心理测试", url: "aq" },
        { name: "九型人格测试", url: "nine" },
        { name: "情商EQ测试", url: "eq" }
      ],
      baikeList: ['高校招生章程', '专业平行志愿', '退档', '985 工程', '211 工程', '双一流', '省属重点建设高校', '三位一体', '普通类提前录取', '普通类分段线', '高考加分'],
      banner: [
        // { url: require('../assets/banner/jb-pc-b-2.png'), href: 'goodsList', query: 'banner' },
        { url: require('../assets/banner/jb-pc-b-3.png'), href: 'about' },
      ],
      nemuList: [
        { name: '院校招生计划', type: 1, href: 'plan', new: false, query: '', url: require('../assets/menu/menu_07.png') },
        { name: '志愿查询系统', type: 2, href: '#/query/volunteer', new: true, query: '', url: require('../assets/menu/menu_01.png') },
        { name: '志愿智能辅助报告', type: 3, href: '#/report', new: false, query: '', url: require('../assets/menu/menu_02.png') },
        { name: '线上线下名师一对一', type: 4, href: '', new: false, query: '', url: require('../assets/menu/menu_03.png') },
        { name: '高一选课查询', type: 5, href: '#/query/curricula', new: true, query: '', url: require('../assets/menu/menu_05.png') },
        { name: '在线课堂', type: 6, href: '', new: false, query: '', url: require('../assets/menu/menu_06.png') },
      ]
    }
  },
  methods: {
    ...mapActions([
      "getOrderLast",
      'getBeautifulschoolAll',
      'getNewsAll',
      'getCollegeBKRank',
      'getUserInfo',
      'getUpdatesearchexperiencetimes',
      'getUnicomLogin'
    ]),
    gotoServicePage(item) {
      if (item.href) {
        if (item.query) {
          this.$router.push({ 'name': item.href, query: { type: item.query } })
          return;
        }
        this.$router.push({ 'name': item.href })
      }
    },
    getLogin(callback) {
      if (!this.userinfo) {
        this.$message.error('您还未登录，请选登录');
        this.$store.commit('setShowLogin', true);
        return;
      }
      this.$router.push(callback);
    },
    goPay(){

    },
    goMenu(item) {
      if ([1, 2, 3, 5].includes(item.type) && !this.userinfo) {
        this.$message.error('您还未登录，请选登录');
        this.$store.commit('setShowLogin', true);
        return;
      }
      if ([2, 3, 5].includes(item.type) && !this.userinfo.examType) {
        this.$message.error('请先输入成绩与位次，再进行操');
        this.$router.push({ name: 'user-rank' });
        return;
      }

      if (item.href) {
        //院校招生计划
        if (item.type == 1) {
          this.$router.push({ name: item.href });
        }

        //志愿查询系统
        if (item.type == 2) {
          this.href(item.href);
        }

        //志愿智能辅助报告
        if (item.type == 3) {
          if (this.userinfo.examType == 2) {
            this.$message.error("志愿报告辅助决策系统暂时只支持普通考生");
            return;
          }
          let remark = '';
          if (this.userinfo.reportSearchExperienceTimes == 0 && this.userinfo.type == 102) {
            remark = '您的报告体验次数已用尽，请购买VIP后使用';
          }
          if (this.userinfo.reportSearchExperienceTimes > 0 && this.userinfo.type == 102) {
            remark = `您还未购买志愿智能辅助报告，有${this.userinfo.reportSearchExperienceTimes}次免费体验次数`;
          }
          if (remark && this.userinfo.reportSearchExperienceTimes == 0) {
            this.$confirm(remark, '', {
              confirmButtonText: '去购买',
              cancelButtonText: '取消',
              showClose: false,
              customClass: 'confirmBtn'
            }).then(res => {
              if (this.userinfo.userSource == 1) {
                this.getUnicomLogin().then(res => {
                  if (res.code == 20000) {
                    window.location.href = res.message;
                  }
                })
                return;
              }
              if (this.userinfo.userSource == 3) {
                this.$alert('请回到主平台，进行付费升级', '', {
                  confirmButtonText: '好的，我知道了',
                })
                return;
              }
              this.$router.push({ name: 'pay', query: { type: 113 } })
            }).catch(res => { })
            return;
          }
          if (remark && this.userinfo.reportSearchExperienceTimes > 0) {
            this.$confirm(remark, '', {
              confirmButtonText: '继续',
              cancelButtonText: '取消',
              showClose: false,
              customClass: 'confirmBtn'
            }).then(res => {
              this.getUpdatesearchexperiencetimes({ type: 1 }).then(res => {
                this.href(item.href);
              });
            }).catch(res => { })
            return;
          }
          this.href(item.href);
        }

        //高一选课查询
        if (item.type == 5) {
          let remark = '';
          if (this.userinfo.courseSelectionExperienceTimes == 0 && this.userinfo.type == 102) {
            remark = '免费体验次数已用尽，购买任何VIP套餐后即可享受无限次选课系统使用权';
          }
          if (this.userinfo.courseSelectionExperienceTimes > 0 && this.userinfo.type == 102) {
            remark = `您是体验用户，有${this.userinfo.courseSelectionExperienceTimes}次免费体验机会`;
          }
          if (remark && this.userinfo.courseSelectionExperienceTimes == 0) {
            this.$confirm(remark, '', {
              confirmButtonText: '去购买',
              cancelButtonText: '取消',
              showClose: false,
              customClass: 'confirmBtn'
            }).then(res => {
              if (this.userinfo.userSource == 1) {
                this.getUnicomLogin().then(res => {
                  if (res.code == 20000) {
                    window.location.href = res.message;
                  }
                })
                return;
              }
              if (this.userinfo.userSource == 3) {
                this.$alert('请回到主平台，进行付费升级', '', {
                  confirmButtonText: '好的，我知道了',
                })
                return;
              }
              this.$router.push({ name: 'pay', query: { type: 116 } })
            }).catch(res => { })
            return;
          }
          if (remark && this.userinfo.courseSelectionExperienceTimes > 0) {
            this.$confirm(remark, '', {
              confirmButtonText: '继续',
              cancelButtonText: '取消',
              showClose: false,
              customClass: 'confirmBtn'
            }).then(res => {
              this.getUpdatesearchexperiencetimes({ type: 2 }).then(res => {
                this.href(item.href);
              });

            }).catch(res => { });
            return;
          }
          this.href(item.href);
        }
      } else {
        this.$alert('正在建设中, 敬请期待').then(res => { });
      }
    },
    toTest(item) {
      if (!this.userinfo) {
        this.$message.error('您还未登录，请选登录');
        this.$store.commit('setShowLogin', true);
        return;
      }
      this.href(this.testUrl + item.url);
    },
    btnRank(type) {
      this.rankType = type;
      let qsData = {
        which: type,
        department: '上海市教育委员会,教育部,浙江省教育厅,北京市教育委员会,工业和信息化部,国家体育总局,国家卫生健康委员会,中华全国总工会,中华全国妇女联合会,国家民族事务委员会,中国科学院,河北省教育厅,天津市教育委员会,中国民用航空局,中国地震局,应急管理部,山西省教育厅,内蒙古自治区教育厅,辽宁省教育厅,交通运输部,吉林省教育厅,黑龙江省教育厅,海关总署,中央军委训练管理部,江苏省教育厅,安徽省教育厅,福建省教育厅,国务院侨务办公室,江西省教育厅,山东省教育厅,河南省教育厅,湖北省教育厅,湖南省教育厅,中央军委装备发展部,广东省教育厅,广西壮族自治区教育厅,海南省教育厅,重庆市教育委员会,四川省教育厅,贵州省教育厅,云南省教育厅,陕西省教育厅,甘肃省教育厅,青海省教育厅,宁夏回族自治区教育厅,新疆生产建设兵团,新疆维吾尔自治区教育厅',
        areaId: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31',
        level: '985,211,syl,not'
      };
      this.getCollegeBKRank(qsData).then(res => {
        if (type == 'QJP') {
          this.rankList = res.filter(v => { v.value = v.qjRanking; return parseInt(v.qjRanking || 0) }).sort((a, b) => { return parseInt(a.qjRanking || 0) - parseInt(b.qjRanking || 0) });
        } else if (type == 'RK') {
          this.rankList = res.filter(v => { v.value = v.rkRanking; return parseInt(v.rkRanking || 0) }).sort((a, b) => { return parseInt(a.rkRanking || 0) - parseInt(b.rkRanking || 0) });
        } else if (type == 'WS') {
          this.rankList = res.filter(v => { v.value = v.wsRanking; return parseInt(v.wsRanking || 0) }).sort((a, b) => { return parseInt(a.wsRanking || 0) - parseInt(b.wsRanking || 0) });
        } else if (type == 'XYH') {
          this.rankList = res.filter(v => { v.value = v.xyhRanking; return parseInt(v.xyhRanking || 0) }).sort((a, b) => { return parseInt(a.xyhRanking || 0) - parseInt(b.xyhRanking || 0) });
        }
        this.rankList = this.rankList.slice(0, 5);
      });
    }
  },
  created() {
    if (this.storage('accesstoken')) {
      this.getUserInfo();
    }
    this.btnRank(this.rankType);
    setTimeout(() => {
      this.noticeList = new Array(3).fill(this.storage('gobalText').split('|')[1]).map(v => {
        return { title: v }
      });
      this.bannerText = this.storage('gobalText').split('|')[0];
    }, 100);
    this.getBeautifulschoolAll().then(res => {
      if (res.code == 20000) {
        res.data.array.forEach((v, index) => {
          let idx = parseInt(index / 5)
          if (idx === index / 5) {
            this.schoolList.push([])
          }
          this.schoolList[idx].push(v)
        })
      }
    })
    this.getNewsAll().then(res => {
      if (res.code == 20000) {
        this.newList = res.data.array.slice(0, 3)
      }
    })
  },
}
</script>
<style lang="less">
.banner-bottom {
  background-image: url("../assets/home/message-back.jpg");
  height: 187px;
  width: 100%;
  padding: 80px 90px;
  background-size: 100% 100%;
}
.bc-b4caea {
  color: #fff;
  background-color: #b4caea;
}
.bc-c5ddff {
  background-color: #c5ddff;
  color: #fff;
}
.rank {
  padding: 0 10px;
  .rank-list {
    margin-top: 10px;
    td {
      text-align: center;
    }
    thead td {
      line-height: 36px;
      font-size: 16px;
      color: #999;
    }
    tbody td {
      padding: 13px 0;
      font-size: 16px;
    }
  }
  ul {
    border-bottom: 2px solid #eee;
    position: relative;
    li {
      padding: 0 10px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      margin-bottom: -2px;
      cursor: pointer;
    }
  }
}
.h-390 {
  height: 390px;
}
.title-b4 {
  border-left: 4px solid;
}
</style>


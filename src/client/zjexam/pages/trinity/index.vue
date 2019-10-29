<template>
  <div class='w-all flex fd-c  hi-0'>
    <div class="bc-273c56 pl10 fs-14 fb lh-30">三位一体</div>
    <div class="rel flex ai-c jc-c pt8 pb8">
      <div class="flex-line w-600 rel">
        <div class="abs zi-100 at12 h-2 bc-d al23 ar15 "></div>
        <div class="flex ai-c rel zi-110 w-600 jc-b">
          <div class="flex fd-c jc-c jb-fc ai-c">
            <span class="iconfont fs-20 iconxiaoxi-chenggong mt3"></span>
            <span>结果</span>
          </div>
          <div class="flex fd-c jc-c  ai-c">
            <span class="iconfont fs-25 jb-fc icondian"></span>
            <span class="fs-12">面试题解析</span>
          </div>
          <div class="flex fd-c jc-c ai-c">
            <span class="iconfont fs-25 jb-fc icondian"></span>
            <span class="fs-12">课程</span>
          </div>
        </div>
      </div>
      <div @click="next" class="abs ar100 at15 h-28 pl20 pr20 hand ra-5 jb-bc lh-28">下一步</div>
    </div>

    <div class="w-all flex lh-30 bc-e ai-c jc-s">
      <div class="bc-fff mt4 mb4 pr10">筛选条件</div>
      <div class="pl10">七选三：</div>
      <div>{{queryeth}}</div>
      <div class="ml30" v-html="queryten"></div>
    </div>

    <div class="w-all pr15">
      <table class="trinity-table">
        <tr class="trlin">
          <td class="wb-20 wi-150 center">院校及专业名称</td>
          <td class="wb-15 center wi-150">选考科目范围</td>
          <td class="w-80 wi-80 center">{{years[0]}}招生人数</td>
          <td class="w-130 wi-130 center">{{years[0]}}最低录取综合分</td>
          <td class="w-130 wi-130 center">{{years[1]}}年统考成绩/位次</td>
          <td class="w-130 wi-130 center">{{years[0]}}年统考成绩/位次</td>
          <td class="w-120 wi-120 center">学年/学费</td>
          <td class="w-100 wi-100 center">报名时间</td>
          <td class="w-100 wi-100 center">测试时间</td>
          <td class="w-160 wi-100 center">招生网站/电话所在地区</td>
        </tr>
      </table>
    </div>

    <div class="flex-1 w-all h-all hi-0 auto">
      <table class="trinity-table fc-000">
        <tbody v-for="(item, index) in list" :key="index">
          <tr class="bc-ffdecd trlin">
            <td colspan="10" class="flex-1 wi-200 left pl15">
              <div class="flex-line ai-c jc-c">
                <span class="mr10">{{item.inCode}}</span>
                <span class="mr10">{{item.school}}</span>
                <div class="mr10" v-html="setColor(item.property)"></div>
              </div>
            </td>
          </tr>
          <tr class="fs-12" v-for="(v, i) in item.majors" :key="i">
            <td class="wi-150 wb-20 pl15 rel">
              <div class="flex-line fd-c jc-c">
                <div class="flex-line">
                  <div class="w-40">{{v.mCode}}</div><span>{{v.major}}{{v.mLevel=='本科'?'(本)':'(专)'}}</span>
                </div>
                <div class="rel h-20">
                  <div style="width:1100px;" class="abs fc-aaa al0 at0">简注：{{v.remark}}</div>
                </div>
              </div>
            </td>
            <td class="wb-15 center wi-150" v-html="toChinese(v)"></td>
            <td class="w-80 wi-80 center">{{v.trinityAmounts[0]}}</td>
            <td class="w-130 wi-130 center">{{v.trinityScores[0]}}</td>
            <td class="w-130 wi-130 center">{{v.lowScores[0]}}/{{v.lowRanks[0]}}</td>
            <td class="w-130 wi-130 center">{{v.lowScores[1]}}/{{v.lowRanks[1]}}</td>
            <td class="w-120 wi-120 center">{{v.year}}/{{v.fee}}</td>
            <td class="w-100 wi-100 center pl5 pr5">{{v.registrationTime}}</td>
            <td class="w-100 wi-100 center">{{v.examTime}}</td>
            <td v-if="i==0" :rowspan="item.majors.length" style="vertical-align: middle;" class="w-160  wi-100 center">
              <div :class="{'mb10':item.majors.length==1}" class="flex-line fd-c">
                <span @click="href(item.trinitySite)" class="iconfont iconlianjiefangxing jb-fc hand fs-30"></span>
                <span>{{['北京','上海','重庆','天津'].includes(item.province)?item.province:(item.province+item.city)}}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="list.length==0" class="w-all h-all flex ai-c jc-c fs-18">
        未找到符合您选考科目等级的三位一体院校
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['userinfo'])
  },
  data() {
    return {
      threeList: ['物理', '化学', '生物', '政治', '历史', '地理', '科学'],
      tenList: ['语文', '数学', '外语', '物理', '化学', '生物', '政治', '历史', '地理', '技术'],
      queryeth: '',
      queryten: '',
      list: [],
      years: []
    }
  },
  methods: {
    ...mapActions(['getTrinitySearch']),
    initData() {
      this.loader = this.$loading(this.$store.state.loadObj);
      this.getTrinitySearch().then(res => {
        this.loader.close();
        if (res.code == 20000) {
          this.list = res.data.array;
          this.years = res.data.array[0].majors[0].ages.split(',').map(v => { return v.substr(2) });
          res.data.array.forEach(item => {
            item.majors.forEach(v => {
              v.lowRanks = v.lowRanks.split(',').map(v => { return v == '/' ? '-' : v });
              v.lowScores = v.lowScores.split(',').map(v => { return v == '/' ? '-' : v });
              v.trinityAmounts = v.trinityAmounts.split(',').map(v => { return v == '/' ? '-' : v });
              v.trinityScoreRemarks = v.trinityScoreRemarks.split(',').map(v => { return v == '/' ? '-' : v });
              v.trinityScores = v.trinityScores.split(',').map(v => { return v == '/' ? '-' : v });
            })
          })
        }
      })
    },
    //院校级别设置
    setColor(property, topProperty) {
      let [color, rt, benke, bk, zk] = [[], property.split(','), false, false, false];
      rt.forEach((v, index) => {
        if (v == 1) {
          switch (index) {
            case 0:
              benke = true; bk = true;
              color.push({ name: '双一流', c: '#94d3cd' });
              break;
            case 1:
              benke = true; bk = true;
              color.push({ name: '985', c: '#f6846c' });
              break;
            case 2:
              benke = true; bk = true;
              color.push({ name: '211', c: '#fb989d' });
              break;
            case 3:
              if (!benke) {
                bk = true;
                color.push({ name: '本科', c: '#bbdcc9' });
              }
              break;
            case 4:
              color.push({ name: '独立', c: '#3ea5ce' });
              break;
            case 5:
              color.push({ name: '民办', c: '#d7ac4d' });
              break;
            case 6:
              // 20180326更新：暂时不显示
              color.push({ name: '中外', c: '#6d8285' });
              break;
            case 7:
              if (!bk) {
                zk = true;
                color.push({ name: '专科', c: '#8f81be' });
              }
              break;
            case 8:
              if (!zk) {
                color.push({ name: '公办', c: '#bbdcc9' });
              }
              break;
          }
        }
      })
      return color.map(v => {
        return `<span class="ra-3 mr3 fs-12 nowrap pl5 mb3 pr5 h-20 lh-20 fc-fff fl" style="background-color:${v.c}">${v.name}</span>`
      }).join('');
    },
    toChinese(item) {
      let array = item.subject || new Array(7).fill(0);
      array = item.subject.split(",");
      let sub = ["化学", "历史", "地理", "政治", "技术", "物理", "生物"], selSub = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i] == 1) {
          selSub.push(sub[i])
        }
      }
      if (item.chooseType == 0) {
        if (selSub.length == 7 || selSub.length == 0) {
          return '不限'
        } else {
          return `${selSub.toString()}`;
        }
      } else {
        return `${selSub.toString()}`;
      }

    },
    toYear(val) {
      let mod = "";
      if (val) {
        mod += val.split('-')[0].split('/')[0] + '月';
        mod += val.split('-')[0].split('/')[1] + '日';
        if (val.split('-').length > 1) {
          mod += ' 至 ';
          mod += val.split('-')[1].split('/')[0] + '月';
          mod += val.split('-')[1].split('/')[1] + '日';
        }

      }
      return mod;
    },
    next() {
      if (this.list.length > 0) {
        this.$router.push({ name: 'trinity-analyze', });
        this.session('trinitySchoolId', this.list.map(v => { return v.schoolId }).toString())
      } else {
        this.$message.error('未找到符合您选考科目等级的三位一体院校');
      }
    }
  },
  created() {
    this.initData();
    let val = []
    this.userinfo.trinitySubject.split(',').forEach((v, index) => {
      if (v == 1) {
        val.push(this.threeList[index]);
      }
    });
    this.queryeth = val.join('、');
    val = [];
    this.userinfo.trinityScore.split(',').forEach((v, index) => {
      if (index < this.tenList.length) {
        val.push(`<span class="fc-999 pl10">${this.tenList[index]}</span>：<span class="fc-000">${v}</span>`)
      }
    })
    // val.pop().pop();
    this.queryten = val.join('')
  }
}
</script>

<style lang='less' scoped>
.trinity-table {
  width: 100%;
  td {
    border: 1px solid #ccc;
    vertical-align: top;
    padding: 0 5px;
    padding-top: 10px;
  }
  .trlin {
    td {
      padding-bottom: 10px;
    }
  }
}
.bc-273c56 {
  color: #fff;
  background-color: #273c56;
}
.bc-ffdecd {
  background-color: #ffdecd;
}
</style>

<template>
  <div class='w-all'>
    <div class="jb-bc flex pt6 pb6 pl10 pr10 ai-c">
      <div @click="$router.push({name:'plan'})" class="hand w-30">
        <span class="iconfont fs-13 iconfanhui"></span>
      </div>
      <div class="flex fd-c flex-1">
        <div class="flex mb5">
          <span>结果条数：{{info.majors.length}}个专业</span>
          <span class="ml15">院校名称：{{info.school || '-'}}</span>
          <span class="ml15">国家代码：{{info.code || '-'}}</span>
          <span class="ml15">省内代码：{{info.incode || '-'}}</span>
          <span class="ml15">所在地区：{{['北京','上海','重庆','天津'].includes(info.province)?info.province:(info.province+info.city)}}</span>
          <span class="ml15">主管部门：{{info.majors && info.majors[0] && info.majors[0].dept ?  info.majors[0].dept : '-'}}</span>
        </div>
        <div>根据条件和条数，得出以下符合你的专业</div>
      </div>
      <div class="flex">
        <span @click="href(dowloadUrl)" class="hand">下载查询结果</span>
      </div>
    </div>

    <table class="w-all plan-table">
      <thead>
        <tr>
          <td style="text-align:left">专业名称</td>
          <td>专业代码</td>
          <td>院校级别</td>
          <td>学校类型</td>
          <td>考试类型</td>
          <td>选考科目范围</td>
          <td>批次</td>
          <td>{{years[0]}}<br>招生人数</td>
          <td>学制 / 学费<br>（{{years[0]}}）</td>
          <td>院校详情</td>
          <td>{{years[0]}}年录取最 <br>低分数 / 位次</td>
          <td>{{years[1]}}年录取最<br>低分数 / 位次</td>
          <td>{{years[2]}}年录取最<br>低分数 / 位次</td>
        </tr>
      </thead>
      <tbody v-for="(item, index) in info.majors" :key="index">
        <tr>
          <!-- 专业名称 -->
          <td style="text-align:left">{{item.major}}</td>
          <!-- 专业代码 -->
          <td>{{item.mcode}}</td>
          <!-- 院校级别 -->
          <td>
            <div class="flex-line">
              <span class="ra-3 mr3 nowrap pt2 pb2 pl5 pr5 fc-fff" :style="{'background-color':v.c}" v-for="(v, index) in colorList" :key="index">{{v.name}}</span>
            </div>
          </td>
          <!-- 学校类型 -->
          <td>{{ info.type }}</td>
          <!-- 考试类型 -->
          <td>{{ item.exam }}</td>
          <!-- 选考科目范围 -->
          <td>{{ toChinese(item.subject) }}</td>
          <!-- 批次 -->
          <td>{{ item.plan }}</td>
          <!-- 招生人数 -->
          <td>{{ `${item.amount == '/' ? '-' : item.amount}` }}</td>
          <!-- 学制 / 学费 -->
          <td>{{ `${item.year} / ${item.fee}` }}</td>
          <!-- 院校详情 -->
          <td><span @click="href(info.site)" style="background:#e46271;" class="iconfont pt2 pb2 pl4 pr4 hand ra-4 fc-fff icongantanhao"></span></td>
          <!-- <td>{{(item.lowscore2018 == '/'?'-':item.lowscore2018)+" / "+(item.lowrank2018 == '/'?'-':item.lowrank2018) }}</td>
          <td>{{(item.lowscore2017 == '/'?'-':item.lowscore2017)+" / "+(item.lowrank2017 == '/'?'-':item.lowrank2017) }}</td> -->
          <td>{{item.s[0].replace('/','-')}}/{{item.r[0].replace('/','-')}}</td>
          <td>{{item.s[1].replace('/','-')}}/{{item.r[1].replace('/','-')}}</td>
          <td>{{item.s[2].replace('/','-')}}/{{item.r[2].replace('/','-')}}</td>
        </tr>
        <tr>
          <td style="text-align:left" colspan="13">简注：{{item.remark || '--'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      info: this.session('planSchool'),
      colorList: [],
      years:[],
      dowloadUrl:''
    }
  },
  methods: {
    ...mapActions(['getSchoolDownload']),
    dowloadExcel(){
      this.getSchoolDownload({result:JSON.stringify(this.info)}).then(res=>{
        if(res.code==20000){
          this.dowloadUrl=res.data.value;
        }
      })
    },
    toChinese(arr) {
      let array = arr && arr.split(",") || new Array(7).fill(0);
      let sub = ["化学", "历史", "地理", "政治", "技术", "物理", "生物"], selSub = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i] == 1) {
          selSub.push(sub[i])
        }
      }
      if (selSub.length == 7 || selSub.length == 0) {
        return '不限'
      } else {
        return selSub.join(',')
      }
    },
    setColor(property) {
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
      return color;
    },
  },
  created() {
    if (this.info) {
      this.colorList = this.setColor(this.info.property);
      this.years=this.info.majors[0].ages.split(',');
      this.info.majors.forEach(v=>{
        v.r=v.lowRanks.split(',');
        v.s=v.lowScores.split(',')
      })
      this.dowloadExcel()
    } else {
      this.$message.error('请选择您心仪的院校')
      this.$router.push({ name: 'plan' });
    }
  }
}
</script>

<style lang='less' scoped>
.plan-table {
  thead {
    tr td {
      padding: 6px 10px;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }
  }
  tbody {
    tr {
      &:last-child td {
        border-bottom: 1px solid #ddd;
        padding-top: 0px;
        padding-bottom: 10px;
        color: #999;
        text-align: left;
        font-size: 12px;
        padding-left: 10px;
      }
      &:first-child td {
        padding-left: 10px;
        padding-right: 3px;
        padding-top: 10px;
        color: #000;
        text-align: center;
      }
    }
  }
}
</style>

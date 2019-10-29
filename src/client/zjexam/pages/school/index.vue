<template>
  <div class='w-all'>
    <div class="w-all school-top"></div>
    <div class="w-all flex jc-c ai-c h-60 sha-b">
      <div @click="setNav(index)" :class="{'active':nav==index}" v-for="(item, index) in menuList" :key="index" class="shcool-nav">{{item}}</div>
    </div>

    <!-- 条件查询 -->
    <div class="w-1200 m-auto mb25">
      <div :class="[6,7,8].includes(nav)?'jc-s':'jc-b'" class="w-all flex  ai-c h-70 bb-c mb15">

        <div :class="{'mr20':[6,7,8].includes(nav)}" class="flex ai-c">
          <div>搜索：</div>
          <el-input size="small" class="w-200" multiple v-model="query.name" :placeholder="placeholder"></el-input>
        </div>

        <div :class="{'mr20':[6,7,8].includes(nav)}" class="flex ai-c">
          <div>地区：</div>
          <el-select @change="changeSerch" multiple clearable v-model="query.city" size="small" placeholder="全部">
            <el-option v-for="item in areaList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div :class="{'mr20':[6,7,8].includes(nav)}" v-if="![1,6,7,8].includes(nav)" class="flex ai-c">
          <div>级别：</div>
          <el-select @change="changeSerch" multiple clearable v-model="query.level" size="small" placeholder="全部">
            <el-option v-for="item in leaveList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div :class="{'mr20':[6,7,8].includes(nav)}" v-if="nav==1" class="flex ai-c">
          <div>类别：</div>
          <el-select @change="changeSerch" multiple clearable v-model="query.abtype" size="small" placeholder="全部">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
          </el-select>
        </div>

        <div :class="{'mr20':[6,7,8].includes(nav)}" v-if="nav==1" class="flex ai-c">
          <div>类别：</div>
          <el-select @change="changeSerch" multiple clearable v-model="query.colleges" size="small" placeholder="全部">
            <el-option label="一流大学建设高校" value="一流大学建设高校"></el-option>
            <el-option label="一流学科建设高校" value="一流学科建设高校"></el-option>
          </el-select>
        </div>

        <div :class="{'mr20':[6,7,8].includes(nav)}" v-if="nav!=1" class="flex ai-c">
          <div>主管部门：</div>
          <el-select @change="changeSerch" multiple clearable v-model="query.department" size="small" placeholder="全部">
            <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- 000000 -->
      <div v-if="nav==0&&list.length" class="w-all flex jc-b fw">
        <div @click="href(item.colleges.site)" :title="item.colleges&&item.colleges.collegesName ||''" v-for="(item, index) in list" :key="index" class="hand w23 h-100 sha-6 ra-3 mb10 flex fd-c pp10">
          <span class="w-all">{{(item.colleges&&item.colleges.collegesName || '').replace(/\（.+|\(.+/g,'')}}</span>
          <div class="flex-1 flex jc-s ai-c">
            <div :style="{'background-color':v.color}" v-for="(v, vi) in item.color" :key="vi" class="h-20 lh-20 mr5 fc-fff ra-3 fs-12 pl3 pr3">{{v.value}}</div>
          </div>
          <div class="flex jc-b"><span>{{item.colleges&&item.colleges.department}}</span><span>{{item.colleges&&item.colleges.province}}</span></div>
        </div>
      </div>

      <!-- 111111 -->
      <table v-if="nav==1&&list.length" class="school-table">
        <thead>
          <tr>
            <td class="w-70">序号</td>
            <td>学校名称</td>
            <td class="w-70">类别</td>
            <td>学科建设数量</td>
            <td class="w-100">省市</td>
            <td>类型</td>
            <td class="wb-30">双一流建设学科</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{item.id}}</td>
            <td>{{item.collegeName}}</td>
            <td>
              <div class="h-all w-all flex">
                <span v-if="item.topType=='A'" style="background-color:#e4007f" class="w-25 h-25 fc-fff ra-3 lh-25 centent">{{item.topType ? item.topType : '-'}}</span>
                <span v-else-if="item.topType=='B'" style="background-color:#ff8600" class="w-25 fc-fff h-25 ra-3 lh-25 centent">{{item.topType ? item.topType : '-'}}</span>
                <span v-else class="w-25 h-25 ra-3 lh-25 centent">{{item.topType ? item.topType : '-'}}</span>
              </div>
            </td>
            <td>{{item.topMajorNum}}</td>
            <td>{{item.collegeProvince}}</td>
            <td>{{item.topTypeString}}</td>
            <td style="text-align: left;">{{item.topMajorName}}</td>
          </tr>
        </tbody>
      </table>

      <!-- 2,3,4,5 -->
      <table v-if="[2,3,4,5].includes(nav)&&list.length" class="school-table">
        <thead>
          <tr>
            <td style="text-align: left;" class="wb-20">院校名称</td>
            <td style="text-align: left;" class="wb-20">院校级别</td>
            <td style="text-align: left;" class="wb-10">所在地区</td>
            <td class="wb-10">主管部门</td>
            <td class="wb-10">{{[,,'邱均平排名','软科排名','武书连排名','校友会排名'][nav]}}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td style="text-align: left;">{{item.universityName&&item.universityName.replace(/\（.+|\(.+/g,'')}}</td>
            <td>
              <div class="flex-1 flex jc-s ai-c">
                <div :style="{'background-color':v.color}" v-for="(v, vi) in item.color" :key="vi" class="h-20 lh-20 mr5 fc-fff ra-3 fs-12 pl3 pr3">{{v.value}}</div>
              </div>
            </td>
            <td style="text-align: left;">{{['北京','上海','重庆','天津'].includes(item.provinces)?item.provinces:(item.provinces+item.city)}}</td>
            <td>{{item.department}}</td>
            <td>{{item[[,,'qjRanking','rkRanking','wsRanking','xyhRanking'][nav]]}}</td>
          </tr>
        </tbody>
      </table>

      <!-- 6,7,8 -->
      <table v-if="[6,7,8].includes(nav)&&list.length" class="school-table">
        <thead>
          <tr>
            <td style="text-align: left;" class="wb-20">院校名称</td>
            <td style="text-align: left;" class="wb-20">院校级别</td>
            <td style="text-align: left;" class="wb-10">所在地区</td>
            <td class="wb-10">排名</td>
            <td class="wb-10">主管部门</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td style="text-align: left;" class="wb-20">{{item.universityName}}</td>
            <td style="text-align: left;" class="wb-20">
              <div class="flex-1 flex jc-s ai-c">
                <div :style="{'background-color':v.color}" v-for="(v, vi) in item.color" :key="vi" class="h-20 lh-20 mr5 fc-fff ra-3 fs-12 pl3 pr3">{{v.value}}</div>
              </div>
            </td>
            <td style="text-align: left;" class="wb-10">{{['北京','上海','重庆','天津'].includes(item.province)?item.province:(item.province+item.city)}}</td>
            <td class="wb-10">{{item.ranking}}</td>
            <td class="wb-10">{{item.department ? item.department : '-'}}</td>
          </tr>
        </tbody>
      </table>

      <!-- 9,10 -->
      <table v-if="[9,10].includes(nav)&&list.length" class="school-table">
        <thead>
          <tr>
            <td class="wb-10">学科</td>
            <td style="text-align: left;" class="wb-10">院校名称</td>
            <td style="text-align: left;" class="wb-10">院校级别</td>
            <td v-if="nav==9" class="wb-10">评估结果</td>
            <td style="text-align: left;" class="wb-10">所在地区</td>
            <td class="wb-10">主管部门</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td class="wb-10">{{item.professional}}</td>
            <td style="text-align: left;" class="wb-10">{{item.universityName}}</td>
            <td style="text-align: left;" class="wb-10">
              <div class="flex-1 flex jc-s ai-c">
                <div :style="{'background-color':v.color}" v-for="(v, vi) in item.color" :key="vi" class="h-20 lh-20 mr5 fc-fff ra-3 fs-12 pl3 pr3">{{v.value}}</div>
              </div>
            </td>
            <td v-if="nav==9" class="wb-10">{{item.estimate}}</td>
            <td style="text-align: left;" class="wb-10">{{['北京','上海','重庆','天津'].includes(item.provinces)?item.provinces:(item.provinces+item.city)}}</td>
            <td class="wb-10">{{item.department}}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="!list.length" class="h-250 w-all flex ai-c jc-c">
        <div class="flex fd-c jc-c ai-c">
          <i class="iconfont iconnotes fs-60 fc-ddd"></i>
          <span class="fs-18 mt10">没有找到符合您筛选条件的学校，请仔细检查您的筛选条件，重新搜索查询</span>
        </div>
      </div>
      <spinner></spinner>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import spinner from '../../../../component/spinner.vue';
export default {
  data() {
    return {
      nav: 0,
      query: {
        which: '',
        department: [],
        placeholder: '请输入您的心仪院校',
        city: [],
        level: [],
        name: '',
        abtype: [],
        colleges: []
      },
      menuList: [
        '院校网站详情',//0
        '双一流院校详情',//1
        '邱均平排行',//2
        '软科排行',//3
        '武书连排行',//4
        '校友会排行',//5
        '独立院校排行',//6
        '民办院校排行',//7
        '高职高专院校排行',//8
        '学科专业排行',//9
        '软科学科排行'//10
      ],
      areaList: [],
      baseLeaveList: [],
      leaveList: [],
      departmentList: [],
      schoolList: [],
      list: [],
      collegesList: []
    }
  },
  methods: {
    ...mapActions(['getArea', 'getCollegesLevel', 'getDepartment', 'getRankList', 'getTopCollege']),
    changeSerch(type) {
      this.serchData();
    },
    serchData(type) {
      if ([9, 10].includes(this.nav)) {
        this.placeholder = "请输入您的心仪专业";
      } else {
        this.placeholder = "请输入您的心仪院校";
      }
      let load = this.$loading(this.$store.state.loadObj);
      let sqData = {}, department, level, areaId, which;

      department = this.query.department.length ? this.query.department : this.departmentList.map(v => { return v.value });
      level = this.query.level.length ? this.query.level : this.leaveList.map(v => { return v.value });
      areaId = this.query.city.length ? this.query.city : this.areaList.map(v => { return v.value });

      sqData = {
        department: department.toString(),
        areaId: areaId.toString(),
        collegesLevelId: level.toString(),
        level: level.toString()
      }
      if (this.query.name) {
        sqData.name = this.query.name;
      }

      //双一流院校详情查询不走接口
      if (this.nav == 1 && this.collegesList.length) {
        load && load.close();
        this.list = this.collegesList;
        if (this.query.name) {
          this.list = this.list.filter(v => { return v.collegeName.includes(this.query.name) })
        }
        if (this.query.colleges.length) {
          this.list = this.list.filter(v => { return this.query.colleges.includes(v.topTypeString) })
        }
        if (this.query.abtype.length) {
          this.list = this.list.filter(v => { return this.query.abtype.includes(v.topType) })
        }
        let city = this.areaList.filter(v => { return this.query.city.includes(v.value) }).map(v => { return v.label })
        if (this.query.city.length) {
          this.list = this.list.filter(v => { return city.includes(v.collegeProvince) })
        }
        return false;
      }

      //条件排除
      if (this.nav == 0) {
        delete sqData.level;
        if (this.getCheck()) {
          sqData = { type: this.nav }
        }
      } else if (this.nav == 1) {
        sqData = {}
      } else if (this.nav == 2) {
        delete sqData.collegesLevelId;
        sqData.which = 'QJP'
      } else if (this.nav == 3) {
        delete sqData.collegesLevelId;
        sqData.which = 'RK'
      } else if (this.nav == 4) {
        delete sqData.collegesLevelId;
        sqData.which = 'WS'
      } else if (this.nav == 5) {
        delete sqData.collegesLevelId;
        sqData.which = 'XYH'
      } else if ([6, 7, 8].includes(this.nav)) {
        delete sqData.collegesLevelId;
        delete sqData.level;
      } else if (this.nav == 9) {
        delete sqData.collegesLevelId;
      } else if (this.nav == 10) {
        delete sqData.collegesLevelId;
        sqData.which = 'RKXK'
      }

      //查询
      sqData.type = this.nav;
      this.getRankList(sqData).then(res => {
        load.close();
        this.list = res;
        if (this.nav == 0) {
          this.list.forEach(v => { v.color = this.setRankColor(v.colleges) })
        } else if (this.nav == 1) {
          this.collegesList = res;
        } else if (this.nav == 2) {
          this.list = this.list.filter(v => { return parseInt(v.qjRanking || 0) });
          this.list.forEach(v => { v.color = this.setRankColor(v) })
        } else if (this.nav == 3) {
          this.list = this.list.filter(v => { return parseInt(v.rkRanking || 0) }).sort((a, b) => { return parseInt(a.rkRanking || 0) - parseInt(b.rkRanking || 0) });
          this.list.forEach(v => { v.color = this.setRankColor(v) })
        } else if (this.nav == 4) {
          this.list = this.list.filter(v => { return parseInt(v.wsRanking || 0) }).sort((a, b) => { return parseInt(a.wsRanking || 0) - parseInt(b.wsRanking || 0) });
          this.list.forEach(v => { v.color = this.setRankColor(v) })
        } else if (this.nav == 5) {
          this.list = this.list.filter(v => { return parseInt(v.xyhRanking || 0) }).sort((a, b) => { return parseInt(a.xyhRanking || 0) - parseInt(b.xyhRanking || 0) });
          this.list.forEach(v => { v.color = this.setRankColor(v) })
        } else if ([6, 7, 8, 9, 10].includes(this.nav)) {
          this.list.forEach(v => { v.color = this.setRankColor(v) })
        }
      })
    },
    //检测所有条件是否为空
    getCheck() {
      let isValue = true;
      for (let item in this.query) {
        if (this.query[item].length && item != 'placeholder') {
          isValue = false;
          break;
        }
      }
      return isValue;
    },
    setNav(id) {
      this.list = [{ provinces: '', city: '', province: '' }];
      this.query = { which: '', department: [], city: [], level: [], name: '', abtype: [], colleges: [] }
      this.$router.push({ name: 'school', query: { type: id } });
      this.setLevel(id);
      this.nav = parseInt(id);
      this.getDepartment(this.nav).then(res => {
        this.departmentList = res.map(v => { return { label: v, value: v } });
        setTimeout(() => {
          this.serchData(this.nav);
        }, 200);
      })

    },
    setRankColor(val) {
      let html = [];
      if (val.isToo && val.isToo != "0") {
        html.push({ value: '211', color: '#fb989d' });
      }
      if (val.isNef && val.isNef != "0") {
        html.push({ value: '985', color: '#f6846c' });
      }
      if (val.isSyl && val.isSyl != "0") {
        html.push({ value: '双一流', color: '#91d7cd' });
      }
      if (val.type == "公办") {
        html.push({ value: '公办', color: '#bbdcc9' });
      }
      if (val.type == "民办学校") {
        html.push({ value: '民办', color: '#d7ac4d' });
      }
      if (val.type == "独立学院") {
        html.push({ value: '独立', color: '#3ea5ce' });
      }
      if (val.type == "中外合作办学") {
        html.push({ value: '中外', color: '#6d8285' });
      }
      if (val.level == "高职") {
        html.push({ value: '高职', color: '#8f81be' });
      } else if (val.level == "高职高专") {
        html.push({ value: '中外', color: '#8f81be' });
      } else if (val.level == "独立") {
        html.push({ value: '独立', color: '#3ea5ce' });
      } else if (val.level == "民办") {
        html.push({ value: '民办', color: '#d7ac4d' });
      } else {
        html.push({ value: '本科', color: '#bcdcc5' });
      }
      return html;
    },
    setLevel(type) {
      this.leaveList = [];
      let curtype = this.nav;
      if (type != undefined) {
        curtype = type;
      }
      if (curtype == 0) {
        this.leaveList = this.baseLeaveList;
      } else {
        this.leaveList = [
          { label: '985院校', value: '985' },
          { label: '211院校', value: '211' },
          { label: '双一流院校', value: 'syl' },
          { label: '普通本科', value: 'not' }
        ]
      }

    }
  },
  created() {
    this.nav = parseInt(this.$route.query.type || 0);
    Promise.all([this.getArea(), this.getCollegesLevel(), this.getDepartment(this.nav)]).then(res => {
      this.areaList = res[0].map(v => { return { label: v.areaName, value: v.id } });
      this.baseLeaveList = res[1].map(v => { return { label: v.levelName, value: v.id } });
      this.departmentList = res[2].map(v => { return { label: v, value: v } });
      this.setLevel();
      this.serchData();
    })
  },
  watch:{
    'query.name'(){
      this.changeSerch();
    }
  }
}
</script>

<style lang='less' scoped>
.school-table {
  width: 100%;
  box-shadow: 0 0 6px 1px rgba(85, 85, 85, 0.1);
  thead {
    td {
      text-align: center;
      padding: 15px 10px;
      font-size: 15px;
      border-bottom: 1px solid #ddd;
    }
  }
  tbody {
    td {
      text-align: center;
      padding: 13px 10px;
      font-size: 15px;
      border-bottom: 1px solid #ddd;
    }
    tr {
      &:hover {
        background-color: #f9f9f9;
      }
    }
  }
}
.w23 {
  width: 19%;
}
.school-top {
  background-image: url("../../assets/school-bg.png");
  width: 100%;
  height: 183px;
  // background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

</style>

<template>
  <div class='w-all h-all fs-14 bc-fff rank-detail flex fd-c'>
    <div>
      <div class="pl15 pr15 flex jc-b pt7 pb7 bc-f1 ai-c">
        <div @click="btnInput(1)" class="bc-fff flex-1 pl10 pr10 pt7 pb7 ra-4 flex jc-b">
          <i :style="{'margin-left':!isShow?'30%':''}" class="icon iconfont iconchaxun c-aaa"></i>
          <input v-model="selectValue" :placeholder="[9,10].includes(selectType)?'请输入心仪的专业':'请输入心仪的院校'" class="flex-1 fs-13 ml12" type="text">
        </div>
        <div v-if="isShow" @click="btnInput(2)" class="ml15 red">取消</div>
      </div>

      <div class="flex jc-b pt10 pb10">
        <div @click="btnSelectType(0)" class="wb-20 flex-1 flex jc-c" style="border-right:1px solid #ddd;">
          <div>地区</div>
          <i class="icon iconfont iconxiangxiajiantou ml10 c-aaa"></i>
        </div>
        <div @click="btnSelectType(1)" v-if="![6,7,8].includes(selectType)" class="wb-20 flex-1 flex jc-c" style="border-right:1px solid #ddd;">
          <div>级别</div>
          <i class="icon iconfont iconxiangxiajiantou ml10 c-aaa"></i>
        </div>
        <div @click="btnSelectType(2)" class="wb-20 flex-1 flex jc-c">
          <div>部门</div>
          <i class="icon iconfont iconxiangxiajiantou ml10 c-aaa"></i>
        </div>
      </div>

      <div class="h-10 bc-f2 w-all"></div>
    </div>

    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" v-show="!majorType" class="flex-1 h-all auto">
      <div v-if="selectType==1">
        <div v-if="index<scollCount" v-for="(item, index) in list" :key="index" style="border-bottom:1px solid #ddd" class="flex jc-b pl10 pt10 bb-e pb10 pr10 pl5">
          <div @click="routerLink(item.colleges.site)" class="w-all">
            <div class="flex jc-b mb10">
              <span>{{interceptName(item.colleges.collegesName)}}</span>
              <span>{{item.colleges.province}}{{item.colleges.city==item.colleges.province?'':item.colleges.city}}</span></div>
            <div class="jc-b flex">
              <div class="flex-1" v-html="htmlToRankType(item.colleges)"></div>
              <span>{{item.colleges.department}}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="[9,10].includes(selectType)">
        <div v-if="index<scollCount" v-for="(item, index) in list" :key="index" style="border-bottom:1px solid #ddd" class="flex jc-b pl10 pt10 bb-e pb10 pr10 pl5">
          <div class="w-all">
            <div class="flex jc-b mb10 ai-c">
              <span class="jb-fc fs-20 pr5"><span>{{item.rank}}</span>{{item.estimate}}</span>
              <div class="flex-1">{{interceptName(item.universityName)}}</div>
              <span>{{item.province||item.provinces}}{{item.city==(item.province||item.provinces)?'':item.city}}</span>
            </div>
            <div class="jc-b flex">
              <div class="pr10">{{item.professional}}</div>
              <div class="flex-1" v-html="htmlToRankType(item)"></div>
              <span>{{item.department}}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div v-if="index<scollCount" v-for="(item, index) in list" :key="index" class="flex jc-b pt10 bb-e pb10 pr10 pl10">
          <div class="rel w-40">
            <span v-if="['1','2','3'].includes(item[rankTop()])" :class="[,'iconjiangpai1 jiang1','iconjiangpai2 jiang2','iconjiangpai3 jiang3'][item[rankTop()]]" class="iconfont fs-28 ml3"></span>
            <div v-else class="jb-fc fs-18 centent w-40 pr5">{{item[rankTop()]||index+1}}</div>
          </div>
          <div class="flex-1 ml5">
            <div class="flex jc-b mb5">
              <span>{{interceptName(item.universityName)}}</span>
              <span>{{item.province||item.provinces}}{{item.city==(item.province||item.provinces)?'':item.city}}</span>
            </div>
            <div class="jc-b flex">
              <div class="flex-1" v-html="htmlToRankType(item)"></div>
              <span>{{item.department}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div v-if="isShow && majorType" class="flex-1 h-all auto">
      <div @click="btnSetType(item,'major')" v-for="(item, index) in majorList" :key="index" class="bb-e w-all h-40 ai-c flex pl15 pr15 jc-b">
        <span class="flex-1">{{item.title}}</span>
      </div>
    </div>

    <mt-popup style="height:60%" class="w-all bt" v-model="popupArtType" position="bottom">
      <div class="flex h-all fd-c">
        <div style="border-bottom:1px solid #ccc" class="flex w-all jc-b ai-c fs-15">
          <span @click="popupArtType=false;" class="pt15 pl20 pr20 pb15 c-aaa">取消</span>
          <span>{{['选择地区','选择级别','选择部门'][typeIndex]}}</span>
          <span @click="popupArtType=false;initData()" class="pt15 pl20 pr20 pb15 jb-fc">确定</span>
        </div>

        <div v-if="typeIndex==0" class="w-all pl15 pr15 auto h-all flex-1">
          <div @click="btnSetType(item,'area')" v-for="(item, index) in areaList" :key="index" class="bb-e w-all h-40 ai-c flex jc-b">
            <span class="flex-1">{{item.areaName}}</span>
            <i v-if="item.select" class="iconfont iconfuxuankuanggou c-eb8718"></i>
          </div>
        </div>

        <div v-if="typeIndex==1" class="w-all pl15 pr15 auto h-all flex-1">
          <div @click="btnSetType(item,'level')" v-for="(item, index) in levelList" :key="index" class="bb-e w-all h-40 ai-c flex jc-b">
            <span class="flex-1">{{item.levelName}}</span>
            <i v-if="item.select" class="iconfont iconfuxuankuanggou c-eb8718"></i>
          </div>
        </div>

        <div v-if="typeIndex==2" class="w-all pl15 pr15 auto h-all flex-1">
          <div @click="btnSetType(item,'serch')" v-for="(item, index) in deparmentList" :key="index" class="bb-e w-all h-40 ai-c flex jc-b">
            <span class="flex-1">{{item.title}}</span>
            <i v-if="item.select" class="iconfont iconfuxuankuanggou c-eb8718"></i>
          </div>
        </div>

      </div>
    </mt-popup>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      isShow: false,
      selectValue: '',
      selectType: 0, //类型
      levelList: [],//级别
      areaList: [], //地区
      deparmentList: [],//部门
      majorList: [], //专业,
      typeIndex: 0,
      popupArtType: false,
      majorType: false, //专业选择显示列表,
      list: [],
      scollCount: 20,
      busy: false
    }
  },
  watch: {
    selectValue(old, newval) {
      this.initData();
    }
  },
  methods: {
    ...mapActions(['getRankList']),
    loadMore() {
      this.busy = true
      setTimeout(() => {
        this.scollCount += 20;
        this.busy = false
      }, 200);
    },
    // 截取院校名称
    interceptName(uName) {
      uName = uName.replace(/[（]/g, '(').replace(/[）]/g, ')').replace(/\(.+\)/g, '')
      return uName
    },
    rankTop() {
      let type = parseInt(this.$route.query.t);
      let curr = ['ranking', , 'qjRanking', 'rkRanking', 'wsRanking', 'xyhRanking', , , ,];
      let index = 0;
      if ([2, 3, 4, 5].includes(type)) {
        index = type
      }
      if (type == 10) {
        index = type;
      }
      return curr[index]
    },
    routerLink(link) {
      window.open(link)
    },
    btnInput(type) {
      if (type == 1) {
        this.isShow = true;
        this.majorType = false;
        if ([9, 10].includes(this.selectType)) {
          this.majorType = true;
        }
      } else if (type == 2) {
        this.isShow = false;
        this.majorType = false;
        if (this.selectValue) {
          this.selectValue = '';
          this.initData();
        }
      }

    },
    initData(type, first) {
      this.scollCount = 20;
      this.list=[];
      let params = {};
      if (this.selectValue) {
        params.name = this.selectValue
      }
      //取部门
      let ctDepartment = this.deparmentList.filter(v => { return v.select });
      if (ctDepartment.length > 0) {
        params.department = ctDepartment.map(v => { return v.title }).toString();
      } else {
        params.department = this.deparmentList.map(v => { return v.title }).toString();
      }
      //取级别
      let ctlevel = this.levelList.filter(v => { return v.select });
      if (ctlevel.length > 0) {
        params.collegesLevelId = ctlevel.map(v => { return v.id }).toString();
      } else {
        params.collegesLevelId = this.levelList.map(v => { return v.id }).toString();
      }
      //取地区
      let ctarea = this.areaList.filter(v => { return v.select });
      if (ctarea.length > 0) {
        params.areaId = ctarea.map(v => { return v.id }).toString();
      } else {
        params.areaId = this.areaList.map(v => { return v.id }).toString();
      }


      if ([2, 3, 4, 5].includes(this.selectType)) {
        params.which = ['QJP', 'RK', 'WS', 'XYH'][[2, 3, 4, 5].indexOf(this.selectType)];
        params.level = params.collegesLevelId;
      }

      if (this.selectType == 1 && first) {
        params = {};
      }

      if ([6, 7, 8].includes(this.selectType)) {
        delete params.collegesLevelId;
        delete params.which;
      } else if (this.selectType == 9) {
        delete params.which;
        params.level = params.collegesLevelId;
      } else if (this.selectType == 10) {
        params.which = "RKXK";
        params.level = params.collegesLevelId;
        delete params.collegesLevelId;
      }
      this.$indicator.open({ spinnerType: 'fading-circle' });
      this.getRankList({ type: this.selectType, params }).then(res => {
        if (this.selectType == 2) {
          res = res.filter(v => { return v.qjRanking })
          res.sort((a, b) => {
            return a.qjRanking - b.qjRanking
          })
        }
        else if (this.selectType == 3) {
          res = res.filter(v => { return v.rkRanking })
          res.sort((a, b) => {
            return a.rkRanking - b.rkRanking
          })
        }
        else if (this.selectType == 4) {
          res = res.filter(v => { return v.wsRanking })
          res.sort((a, b) => {
            return a.wsRanking - b.wsRanking
          })
        }
        else if (this.selectType == 5) {
          res = res.filter(v => { return v.xyhRanking })
          res.sort((a, b) => {
            return a.xyhRanking - b.xyhRanking
          })
        }
        if ([6, 7, 8].includes(this.selectType)) {
          res = res.filter(v => { return v.ranking })
        }
        this.list = res;
        this.$indicator.close();
      })
    },
    btnSelectType(type) {
      this.typeIndex = type;
      this.popupArtType = true;
    },
    btnSetType(item, type) {
      if (type == 'major') {
        this.majorType = false;
        this.selectValue = item.title;
        this.initData();
      } else {
        item.select = !item.select;
      }

    },
    // 设置排名颜色
    htmlToRankType(college) {
      let _rtHtml = ''
      if (college.isToo && college.isToo !== '0') {
        _rtHtml += '<span class="ranktype sl2">211</span>'
      }
      if (college.isNef && college.isNef !== '0') {
        _rtHtml += '<span class="ranktype sl1">985</span>'
      }
      if (college.isSyl && college.isSyl !== '0') {
        _rtHtml += '<span class="ranktype sl3">双一流</span>'
      }
      if (college.type === '公办') {
        _rtHtml += '<span class="ranktype sl4">公办</span>'
      }
      if (college.type === '民办学校') {
        _rtHtml += '<span class="ranktype sl6">民办</span>'
      }
      if (college.type === '独立学院') {
        _rtHtml += '<span class="ranktype sl5">独立</span>'
      }
      if (college.type === '中外合作办学') {
        _rtHtml += '<span class="ranktype sl7">中外</span>'
      }

      if (college.level === '高职') {
        _rtHtml += '<span class="ranktype sl8">高职</span>'
      } else if (college.level === '高职高专') {
        _rtHtml += '<span class="ranktype sl8">高职</span>'
      } else if (college.level === '独立') {
        _rtHtml += '<span class="ranktype sl5">独立</span>'
      } else if (college.level === '民办') {
        _rtHtml += '<span class="ranktype sl6">民办</span>'
      } else {
        _rtHtml += '<span class="ranktype sl9">本科</span>'
      }
      return _rtHtml
    },
  },
  created() {
    this.selectType = parseInt(this.$route.query.t);
    this.areaList = this.session('areaList');
    this.levelList = this.session('collegesList');
    if ([2, 3, 4, 5, 9, 10].includes(this.selectType)) {
      this.levelList = [];
      this.levelList = [
        { id: '985', levelName: '985院校', select: false },
        { id: '211', levelName: '211院校', select: false },
        { id: 'syl', levelName: '双一流院校', select: false },
        { id: 'not', levelName: '普通本科', select: false }
      ]
    }
    this.deparmentList = this.session('departMentList');
    if ([9, 10].includes(this.selectType)) {
      this.majorList = this.session('majorList');
    }
    this.initData(this.selectType, true);
  }
}
</script>

<style lang='less'>
.rank-detail {
  .bc-EFEFF4 {
    background-color: #efeff4;
  }
  .ranktype {
    color: #fff;
    border-radius: 8/75rem;
    font-size: 12px;
    padding-top: 2/75rem;
    padding-bottom: 5/75rem;
    padding-left: 6/75rem;
    padding-right: 6/75rem;
    margin-right: 5px;
  }
  .sl1 {
    background-color: #f6846c;
  }
  .sl2 {
    background-color: #fb989d;
  }
  .sl3 {
    background-color: #91d7cd;
  }
  .sl4 {
    background-color: #bbdcc9;
  }
  .sl5 {
    background-color: #3ea5ce;
  }
  .sl6 {
    background-color: #d7ac4d;
  }
  .sl7 {
    background-color: #6d8285;
  }
  .sl8 {
    background-color: #8f81be;
  }
  .sl9 {
    background-color: #86c2ff;
  }

  .jiang1 {
    color: #ffbe00;
  }
  .jiang2 {
    color: #e4e7e7;
  }
  .jiang3 {
    color: #ff9265;
  }
}
</style>

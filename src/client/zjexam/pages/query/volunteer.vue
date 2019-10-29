<template>
  <div class="w-all flex hi-0 h-all query-bg fd-c">
    <div class="h-28 flex h-all jc-b bc273C56">
      <div class="flex h-all ai-s">
        <span class="ml10 mt7 fs-13">金榜题名浙江省2020新高考智能辅助查询系统</span>
        <div class="flex-line bc1da7c3 h-all fc-s ai-c fs-12 ml15 pl10 hand pr10">
          <el-popover placement="top" :offset=150 width="auto" popper-class="query-tip" trigger="click">
            <div class="flex-line pp5 fd-c">
              <span>高考志愿查询步骤</span>
              <div class="flex ai-c mt15">
                <span class="mr10 bc61c2d5">步骤一</span>
                <span>检查您的个人信息，如需修改请点击修改信息，确保信息无误。（模拟填报结束后信息仅可修改一次）</span>
              </div>
              <div class="flex ai-c mt10">
                <span class="mr10 bc61c2d5">步骤二</span>
                <span>选择你的目标院校级别和目标院校所在地区，院校级别与院校地区支持多选</span>
              </div>
              <div class="flex ai-c mt10">
                <span class="mr10 bc61c2d5">步骤三</span>
                <span>在专业选择栏目中选择你的目标专业，该栏目支持关键字搜索</span>
              </div>
              <div class="flex ai-c mt10">
                <span class="mr10 bc61c2d5">步骤四</span>
                <span>根据你的个人信息及筛选条件，右侧会直接显示匹配的院校专业，以冲稳保的方式排序推荐，右上角可选择全屏查看</span>
              </div>
              <div class="flex ai-c mt10">
                <span class="mr10 bc61c2d5">步骤五</span>
                <span>全屏查看页面，点击右上角可下载查询结果到本地电脑</span>
              </div>
            </div>
            <div slot="reference">
              <span>查询中如需帮助，请点我</span>
              <span class="iconfont iconwenhao ml5"></span>
            </div>
          </el-popover>
        </div>
      </div>
      <div class="flex">
        <div style="background: rgba(255, 255, 255, 0.2);" class="flex ai-c h-all pr10 fs-13">
          <div style="background: rgba(255, 255, 255, 0.2);" class="h-all lh-30 pl10 pr10">高考志愿查询系统</div>
          <div class="pl10">{{queryText}}</div>
        </div>

        <div @click="href('#/school?type=1')" style="background:#3cd1b5;" class="ml50 h-all flex ai-c pl10 pr10 fs-13 hand">
          双一流院校详情
        </div>
      </div>
    </div>
    <div class="imitate h-all hi-0 flex-1">
      <div class="imitate-body h-all flex">
        <div v-if="!isScreen" style="width:212px;" class="mr10 h-all flex fd-c">
          <!-- 个人信息 -->
          <div class="bc-fff mb10">
            <div class="title flex h-25">
              <span class="w-25 flex ai-c jc-c bc-fdb813">1</span>
              <span class="jb-bc flex ai-c pl5 pr10">个人信息</span>
              <span class="tip-icon query-top"></span>
            </div>

            <div class="pp10 fs-14">
              <div class="mb3 ">姓名：{{userinfo.name}}</div>
              <div class="mb3">考生类型：{{userinfo.examType==1?'普通考生':userinfo.artSubject}}</div>
              <div class="mb3">民族：{{userinfo.nation==1?'汉族':'少数民族'}}</div>
              <div class="mb3">选考科目：{{myMajor.query.toString()}}</div>
              <div class="flex">
                <div class="flex-1 fd-c flex">
                  <span v-for="(item, index) in myMajor.main" :key="index" class="mb5">{{item.name}}：{{item.value}}</span>
                </div>
                <div class="flex-1 fd-c flex">
                  <span v-for="(item, index) in myMajor.select" :key="index" class="mb5">{{item.name}}：{{item.value}}</span>
                </div>
              </div>
              <div v-if="userinfo.examType==2" class="mb3">专业省统考成绩：{{userinfo.artScore}}</div>
              <div v-if="userinfo.plusScore" class="mb3">高考加分：{{userinfo.plusScore}}</div>
              <div class="mb3">位次号：{{userinfo.examType==1?userinfo.rank:userinfo.artRank}}</div>
              <div class="mb3">高考成绩：{{parseInt(userinfo.examType==1?userinfo.score:userinfo.artFinalScore).toFixed(0)}}</div>
              <div class="mb3">17成绩转换：{{userinfo.historyScore&&userinfo.historyScore.split(',')[0] ||0}}</div>
              <div class="mb3">18成绩转换：{{userinfo.historyScore&&userinfo.historyScore.split(',')[1] ||0}}</div>
              <div class="mb3">19成绩转换：{{userinfo.historyScore&&userinfo.historyScore.split(',')[2] ||0}}</div>
              <div class="flex mt5 jc-s">
                <div @click="$router.push({name:'user-rank',query:{redirect:'query-volunteer'}})" class="jb-bc ra-4 flex-line h-25 ai-c pl10 pr10 hand">修改信息</div>
              </div>
            </div>
          </div>

          <!-- 考生批次选择 -->
          <div class="bc-fff h-all auto pb15 flex-1">
            <div class="title flex h-25 mb20">
              <span class="w-25 flex ai-c jc-c bc-fdb813">2</span>
              <span class="jb-bc flex ai-c pl5 pr10">院校级别</span>
              <span class="tip-icon query-top"></span>
              <div v-if="levelSpecil.filter(v=>{return v.select}).length<levelSpecil.length" @click="btnSerch(0,true)" class="flex ai-c ml20 hand fc-primary fs-14 ff-b">全选</div>
            </div>
            <div class="flex jc-c fd-c pl25 pr25">
              <span :style=" {'background-color':item.select?item.color:'#ddd'}" @click="btnSerch(item)" class="h-26 mb8 ra-4 hand centent lh-26 fc-fff pl10 pr10" v-for="(item, index) in levelSpecil" :key="index">{{item.name}}</span>
            </div>
          </div>
        </div>

        <!-- 全国地区选择 -->
        <div v-if="!isScreen" style="width:250px;" class="mr10 flex fd-c bc-fff">
          <div class="title flex h-25 mb20">
            <span class="w-25 flex ai-c jc-c bc-fdb813">3</span>
            <span class="jb-bc flex ai-c pl5 pr10">全国地区选择</span>
            <span class="tip-icon query-top"></span>
            <div v-if="query.selectProvice.length<(areaList.length - 5)" @click="setSelectProvice(true)" class="flex ai-c ml20 hand fc-primary fs-14 ff-b">全选</div>
          </div>

          <!-- 全国地区选择列表 -->
          <div class="pl20 pr20 flex-1 h-all auto">
            <span v-for="(item, index) in areaList" :key="index">
              <div @click="setSelectProvice(false,item.title)" v-if="item.title!='nono'" :class="{'bcb3d9ff':item.select,'bceee':!item.select}" class="area-item">
                <span class="title">{{item.title}}</span>
                <span :style="{'width':item.value/query.maxArea*100+'%'}" class="scoll"></span>
              </div>
              <div v-if="item.title=='nono'" class="h-15 mb5"></div>
            </span>
          </div>
        </div>

        <!-- 专业类选择4444 -->
        <div v-if="!isScreen&&userinfo.examType==1" style="width:220px;" class="mr10 flex fd-c bc-fff">
          <div class="title flex h-25 mb15">
            <span class="w-25 flex ai-c jc-c bc-fdb813">4</span>
            <span class="jb-bc flex ai-c pl5 pr10">专业类选择</span>
            <span class="tip-icon query-top"></span>
            <div v-if="specialty.filter(v=>{return v.select}).length<specialty.length" @click="specialtySelect('',true)" class="flex ai-c ml20 hand fc-primary fs-14 ff-b">全选</div>
          </div>
          <div class="flex mb10">
            <el-dropdown class="w-90 fs-12 b flex ai-c ml8 mr5 b-d ra-5 pl3 pr3 hand" @command="selectSpecialty" size="mini" trigger="click">
              <span class="el-dropdown-link flex jc-b ai-c w-all hand">
                <span class="flex-1 centent">{{query.isZuan}}</span><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="本+专">本+专</el-dropdown-item>
                <el-dropdown-item command="本">本</el-dropdown-item>
                <el-dropdown-item command="专">专</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input size="mini" class="mr8 fs-12" placeholder="输入感兴趣专业" suffix-icon="el-icon-search" v-model="query.categoryName"></el-input>
          </div>
          <div class="flex fd-c flex-1 h-0 auto">
            <div class="pl8 pr8">
              <div @click="specialtySelect(item)" class="specialty" :title="'计划招生数：'+item.value" v-for="(item, index) in specialty" :key="index">
                <span :style="{'color':item.select?'#ab0f5d !important':'#555'}" class="title fs-13 pl5">{{item.title}}</span>
                <span :style="{'width':item.value/query.maxSpecialty*100+'%','background-color':item.select?(item.title.includes('(本)')?'#e4c2d3':'#9eceff'):'#ddd'}" class="scoll"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- 院校选择 -->
        <div class="flex fd-c flex-1 bc-fff">
          <div class="w-all fs-13 flex ai-c lh-20">
            <el-popover placement="bottom" width="auto" trigger="hover">
              <div class="flex-line fs-12 fd-c">
                <span>考生位次：{{userinfo.rank}}</span>
                <div>选考科目：{{myMajor.query.toString()}}</div>
                <span>所选专业：<i class="fc-a">{{specialty.filter(v=>{return v.select}).length==specialty.length?'全部':specialty.filter(v=>{return v.select}).map(v=>{return v.title}).toString()}}</i></span>
                <span>所选院校：<i class="fc-a">{{levelSpecil.filter(v=>{return v.select}).length==levelSpecil.length?'全部':levelSpecil.filter(v=>{return v.select}).map(v=>{return v.name}).toString()}}</i></span>
                <span>所选地区：<i class="fc-a">{{query.selectProvice.length==(areaList.length - 5)?'全部':query.selectProvice.toString()}}</i></span>
              </div>
              <div slot="reference" class="ml10">筛选条件：</div>
            </el-popover>
            <div class="flex-1 fs-12 pt5 pb5">
              <span>专业：<i class="fc-a">{{specialty.filter(v=>{return v.select}).length==specialty.length?'全部':specialty.filter(v=>{return v.select}).map(v=>{return v.title}).toString()}}</i></span>
              <span class="pl10">院校：<i class="fc-a">{{levelSpecil.filter(v=>{return v.select}).length==levelSpecil.length?'全部':levelSpecil.filter(v=>{return v.select}).map(v=>{return v.name}).toString()}}</i></span>
              <span class="pl10">地区：<i class="fc-a">{{query.selectProvice.length==(areaList.length - 5)?'全部':query.selectProvice.toString()}}</i></span>
            </div>
          </div>
          <div class="jb-bc flex ai-c pl10 pr10 pt5 pb5">
            <div class="flex fs-13 fd-c flex-1">
              <span>结果条数:{{schoolList &&schoolList.length}}</span>
              <span>根据条件和条数，得出以下符合你的院校专业</span>
            </div>
            <div @click="btnDowload(2)" v-if="isScreen" class="hand fs-12 pp3 ra-4 jb-fc bc-fff ff-b ml10">下载查询详情</div>
            <div @click="btnDowload(1)" v-if="isScreen" class="hand fs-12 pp3 ra-4 jb-fc bc-fff ff-b ml10">下载查询结果</div>
            <div @click="setFull" class="hand fs-14 ff-b ml10">{{isScreen?'关闭全屏':'全屏查看'}}</div>
          </div>

          <div class="h-all auto flex-1 flex fd-c fs-12 rel fc-000">
            <div class="flex w-all ai-c pt10 pb10 bb-d query-school pr15">
              <div class="school0 center wi-65 w-65">院校代码</div>
              <div class="school0 flex-1 wi-160">院校名称</div>
              <div class="school0 center w-65">专业代码</div>
              <div class="school0 w-200 pr10">专业名称(本/专) </div>
              <div :class="{'school1':!isScreen}" class="wb-15">院校级别</div>
              <div :class="{'school1':!isScreen}" class="wb-15 center">选考科目范围</div>
              <div :class="{'school1':!isScreen}" v-if="isScreen" class="w-55 center">标记</div>
              <div class="w-65 center" v-if="isScreen">{{years[1]}}<br />招生人数</div>
              <div class="w-75 center" v-if="isScreen">所在地区</div>
              <div class="w-65 center" v-if="isScreen">学制/学费<br>({{years[1]}})</div>
              <div class="w-65 center" v-if="isScreen">院校详情</div>
              <div class="w-85 center" v-if="isScreen">{{years[1]}}年录取最<br>低分数/位次</div>
              <div class="w-85 center" v-if="isScreen">{{years[2]}}年录取最<br>低分数/位次</div>
              <div class="w-85 center" v-if="isScreen">{{years[3]}}年录取最<br>低分数/位次</div>
            </div>
            <div ref="spinner" infinite-scroll-distance="25" infinite-scroll-disabled="busy" v-infinite-scroll="nextLoad" class="flex-1 query-school h-all auto">
              <div v-for="(item, index) in schoolList" :key="index">
                <div v-if="item.s&&(index<maxCount)" class="w-all pb10 bb-e">
                  <div class="flex pt10 w-all">
                    <!-- 院校代码 -->
                    <div class="school0 center wi-65 w-65">{{item.incode}}</div>
                    <!-- 院校名称 -->
                    <div class="school0 flex-1 wi-160 wrap">{{item.school}}</div>
                    <!-- 专业代码 -->
                    <div class="school0 center w-65">{{item.mcode}}</div>
                    <!-- 专业名称(本/专) -->
                    <div class="school0 w-200 pr10">
                      <div class="flex">
                        <div class="rel">
                          <span :style="{'color':['#fb2624','#fed604','#8bb446'][[1,2,3].indexOf(parseInt(item.rankType))]}" class="iconfont iconbookmark2 fs-25"></span>
                          <div class="abs fc-fff at1 al7 c-fff">
                            {{['冲','稳','保'][[1,2,3].indexOf(parseInt(item.rankType))]}}
                          </div>
                        </div>
                        <div>{{item.major}}({{item.mlevel=='本科'?'本':'专'}})</div>
                      </div>
                    </div>

                    <!-- 院校级别 -->
                    <div :class="{'school1':!isScreen}" class="wb-15">
                      <div class="inline-block" v-html="setColor(item.property,item.topproperty)"></div>
                    </div>
                    <!-- 选考科<br>目范围 -->
                    <div :class="{'school1':!isScreen}" v-html="toChinese(item)" class="wb-15 center wrap"></div>
                    <!-- 标记 -->
                    <div :class="{'school1':!isScreen}" v-if="isScreen" class="w-55 center">
                      <span @click="deleteItem(item,index)" class="iconfont hover-report fs-12 hand icon0902shanchu"></span>
                    </div>
                    <!-- 2019招生人数 -->
                    <div class="w-65 center" v-if="isScreen">{{item.amount}}</div>
                    <!-- 所在地区 -->
                    <div class="w-75 center" v-if="isScreen">
                      {{['北京','上海','重庆','天津'].includes(item.province)?item.province:(item.province+item.city)}}
                    </div>
                    <!-- 学制/学费 -->
                    <div class="w-65 center" v-if="isScreen">{{item.year}}/{{item.fee}}</div>
                    <!-- 院校详情 -->
                    <div class="w-65 center" v-if="isScreen">
                      <span @click="href(item.site)" style="background:#e46271;" class="iconfont pt2 pb2 pl4 pr4 hand ra-4 fc-fff icongantanhao"></span>
                    </div>
                    <div class="w-85 center" v-if="isScreen">
                      {{item.f[1]||'-'}}/{{item.r[1]||'-'}}
                    </div>
                    <div class="w-85 center" v-if="isScreen">
                      {{item.f[2]||'-'}}/{{item.r[2]||'-'}}
                    </div>
                    <div class="w-85 center" v-if="isScreen">
                      {{item.f[3]||'-'}}/{{item.r[3]||'-'}}
                    </div>
                  </div>
                  <div v-if="isScreen" class="w-all flex fc-999">
                    <div class="w-65"></div>
                    <span class="flex-1">简注：{{item.remark}}</span>
                  </div>
                </div>
              </div>
              <div v-for="(item, index) in schoolList" :key="index">
                <div v-if="!item.s" class="w-all delete bc pb10 bb-e">
                  <div class="flex pt10 w-all">
                    <!-- 院校代码 -->
                    <div class="school0 center wi-65 w-65">{{item.incode}}</div>
                    <!-- 院校名称 -->
                    <div class="school0 flex-1 wi-160 wrap">{{item.school}}</div>
                    <!-- 专业代码 -->
                    <div class="school0 center w-65">{{item.mcode}}</div>
                    <!-- 专业名称(本/专) -->
                    <div class="school0 w-200 pr10">
                      <div class="flex">
                        <div class="rel">
                          <span :style="{'color':['#fb2624','#fed604','#8bb446'][[1,2,3].indexOf(parseInt(item.rankType))]}" class="iconfont iconbookmark2 fs-25"></span>
                          <div class="abs fc-fff at1 al7 c-fff">
                            {{['冲','稳','保'][[1,2,3].indexOf(parseInt(item.rankType))]}}
                          </div>
                        </div>
                        <div>{{item.major}}({{item.mlevel=='本科'?'本':'专'}})</div>
                      </div>
                    </div>

                    <!-- 院校级别 -->
                    <div :class="{'school1':!isScreen}" class="wb-15">
                      <div class="inline-block" v-html="setColor(item.property,item.topproperty)"></div>
                    </div>
                    <!-- 选考科<br>目范围 -->
                    <div :class="{'school1':!isScreen}" v-html="toChinese(item)" class="wb-15 center wrap"></div>
                    <!-- 标记 -->
                    <div :class="{'school1':!isScreen}" v-if="isScreen" class="w-55 center">
                      <span @click="deleteItem(item,index)" class="iconfont hover-report fs-12 hand icon0902shanchu"></span>
                    </div>
                    <!-- 2019招生人数 -->
                    <div class="w-65 center" v-if="isScreen">{{item.amount}}</div>
                    <!-- 所在地区 -->
                    <div class="w-75 center" v-if="isScreen">
                      {{['北京','上海','重庆','天津'].includes(item.province)?item.province:(item.province+item.city)}}
                    </div>
                    <!-- 学制/学费 -->
                    <div class="w-65 center" v-if="isScreen">{{item.year}}/{{item.fee}}</div>
                    <!-- 院校详情 -->
                    <div class="w-65 center" v-if="isScreen">
                      <span @click="href(item.site)" style="background:#e46271;" class="iconfont pt2 pb2 pl4 pr4 hand ra-4 fc-fff icongantanhao"></span>
                    </div>
                    <div class="w-85 center" v-if="isScreen">
                      {{item.f[1]||'-'}}/{{item.r[1]||'-'}}
                    </div>
                    <div class="w-85 center" v-if="isScreen">
                      {{item.f[2]||'-'}}/{{item.r[2]||'-'}}
                    </div>
                    <div class="w-85 center" v-if="isScreen">
                      {{item.f[3]||'-'}}/{{item.r[3]||'-'}}
                    </div>
                  </div>
                  <div v-if="isScreen" class="w-all flex fc-999">
                    <div class="w-65"></div>
                    <span class="flex-1">简注：{{item.remark}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="schoolList.length==0" class="flex-1 ai-c jc-c flex fs-14">
              根据左侧条件的选择，没有匹配的院校和专业，请重新调整左侧的条件
            </div>
            <!-- <div v-if="schoolList.length>240" class="showCount">
              <div>温馨提示：</div>
              <div>当前筛选条件过于宽泛，导致查询结果条数过多，请精简左侧筛选条件，确保查询结果条数在240条以内</div>
            </div> -->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { province } from 'lib/province.js';
import getPy from 'lib/py.js';
export default {
  computed: {
    ...mapState(['userinfo']),
  },
  data() {
    return {
      loader: null,
      isScreen: false,
      maxCount: 25,
      queryText: '',
      query: {
        batch: '本科第一批',
        maxArea: 0,
        isZuan: "本+专",
        categoryName: "",
        maxSpecialty: 0,
        selectProvice: [],
        selectSpecialty: [],
        schoolName: '',
        chong: '全部'
      },
      serchs: {
        ranking: null,
        my7select3: null,
        zy: null,
        level: null,
        area: null,
        scoreRankFilterType: 2
      },

      allData: [],//总数据,
      years: [],
      majorsList: [],
      areaList: province,//地区数据
      specialty: [],//专业对像列表显示用,
      specialtyList: [],
      categoryList: [],//专业列表含所有专业,统计用
      categoryTwo: [],//专业列表,统计用
      schoolList: [], //最终所查学校
      schoolListBase: [],

      myMajor: {
        query: [],
        main: [],
        select: [],
      },

      levelSpecil: [
        { name: '双一流(学科)大学', select: true, color: '#94d3cd', value: 0 },
        { name: '985院校', select: true, color: '#f7836a', value: 1 },
        { name: '211院校', select: true, color: '#f69a9b', value: 2 },
        { name: '公办本科', select: true, color: '#bcdcc5', value: 3 },
        { name: '独立院校', select: true, color: '#42a3cd', value: 4 },
        { name: '民办院校', select: true, color: '#d7ac4d', value: 5 },
        { name: '中外合作办学', select: true, color: '#6b8383', value: 6 },
        { name: '高职高专', select: true, color: '#8f82bc', value: 7 },
      ],

      steadyMin: 0,//稳下限
      steadyMax: 0,//稳下限
      steadyType: 0,//稳段位次,
      busy: false,
    }
  },
  methods: {
    ...mapActions(['getSimulationData', 'getQueryDownload']),
    deleteItem(item, index) {
      item.s = !item.s;
      this.$set(this.schoolList, index, item);
    },
    nextLoad() {
      setTimeout(() => {
        this.maxCount += 25;
      }, 300);
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
          return `${selSub.toString()}</br>(${selSub.length}门科目考生必须选考其中一门即可报考)`;
        }
      } else {
        return `${selSub.toString()}</br>(${selSub.length}门科目考生必须选考方可报考)`;
      }

    },
    btnDowload(type) {

      this.serchs.zy = this.specialty.filter(v => { return v.select }).length == this.specialty.length ? ['全部'] : this.specialty.filter(v => { return v.select }).map(v => { return v.title });
      this.serchs.area = this.query.selectProvice.length == (this.areaList.length - 5) ? ['全部'] : this.query.selectProvice;
      this.serchs.level = this.levelSpecil.filter(v => { return v.select }).length == this.levelSpecil.length ? ['全部'] : this.levelSpecil.filter(v => { return v.select }).map(v => { return v.name });

      let resData = {
        type: type,
        result: JSON.stringify(this.schoolList),
        condition: JSON.stringify(this.serchs),
        score: this.serchs.myscore
      }
      this.getQueryDownload(resData).then(res => {
        this.href(res.data.value, true);
      })

    },
    setFull() {
      if (this.schoolList.length > 240) {
        this.$message.error('当前筛选条件过于宽泛，导致查询结果条数过多，请精简左侧筛选条件，确保查询结果条数在240条以内');
        return;
      }
      // this.maxCount=50;
      this.isScreen = !this.isScreen;
    },
    //院校级别选择
    btnSerch(item, bl) {
      if (!bl) {
        if (this.levelSpecil.filter(v => { return v.select }).length == this.levelSpecil.length) {
          this.levelSpecil.forEach(v => { v.select = false });
          item.select = true;
        } else {
          item.select = !item.select;
        }

        if (this.levelSpecil.filter(v => { return v.select }).length == 0) {
          this.levelSpecil.forEach(v => { v.select = true });
        }
      } else {
        this.levelSpecil.forEach(v => { v.select = true });
      }
      this.serchData();
    },
    //院校级别设置
    setColor(property, topProperty) {
      let [color, rt, benke, bk, zk] = [[], property.split(','), false, false, false];
      switch (topProperty) {
        case "1":
          benke = true; bk = true;
          color.push({ name: '双一流A', c: '#94d3cd' });
          break;
        case "2":
          benke = true; bk = true;
          color.push({ name: '双一流B', c: '#94d3cd' });
          break;
        case "3":
          benke = true; bk = true;
          color.push({ name: '双一流学科学校', c: '#94d3cd' });
          break;
      }
      rt.forEach((v, index) => {
        if (v == 1) {
          switch (index) {
            case 0:
              benke = true; bk = true;
              // color.push({ name: '双一流', c: '#94d3cd' });
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
              // color.push({ name: '中外', c: '#6d8285' });
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
    //点击地区选择
    setSelectProvice(type, value) {
      //全选按钮
      if (type) {
        this.query.selectProvice = [];
        this.query.selectProvice = this.areaList.filter(item => { return item.title != 'nono' }).map(v => { return v.title });
      } else {
        //全选中时清空选项
        if (this.query.selectProvice.length == (this.areaList.length - 5) && !type) {
          this.query.selectProvice = [];
        }
        //当选项在其中是移除，反之添加
        if (this.query.selectProvice.includes(value)) {
          this.query.selectProvice = this.query.selectProvice.filter(v => { return v != value });
        } else {
          this.query.selectProvice.push(value);
        }
        //当选项为空时，为全选
        if (this.query.selectProvice.length == 0) {
          this.query.selectProvice = this.areaList.map(v => { return v.title }).filter(item => { return item != 'nono' });
        }
      }
      this.areaList.forEach(v => {
        if (this.query.selectProvice.includes(v.title) && v.title != 'nono') {
          v.select = true;
        } else {
          v.select = false;
        }
      })
      this.serchData();
    },
    //点击专业选择
    specialtySelect(item, all) {
      // let load = this.$loading(this.$store.state.loadObj);
      // this.schoolList = [];
      // setTimeout(() => {
      if (all) {
        this.specialty.forEach(v => { v.select = true });
        // this.schoolList = this.schoolListBase;
        // this.serchData();
      } else {
        if (this.specialty.length == this.specialty.filter(v => { return v.select }).length) {
          this.specialty.forEach(v => { v.select = false })
        }
        item.select = !item.select;
        if (this.specialty.filter(v => { return v.select }).length == 0) {
          this.specialty.forEach(v => { v.select = true })
        }

        // this.schoolList = this.allData.filter(v => { return school.some(c => { return c.school == v.school }) });
        // this.schoolList = this.schoolListBase.filter(v => {
        //   return this.specialty.some(s => {
        //     return s.title == v.title && s.select
        //   })
        // })
      }
      this.serchData();
      //   if (load) {
      //     load.close();
      //   }
      // }, 500);

    },
    // 取稳保冲区间值
    getRankInterval() {
      let { rank, artRank, examType, artSubject } = this.userinfo;
      rank = parseInt(rank || 0);
      if (this.userinfo.examType == 2) {
        rank = artRank;
      }
      let rankValue = [];
      if (examType == 1) {
        if (rank <= 350) {
          rankValue = [rank, rank + 2000, 1];
        } else if (rank > 350 && rank <= 5000) {
          rankValue = [rank - 200 > 1 ? rank - 200 : 1, rank + 4000, 2];
        } else if (rank > 5000 && rank <= 14000) {
          rankValue = [rank - 300, rank + 9000, 3];
        } else if (rank > 14000 && rank <= 39000) {
          rankValue = [rank - 300, rank + 9000, 4];
        } else if (rank > 39000 && rank <= 58000) {
          rankValue = [rank - 300, rank + 9000, 5];
        } else if (rank > 58000 && rank <= 150000) {
          rankValue = [rank - 300, rank + 9000, 6];
        } else if (rank > 150000 && rank <= 215000) {
          rankValue = [rank - 300, rank + 9000, 7];
        } else if (rank > 215000 && (rank <= 235000)) {
          rankValue = [rank, rank + 3000, 8];
        } else if (rank > 235000 && (rank <= 242000)) {
          rankValue = [rank, rank + 3000, 9];
        } else if (rank > 242000 && (rank < 255001)) {
          rankValue = [rank, rank + 3000, 10];
        }
      } else {
        switch (artSubject) {
          case "体育类":
            rankValue = [rank - 100 > 1 ? rank - 100 : 1, rank + 1500, 1]
            break;
          case "美术类":
            if (rank <= 5000) {
              rankValue = [rank - 100 > 1 ? rank - 100 : 1, rank + 700, 1]
            } else if (rank <= 10999) {
              rankValue = [rank, rank + 500, 2]
            } else {
              rankValue = [rank, 9999999, 3]
            }
            break;
          case "音乐类":
            rankValue = [rank - 100 > 1 ? rank - 100 : 1, rank + 800, 1]
            break;
          case "舞蹈类":
            rankValue = [rank, rank + 80, 1]
            break;
          case "影视类":
            rankValue = [rank, rank + 200, 1]
            break;
          case "时装类":
            rankValue = [rank, rank + 20, 1]
            break;
          case "摄制类":
            rankValue = [rank, rank + 400, 1]
            break;
          case "播音类":
            if (rank <= 1300) {
              rankValue = [rank - 100 > 1 ? rank - 100 : 1, rank + 1000, 1]
            } else {
              rankValue = [rank - 50, rank + 250, 2]
            }
            break;
          case "编导类":
            if (rank <= 1600) {
              rankValue = [rank - 100 > 1 ? rank - 100 : 1, rank + 1300, 1]
            } else {
              rankValue = [rank - 200, rank + 400, 2]
            }
            break;
        }
      }
      [this.steadyMin, this.steadyMax, this.steadyType] = rankValue.map(v => { return parseInt(v) });
    },
    //设置稳保冲
    getRankValue(lowrank) {
      let rMin = 0,
        rMax = 0,
        rankType = 0,
        _rank = this.userinfo.examType == 1 ? this.userinfo.rank : this.userinfo.artRank;
      if (this.userinfo.examType == 1) {
        switch (this.steadyType) {
          case 1:
            rMin = 1;
            rMax = _rank + 3000;
            break;
          case 2:
            rMin = _rank - 2000 > 1 ? _rank - 2000 : 1;
            rMax = _rank + 10000;
            break;
          case 3:
            rMin = _rank - 5000;
            rMax = _rank + 20000;
            break;
          case 4:
            rMin = _rank - 8000;
            rMax = _rank + 20000;
            break;
          case 5:
            rMin = _rank - 8000;
            rMax = _rank + 20000;
            break;
          case 6:
            rMin = _rank - 8000;
            rMax = _rank + 20000;
            break;
          case 7:
            rMin = _rank - 8000;
            rMax = _rank + 20000;
            break;
          case 8:
            rMin = _rank - 8000;
            rMax = _rank + 23000;
            break;
          case 9:
            rMin = _rank - 8000;
            rMax = _rank + 20000;
            break;
          case 10:
            rMin = _rank - 10000;
            rMax = _rank + 20000;
            break;
        }
      } else {
        // '体育类', '美术类', '音乐类', '舞蹈类', '影视类', '时装类', '播音类', '编导类', '摄制类'
        switch (this.userinfo.artSubject) {
          case "美术类":
            if (this.steadyType == 1) {
              rMin = _rank - 1000 > 1 ? _rank - 1000 : 1;
              rMax = _rank + 4000;
            } else if (this.steadyType == 2) {
              rMin = _rank - 1000 > 1 ? _rank - 1000 : 1;
              rMax = _rank + 5000;
            } else {
              rMin = _rank - 2000;
              rMax = 99999999;
            }
            break;
          case "体育类":
          case "音乐类":
          case "舞蹈类":
          case "影视类":
          case "时装类":
          case "播音类":
          case "编导类":
          case "摄制类":
            rMin = 1;
            rMax = 100000;
            break;
        }
      }
      let rk = parseInt(lowrank);
      lowrank = rk;
      if (rk < 1) {
        rankType = 0;
      }
      if (!(rk < rMin || rk > rMax)) {
        if (rk < this.steadyMin) {
          rankType = 1
        } else if (rk < this.steadyMax) {
          rankType = 2
        } else {
          rankType = 3
        }
      }
      return rankType;
    },
    // 筛选7选3科目
    queryRank(item) {
      let sub = ["化学", "历史", "地理", "政治", "技术", "物理", "生物"];
      let currSub = item.subject && item.subject.split(',') || [];

      let mainSub = [];
      let isRank = false;
      if (currSub.length == 0) {
        isRank = true;
      } else {
        currSub.forEach((v, index) => {
          if (v == 1) {
            mainSub.push(sub[index])
          }
        })
        //多对多
        if (item.chooseType == 1) {
          if (mainSub.filter(v => { return this.myMajor.query.includes(v) }).toString() == mainSub.toString()) {
            isRank = true;
          }
        } else {//多对一
          if (mainSub.some(v => { return this.myMajor.query.includes(v) }) || !currSub.some(v => { return v == 1 })) {
            isRank = true;
          }
        }
      }
      return isRank;
    },
    //watch==>主要用于输入专业选中重置
    serchData(watch) {
      this.maxCount=25;
      let load = this.$loading(this.$store.state.loadObj);
      this.btnQuerySpecial(watch);
      this.schoolList = [];
      this.schoolListBase = [];
      let [school1, school2, school3] = [[], [], []];
      let mylevels = this.levelSpecil.filter(v => { return v.select }).map(v => { return v.value });

      setTimeout(() => {
        //初始化专业
        // this.specialty = this.specialty.map(v => { return { title: v.title, value: 0, select: v.select } });
        this.specialty.forEach(v => { v.value = 0 });
        //初始化地区
        this.areaList = this.areaList.map(v => { return { title: v.title, value: 0, select: v.select } })
        this.majorsList.forEach(item => {
          //院校级别筛选
          let isLevel = mylevels.some(v => { return item.ml.includes(v) });
          //省份所在批次数量统计
          if (isLevel && item.pindex > -1) {
            this.areaList[item.pindex].value++;
          }

          //专业类选择与热度统计
          if (isLevel && this.query.selectProvice.some(v => { return v == item.province })) {
            let specialtyFind = this.specialty.find(v => { return v.title == item.title });
            if (specialtyFind) {
              specialtyFind.value += parseInt(item.amount);
            }

            if (this.userinfo.examType == 1) {
              //* 专业选中*/，名称，招生计划人数 查询
              if (item.rankType > 0 && item.isRank && this.specialty.some(v => { return v.title == item.title && v.select }) && item.amount > 0) {
                // school.push(item);
                if (item.rankType == 1) {
                  school1.push(item)
                } else if (item.rankType == 2) {
                  school2.push(item)
                } else if (item.rankType == 3) {
                  school3.push(item)
                }
              }
            } else {
              if (item.rankType > 0 && item.isRank && item.exam.includes(this.userinfo.artSubject)) {
                // school.push(item);
                if (item.rankType == 1) {
                  school1.push(item)
                } else if (item.rankType == 2) {
                  school2.push(item)
                } else if (item.rankType == 3) {
                  school3.push(item)
                }
              }
            }
          }

        });

        // 专业排序
        this.specialty.sort((a, b) => { return b.value - a.value });
        // let school
        school1.sort((a, b) => { return a.lowrank - b.lowrank });
        school2.sort((a, b) => { return a.lowrank - b.lowrank });
        school3.sort((a, b) => { return a.lowrank - b.lowrank });

        // 取专业最大值
        this.query.maxSpecialty = (this.specialty && this.specialty[0] && this.specialty[0].value) || 0;
        this.query.maxSpecialty = this.query.maxSpecialty == 0 ? 0.1 : this.query.maxSpecialty;

        // 取地区最大值
        this.query.maxArea = this.deep(this.areaList).sort((a, b) => { return b.value - a.value })[0].value;

        // this.specialty = this.specialty.filter((v, index) => { return index < 60 });
        //专业选中且值大于0
        // let speList = this.specialty.filter((v, index) => { return v.value });


        this.schoolList = [].concat(school1).concat(school2).concat(school3);
        school1 = null;
        school2 = null;
        school3 = null;

        //始初化输入学校查询列表
        // this.schoolListBase = JSON.parse(JSON.stringify(this.schoolList));
        // console.log(this.schoolListBase)

        // this.schoolList = this.allData.filter(v => { return this.schoolList.some(c => { return c.school == v.school }) });

        // console.log('schoolList', this.schoolList)

        if (this.loader) {
          this.loader.close();
        }
        if (load) {
          load.close();
        }
      }, 500);
    },
    deep(oldObj) {
      var newObj = oldObj instanceof Array ? [] : {};
      if (oldObj && typeof oldObj == "object") {
        for (let i in oldObj) {
          if (typeof oldObj[i] == "object") {
            newObj[i] = this.deep(oldObj[i]);
          } else {
            newObj[i] = oldObj[i];
          }
        }
        return newObj
      }
    },

    setProperty(property) {
      let tpro = [];
      let isBen = property[3] == 1;
      property.forEach((v, index) => {
        if (v == 1) {
          switch (index) {
            case 0:
              tpro.push(0); break;
            case 1:
              tpro.push(1); break;
            case 2:
              tpro.push(2); break;
            case 4:
              tpro.push(4); break;
            case 5:
              tpro.push(5); break;
            case 6:
              tpro.push(6); break;
          }
          if (isBen && index == 8) {
            tpro.push(3)
          }
          if (!isBen && index == 7) {
            tpro.push(7)
          }
        }
      })
      return tpro.sort((a, b) => { return a - b });
    },

    //数据初始化
    initData() {
      // let keMu = ["化学","历史","地理","政治","技术","物理","生物"];
      this.categoryTwo = [];
      this.majorsList = [];
      this.specialty = [];
      this.specialtyList = [];
      this.query.selectProvice = [];
      let towcate = [];
      this.allData.forEach(item => {
        let proviceIndex = this.areaList.findIndex(v => { return item.province && item.province.indexOf(v.title) > -1 });
        let majors = item.majors;
        item.ml = this.setProperty(item.property.split(','));
        this.years = majors[0].ages.split(',');
        delete item.majors;
        delete item.university;
        majors.forEach((v, index) => {
          delete v.rootcategory;
          v.s = true;
          v.f = v.lowScores.replace(/\//g, '').split(',');
          v.r = v.lowRanks.replace(/\//g, '').split(',');
          // delete v.lowScores;
          delete v.lowrank2017;
          delete v.lowrank2018;
          v.rankType = this.getRankValue(v.lowrank);
          v.isRank = this.queryRank(v);
          delete v.amount2017;
          delete v.amount2018;
          delete v.lowscore2017;
          delete v.lowscore2018;
          delete v.type;
          delete v.ccode;
          delete v.dept;
          delete v.ranktype;
          delete v.subjects;
          v.pindex = proviceIndex;
          v.title = `${v.category}(${v.mlevel == '本科' ? '本' : '专'})`;

          let obj = Object.assign(v, item);
          // if (v.rankType > 0 && v.isRank) {
          this.majorsList.push(obj);
          // }

          towcate.push(`${v.category}(${v.mlevel == '本科' ? '本' : '专'})`);
        })
      });
      //取专业去重
      this.categoryTwo = [...new Set(towcate)];
      this.specialty = this.categoryTwo.map(v => { return { title: v, value: 0, select: true } });
      // if (!this.query.categoryName) {
      this.specialtyList = this.deep(this.categoryTwo.map(v => { return { title: v, value: 0, select: true } }));

      this.query.selectProvice = this.areaList.map(v => { return v.title }).filter(item => { return item != 'nono' });
      // console.log('tag', this.majorsList)
    },
    //查询专，本
    selectSpecialty(v) {
      this.query.isZuan = v;
      this.serchData();
    },
    //专业查询取专业列表
    btnQuerySpecial(watch) {
      if (this.query.categoryName) {
        this.specialty = this.specialtyList.filter(v => { return v.title.includes(this.query.categoryName) });
        if (watch) {
          this.specialty.forEach(v => { v.select = true });
        }
        if (this.query.isZuan != '本+专') {
          this.specialty = this.specialty.filter(v => { return v.title.includes(`(${this.query.isZuan})`) })
        }
      } else {
        if (this.query.isZuan != '本+专') {
          this.specialty = this.specialtyList.filter(v => { return v.title.includes(`(${this.query.isZuan})`) })
        } else {
          this.specialty = this.specialtyList;
          if (watch) {
            this.specialty.forEach(v => { v.select = true });
          }
        }
      }
    }
  },
  watch: {
    'query.categoryName'() {
      this.serchData('watch');
    },
    'query.schoolName'() {
      if (this.query.schoolName) {
        let load = this.$loading(this.$store.state.loadObj);
        let school = this.schoolListBase.filter(v => { return v.school.includes(this.query.schoolName) })
        this.schoolList = this.allData.filter(v => { return school.some(c => { return c.school == v.school }) });
        load.close();
      } else {
        this.serchData();
      }

    }
  },
  created() {
    let subj = ['语文', '数学', '外语', "化学", "历史", "地理", "政治", "技术", "物理", "生物"];
    let mysub = this.userinfo.scores.split(',');
    mysub.forEach((v, index) => {
      if (index > 2 && parseInt(v) > 0) {
        this.myMajor.query.push(subj[index]);
        this.myMajor.select.push({ name: subj[index], value: v });
      }
      if (index <= 2) {
        this.myMajor.main.push({ name: subj[index], value: v });
      }
    });
    this.serchs.ranking = this.userinfo.examType == 1 ? this.userinfo.rank : this.userinfo.artRank;
    this.serchs.my7select3 = this.myMajor.query;
    this.serchs.myscore = this.userinfo.examType == 1 ? this.userinfo.score : this.userinfo.artFinalScore;
    this.loader = this.$loading(this.$store.state.loadObj);
    this.getRankInterval();
    this.getSimulationData({ type: this.userinfo.examType }).then(res => {
      this.allData = res;
      // console.log('tag', res)
      this.initData();
      this.serchData();
    });
    this.queryText = this.storage('gobalText') && this.storage('gobalText').split('|')[2];
  }
}
</script>
<style lang="less" scoped>
.delete {
  background-color: #f99 !important;
}
@media screen and (max-width: 1450px) {
  .query-school {
    .school1 {
      display: none;
    }
  }
}
@media screen and (min-width: 1450px) and (max-width: 2800px) {
  .query-school {
    .school2 {
      display: none;
    }
  }
}
@media screen and (max-width: 2800px) {
  .query-school {
  }
}
.hover-report {
  background-color: #f99;
  padding: 2px 4px;
  border-radius: 3px;
  color: #fff;
  &:hover {
    background-color: #eb8718;
  }
}
.bc273C56 {
  background-color: #273c56;
  color: #fff;
}
.bc61c2d5 {
  background-color: #61c2d5;
  border-radius: 10px;
  padding: 4px 7px;
}
.bc1da7c3 {
  background-color: #1da7c3;
  color: #fff;
}
.query-bg {
  background-color: #273c56;
}
.area-item {
  position: relative;
  display: inline-table;
  width: 60px;
  padding: 3px 5px 3px 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  .title {
    position: relative;
    z-index: 10;
  }
  .scoll {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 0;
    z-index: 5;
    transition: width 1s;
    -moz-transition: width 1s; /* Firefox 4 */
    -webkit-transition: width 1s; /* Safari and Chrome */
    -o-transition: width 1s; /* Opera */
  }
  &.bcb3d9ff {
    border: 1px solid #b3d9ff;
    .scoll {
      background-color: #b3d9ff;
    }
  }
  &.bceee {
    border: 1px solid #ddd;
    .scoll {
      background-color: #ddd;
    }
  }
}
.specialty {
  position: relative;
  padding: 3px 0;
  margin-bottom: 5px;
  cursor: pointer;
  .title {
    position: relative;
    z-index: 10;
  }
  .scoll {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 50px;
    max-width: 100%;
    z-index: 5;
    transition: width 1s;
    -moz-transition: width 1s; /* Firefox 4 */
    -webkit-transition: width 1s; /* Safari and Chrome */
    -o-transition: width 1s; /* Opera */
  }
}
.imitate {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  .imitate-body {
    width: 100%;
    margin: 5px 0;
    // min-height: 720px;
    overflow: auto;
    font-size: 14px;
    .bc-8dc73f {
      background-color: #8dc73f;
      color: #fff;
    }
    .tip-icon {
      width: 0;
      height: 0;
      border-right: 25px solid transparent;
    }
  }

  .showCount {
    width: 400px;
    padding: 20px 20px;
    position: absolute;
    right: 50%;
    transform: translateX(50%);
    top: 20%;
    z-index: 999999;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    color: #fff;
    font-size: 15px;
  }
}
</style>

<template>
  <div class='w-all bc-273C56 hi-0 fc-fff flex h-all fd-c'>
    <div class="flex jc-b h-28 ai-c mb10">
      <div class="ml20 fs-13">金榜题名--浙江省高一（七选三）自主选课查询系统</div>
      <div class="bc-fff flex h-all ai-c pl10 pr10 fs-13 fc-222">
        <span class="mr10">姓名：{{userinfo.name}}，</span>
        <span class="mr10">学校：{{userinfo.school}}，</span>
        <span class="mr10">年级：{{userinfo.studentClass == 3  ? '高三' :  userinfo.studentClass == 2  ? '高二' : userinfo.studentClass == 1  ? '高一' : '-'}}，</span>
        <span class="mr10">模拟成绩：{{userinfo.score > 0 ? userinfo.score : '-'}}，</span>
        <span>转换位次：{{userinfo.rank > 0 ? userinfo.rank : '-'}}</span>
      </div>
    </div>
    <div class="flex-1 hi-0 flex h-all pb10">
      <div v-if="!isScreen" style="width:190px;min-width:190px;" class="flex h-all fd-c">
        <div class="w-all bc-fff fc-222">
          <div class="title flex h-25 ai-c">
            <span class="w-25 flex h-all ai-c jc-c bc-fdb813">1</span>
            <span class="jb-bc h-all flex ai-c pl5 pr10">选考科目</span>
            <span class="tip-icon bd-color"></span>
            <span class="ml10">7选3</span>
          </div>
          <div class="w-all flex fd-c ai-c jc-c pt20 pb10">
            <div @click="setQuery(item,'subjectList')" :class="{'jb-bc':item.select,'bc-e':!item.select}" v-for="(item, index) in subjectList" :key="index" class="h-28 mb10 ra-3 hand centent bc-c w-140 lh-28">{{item.name}}</div>
          </div>
        </div>
        <div class="w-all mt10 flex-1 hi-0 h-all auto bc-fff fc-222">
          <div class="title flex h-25 ai-c">
            <span class="w-25 flex h-all ai-c jc-c bc-fdb813">2</span>
            <span class="jb-bc h-all flex ai-c pl5 pr10">院校级别</span>
            <span class="tip-icon bd-color"></span>
            <span @click="setQuery(item,'levelList',true)" class="ml10 hand fc-a ff-b">全选</span>
          </div>

          <div class="w-all flex fd-c ai-c jc-c pt20 pb10">
            <div @click="setQuery(item,'levelList')" :style="{'background-color':item.select?levelColor[index]:'#ccc'}" v-for="(item, index) in levelList" :key="index" class="h-28 mb10 ra-3 hand centent fc-fff w-140 lh-28">{{item.name}}</div>
          </div>
        </div>
      </div>

      <div v-if="!isScreen" style="width:200px;min-width:190px;" class="ml10 bc-fff h-all flex fd-c fc-222">
        <div class="title flex h-25 ai-c mb20">
          <span class="w-25 flex h-all ai-c jc-c bc-fdb813">3</span>
          <span class="jb-bc h-all flex ai-c pl5 pr10">地区选择</span>
          <span class="tip-icon bd-color"></span>
          <span @click="setQuery(item,'areaList',true)" class="ml10 hand fc-a ff-b">全选</span>
        </div>
        <div class="flex-1 hi-0 h-all autoy">
          <div @click="setQuery(item,'areaList')" :class="{'bc-B3D9FF':item.select,'bc-c':!item.select &&!!item.value,'w-all':!item.value,'w-70':!!item.value}" class="fl mb5 ml12 hand centent pt4 pb4 ra-3" v-for="(item, index) in areaList" :key="index"><span>{{item.name}}</span></div>
        </div>
      </div>

      <div v-if="!isScreen" style="width:410px;min-width:320px;" class="flex fd-c mr10 bc-fff ml10">
        <div class="title flex h-25 ai-c">
          <span class="w-25 flex h-all ai-c jc-c bc-fdb813">4</span>
          <span class="jb-bc h-all flex ai-c pl5 pr10">专业类选择</span>
          <span class="tip-icon bd-color"></span>
          <span class="ml10 fc-a">可以多选</span>
        </div>
        <div class="flex-1 hi-0 flex pb6 h-all fc-222 fs-13 pt5">
          <div class="flex-1 hi-0 flex fd-c h-all br-d">
            <div class="pl10">1.专业门类</div>
            <div class="pl10 pr10 mb10">
              <input placeholder="请输入感兴趣的专业" v-model="subjectVal" class="w-all b-d pt4 pb4 pl6 mt6 ra-4" type="text">
            </div>
            <div class="flex-1 hi-0 h-all auto">
              <div class="mt10 ml10">本科：</div>
              <div class="inline-block">
                <span @click="setQuery(item,'categoryList',1)" :class="{'bc-E3C2D3':item.select,'bc-c':!item.select}" class="fl fs-12 pt4 pb4 pl5 pr5 ra-4 mt8 hand ml6" v-for="(item, index) in categoryList.filter(v=>{return v.type=='本科'})" :key="index">{{item.name}}</span>
              </div>
              <div class="mt15 ml10">专科：</div>
              <div class="inline-block">
                <span @click="setQuery(item,'categoryList',2)" :class="{'bc-B3D9FF':item.select,'bc-c':!item.select}" class="fl fs-12 pt4 pb4 pl5 pr5 ra-4 mt8 hand ml10" v-for="(item, index) in categoryList.filter(v=>{return v.type=='专科'})" :key="index">{{item.name}}</span>
              </div>
            </div>
          </div>
          <div class="flex-1 hi-0 flex fd-c h-all">
            <div class="pl10">2.专业大类(一级学科)</div>
            <div class="pl10 pr10 mb10">
              <input placeholder="请输入感兴趣的专业" v-model="zuanyeVal" class="w-all b-d pt4 pb4 pl6 mt6 ra-4" type="text">
            </div>
            <div class="flex-1 h-all autoy">
              <div @click="setQuery(item,'zuanyeList')" :class="{'bc-B3D9FF':item.select,'bc-c':!item.select}" class="wb-91 hidden pl10 pr10 mb8 ml12 hand pt4 pb4 ra-3" v-for="(item, index) in zuanyeList" :key="index"><span>{{item.name}}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 hi-0 flex fd-c h-all fc-222 bc-fff">
        <div class="h-30 lh-30 pl10">
          筛选条件:{{subjectList.filter(v=>{return v.select}).map(v=>{return v.name}).toString()}}
        </div>
        <div v-if="!isScreen" class="jb-bc pl10 pt7 pb7 pr10 ai-c flex">
          <div class="flex flex-1 hi-0 fd-c">
            <div>结果条数 : {{pages.totalElements || 0}} 条</div>
            <div>符合条件院校数 :{{pages.collegeAmount}} 条 符合条件专业数 :{{(pages.totalElements - pages.collegeAmount) ||0}} 条</div>
          </div>
          <div class="hand" @click="btnSrceen">
            全屏查看
          </div>
        </div>
        <div v-if="isScreen" class="jb-bc pl10 pt7 pb7 pr10 ai-c flex">
          <span>结果条数 : {{pages.totalElements ||0}} 条</span>
          <div class="flex ml10 ai-c">
            <div class="flex ai-c">
              <span>搜索：</span>
              <el-input v-model="query.school" @change="(v)=>{setDropDow(v,'school')}" class="w-130" size="mini" placeholder="请输入您的心仪院校"></el-input>
            </div>
            <div class="flex ml10 ai-c">
              <span>地区：</span>
              <el-select @change="(v)=>{setDropDow(v,'areaList')}" multiple size="mini" class="w-130" v-model="query.area" placeholder="全选">
                <el-option v-for="item in areaList.filter(v=>{return v.select})" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="flex ml10 ai-c">
              <span>级别：</span>
              <el-select multiple @change="(v)=>{setDropDow(v,'levelList')}" size="mini" class="w-130" v-model="query.level" placeholder="全选">
                <el-option v-for="item in levelList.filter(v=>{return v.select})" :key="item.name" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="flex ml10 ai-c">
              <span>主管部门：</span>
              <el-select multiple size="mini" @change="(v)=>{setDropDow(v,'departmentList')}" class="w-130" v-model="query.department" placeholder="全选">
                <el-option v-for="item in departmentList.filter(v=>{return v.select})" :key="item.value" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex ml10 hi-0 flex-1">
            符合条件院校数 :{{pages.collegeAmount}} 条 符合条件专业数 :{{(pages.totalElements - pages.collegeAmount) ||0}} 条
          </div>
          <div @click="initData(true)" class="bc-fff hand ra-5 pt5 pb5 pl10 pr10 jb-fc ml10">下载表格</div>
          <span @click="btnSrceen" class="ff-b hand ml10">关闭全屏</span>
        </div>
        <div class="flex-1 hi-0 flex h-all fd-c">
          <div class="pt8 w-all bb-c pb8 pl10 pr28 flex">
            <div class="w-90">院校代码</div>
            <div class="wb-15 pr10">院校名称</div>
            <div class="flex-1 pr20">专业名称</div>
            <div class="wb-20">院校级别</div>
            <div class="wb-20 pr10">选考科目范围</div>
            <div v-if="isScreen" class="wb-15">主管部门</div>
            <div v-if="isScreen" class="w-120">所在地区</div>
            <div v-if="isScreen" class="w-60">院校详情</div>
          </div>
          <div ref="spinner" class="w-all flex-1 h-all autoy">
            <div v-for="(item, index) in list" :key="index" class="pt8 w-all bb-e pb8 pl10 pr10 flex">
              <div class="w-90">{{item.colleges.collegesCode}}</div>
              <div class="wb-15 pr10">{{item.colleges.collegesName}}</div>
              <div class="flex-1 pr20">{{item.collegesDetails.major}}</div>
              <div class="wb-20" v-html='htmlToRankType(item.colleges)'></div>
              <div class="wb-20 pr10">{{item.collegesDetails.typeName}}</div>
              <div v-if="isScreen" class="wb-15">{{item.colleges.department}}</div>
              <div v-if="isScreen" class="w-120"> {{['北京','上海','重庆','天津'].includes(item.colleges.province)?item.colleges.province:(item.colleges.province+item.colleges.city)}}</div>
              <div v-if="isScreen" @click="href(item.colleges.site)" class="w-60 hand fc-a">查询</div>
            </div>
          </div>
        </div>
        <div v-if="pages.totalElements>100" class="flex jc-e bt-e pt6 pb6 pr20">
          <el-pagination pager-count="7" background small @current-change="handleCurrentChange" :current-page.sync="sql.page" :page-size="100" layout="total, prev, pager, next,jumper" :total="pages.totalElements">
          </el-pagination>
        </div>
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
      subjectList: [],
      levelList: [],
      areaList: [],
      categoryList: [],
      baseCateList: [],
      zuanyeList: [],
      baseZuanyeList: [],
      subjectVal: '',
      zuanyeVal: '',
      list: [],
      isScreen: false,
      pages: {},
      query: {
        department: [],
        level: [],
        area: [],
        school: ''
      },
      departmentList: [],
      levelColor: ['#f6846c', '#fb989d ', '#91d7cd', '#bbdcc9', '#3ea5ce', '#d7ac4d', '#6d8285', '#8f81be'],
      sql: {
        page: 0,
        pageSize: 100,
        department: '',
        subjectId: '',
        collegesLevelId: '',
        areaId: '',
        smallMajorCategoryId: '',
        name: ''
      }
    }
  },
  methods: {
    ...mapActions(['getSubject', 'getCollegesLevel', 'getArea', 'getBigMajorCategory', 'getSmallMajorCategory', 'getMajor']),
    getZuanYe(value) {
      this.getSmallMajorCategory({ bigMajorCategoryId: value }).then(res => {
        this.zuanyeList = res.map(v => { return { name: v.typeName, value: v.id, select: true } });
        this.baseZuanyeList = JSON.parse(JSON.stringify(this.zuanyeList));
      })
    },
    handleCurrentChange(v) {
      this.sql.page = v;
      this.initData();
    },
    // 设置排名颜色
    htmlToRankType(college) {
      let htmls = [];

      if (college.isToo && college.isToo != '0') {
        htmls.push({ name: '211', c: '#fb989d' });
      }
      if (college.isNef && college.isNef != '0') {
        htmls.push({ name: '985', c: '#f6846c' });
      }
      if (college.isSyl && college.isSyl != '0') {
        htmls.push({ name: '双一流', c: '#91d7cd' });
      }
      if (college.type == '公办') {
        htmls.push({ name: '公办', c: '#bbdcc9' });
      }
      if (college.type == '民办学校') {
        htmls.push({ name: '民办', c: '#d7ac4d' });
      }
      if (college.type == '独立学院') {
        htmls.push({ name: '独立', c: '#3ea5ce' });
      }
      if (college.type == '中外合作办学') {
        htmls.push({ name: '中外', c: '#6d8285' });
      }

      if (college.level == '高职') {
        htmls.push({ name: '高职', c: '#8f81be' });
      } else if (college.level == '高职高专') {
        htmls.push({ name: '高职', c: '#8f81be' });
      } else if (college.level == '独立') {
        htmls.push({ name: '独立', c: '#3ea5ce' });
      } else if (college.level == '民办') {
        htmls.push({ name: '民办', c: '#d7ac4d' });
      } else {
        htmls.push({ name: '本科', c: '#bbdcc9' });
      }
      return htmls.map(v => {
        return `<span class="ra-3 mr3 fs-12 nowrap pl5 mb3 pr5 h-20 lh-20 fc-fff fl" style="background-color:${v.c}">${v.name}</span>`
      }).join('');
    },
    btnSrceen() {
      this.isScreen = !this.isScreen;
    },
    setDropDow(v, type) {
      this.sql.page = 0;
      this.initData();
    },
    setQuery(item, type, all) {
      this.sql.page = 0;
      // 选考科目
      if (type == 'subjectList') {
        if (this.subjectList.filter(v => { return v.select && !item.select }).length > 2) {
          this.$message.error('选考科目已达上限');
          return;
        }
        item.select = !item.select;
        if (this.subjectList.filter(v => { return v.select }).length != 3) {
          return;
        }
        // 院校级别
      } else if (type == 'levelList') {
        if (all) {
          this.levelList.forEach(v => { v.select = true });
        } else {
          if (this.levelList.filter(v => { return v.select }).length == this.levelList.length) {
            this.levelList.forEach(v => { v.select = false });
            item.select = true;
          } else {
            item.select = !item.select;
          }
          if (this.levelList.filter(v => { return v.select }).length == 0) {
            this.levelList.forEach(v => { v.select = true });
          }
        }
        // 全国地区选择
      } else if (type == 'areaList') {
        if (all) {
          this.areaList.forEach(v => { v.name && (v.select = true) });
        } else {
          if (item.name) {
            if (this.areaList.filter(v => { return v.select }).length == this.areaList.filter(v => { return v.name }).length) {
              this.areaList.forEach(v => { v.select = false });
              item.select = true;
            } else {
              item.select = !item.select;
            }
            if (this.areaList.filter(v => { return v.select && v.name }).length == 0) {
              this.areaList.forEach(v => { v.name && (v.select = true) });
            }
          } else {
            return false;
          }
        }
        // 专业类选择（专本科）
      } else if (type == 'categoryList') {
        let t = all == 1 ? '本科' : '专科';
        if (this.categoryList.filter(v => { return v.select && v.type == t }).length == this.categoryList.filter(v => { return v.type == t }).length) {
          this.categoryList.filter(v => { return v.select && v.type == t }).forEach(v => { v.select = false });
          item.select = true;
        } else {
          item.select = !item.select;
        }
        this.categoryList.filter(v => { return v.type != t }).forEach(v => { v.select = false });
        let val = this.categoryList.filter(v => { return v.select }).map(v => { return v.value });
        if (val) {
          this.getZuanYe(val.toString())
        }
        // 专业子类(一级学科)
      } else if (type == 'zuanyeList') {
        if (this.zuanyeList.filter(v => { return v.select }).length == this.zuanyeList.length) {
          this.zuanyeList.forEach(v => { v.select = false });
          item.select = true;
        } else {
          item.select = !item.select;
        }
      }
      this.initData();
    },
    initData(type) {
      let subjectId = this.subjectList.filter(v => { return v.select }).map(v => { return v.value }).toString();
      let collegesLevelId = this.levelList.filter(v => { return v.select }).map(v => { return v.value }).toString();
      let areaId = this.areaList.filter(v => { return v.select }).map(v => { return v.value }).toString();
      let smallMajorCategoryId = this.zuanyeList.filter(v => { return v.select }).map(v => { return v.value }).toString();
      let department = this.departmentList.filter(v => { return v.select }).map(v => { return v.name }).toString();
      if (this.isScreen) {
        if (this.query.school) {
          this.sql.name = this.query.school;
        } else {
          delete this.sql.name;
        }
        collegesLevelId = this.query.level.toString() || collegesLevelId;
        areaId = this.query.area.toString() || areaId;
        department = this.query.department.toString() || department;
      }

      if (type) {
        let url = "http://gaokaoquerytest.joyread.com.cn/major?excel=true";
        url += `&subjectId=${subjectId}`;
        url += `&collegesLevelId=${collegesLevelId}`;
        url += `&areaId=${areaId}`;
        url += `&smallMajorCategoryId=${smallMajorCategoryId}`;
        url += `&department=${department}`;
        url += `&username=${this.userinfo.name}`;
        url += `&rank=${this.userinfo.rank}`;
        url += `&score=${this.userinfo.score}`;
        url += `&page=0`;
        url += `&pageSize=100`;
        console.log('url', url)
        window.open(url);
        return;
      }

      if (subjectId && collegesLevelId && areaId && smallMajorCategoryId) {
        this.sql.subjectId = subjectId;
        this.sql.collegesLevelId = collegesLevelId;
        this.sql.areaId = areaId;
        this.sql.smallMajorCategoryId = smallMajorCategoryId;
        this.sql.department = department;
        this.list = [];
        this.$store.state.loadObj.target = this.$refs.spinner;
        this.loader = this.$loading(this.$store.state.loadObj);
        this.getMajor(this.sql).then(res => {
          this.loader.close();
          this.totalPage = res.totalElements;
          this.pages = { ...res };
          this.list = res.content;
          delete this.pages.content;
        })
      }
    }
  },
  created() {
    this.departmentList = '上海市教育委员会,教育部,浙江省教育厅,北京市教育委员会,工业和信息化部,国家体育总局,国家卫生健康委员会,中华全国总工会,中华全国妇女联合会,国家民族事务委员会,中国科学院,河北省教育厅,天津市教育委员会,中国民用航空局,中国地震局,应急管理部,山西省教育厅,内蒙古自治区教育厅,辽宁省教育厅,交通运输部,吉林省教育厅,黑龙江省教育厅,海关总署,中央军委训练管理部,江苏省教育厅,安徽省教育厅,福建省教育厅,国务院侨务办公室,江西省教育厅,山东省教育厅,河南省教育厅,湖北省教育厅,湖南省教育厅,中央军委装备发展部,广东省教育厅,广西壮族自治区教育厅,海南省教育厅,重庆市教育委员会,四川省教育厅,贵州省教育厅,云南省教育厅,陕西省教育厅,甘肃省教育厅,青海省教育厅,宁夏回族自治区教育厅,新疆生产建设兵团,新疆维吾尔自治区教育厅'.split(',').map(v => { return { name: v, select: true } });
    this.loader = this.$loading(this.$store.state.loadObj);
    Promise.all([this.getSubject(), this.getCollegesLevel(), this.getArea(), this.getBigMajorCategory()]).then(res => {
      this.loader.close();
      this.subjectList = res[0].map(v => { return { name: v.subName, value: v.id, select: false } });
      this.levelList = res[1].map(v => { return { name: v.levelName, value: v.id, select: true } });
      let curr = 1;
      res[2].forEach((v, index) => {
        if (v.location != curr) {
          curr = v.location;
          this.areaList.push({ name: '', value: 0, select: false })
        }
        this.areaList.push({ name: v.areaName, value: v.id, select: true });
      });
      this.categoryList = res[3].map(v => { return { name: v.typeName, value: v.id, type: v.type, select: v.type == '本科' ? true : false } });
      this.baseCateList = JSON.parse(JSON.stringify(this.categoryList));
      this.getZuanYe(this.categoryList.filter(v => { return v.select }).map(v => { return v.value }).toString());
    })
  },
  watch: {
    zuanyeVal() {
      if (this.zuanyeVal) {
        this.zuanyeList = this.baseZuanyeList.filter(v => { return v.name.includes(this.zuanyeVal) });
      } else {
        this.zuanyeList = this.baseZuanyeList;
      }
      this.initData();
    },
    subjectVal() {
      if (this.subjectVal) {
        this.categoryList = this.baseCateList.filter(v => { return v.name.includes(this.subjectVal) });
      } else {
        this.categoryList = this.baseCateList;
      }
      this.initData();
    }

  }
}
</script>

<style lang='less' scoped>
.bc-E3C2D3 {
  background-color: #e3c2d3;
}
.bc-B3D9FF {
  background-color: #b3d9ff;
}
.bc-273C56 {
  background-color: #273c56;
}
.tip-icon bd-color {
  width: 0;
  height: 0;
  border-top: 25px solid;
  border-right: 25px solid transparent;
}
</style>

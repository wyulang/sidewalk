<template>
  <div class="w-all serch bc-fff">
    <div class="pt15 pl15 pb20 pr15 bc-fff">
      <span class="fs-16 fs-14">3、请选择您喜欢的专业（可多选）</span>
      <div class="mt10 fs-14 red">注:关键字搜索查询与学科门类查询不可同时进行</div>
    </div>

    <div class="bc-f2 w-all clearfix h-10"></div>

    <div :class="{'mengsub':majorList.length>0}" class="pt15 pl15 pb10 pr15 bc-fff">
      <span class="fs-16">a、请选择您喜欢的专业（可多选）</span>
      <div class="mt10 fs-14 red line20">输入关键字后，将为您匹配相关专业，您可以在下拉框中进行选择</div>
      <div class="flex mt10 jc-c ai-c">
        <div @click="isDigShow=true;inputSerch()" class="h-35 br-10 bc-e w-all flex jc-c ai-c fc-888">
          <i class="icon iconfont iconchaxun mr10"></i>
          <span>搜索</span>
        </div>
      </div>
      <div class="w-all pt15">
        <div v-for="(item, index) in selectSubject" :key="index" class="sub-item">
          <span>{{item.name}}({{item.mlevel=='本科'?'本':'专'}})</span>
          <i @click="selectSubject=selectSubject.filter(v=>{return v.name!=item.name})" class="icon iconfont iconcancelcircle colose"></i>
        </div>
      </div>
    </div>

    <mt-popup v-model="isDigShow" class="w-all h-all" position="right">
      <div class="w-all h-all auto">
        <div class="flex jc-b ai-c mt10 mb10">
          <div class="pop-serch flex-1 mr10 flex ai-c ml10">
            <i class="iconfont iconchaxun mr10 ai-c fs-18 fc-999"></i>
            <input ref="searchIpt" autocomplete="off" @keydown="inputSerch" v-model="serchValue" class="flex-1" type="text">
            <i v-show="serchValue.length>0" @click="serchValue='';inputSerch();" class="iconfont iconcancelcircle fc-bbb fs-14 mr2"></i>
          </div>
          <div @click="isDigShow=false" :class="[subjcetList.filter(v=>{return v.select}).length>0?'fc-success':'fc-danger']" class="pr10">{{subjcetList.filter(v=>{return v.select}).length>0?'确定':'取消'}}</div>
        </div>

        <div v-if="subjcetList.length>0">
          <div @click="btnSubSelect(item)" :class="[item.mlevel=='本科'?'bc-relues':'bc-blues']" v-for="(item, index) in subjcetList" :key="index" class="h-40 flex ai-c pl10 pr10 jc-b">
            <span class="flex-1">{{item.name}}({{item.mlevel=='本科'?'本':'专'}})</span>
            <i v-if="item.select" class="icon iconfont iconfuxuankuanggou fc-success fs-20"></i>
          </div>
          <div style="border-top:1px solid #eaeaea;" class="w-all h-2"></div>
        </div>

        <div v-else>
          <div class="h-150 w-all"></div>
          <div class="w-all centent">没有匹配到相关的院校和专业</div>
          <div class="w-all centent mt10">请适当调整你的筛选条件</div>
        </div>

      </div>
    </mt-popup>

    <div class="bc-f2 w-all clearfix h-10"></div>

    <div :class="{'mengsub':selectSubject.length>0}" class="w-all bc-fff">
      <div class="pt15 pl15 pb10 pr15">
        <span class="fs-14">b、专业学科门类查询（最多选择3个）</span>
      </div>

      <div class="pl15 pr15 clearfix">
        <div class="flex jc-b class-type">
          <span @click="subSelct(0)" :class="{'active':majorLevel==0}">本科</span>
          <span @click="subSelct(1)" :class="{'active':majorLevel==1}">专科</span>
        </div>
      </div>

      <div v-if="majorLevel==0" class="pl15 clearfix">
        <div @click="selectMajor(item)" :class="{'active':item.select}" v-for="(item, index) in benList" :key="index" class="area-item"><span>{{item.title}}</span></div>
      </div>
      <div v-if="majorLevel==1" class="pl15 clearfix">
        <div @click="selectMajor(item)" :class="{'active':item.select}" v-for="(item, index) in zhuanList" :key="index" class="area-item"><span>{{item.title}}</span></div>
      </div>
    </div>

    <div class="pb25 centent clearfix bc-fff">
      <div @click="goNext()" class="btnset">下一步</div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['userinfo'])
  },
  data() {
    return {
      serchValue: '',
      isDigShow: false,
      majorLevel: 0,
      ctype: 0,
      zhuanList: [],
      benList: [],
      subjcetList: [],//专业类查询结果列表
      selectSubject: [], //专业类选中项
      majorList: [] //本科或专科，选中项
    }
  },
  created() {
    this.getCategoryList().then(res => {
      if (res.code == 20000) {
        let data = res.data.array.map(v => {
          return {
            title: v.name,
            select: false,
            mlevel: v.mlevel
          }
        })
        this.benList = data.filter(v => { return v.mlevel == '本科' });
        this.zhuanList = data.filter(v => { return v.mlevel == '高职' });

        if (this.session('serch').majorLevel == 0 && this.session('serch').categorys) {
          let arr = this.session('serch').categorys.split(',');
          this.majorLevel = this.session('serch').majorLevel;
          this.benList.forEach(v => {
            if (arr.includes(v.title)) {
              v.select = true;
            }
          });
          this.majorList = this.benList.filter(v => { return v.select })
        }
        if (this.session('serch').majorLevel == 1 && this.session('serch').categorys) {
          let arr = this.session('serch').categorys.split(',');
          this.majorLevel = this.session('serch').majorLevel;
          this.zhuanList.forEach(v => {
            if (arr.includes(v.title)) {
              v.select = true;
            }
          });
          this.majorList = this.zhuanList.filter(v => { return v.select })
        }
      }
    })

    if (this.session('serch').ctype == 0 && this.session('serch').selectSubjce) {
      this.selectSubject = this.session('serch').selectSubjce;
    }
  },
  methods: {
    ...mapActions(['getCategory', 'getArtCategory', 'getCategoryList']),
    //专业类点击选择
    btnSubSelect(item) {
      item.select = !item.select;
      // this.selectSubject = [];

      this.zhuanList.forEach(v => { v.select = false });
      this.benList.forEach(v => { v.select = false });
      this.majorList = [];

      this.subjcetList.forEach(v => {
        if (v.select && !this.selectSubject.find(item => { return v.code == item.code })) {
          this.selectSubject.push(v);
        }
      })
    },
    //输入查询得到的结果
    inputSerch() {
      if (this.userinfo.examType == 1) {
        this.getCategory({ name: this.serchValue }).then(res => {
          if (res.code == 20000) {
            res.data.array.forEach(v => { v.select = false });
            this.subjcetList = res.data.array;
            // this.selectSubject = [];
          }
        })
      } else {
        this.getArtCategory({ name: this.serchValue }).then(res => {
          if (res.code == 20000) {
            res.data.array.forEach(v => { v.select = false });
            this.subjcetList = res.data.array;
            // this.selectSubject = [];
          }
        })
      }
    },
    //本科，专科切换选择
    subSelct(type) {
      this.majorLevel = type;
      this.zhuanList.forEach(v => { v.select = false });
      this.benList.forEach(v => { v.select = false });
      this.subjcetList = []
      // this.selectSubject = [];
      this.majorList = [];
    },
    //本科，专科 子项点击选中
    selectMajor(item) {
      if (this.majorLevel == 0) {
        if (this.benList.filter(v => { return v.select && item.title != v.title }).length > 2) {
          this.$toast('专业学科门类最多可选择3个');
          return;
        }
      } else if (this.majorLevel == 1) {
        if (this.zhuanList.filter(v => { return v.select && item.title != v.title }).length > 2) {
          this.$toast('专业学科门类最多可选择3个');
          return;
        }
      }
      item.select = !item.select;
      if (this.majorLevel == 0) {
        this.majorList = this.benList.filter(v => { return v.select })
      } else {
        this.majorList = this.zhuanList.filter(v => { return v.select })
      }
    },
    goNext() {
      let serchs = this.session('serch');
      if (this.majorList.length == 0 && this.selectSubject.length == 0) {
        this.$toast({ message: '请选择一种查询方式', position: 'top' });
        return;
      }
      let ctype = 0;
      let categorys = "";
      let majorLevel = 0;
      if (this.majorList.length > 0) {
        ctype = 1;
        categorys = this.majorList.map(v => { return v.title });
        majorLevel = this.majorLevel;
      } else if (this.selectSubject.length > 0) {
        ctype = 0;
        categorys = this.selectSubject.map(v => { return v.code });
      }
      serchs.ctype = ctype;
      serchs.categorys = categorys.toString();
      serchs.majorLevel = majorLevel;
      if (ctype == 0) {
        serchs.selectSubjce = this.selectSubject;
      }
      this.session('serch', serchs)
      this.$router.push({ name: 'query-step4' });
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@css/base.less";
.serch {
  .bc-blues {
    background-color: #edfbfe;
    border-top: 1px solid #eaeaea;
  }
  .bc-relues {
    background-color: #ffeff0;
    border-top: 1px solid #eaeaea;
  }
  .pop-serch {
    padding: 0.106667rem !important;
    position: relative;
    border: 1px solid #d7d6dc;
    border-radius: 0.13333rem;
    height: 0.96rem;
    width: 8rem;
  }
  .class-type {
    border-radius: 28/75rem;
    border: 1px solid #eee;
    span {
      width: 49.99%;
      height: 66/75rem;
      background-color: #fff;
      text-align: center;
      line-height: 66/75rem;
      &:first-child {
        border-top-left-radius: 28/75rem;
        border-bottom-left-radius: 28/75rem;
      }
      &:last-child {
        border-top-right-radius: 28/75rem;
        border-bottom-right-radius: 28/75rem;
      }
      &.active {
        background-color: #ff8600;
        color: #fff;
      }
    }
  }
  .area-item {
    width: 75/@bs;
    background-color: #bebebe;
    margin-right: 14/@bs;
    margin-bottom: 10/@bs;
    border-radius: 3/@bs;
    line-height: 13/@bs;
    padding: 0 5/@bs;
    font-size: 12/@bs;
    height: 33/@bs;
    color: #fff;
    box-shadow: 0 3/@bs 10/@bs 0 #eee;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      text-align: center;
    }
    &.active {
      background-color: #ffa440;
      box-shadow: 0 3/@bs 10/@bs 0 #ff860040;
    }
  }
  .sub-item {
    padding: 0.186667rem 0.32rem;
    font-size: 14px;
    background-color: #ffa440;
    border-radius: 0.08rem;
    display: inline-block;
    margin-right: 0.4rem;
    margin-bottom: 0.266667rem;
    position: relative;
    color: #fff;
    z-index: 1;
    span {
      position: relative;
      z-index: 1;
    }
    .colose {
      position: absolute;
      right: -10/75rem;
      top: -10/75rem;
      color: red;
      z-index: 10;
    }
  }
  .mengsub {
    position: relative;
    z-index: 0;
    &:after {
      z-index: 100;
      content: "";
      background-color: rgba(85, 85, 85, 0.25);
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;
    }
  }
}
</style>

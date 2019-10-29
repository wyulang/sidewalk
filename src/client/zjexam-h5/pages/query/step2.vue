<template>
  <div class="w-all fs-14 bc-fff query">
    <div class="flex jc-b mt10 ai-c pl15 pr15">
      <span>2、请选择省/市/自治区（可多选）</span>
      <span @click="selectLevel('',true)" class="step-all">{{areaList.filter(v=>{return v.select}).length==areaList.length?'撤消':'全选'}}</span>
    </div>

    <div class="w-all pl25 clearfix">
      <div @click="selectLevel(item)" v-for="(item, index) in areaList" :key="index" :class="[item.title?'':'all',{'acitve':item.select}]" class="area-item">{{item.title}}</div>
    </div>

    <div class=" centent clearfix">
      <div @click="goNext()" class="btnset">下一步</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import storage from 'lib/storage.js';
export default {
  data() {
    return {
      userinfo: storage('userinfo'),
      areaList: [
        { title: '北京', select: false }, { title: '天津', select: false }, { title: '河北', select: false },
        { title: '山西', select: false }, { title: '内蒙古', select: false }, { title: '辽宁', select: false },
        { title: '吉林', select: false }, { title: '黑龙江', select: false },
        { title: '', select: true },
        { title: '上海', select: false }, { title: '江苏', select: false }, { title: '浙江', select: false },
        { title: '安徽', select: false }, { title: '福建', select: false },
        { title: '江西', select: false }, { title: '山东', select: false },
        { title: '', select: true },
        { title: '河南', select: false }, { title: '湖北', select: false }, { title: '湖南', select: false },
        { title: '广东', select: false }, { title: '广西', select: false }, { title: '海南', select: false },
        { title: '', select: true },
        { title: '重庆', select: false }, { title: '四川', select: false }, { title: '贵州', select: false },
        { title: '云南', select: false }, { title: '西藏', select: false },
        { title: '', select: true },
        { title: '陕西', select: false }, { title: '甘肃', select: false }, { title: '青海', select: false },
        { title: '宁夏', select: false }, { title: '新疆', select: false }
      ]
    }
  },
  computed: {
    ...mapState({
      schoolLevel: state => state.serch.schoolQuery
    })
  },
  methods: {
    ...mapActions(['getArtCategory']),
    selectLevel(item, all) {
      if (item && !item.title) {
        return;
      }
      if (item) {
        item.select = !item.select;
      }
      if (all) {
        this.isAll = this.areaList.filter(v => { return v.select }).length == this.areaList.length;
        this.areaList.forEach(v => {
          if (v.title) {
            v.select = !this.isAll
          }
        })
      }
    },
    goNext() {
      let serchs = this.session('serch');
      let curr = this.areaList.filter(v => { return v.select && v.title });
      if (curr.length == 0) {
        this.$toast({ message: '至少选择一个地区', position: 'top' });
        return;
      }
      serchs.area= curr.map(v => { return v.title }).toString();
      if (this.userinfo.examType == 1) {
        this.session('serch',serchs);
        this.$router.push({ name: 'query-step3' })
      } else {
        this.$indicator.open({ spinnerType: 'fading-circle' });
        this.getArtCategory({ name: '' }).then(res => {
          this.$indicator.close();
          if (res.code == 20000) {
            if (res.data.array && res.data.array.length > 0) {
              serchs.categorys=res.data.array.map(v => { return v.code }).toString();
            } else {
              serchs.categorys="";
            }
            this.session('serch',serchs)
            this.$router.push({ name: 'query-step4' })
          }
        })
      }
    }
  },
  created() {
    if (this.session('serch').area) {
      let arr = this.session('serch').area.split(',');
      this.areaList.forEach((v, index) => {
        if (arr.includes(v.title)) {
          v.select = true;
        }
      })
    }
    
  }
}
</script>
<style lang="less" scoped>
@import "~@css/base.less";
.query {
  .step-all {
    padding: 7/@bs 15/@bs;
    background-image: -webkit-linear-gradient(left, #ffa440 0%, #ff8600 100%);
    background-image: linear-gradient(90deg, #ffa440 0%, #ff8600 100%);
    color: #fff;
    border-radius: 5/@bs;
  }
  .area-item {
    width: 75/@bs;
    background-color: #bebebe;
    margin-right: 7/@bs;
    margin-bottom: 10/@bs;
    border-radius: 3/@bs;
    font-size: 16/@bs;
    height: 30/@bs;
    padding: 0 10/@bs;
    color: #fff;
    box-shadow: 0 3/@bs 10/@bs 0 #eee;
    text-align: center;
    line-height: 30/@bs;
    float: left;
    &.all {
      width: 100%;
      height: 4/@bs;
      background-color: #fff !important;
      box-shadow: none !important;
      margin-bottom: 0 !important;
    }
    &.acitve {
      background-color: #ffa440;
      box-shadow: 0 3/@bs 10/@bs 0 #ff860040;
    }
  }
}
</style>

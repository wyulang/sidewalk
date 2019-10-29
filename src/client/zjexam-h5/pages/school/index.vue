<template>
  <div class='w-all rank pl15 pr15 pb25'>
    <div class="h-75"></div>

    <div class="rank-box ra-4 rel pl20 pr20">
      <div class="rank-tip"></div>

      <div class="mt15 flex jc-c mb25">
        <span class="fs-16">大学排名榜</span>
      </div>

      <div @click="getTypes(index+1)" v-for="(item, index) in menuList" :key="index" class="item rel h-50 ra-4 mb20">
        <div class="h-50 item abs item-dit w-all ra-4 centent">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      menuList: [
        '院校网站详情',
        '邱均平本科院校排行榜',
        '软科本科院校排行榜',
        '武书连本科院校排行榜',
        '校友会本科院校排行榜',
        '独立学院排行榜',
        '民办院校排行榜',
        '高职高专院校排行榜',
        '学科专业排行榜',
        '软科学科排行'
      ]
    }
  },
  methods: {
    ...mapActions(['getCollegesLevel', 'getArea', 'getDepartment', 'getCollegeZYRankZys']),
    getTypes(type) {
      this.$indicator.open({ spinnerType: 'fading-circle' });
      if (!this.session('departMentList')) {
        this.getDepartment(type);
      }
      if ([9, 10].includes(type) && !this.session('majorList')) {
        this.getCollegeZYRankZys();
      }
      setTimeout(() => {
        this.$indicator.close();
        this.$router.push({ name: 'school-detail', query: { t: type } })
      }, 500);
    }
  },
  created() {
    if (!this.session('collegesList')) {
      this.getCollegesLevel();
    }
    if (!this.session('areaList')) {
      this.getArea();
    }

  }
}
</script>

<style lang='less' scoped>
.rank {
  background-color: #f2eee3;
  .rank-tip {
    position: absolute;
    left: -10/75rem;
    top: -120/75rem;
    background-image: url("../../assets/rk_man.png");
    height: 152/75rem;
    width: 148/75rem;
    background-size: 100%;
  }
  .rank-box {
    border: 2px dashed #ff8600;
    background-color: #fff;
    .item {
      border: 1px solid #7765b1;
    }
    .item-dit {
      left: -15/75rem;
      top: -15/75rem;
      background-color: #ff8600;
      color: #fff;
      font-size: 16px;
      line-height: 100/75rem;
    }
  }
}
</style>

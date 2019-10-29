<template>
  <div class="w-all bc-fff plan-about">
    <div class="flex w-all pl15 pr15 ai-c jc-b pt10">
      <span class="fs-15 fb">{{school.school}}</span>
      <div @click="isexp=!isexp;majorsList.forEach(v=>{v.select=isexp})" class="step-all">一键展开</div>
    </div>

    <div class="mt10 flex jc-b pl15 pr15 mb10">
      <span class="wb-33">国家代码: {{ school.code || '-'}}</span>
      <span class="wb-33">省内代码: {{ school.incode|| '-'}}</span>
      <span class="wb-33">地区:{{school.province}}/{{ school.city==school.province?'':school.city}}</span>
    </div>

    <div v-for="(item, index) in majorsList" :key="index" class="resut-item">
      <div style="background:#ffd9b0;" @click="item.select=!item.select" class="flex ai-c pt10 pb10 pl10 pr10">
        <span class="flex-1">{{index+1}}、{{item.major}}</span>
        <div class="w-130 auto ml5">专业代码:{{item.mcode}}</div>
        <i :class="{'item-up-show':item.select}" class="icon iconfont iconicon-arrow-bottom2 fs-13 fc-555 ml5 item-up"></i>
      </div>
      <div :class="{'item-trans':item.select}" class="item-about">
        <div class="flex jc-b ai-c h-35 pl10 pr10 fs-13">
          <span class="wb-50">2019学制/学费: {{`${item.year} / ${item.fee}`}}</span>
          <span class="wb-50">招生人数: {{`${item.amount == '/' ? '-' : item.amount}`}}</span>
        </div>
        <div class="flex jc-b ai-c h-35 pl10 pr10 fs-13 bc-f2">
          <span class="w-all">2018录取最低分数/位次: {{(item.lowscore2018 == 0 || item.lowscore2018 == '/' ? '-' : item.lowscore2018) + ' / ' + (item.lowrank2018 == 0 || item.lowrank2018 == '/' ? '-' : item.lowrank2018)}}</span>
        </div>
        <div class="flex jc-b ai-c h-35 pl10 pr10 fs-13">
          <span class="w-all">2017录取最低分数/位次: {{(item.lowscore2017 == 0 || item.lowscore2017 == '/' ? '-' : item.lowscore2017) + ' / ' + (item.lowrank2017 == 0 || item.lowrank2017 == '/' ? '-' : item.lowrank2017)}}</span>
        </div>
        <div class="flex jc-b ai-c h-35 pl10 pr10 fs-13 bc-f2">
          <span class="wb-50">批次: {{item.plan}}</span>
          <span class="wb-50">选考科目: {{toChinese(item.subject)}}</span>
        </div>
        <div v-if="item && item.remark" class="flex jc-b ai-c h-35 pl10 pr10 fs-13 bc-f2">
          <span class="w-all">简注：{{item.remark}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      school: {},
      majorsList: [],
      isexp: false,
    }
  },
  methods: {
    // 转表格专业
    toChinese(arr) {
      let array = arr || new Array(7).fill(0)
      array = arr.split(',')
      let sub = ['化学', '历史', '地理', '政治', '技术', '物理', '生物']
      let selSub = []
      array.forEach((v, index) => {
        if (v == 1) {
          selSub.push(sub[index]);
        }
      });
      if (selSub.length === 7 || selSub.length === 0) {
        return '不限'
      } else {
        return selSub.join(',')
      }
    }
  },
  created() {
    this.school = this.session('schoolItem');
    if (this.school && this.school.majors && this.school.majors.length) {
      this.school.majors.forEach(item => {
        item.select = false;
      });
      this.majorsList = JSON.parse(JSON.stringify(this.school.majors));
    }
  }
}
</script>
<style lang="less" scoped>
.plan-about {
  .step-all {
    padding: 12/75rem 20/75rem;
    background-image: -webkit-linear-gradient(left, #ffa440 0%, #ff8600 100%);
    background-image: linear-gradient(90deg, #ffa440 0%, #ff8600 100%);
    color: #fff;
    border-radius: 10/75rem;
  }
  .resut-item {
    border-bottom: 1px solid #fff;
    .item-up {
      transition: all 0.2s;
      transform: rotate(0deg);
    }
    .item-up-show {
      transform: rotate(180deg);
    }
    .item-about {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
    }
    .item-trans {
      max-height: 9999px !important;
      -webkit-transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
      transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
      -webkit-transition-delay: 0.2s;
      transition-delay: 0.2s;
    }
  }
}
</style>

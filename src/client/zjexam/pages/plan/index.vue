<template>
  <div class='w-1200 m-auto plan h-all'>
    <div class="mt60 w-all flex fd-c ai-c">
      <div class="w-600 fs-18 jb-fc">院校计划查询</div>
      <div class="mt10 ra-5 flex jb-bc w-600 pp4">
        <el-autocomplete :trigger-on-focus="false" class="flex-1" select-when-unmatched="true" prefix-icon="el-icon-search" size="small" v-model="serchValue" :fetch-suggestions="querySearch" placeholder="请输入您心仪的院校名称或院校国代/省代" @select="setSelectArea"></el-autocomplete>
        <div @click="setSelectArea()" class="w-80 flex ai-c jc-c ml5 jb-bc hand">查询</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      serchValue: '',
      list: []
    }
  },
  methods: {
    ...mapActions(['getSchoolPlanList']),
    querySearch(v, cb) {
      if (v) {
        cb(this.list.filter(item => { return item.school.includes(v) || item.incode.includes(v) }));
      }
    },
    setSelectArea(item) {
      if (item) {
        if (item.incode) {
          this.session('planSchool', item);
          this.$router.push({ name: 'plan-detail' })
        } else {
          let vlist = this.list.filter(v => { return v.school.includes(item.value) || v.incode.includes(item.value) }) || [];
          if (vlist.length > 0) {
            this.session('planSchool', vlist[0]);
            this.$router.push({ name: 'plan-detail' })
          } else {
            this.$message.error("未找到相关的院校专业")
          }
        }
      } else {
        let vlist = this.list.filter(v => { return v.school.includes(this.serchValue) || v.incode.includes(this.serchValue) }) || [];
        if (vlist.length > 0) {
          this.session('planSchool', vlist[0]);
          this.$router.push({ name: 'plan-detail' })
        } else {
          this.$message.error("未找到相关的院校专业")
        }
      }
    }
  },
  created() {
    let load = this.$loading(this.$store.state.loadObj);
    this.getSchoolPlanList().then(res => {
      load.close();
      res.forEach(v => {
        v.value = v.school;
      })
      this.list = res;
    })
  }
}
</script>

<style lang='less' scoped>
.plan {
  background: url("../../assets/other/plan_bg.png") no-repeat bottom;
}
</style>

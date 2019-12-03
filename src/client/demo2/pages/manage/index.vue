<template>
  <div class="w-all">
    <div class="w-all flex jc-s">
      <div  class="flex fd-c w-100 ra-2 pp10 pl10 pr10 hand ai-c sha-6">
        <span class="icon fc-999 fs-50 iconshujuku"></span>
        <span>新建数据库</span>
      </div>
      <div @click="setTable" class="flex ml20 w-100 fd-c ra-2 pp10 pl10 pr10 hand ai-c sha-6">
        <span class="icon fc-999 fs-50 icontablelarge"></span>
        <span>新建表</span>
      </div>
      <div @click="delTable" class="flex ml20 w-100 fd-c ra-2 pp10 pl10 pr10 hand ai-c sha-6">
        <span class="icon fc-999 fs-50 icontablelarge"></span>
        <span>删除表</span>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {}
  },
  methods:{
    ...mapActions(['addTable','addDatabase','deleteTable']),
    setTable(){
      this.$prompt('请输入表名','').then(res=>{
        this.addTable({table:res.value}).then(v=>{
          if(v.code==2000){
            this.$message.success(v.message)
          }else{
            this.$message.error(v.message)
          }
        })
      })
    },
    delTable(){
       this.$prompt('请输入表名','').then(res=>{
        this.deleteTable({table:res.value}).then(v=>{
          if(v.code==2000){
            this.$message.success(v.message)
          }else{
            this.$message.error(v.message)
          }
        })
      })
    }
  }
};
</script>
<style lang="less">
</style>
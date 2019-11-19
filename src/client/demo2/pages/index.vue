<template>
  <div class='w-all h-all flex fs-38 ai-c fd-c jc-c'>
    <span class="iconfont iconzanwu fc-aaa fs-100"></span>
    <span>no hello word</span>
    <el-button @click="initData" type="danger">发送</el-button>
  </div>
</template>

<script>
import api from '../store/webapi.js';
export default {
  data() {
    return {
      value1:''
    }
  },
  methods: {
    initData(){
      api.post('api/user/list',{name:'11'}).then(res=>{
        debugger;
      // console.log('tag',  res)
    })
    }
  },
  created(){
  }
}
</script>

<style lang='less' scoped>
</style>

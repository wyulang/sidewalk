<template>
  <div class='w-all h-all fs-12 '>
    <div style="position:relative">
      <input v-valid="{text:user.name,vaild:'',change:getvALUE}" v-model="user.name" type="text">
      <!-- <input v-valid="{text:user.name,vaild:'',change:getvALUE}" v-model="user.name" type="text"> -->
      <!-- <div v-valid="{text:user.name,vaild:'',change:isChange}">fawefaefwa</div> -->
      <button @click="isChange=true">添加</button>
      <button class="ml10" @click="setState">改加</button>
      {{isChange}}
    </div>

   
  </div>
</template>

<script>
import valid from 'lib/vue-validator';
export default {
  directives: {
    valid
  },
  data() {
    return {
      user:{
        name:"",
        title:"fafae"
      },
      isChange:""
    }
  },
  methods: {
    setState(){
      this.isChange=false;
      debugger;
    },
    getvALUE(type){
      console.log(type)
      this.isChange=type;
    }
  }
}
</script>

<style lang='less' scoped>
.popalert {
  position: fixed;
  box-sizing: border-box;
  top: 50%;
  transform: translateY(-50%);
  left: 30px;
}
.popalert .pop-body {
  box-shadow:0px 0px 3px #ddd;
  padding: 10px;
  border: 1px solid #ddd;
  display: flex;
  width: 310px;
  align-items: center;
  flex-direction: column;
}
</style>

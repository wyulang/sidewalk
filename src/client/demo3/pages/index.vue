<template>
  <div class='w-all h-all pl20 pt50'>
    <radio v-model="value" :data="radioList"></radio>
    [{{value}}]
  </div>
</template>

<script>
import radio from '@component/radio.vue';
import city from './city.js';
export default {
  components: {
    radio
  },
  data() {
    return {
      list: [],
      value: "2",
      radioList: [
        {
          label: "男",
          value: '1',
        },
        {
          label: "女",
          value: '2',
        },
      ]
    }
  },
  methods: {
    handSelect(item) {
      this.radioList.forEach(v => { v.select = false; }); item.select = true
    },
    setCity() {

    }
  },
  created() {
    // console.log('tag', city.city)
    this.list = city.city.filter(v => { return v[0].length == 3 }).map(v => { return { label: v[2], value: v[0] } });
    this.list.forEach(v=>{
      v.children=city.city.filter(item=>{return item[1]==v.value}).map(v => { return { label: v[2], value: v[0] } });
    })
    this.list.forEach(v=>{
      v.children.forEach(item=>{
        let child=city.city.filter(item=>{return item[1]==v.value}).map(v => { return { label: v[2], value: v[0] } });
        if(child.length){
          item.children=child;
        }
      })
    })
    console.log('tag', this.list);
  }
}
</script>

<style lang='less' scoped>
.bs {
  background-color: #3b3970;
}
.back {
  background-color: rgba(0, 0, 0, 0.1);
}
.content {
  background-color: rgba(0, 0, 0, 0.1);
  background-blend-mode: darken;
  background: hsla(0, 0%, 100%, 0.25) border-box;
  overflow: hidden;
  border-radius: 0.3em;
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset;
}
</style>

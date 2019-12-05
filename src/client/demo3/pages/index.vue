<template>
  <div class='w-all h-all pl20 pt50'>
    <radio v-model="value" :data="radioList"></radio>
    [{{value}}]
  </div>
</template>

<script>
import radio from '@component/radio.vue';
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

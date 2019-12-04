<template>
  <div class="flex-line">
    <div :style="{'color':(item.value==value?color[0]:color[1])}" @click="handSelect(item)" v-for="(item, index) in data" :key="index" class="flex-line hand ai-c mr10">
      <span  :class="{'iconradio-button-line':item.value==value,'iconradio-button-off':item.value!=value}" class="icon fs-20"></span>
      <span class="ml5 fs-14">{{item.label}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: [],
    color: {
      default: ['#3699ff', '#888']
    },
    value: {
      default: '',
    },
  },
  methods: {
    handSelect(item) {
      this.$emit('input', item.value);
    }
  }
}
</script>

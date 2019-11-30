<template>
  <div class='w-all h-all pt50 bs'>
    <div class="w-200  ml50 content h-200">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: ''
    }
  },
  methods: {
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
background: hsla(0,0%,100%,.25) border-box;   
                        overflow: hidden;   
                        border-radius: .3em;   
                        box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,   
}
</style>

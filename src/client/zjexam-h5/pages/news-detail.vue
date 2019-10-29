<template>
  <div class="pl15 pr15 bc-fff">
    <div class="fs-16 mt15 centent">{{detail.title}}</div>
    <div class="fs-12 mt10 mb10 centent">{{detail.date}}</div>
    <div class="mb10"><img class="w-all" :src="detail.pic" alt=""></div>
    <div class="lh-20" v-html="detail.content"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      detail: {}
    }
  },
  methods: {
    ...mapActions(['getNewsDetail'])
  },
  created() {
    this.getNewsDetail({ id: this.$route.query.id }).then(res => {
      if (res.code == 20000) {
        this.detail = res.data;
      }
    });
  }
}
</script>

<style lang='less' scoped>
</style>

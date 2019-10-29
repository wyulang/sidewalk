<template>
  <div class='w-all bc-f5'>
    <div class="w-1200 m-auto flex mt20 mb20">
      <div class="flex-1 bc-fff mr15 pt20">
        <h1 class="fs-22 centent fc-111">{{detail.title}}</h1>
        <div class="pp25 lh-25" v-html="detail.content" style="min-height:700px"></div>
      </div>
      <div class="w-400 bc-fff pt20 pl20 pr20">
        <div class="centent fs-18 mt5 mb20">相关推荐</div>
        <div @click="gotoDetail(item.id)" v-for="(item, index) in newList" :key="index" class="flex mb15 bb-c pb15 hand">
          <div class="w-90">
            <img class="w-90 ra-5" :src="item.pic" alt="">
          </div>
          <div class="flex-1 flex w-all hidden fd-c ml10">
            <div class="jb-fc fs-14 w-all line-1">{{item.title}}</div>
            <div class="fs-12 mt10 mb10 fc-999">{{item.date}}</div>
            <div class="line-2 fs-13 w-all lh-22">{{item.brief}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      newList: [],
      detail: {}
    }
  },
  methods: {
    ...mapActions(['getNewsAll', 'getNewsDetail']),
    gotoDetail(id) {
      this.$router.push({ name: 'newDetail', params: { id: id } });
      this.getNewsDetails(id);
    },
    getNewsDetails(ids) {
      this.getNewsDetail({ id: ids }).then(res => {
        if (res.code == 20000) {
          this.detail = res.data;
        }
      })
    }
  },
  created() {
    // console.log(this.$route.params.id)
    this.getNewsDetails(this.$route.params.id);
    this.getNewsAll().then(res => {
      if (res.code == 20000) {
        this.newList = res.data.array.slice(0, 8)
      }
    })
  }
}
</script>

<style lang='less'>
</style>

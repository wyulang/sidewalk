<template>
  <div class='w-all'>
    <div @click="$router.push({name:'new-detail',query:{id:item.id}})" v-for="(item, index) in newsList" :key="index" class="pt10 pb10 flex pl10 pr10 bb-e fs-13 fc-666">
      <div class="mr10"><img class="w-100 h-75 ra-5" :src="item.pic" alt=""></div>
      <div class="flex-1 w-all hidden">
        <div class="w-all flex fd-c">
          <span class="h-20 fc-333 w-all line-1 pt5">{{item.title}}</span>
          <span class="h-35 lh-20 fc-999 line-2">{{item.brief}}</span>
          <div class="h-20 fc-aaa flex jc-e ai-c">
            <i class="icon iconfont iconmiaojiesellerlooked fs-22"></i>
            <span class="">{{item.visitsNumber}}</span>
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
      newsList: []
    }
  },
  methods: {
    ...mapActions(['getNews'])
  },
  created() {
    this.getNews({ page: 1, pageSize: 100 }).then(res => {
      if (res.code == 20000) {
        this.newsList = res.data.array;
      }
    })
  }
}
</script>

<style lang='less' scoped>
</style>

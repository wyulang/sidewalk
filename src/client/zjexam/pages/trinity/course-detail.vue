<template>
  <div class='w-all h-all hi-0'>
    <div class="w-all h-all hi-0 flex fd-c">
      <div class="h-55 flex bc-3 fc-fff ai-c">
        <div class="ml20">{{curr.title}}</div>
        <div class="flex-1"></div>
        <div class="flex mr20 ai-c">
          <img :src="curr.teacherPic" class="h-40 w-40 ra-all" alt="">
          <span class="ml10">主讲名师：</span>
          <span>{{curr.teacherName}}</span>
        </div>
      </div>

      <div class="flex-1 bc-1 h-all hi-0 flex">
        <div class="flex-1">
          <video autoplay="autoplay" class="w-all h-all outline" controls :src="curr.courseUrl"></video>
        </div>
        <div class="w-5 bc-3 h-all ml5 mr5"></div>
        <div class="w-400 pl30  h-all pt20 pb20 hi-0">
          <div class="h-all auto">
            <div @click="setVideo(item)" v-for="(item, index) in list" :key="index" class="w-320 rel video-wrap hand mb25 bc-a h-200">
              <img :src="item.coverPicture" class="h-all w-all rel zi-100" alt="">
              <div class="abs al10 zi-120 fc-fff at10">
                {{item.title}}
              </div>
            </div>
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
      curr: {},
      list: []
    }
  },
  methods: {
    ...mapActions(['findCourseByUniversiyIds', 'findExcellentCourse']),
    setVideo(item) {
      this.curr=item;
    }
  },
  created() {
    let { s, c, type } = this.$route.query;
    if (type == 0) {
      this.findExcellentCourse({ ids: this.session('trinitySchoolId') }).then(res => {
        if (res.code == 20000) {
          this.list = res.data.array;
          this.curr = this.list.find(v => { return v.id == c });
          console.log('tag', this.curr)
        }
      })
    } else {
      this.findCourseByUniversiyIds({ ids: s }).then(res => {
        if (res.code == 20000) {
          this.list = res.dt[0].trainingCourseVos;
          this.curr = this.list.find(v => { return v.id == c });
          console.log('tag', this.curr)
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>

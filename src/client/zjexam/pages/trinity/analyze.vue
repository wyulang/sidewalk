<template>
  <div class='w-all'>
    <div class="bc-273c56 pl10 fs-14 fb lh-30">三位一体</div>
    <div class="rel flex ai-c jc-c pt8 pb8">
      <div class="flex-line w-600 rel">
        <div class="abs zi-100 at12 h-2 bc-d al23 ar15 ">
          <div class="h-all wb-50 jb-bc"></div>
        </div>
        <div class="flex ai-c rel zi-110 w-600 jc-b">
          <div class="flex fd-c jc-c jb-fc ai-c">
            <span class="iconfont fs-20 iconxiaoxi-chenggong mt3"></span>
            <span>结果</span>
          </div>
          <div class="flex fd-c jc-c jb-fc ai-c">
            <span class="iconfont fs-20 bc-fff iconxuanzhong1"></span>
            <span class="fs-12">面试题解析</span>
          </div>
          <div class="flex fd-c jc-c ai-c">
            <span class="iconfont fs-25 jb-fc icondian"></span>
            <span class="fs-12">课程</span>
          </div>
        </div>
      </div>
      <div @click="$router.push({name:'trinity-course'})" class="abs ar100 at15 h-28 pl20 pr20 hand ra-5 jb-bc lh-28">下一步</div>
    </div>
    <!-- banner -->
    <div class="bc-58a3ff"></div>

    <div class="flex ai-c jc-c fs-16 h-70">根据您的会考成绩为您推荐适合您的学校，快来跟着一起学习吧！</div>

    <div class="w-1200 m-auto">
      <div class="w-all flex fw jc-b">
        <div :class="{'sha-b hand':item.name}" v-for="(item, index) in list" :key="index" class="wb-24 mb15">
          <div @click="btnHref(item.id,item.name)" v-if="item.name">
            <div class="w-all bc-e49386 h-160 rel pt20 pl25">
              <div class="fs-20">{{item.name}}</div>
              <div class="fs-13 mt6">历年面试真题</div>
              <div class="w-90 lh-25 bc-fff mt5 fc-e49386 fs-14 center">立刻查看</div>
            </div>
            <div class="lh-40 ml15 mr15 fc-000 bb-3 fs-15">面试试题指导</div>
            <div class="pt15 pb15 flex ai-c pl15 pr15">
              <img :src="item.schoolBadgeSite" class="w-47 h-47 ra-all" alt="">
              <span class="ml8 fc-999 flex-1">{{item.name}}</span>
              <span class="fc-999">{{item.type}}</span>
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
      list: []
    }
  },
  methods: {
    ...mapActions(['getTrinitylistTrinityUniversity']),
    btnHref(id, title) {
      this.$router.push({ name: 'trinity-questions', query: { t: id, l: this.$route.query.t, n:encodeURIComponent(title)} });
    }
  },
  created() {
    this.getTrinitylistTrinityUniversity({ ids: this.session('trinitySchoolId') }).then(res => {
      if (res.code == 20000) {
        this.list = res.data.array;
        if (res.data.array.length % 4) {
          this.list = this.list.concat(new Array(4 - (res.data.array.length % 4)).fill({ name: '' }));
        }
      }
    })
  }
}
</script>

<style lang='less' scoped>
.bc-273c56 {
  color: #fff;
  background-color: #273c56;
}
.bc-58a3ff {
  background-color: #58a3ff;
  height: 340px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../../assets/banner/trinity-0.png");
}
.bc-e49386 {
  color: #fff;
  background: #e49386 url("../../assets/other/trinity-pople.png") no-repeat
    120px bottom;
}
.fc-e49386 {
  color: #e49386;
}
</style>

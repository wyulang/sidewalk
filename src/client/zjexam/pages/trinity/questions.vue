<template>
  <div class='w-all'>
    <div class="bc-273c56 pl10 fs-14 fb lh-30">三位一体</div>
    <div class="w-1200 m-auto">
      <div class="fs-14 flex pt10 pb10">
        <span class="hand fc-a" @click="$router.push({ name: 'trinity-analyze', });">面试题首页 > </span>
        <span class="jb-fc ml5">面试题列表</span>
      </div>

      <div class="flex w-all">
        <div class="flex-1 flex fd-c">
          <div class="fs-20 fb mb20">{{titles}}</div>
          <div class="flex-1 pr30 mb15 br-1">
            <div class="h-20 bc-e49386 w-all"></div>
            <div @click="btnHref(item.id)" v-for="(item, index) in list" :key="index" style="border-bottom:1px dashed #aaa" class="flex hand fd-c pb20 mt20">
              <div class="jb-fc fs-15 pl2 mb10">{{index+1}}、{{item.title}}</div>
              <div class="lh-22 fc-999 pl2">{{item.brief}}</div>
            </div>
            <div class="h-15"></div>
          </div>
        </div>
        <div class="w-300 pl30">
          <div @click="titles=item.name;initData(item.id)" v-for="(item, index) in otherList" :key="index" class="w-all hand bc-pople mb15 h-160 rel pt20 pl25">
            <div class="fs-20">{{item.name}}</div>
            <div class="fs-13 mt6">历年面试真题</div>
            <div class="w-90 lh-25 bc-fff mt5 fc-e49386 fs-14 center">立刻查看</div>
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
      list: [],
      otherList: [],
      titles: '',
      currId: 0
    }
  },
  methods: {
    ...mapActions(['getInterviewQuestionByUniversity', 'getTrinitylistTrinityUniversity']),
    initData(val) {
      this.list = [];
      this.otherList = [];
      this.currId = val || this.currId;
      this.loader = this.$loading(this.$store.state.loadObj);
      this.getInterviewQuestionByUniversity({ id: this.currId }).then(res => {
        this.loader.close();
        if (res.code == 20000) {
          this.list = res.data.array;
          let len = res.data.array.length < 3 ? 4 : res.data.array.length;
          this.getTrinitylistTrinityUniversity({ ids: this.session('trinitySchoolId') }).then(v => {
            if (v.code == 20000) {
              this.otherList = v.data.array.slice(0, len && len - 1);
            }
          })
        }
      })
    },
    btnHref(id) {
      this.session('questionsList', this.list.map(v => { return { id: v.id, title: v.title } }));
      this.$router.push({ name: 'trinity-questions-detail', query: { q: id, t: this.currId, n: encodeURIComponent(this.titles) } })
    }
  },
  created() {
    this.currId = this.$route.query.t;
    this.initData();
    this.titles = decodeURIComponent(this.$route.query.n);
  }
}
</script>

<style lang='less' scoped>
.bc-pople {
  color: #fff;
  background: #e49386 url("../../assets/other/trinity-pople.png") no-repeat
    120px bottom;
}
.bc-273c56 {
  color: #fff;
  background-color: #273c56;
}
.bc-e49386 {
  background-color: #e49386;
}
.fc-e49386 {
  color: #e49386;
}
</style>

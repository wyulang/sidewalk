<template>
  <div class='w-all'>
    <div class="bc-273c56 pl10 fs-14 fb lh-30">三位一体</div>
    <div class="w-1200 m-auto">
      <div class="fs-14 flex pt10 pb10">
        <span class="hand fc-a" @click="$router.push({ name: 'trinity-analyze' });">面试题首页 > </span>
        <span class="hand fc-a ml5" @click="$router.push({ name: 'trinity-questions', query: { t: $route.query.t,n:$route.query.n } });">面试题列表 > </span>
        <span class="jb-fc ml5">面试题列表</span>
      </div>

      <div class="center pb15 pt5 fs-22 fb fc-000">{{decodeURIComponent($route.query.n)}}</div>

      <div class="h-20 bc-e49386 w-all"></div>

      <div class="center jb-fc fs-16 pt15 pb15">{{curr.title}}</div>

      <div class="fs-14 lh-22" v-html="curr.content"></div>

      <div class="mt50 flex jc-b">
        <div class="hand" @click="setPage('prev',page.prev.id)" style="margin-left:20%">上一题：{{page.prev.title}}</div>
        <div class="hand" @click="setPage('next',page.next.id)" style="margin-right:20%">下一题：{{page.next.title}}</div>
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
      page: {
        currIndex: 0,
        prev: { id: 0, title: '' },
        next: { id: 0, title: '' }
      }
    }
  },
  methods: {
    ...mapActions(['getInterviewQuestionById']),
    initData(val) {
      this.loader = this.$loading(this.$store.state.loadObj);
      this.getInterviewQuestionById({ id: val || this.$route.query.q }).then(res => {
        this.loader.close();
        if (res.code == 20000) {
          this.curr = res.data;
          this.getPage(val);
        }
      })
    },
    setPage(type, id) {
      let list = this.session('questionsList');
      if (this.page.currIndex == 0 && type == 'prev') {
        this.$message.error('已是最上一篇测试题');
        return;
      }
      if ((list.length - 1) == this.page.currIndex && type == 'next') {
        this.$message.error('已是最后一篇测试题');
        return;
      }
      let currIndex = list.find((v, index) => { v.index = index; return v.id == id }).index;
      if (type == 'prev') {
        this.page.currIndex = currIndex;
        this.initData(id);

      } else {
        this.page.currIndex = currIndex;
        this.initData(id);

      }
    },
    getPage(val) {
      let list = this.session('questionsList');
      let p, n;
      if (this.page.currIndex == 0) {
        p = 0;
        n = 1;
      }
      else if (this.page.currIndex == list.length - 1) {
        p = this.page.currIndex - 1;
        n = this.page.currIndex;
      } else {
        p = this.page.currIndex - 1;
        n = this.page.currIndex + 1;
      }

      this.page.prev = { id: list[p].id, title: list[p].title };
      this.page.next = { id: list[n].id, title: list[n].title };
    }
  },
  created() {
    if (this.$route.query.q && this.session('questionsList')) {
      this.page.currIndex = this.session('questionsList').find((v, index) => { v.index = index; return v.id == this.$route.query.q }).index
    }
    this.initData();
  }
}
</script>

<style lang='less' scoped>
.bc-273c56 {
  color: #fff;
  background-color: #273c56;
}
.bc-e49386 {
  background-color: #e49386;
}
</style>

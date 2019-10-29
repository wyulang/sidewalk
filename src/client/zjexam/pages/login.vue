<template>
  <div class='w-all'></div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['wzPerson'])
  },
  created() {
    let token = this.$route.params.token
    this.wzPerson(token).then(res => {
      if (res.code == 20000) {
        this.$store.state.isLogin = false;
        this.$store.state.userinfo = res.data;
        this.storage('userinfo', res.data);
        this.storage('accesstoken', res.data.accesstoken);
        setTimeout(() => {
          this.$router.push({ name: 'index' });
        }, 200);
      } else {
        this.$message.error(res.message || '网络异常，请稍后重试 ！');
      }
    })
  }
}
</script>

<style lang='less' scoped>
</style>

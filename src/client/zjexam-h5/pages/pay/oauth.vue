<template>
  <div class='w-all'>

  </div>
</template>

<script>
import api from '../../store/api.js';
export default {
  data() {
    return {
    }
  },
  methods: {
  },
  created() {
    let code = this.$config.getUrlParame('code');
    let state = this.$config.getUrlParame('state').split('OAUTH');
    let url = api.oauthUrl[state[0]];
    window.location.href = `${url}/#/pay?code=${code}&type=${state[1]}`;
  }
}
</script>

<style lang='less' scoped>
</style>

<template>
  <div class="w-all bc-fff pl15 pr15 query">
    <div class="flex jc-b mt15 ai-c">
      <span>1、请选择下列院校级别（可多选）</span>
      <span @click="selectLevel('',true)" class="step-all">{{schoolLevel.filter(v=>{return v.select}).length==schoolLevel.length?'撤消':'全选'}}</span>
    </div>

    <div class="flex fd-c jc-c ai-c pt25">
      <div @click="selectLevel(item)" :class="{'acitve':item.select}" v-for="(item, index) in schoolLevel" :key="index" class="list-item flex jc-b ai-c mb15">
        <span>{{item.title}}</span>
        <i v-if="item.select" class="icon iconfont c-fff iconschool1 fs-20"></i>
      </div>
    </div>

    <div class="mt25 mb25 centent">
      <div @click="goNext()" class="btnset">下一步</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { GetDateDiff, formatDate } from 'lib/dateformat.js';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      isAll: true,
      schoolLevel: [
        { title: '双一流建设(院校)', select: false },
        { title: '985院校', select: false },
        { title: '211院校', select: false },
        { title: '公办本科', select: false },
        { title: '独立学院', select: false },
        { title: '民办学校', select: false },
        { title: '中外合作办学', select: false },
        { title: '高职高专', select: false },
      ]
    }
  },
  created() {
    if (!this.session('serch')) {
      this.session('serch', {
        area: "",
        categorys: "",
        ctype: 0,
        majorLevel: 0,
        schoolLevel: null,
        type: 1,
        selectSubjce: []
      })
    }
    if (this.session('serch').schoolLevel) {
      let arr = this.session('serch').schoolLevel.split(',');
      this.schoolLevel.forEach((v, index) => {
        if (arr[index] == 1) {
          v.select = true;
        }
      })
    }
    if (this.$config.getEnvName() == 2) {
      this.getEndTime();
    }
  },
  methods: {
    ...mapActions(['getExpireTime', 'getUserInfo']),
    selectLevel(item, all) {
      if (item) {
        item.select = !item.select;
      }
      if (all) {
        this.isAll = this.schoolLevel.filter(v => { return v.select }).length == this.schoolLevel.length;
        this.schoolLevel.forEach(v => { v.select = !this.isAll })
      }
    },
    goNext() {
      let serchs = this.session('serch');
      if (this.schoolLevel.filter(v => { return v.select }).length == 0) {
        this.$toast({ message: '至少选择一个院校级别', position: 'top' });
        return;
      }
      serchs.schoolLevel = this.schoolLevel.map(v => { return v.select ? 1 : 0 }).toString();
      this.session('serch', serchs)
      this.$router.push({ name: 'query-step2' });
    },
    //浙考一点通用，金榜无效
    getEndTime() {
      this.getExpireTime().then(res => {
        let userinfo = this.storage('userData');
        let times = res.message && res.message.split(',') || [new Date(), new Date()]
        let currM = GetDateDiff(parseInt(times[0]), parseInt(times[1] || parseInt(times[0])), 'minute');
        let currS = GetDateDiff(parseInt(times[0]), parseInt(times[1] || parseInt(times[0])), 'second');
        currM = currM > 0 ? currM : 0;
        currS = currS > 0 ? currS : 0;
        console.log(formatDate(parseInt(times[0]), 'YYYY-MM-DD hh:mm:ss'), formatDate(parseInt(times[1]), 'YYYY-MM-DD hh:mm:ss'), currS)
        if (!res.message) {
          currM = 0;
          currS = 0;
        }
        if (userinfo.type == 102) {
          if (res.message && currS > 0) {
            MessageBox({
              title: '',
              confirmButtonText: '好的，我知道了',
              message: `您是体验用户，有${currM}分钟免费查询时间`,
              closeOnClickModal: false,
            }).then(res => {
              this.getUserInfo();
              if (currS > 0) {
                let timeOut = setInterval(() => {
                  currS--
                  console.log(currS);
                  if (currS == 0) {
                    clearInterval(timeOut);
                    MessageBox({
                      title: '',
                      confirmButtonText: '去购买',
                      showCancelButton: true,
                      message: `您的体验时间已用完，请前往购买后才能继续使用`,
                      closeOnClickModal: false,
                    }).then(res => {
                      if (res == 'cancel') {
                        this.$router.push({ name: 'index' })
                        return;
                      }
                      this.$router.push({ name: 'pay' })
                    })
                  }
                }, 1000)
              }
            });
          } else {
            MessageBox({
              title: '',
              confirmButtonText: '去购买',
              showCancelButton: true,
              message: `您的体验时间已用完，请前往购买后才能继续使用`,
              closeOnClickModal: false,
            }).then(res => {
              if (res == 'cancel') {
                this.$router.push({ name: 'index' })
                return;
              }
              this.$router.push({ name: 'pay' })
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="less">
.query {
  .step-all {
    padding: 15/75rem 30/75rem;
    background-image: -webkit-linear-gradient(left, #ffa440 0%, #ff8600 100%);
    background-image: linear-gradient(90deg, #ffa440 0%, #ff8600 100%);
    color: #fff;
    border-radius: 10/75rem;
  }
  .list-item {
    width: 70%;
    background-color: #bebebe;
    border-radius: 10/75rem;
    font-size: 16px;
    height: 80/75rem;
    padding: 0 20/75rem;
    color: #fff;
    box-shadow: 0 6/75rem 20/75rem 0 #eee;
    &.acitve {
      background-color: #ffa440;
      box-shadow: 0 6/75rem 20/75rem 0 #ff860040;
    }
  }
}
</style>

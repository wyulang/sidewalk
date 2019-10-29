<template>
  <div class="w-all bc-fff planbc flex h-all hidden fd-c pl15 pr15">
    <div>
      <div class="h-35"></div>
      <div class="fs-18 jb-fc mb10">院校计划查询</div>
      <div style="border:1px solid #ff8600" class="ra-5 pt10 pl10 pb10 flex jc-b pr10">
        <i class="icon iconfont jb-fc iconchaxun mr10"></i>
        <input type="search" autocomplete="off" v-model="serchValue" placeholder="请输入您心仪的院校名称或院校省代" class="fs-13 flex-1">
      </div>
    </div>

    <div v-if="serchValue&&schoolList.length" class="w-all flex-1 h-all auto fs-13 mt10">
      <div @click="getSchool(item)" v-for="(item, index) in schoolList" :key="index" class="w-all bb-e pt15 pb15">
        <span>{{item.title}}</span>
        <span class="fc-ccc ml5" v-if="isCode&&item.code">[{{item.code}}]</span>
        <span class="fc-ccc ml5" v-if="isCode&&item.incode">[{{item.incode}}]</span>
      </div>
    </div>

    <!-- <div v-if="serchValue&&schoolList.length" class="h-50"></div> -->

    <div v-if="serchValue&&!schoolList.length" class="h-all auto flex-1">
      <div class="h-50"></div>
      <div class="centent fc-ccc">未找到相关的院校</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { isMumber } from 'lib/validator.js';
import { GetDateDiff, formatDate } from 'lib/dateformat.js';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      list: [],
      schoolList: [],
      serchValue: '',
      isCode: false
    }
  },
  watch: {
    serchValue() {
      this.serchSchool();
    }
  },
  methods: {
    ...mapActions(['getSchoolList', 'getExpireTime', 'getUserInfo']),
    getSchool(item) {
      this.session('schoolItem', this.list[item.index]);
      this.$router.push({ name: 'plan-about' });
    },
    serchSchool() {
      this.schoolList = [];
      if (this.serchValue) {
        if (isMumber(this.serchValue)) {
          this.isCode = true;
          this.list.forEach((item, index) => {
            if (item.incode.includes(this.serchValue)) {
              this.schoolList.push({
                title: item.school,
                incode: item.incode,
                index: index
              })
            }
          })
        } else {
          this.isCode = false;
          this.list.forEach((item, index) => {
            if (item.title.includes(this.serchValue)) {
              this.schoolList.push({
                title: item.school,
                type: item.code,
                index: index
              })
            }
          })
        }
      } else {
        this.schoolList = [];
      }

    },
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
  },
  created() {
    this.$indicator.open({ spinnerType: 'fading-circle' });
    this.getSchoolList().then(res => {
      this.$indicator.close();
      this.list = res;
      this.list.forEach(item => {
        item.title = item.school.replace(/\(.+\)/g, '');
      })
    });
    if (this.$config.getEnvName() == 2) {
      this.getEndTime();
    }
  }
}
</script>
<style lang="less">
.planbc {
  background: url("../../assets/plan_bg.png") no-repeat bottom;
  background-size: 100%;
  height: calc(100vh - 50px);
}
</style>

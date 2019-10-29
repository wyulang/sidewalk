<template>
  <div class="user-info">
    <div class="user-info-body">
      <div class="content">

        <section v-if="$store.state.userinfo.sex!=2" class="lefts">
          <ul class="mb20 user-nav">
            <li @click="setNav(1,'user-info')" :class="{'active':nav==1}"><i class="icon iconfont iconuser"></i><span>基本信息</span></li>
            <li @click="setNav(2,'user-rank')" :class="{'active':nav==2}"><i class="icon iconfont iconyouxichengji"></i><span>成绩与名次</span></li>
            <li v-if="!['1','3'].includes(this.userinfo.userSource)" @click="setNav(3,'user-order')" :class="{'active':nav==3}"><i class="icon iconfont icondingdandaifukuan"></i><span>我的订单</span></li>
          </ul>

          <div v-if="!['1','3'].includes(this.userinfo.userSource)" @click="goBanner(0)" class="get-vippng"></div>
          <!-- <div @click="goBanner(0)" v-if="!userinfo.isCommonPay" class="get-vippng"></div> -->

          <!-- <div @click="goBanner(1)" v-if="!userinfo.isCommonPay" class="china-card"></div> -->

          <div v-if="!['1','3'].includes(this.userinfo.userSource)" @click="goBanner(2)" class="user-report-query"></div>

          <div v-if="!['1','3'].includes(this.userinfo.userSource)" @click="goBanner(3)" class="user-report mt8"></div>
        </section>

        <section class="rights ">
          <div style="border-top-left-radius: 5px; border-top-right-radius: 5px" class="h-45 jb-bb jb-bc flex ai-c">
            <span class="pl15 fs-16">{{[,'基本信息','成绩与位次','我的订单'][nav]}}</span>
          </div>
          <router-view class="bb-d br-d bl-d"></router-view>
        </section>

      </div>
    </div>
  </div>

</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['userinfo']),
  },
  data() {
    return {
      nav: 1
    }
  },
  methods: {
    ...mapActions(['getUserInfo','getUpdatesearchexperiencetimes']),
    setNav(type, path) {
      this.nav = type;
      this.$router.push({ name: path });
    },
    goBanner(type) {
      if ([2, 3].includes(type)) {
        if (!this.userinfo.scores) {
          this.$message.error("请先输入成绩与位次，再进行操作")
          this.$router.push({ 'name': 'user-rank' });
          return;
        }
      }

      if (type == 0) {
        this.$router.push({ name: 'pay' });
      } else if (type == 1) {
        this.$router.push({ name: 'pay', query: { type: 'woo' } })
      } else if (type == 2) {
        this.href('#/query/volunteer');
      } else if (type == 3) {
        if (this.userinfo.examType == 2) {
          this.$message.error("志愿报告辅助决策系统暂时只支持普通考生");
          return;
        }
        let remark = '';
        if (this.userinfo.reportSearchExperienceTimes == 0 && this.userinfo.type == 102) {
          remark = '体验期已结束，现在进入正式查询阶段，请购买VIP后使用';
        }
        if (this.userinfo.reportSearchExperienceTimes > 0 && this.userinfo.type == 102) {
          remark = `您还未购买志愿智能辅助报告，有${this.userinfo.reportSearchExperienceTimes}次免费体验次数`;
        }
        if (remark && this.userinfo.reportSearchExperienceTimes == 0) {
          this.$confirm(remark, '', {
            confirmButtonText: '去购买',
            cancelButtonText: '取消',
            showClose: false,
            customClass:'confirmBtn',
          }).then(res => {
            this.$router.push({ name: 'pay', query: { type: 113 } })
          }).catch(res => { })
          return;
        }
        if (remark && this.userinfo.reportSearchExperienceTimes > 0) {
          this.$confirm(remark, '', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            showClose: false,
            customClass:'confirmBtn',
          }).then(res => {
            this.getUpdatesearchexperiencetimes({ type: 1 }).then(res => {
              this.$router.push({ name: 'report' });
            });
          }).catch(res => { })
          return;
        }
        this.$router.push({ name: 'report' });
      }
    }
  },
  watch: {
    $route() {
      this.nav = [, 'user-info', 'user-rank', 'user-order'].findIndex(v => { return v == this.$route.name });
    }
  },
  created() {
    this.nav = [, 'user-info', 'user-rank', 'user-order'].findIndex(v => { return v == this.$route.name });
    this.getUserInfo();
  },
}
</script>

<style lang='less' scoped>
.user-info {
  width: 1000px;
  margin: 0 auto;
  margin-top: 70px;
  padding: 40px 0;
  .user-info-body {
    display: flex;
    width: 100%;
    justify-content: center;
    .content {
      display: flex;
      .lefts {
        width: 200px;
        margin-right: 30px;
        .china-card {
          width: 200px;
          height: 48px;
          cursor: pointer;
          background-repeat: no-repeat;
          background-image: url("../../assets/user/china-card.png");
          background-size: 100%;
        }
        .get-vippng {
          width: 200px;
          height: 48px;
          cursor: pointer;
          background-repeat: no-repeat;
          background-image: url("../../assets/user/get-vippng.png");
          background-size: 100%;
        }
        .user-report-query {
          width: 195px;
          height: 40px;
          background-image: url("../../assets/user/user-report-query.png");
          cursor: pointer;
          background-size: 100%;
        }
        .user-report {
          width: 197px;
          height: 40px;
          background-image: url("../../assets/user/user-report.png");
          cursor: pointer;
          background-size: 100%;
        }
        ul {
          border-radius: 3px;
          border: 1px #eee solid;
          border-bottom: 0;
          li {
            overflow: hidden;
            height: 44px;
            background: #fafafa;
            border-left: 3px #fafafa solid;
            border-bottom: 1px #eee solid;
            display: flex;
            align-items: center;
            font-size: 15px;
            cursor: pointer;
            box-sizing: border-box;
            padding-left: 20px;
            i {
              margin-right: 10px;
            }
          }
        }
      }
      .rights {
        width: 720px;
      }
    }
  }
}
</style>

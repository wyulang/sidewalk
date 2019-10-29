<template>
  <div class="user-rank fs-14 pt2">
    <div class="h-45 flex ai-c pl10 pr10 bb-e bc-fff">
      <div class="w-100">考生类型</div>
      <div @click="setRadio('examType',item,examTypes)" v-for="(item, index) in examTypes" :key="index" class="flex ai-c h-all mr10">
        <div class="h-20 b-c ra-all w-20 flex ai-c jc-c">
          <i v-if="item.select" class="icon iconfont iconfuxuankuanggou fs-15 jb-fc mr3"></i>
        </div>
        <span class="ml5">{{item.name}}</span>
      </div>
    </div>

    <div class="flex h-35 ai-c bc-f2 b-e pl10 fc-999">成绩位次</div>

    <div class="pl10 pr10 fs-14 bc-fff">
      <div @click="selectType('subject')" v-if="info.examType==2" class="h-50 bb-e flex ai-c jc-b">
        <div class="flex ai-c w-110"><span>请选择科类代码</span></div>
        <div class="flex-1 jb-fc">{{info.artSubject}}</div>
        <i class="icon iconfont fs-23 fc-999 iconangle-right"></i>
      </div>

      <div v-if="info.examType==2" class="h-50 bb-e flex ai-c jc-b">
        <div class="flex ai-c w-110"><span>专业省统考成绩</span></div>
        <div class="flex-1"><input v-model="info.artScore" class="input" @blur="checkSubValue('')" maxlength="3" placeholder="请输入专业分数" type="tel"></div>
      </div>

      <div v-for="(item, index) in subject" :key="index" class="h-50 bb-e flex ai-c jc-b">
        <div class="flex ai-c w-75"><span>{{item.name}}</span></div>
        <input v-if="item.select||!item.isShowCheck" @blur="checkSubValue(item)" v-model="item.score" class="input bc-t" maxlength="3" :placeholder="'请输入'+item.name+'分数'" type="tel">
        <div v-else class="fc-999 flex-1">{{'请输入'+item.name+'分数'}}</div>
        <div @click="subSelect(item)" v-if="item.isShowCheck" class="flex h-all ai-c pl30">
          <div class="h-24 w-24 ra-4 b-d pt2"><i v-if="item.select" class="icon iconfont iconfuxuankuanggou fs-18 jb-fc"></i></div>
        </div>
      </div>

      <div @click="selectType('score')" class="h-50 flex ai-c jc-b">
        <div class="flex ai-c w-110"><span>加分项</span></div>
        <div class="flex-1 jb-fc">{{info.plusScore&&info.plusScore.concat('分')}}</div>
        <i class="icon iconfont fs-23 fc-999 iconangle-right"></i>
      </div>
    </div>

    <div class="flex h-35 ai-c bc-f2 bb pl10 fc-999">高考成绩</div>

    <div class="pl10 pr10 fs-14 bc-fff">
      <div class="h-50 bb-e flex ai-c jc-b">
        <div class="flex ai-c w-110"><span>2019成绩</span></div>
        <div class="flex-1 jb-fc">{{info.score}}</div>
      </div>

      <div class="h-50 bb-e flex ai-c jc-b">
        <div class="flex ai-c w-110"><span>高考位次</span></div>
        <!-- <div class="flex-1 jb-fc">{{info.rank}}</div> -->
        <input placeholder="请输入高考位次" class="input flex-1" @blur="rankSelect" v-model="info.rank" type="tel">
      </div>

      <div class="h-50 bb-e flex ai-c jc-b">
        <div class="flex ai-c w-110"><span>2019成绩</span></div>
        <div class="flex-1 jb-fc">{{info.historyScore[2]}}</div>
      </div>
      <div class="h-50 bb-e flex ai-c jc-b">
        <div class="flex ai-c w-110"><span>2018成绩</span></div>
        <div class="flex-1 jb-fc">{{info.historyScore[1]}}</div>
      </div>
      <div class="h-50 bb-e flex ai-c jc-b">
        <div class="flex ai-c w-110"><span>2017成绩</span></div>
        <div class="flex-1 jb-fc">{{info.historyScore[0]}}</div>
      </div>
    </div>

    <div v-if="userinfo.changeCount == 0 " class="pl10 pr10 mt15 mb15">
      <div>
        <span v-if="userinfo.changeCount == 0 " class="red">您的成绩（位次）修改次数已用完！</span>
        <span v-if="changeCount > 0 " class="red">您是体验用户，还有{{changeCount}}次修改成绩的机会！</span>
        <span v-if="userinfo.type == 102" @click="$router.push({name:'pay',query:{t:'all'}})" class="jb-bc pl10 pr10 ra-4 pt3 pb3">去购买</span>
      </div>
    </div>

    <div class="flex jc-c mt50 h-75 ">
      <button :class="[userinfo.changeCount==0?'bc-d':'jb-bc']" @click="saveRank" class="w-200  flex h-40 br-10 ai-c jc-c fs-15">保 存</button>
    </div>

    <div class="flex jc-c"></div>

    <mt-popup class="w-all" v-model="popupArtType" position="bottom">
      <div class="h-40 flex ai-c jc-e bc-f2 mb15"><span @click="popupArtType=false" class="h-all w-50 flex ai-c jb-fc fs-16">完成</span></div>
      <mt-picker class="w-all" :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>

  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { MessageBox } from 'mint-ui';
import NP from 'number-precision'
export default {
  data() {
    return {
      changeCount: 0,
      userinfo: {},
      popupArtType: false,
      slots: [],
      slotType: '',
      autoRank: 0,
      info: {
        scores: [],
        plusScore: 0,
        examType: 1,
        rank: '',
        artSubject: '美术类',
        artScore: '',
        score: '',
        advice: '',
        historyScore:[0,0,0]
      },
      scoreRank: {
        type: '普通类',
        rank: 0,
        score: 0
      },
      artTypeList: [{ values: ['美术类', '音乐类', '舞蹈类', '影视类', '时装类', '播音类', '编导类', '摄制类', '体育类'], className: 'w-all' }],
      plusScoreArr: [{ values: ['0分', '3分', '5分', '20分'], className: 'w-all' }],
      examTypes: [
        { value: '1', name: '普通考生', select: true },
        { value: '2', name: '艺体考生', select: false }
      ],
      subject: [
        { name: '语文', score: '', isShowCheck: false, select: false, isDis: false, max: 150, old: 0 },
        { name: '数学', score: '', isShowCheck: false, select: false, isDis: false, max: 150, old: 0 },
        { name: '外语', score: '', isShowCheck: false, select: false, isDis: false, max: 150, old: 0 },
        { name: '化学', score: '', isShowCheck: true, select: false, isDis: false, max: 100, old: 0 },
        { name: '历史', score: '', isShowCheck: true, select: false, isDis: false, max: 100, old: 0 },
        { name: '地理', score: '', isShowCheck: true, select: false, isDis: false, max: 100, old: 0 },
        { name: '政治', score: '', isShowCheck: true, select: false, isDis: false, max: 100, old: 0 },
        { name: '技术', score: '', isShowCheck: true, select: false, isDis: false, max: 100, old: 0 },
        { name: '物理', score: '', isShowCheck: true, select: false, isDis: false, max: 100, old: 0 },
        { name: '生物', score: '', isShowCheck: true, select: false, isDis: false, max: 100, old: 0 }
      ]
    }
  },
  methods: {
    ...mapActions(['getUserInfo', 'getRankAdvice', 'getScoreAdvice', 'setScoreRank']),
    selectType(type) {
      this.popupArtType = true;
      this.slotType = type;
      if (type == 'subject') {
        this.slots = this.artTypeList;
        this.slots[0].defaultIndex = this.slots[0].values.findIndex(v => { return v == this.info.artSubject });
      } else if (type == 'score') {
        this.slots = this.plusScoreArr;
      }
      this.autoCount();
    },
    rankSelect() {
      this.info.rank = parseInt(this.info.rank || 0);
      this.autoCount();
    },
    setRadio(model, item, obj) {
      obj.forEach(element => {
        element.select = false
      });
      item.select = true;
      this.info[model] = item.value;
      this.autoCount();
    },
    checkSubSelect() {
      if (this.subject.filter(v => { return v.isShowCheck && v.select }).length < 3) {
        this.$toast('请先选择3门选考科目');
        return;
      }
    },
    subSelect(item) {
      let isFirst = !this.userinfo.score;
      let sect = this.subject.filter(v => { return v.select }).length;

      //不是首次与非vip用户，不能在次勾选
      if (!isFirst && this.userinfo.type == 102) {
        return;
      }

      if (this.userinfo.subjectChangeCount <= 0) {
        return;
      }

      sect += item.select ? 0 : 1;
      if (sect > 3) {
        this.$toast('最多选择3门科目，如需更改，请先取消勾选其他科目');
        return;
      }

      if (item.select) {
        item.select = false;
        item.score = '';
        // item.isDis = true;
      } else {
        item.select = true;
        item.isDis = false;
        if (item.score == '') {
          item.score = '';
        }
      }

    },
    checkSubValue(item) {
      if (item) {
        //当大于自身最大值等于最大值
        if (parseInt(item.score) && parseInt(item.score) > item.max) {
          item.score = item.max;
        }
        //当小于0时，等于0
        if ((parseInt(item.score) && parseInt(item.score) < 0)) {
          item.score = 0;
        }
        //当为非数字时清空
        if (item.score != '' && !parseInt(item.score == 0 ? 1 : item.score)) {
          item.score = '';
        }
        let sect = this.subject.filter(v => { return v.select }).length;
        //新用户，或VIP用户可以重新修改
        if (!this.userinfo.score || this.userinfo.type == 103) {
          //当分数不为空选中项少于3，与非必填项时
          if (parseInt(item.score) && parseInt(item.score) > 0 && sect < 3 && item.isShowCheck) {
            item.select = true;
          }
          if (sect >= 2 && !item.select && item.score != '' && item.isShowCheck) {
            this.$toast({ message: '最多选择3门科目，如需更改，请先取消勾选其他科目', duration: 2000, position: 'top' });
            item.score = '';
            return;
          }
        }
        if (item.score) {
          item.score = parseInt(item.score);
        }
      } else {
        //当大于自身最大值等于最大值
        if (parseInt(this.info.artScore) && parseInt(this.info.artScore) > 100) {
          this.info.artScore = 100;
        }
        //当小于0时，等于0
        if ((parseInt(this.info.artScore) && parseInt(this.info.artScore) < 0)) {
          this.info.artScore = 0;
        }
        //当为非数字时清空
        if (this.info.artScore != '' && !parseInt(this.info.artScore == 0 ? 1 : this.info.artScore)) {
          this.info.artScore = '';
        }
      }
      if (item.isShowCheck && item.score && !this.ruleScore(parseInt(item.score), item.max)) {
        this.$toast({ message: item.name + '选考成绩输入错误请重新输入', duration: 2000, position: 'top' });
      }
      this.autoCount();
    },
    onValuesChange(picker, values) {
      if (this.slotType == 'subject') {
        this.info.artSubject = values[0];
      } else {
        this.info.plusScore = values[0] && values[0].replace('分', '')
      }
      this.autoCount();
    },
    autoCount() {
      //总分
      let allScore = this.subject.reduce((count, value) => { return count += parseInt(value.score) || 0 }, 0);

      if (this.info.examType == 2) {
        switch (this.info.artSubject) {
          case '体育类':
          case '美术类':
          case '音乐类':
            allScore = allScore * 0.5 + (parseInt(this.info.artScore) || 0) * 7.5 * 0.5
            break
          case '舞蹈类':
          case '影视类':
          case '时装类':
            allScore = allScore * 0.4 + (parseInt(this.info.artScore) || 0) * 7.5 * 0.6
            break
          case '播音类':
            allScore = allScore * 0.8 + (parseInt(this.info.artScore) || 0) * 7.5 * 0.2
            break
          case '编导类':
          case '摄制类':
          default:
            allScore = allScore * 1
            break
        }
      }
      allScore += parseInt(this.info.plusScore) || 0;
      this.info.score =NP.strip(allScore);

      // this.scoreRank.type = (this.info.examTypes == 2 ? this.info.artSubject : '普通类') || '普通类';
      // this.scoreRank.rank = this.info.rank;
      // this.scoreRank.score = allScore;

      let qData = {
        type: this.info.examType == 2 ? this.info.artSubject : '普通类',
        score: this.info.score
      }
      if (allScore === 0) {
        // this.info.rank = 0
        this.autoRank = 0;
      } else {
        this.getRankAdvice(qData).then(res => {
          this.info.rank = res.message;
          this.autoRank = res.message;
          this.setScore()
        })
      }
    },
    ruleScore(v, max) {
      let min = 40;
      let curr = [];
      for (let i = 40; i <= max;) {
        curr.push(i);
        i += 3;
      }
      return curr.find(value => { return value == v })
    },
    setScore() {
      let qData = {
        type: this.info.examType == 2 ? this.info.artSubject : '普通类',
        rank: this.info.rank ? this.info.rank : this.autoRank
      }
      this.getScoreAdvice(qData).then(dal => {
        if (dal.code == 20000) {
          if (dal.message) {
            let score = dal.message.split(',');
            this.info.historyScore=score;
            // this.info.advice = `${score[1] == 'null' ? '-' : score[1]} / ${score[0] == 'null' ? '-' : score[0]}`;
          }
        }
      })
    },
    saveRank() {
      // 没有修改次数不操作
      if (this.userinfo.changeCount == 0) {
        return false
      }
      let errorScore = null;

      errorScore = this.subject.find(v => {
        return !v.isShowCheck && !v.score;
      });

      if (errorScore) {
        this.$toast({ message: '请输入' + errorScore.name + '成绩', duration: 2000, position: 'top' });
        return;
      }

      if (this.subject.filter(v => { return v.select }).length < 3) {
        this.$toast({ message: '最少选中三门选考成绩', duration: 2000, position: 'top' });
        return;
      }

      errorScore = null;
      errorScore = this.subject.find(v => {
        return v.isShowCheck && v.select && !this.ruleScore(v.score, v.max);
      });
      if (errorScore) {
        this.$toast({ message: errorScore.name + '选考成绩输入错误请重新输入', duration: 2000, position: 'top' });
        return;
      }
      this.info.scores = this.subject.map(v => { return v.score || 0 }).toString();
      if (this.info.score <= 6) {
        this.$toast({ message: '请正确填写您的专业分数', duration: 2000, position: 'top' });
        return;
      }
      if (this.info.artScore <= 0 && this.info.examType == 2) {
        this.$toast({ message: '请正确填写您的专业分数', duration: 2000, position: 'top' });
        return;
      }
      // <div class="line-36">尊敬的用户您好！为了保障您志愿查询的准确性和双方权益，自2019年6月23日起修改高考成绩与位次号及选考科目有且只能修改一次，请仔细检查您输入各科成绩与位次号及选考是否与您高考确定成绩信息完全对应。确定后提交，提交后成绩与位次号及选考将不能再次修改。敬请您认真核对，谢谢！?</div>
      MessageBox.confirm('<div class="lh-18">确定要保存吗？</div>').then(action => {
        this.$indicator.open({ spinnerType: 'fading-circle' });
        setTimeout(() => {
          this.info.historyScore=this.info.historyScore.join(',');
          this.setScoreRank(this.info).then(res => {
            if (res.code == 20000) {
              this.$toast('保存成绩信息成功');
              //清空志愿查询系统缓存
              this.session('serch','',true)
              setTimeout(() => {
                this.$indicator.close();
                if (this.$route.query.redirect) {
                  this.$router.push({ name: this.$route.query.redirect })
                } else {
                  this.$router.push({ name: 'user' })
                }
              }, 700);

            }
          })
        }, 1200)
      })
    }
  },
  created() {
    this.getUserInfo().then(res => {
      if (res.code == 20000) {
        this.userinfo = res.data;
        this.info.scores = res.data.scores && res.data.scores.split(',') || Array(10).fill(0);
        this.info.score = res.data.score || '-';
        this.info.rank = res.data.rank || '';
        this.autoRank = res.data.rank;
        this.info.artSubject = res.data.artSubject || '美术类';
        this.info.artScore = res.data.artScore || '';
        this.info.examType = res.data.examType || 1;
        this.scoreRank.rank = res.data.rank || 0;
        this.scoreRank.type = (res.data.examType == 2 ? res.data.artSubject : '普通类') || '普通类';
        this.changeCount = res.data.changeCount;
        // this.info.historyScore=res.data.historyScore&&res.data.historyScore.split(',') || [0,0,0]

        this.info.plusScore = res.data.plusScore || '';

        if (res.data.examType == 2) {
          this.info.rank = res.data.artRank || 0;
          this.autoRank = res.data.artRank || 0;
        }

        //2018/2017成绩
        if (res.data.score2017) {
          this.info.advice = res.data.score2018.concat(' / ').concat(res.data.score2017);
        } else {
          this.setScore();
        }

        //初始考生类型
        if (res.data.examType != 0) {
          this.examTypes.forEach(v => {
            if (v.value == res.data.examType) {
              v.select = true;
            } else {
              v.select = false
            }
          })
        }

        // debugger;

        //设置科目分数，与disable
        this.subject.forEach((v, index) => {
          v.score = this.info.scores[index] == 0 ? '' : this.info.scores[index];
          v.old = this.info.scores[index];
          //是否选中
          if (v.isShowCheck && v.score) {
            v.select = true
          }
          //是否可输入 
          if (this.userinfo.score) {
            //老用户
            if (!v.isShowCheck || v.score) {
              v.isDis = false //有值时可输入
            } else {
              v.isDis = true; //无值时不可输入
            }
            if (this.userinfo.type == 103) {
              v.isDis = false;//VIP用户可输入
            }
          } else {
            //新用户可输入
            v.isDis = false
          }
        })

        this.autoCount();
      }
    })
  }
}
</script>
<style lang="less">
.user-rank {
  input {
    color: #eb8718;
    font-size: 14px;
  }
}
</style>

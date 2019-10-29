<template>
  <div class='w-all pl20 pr20 pt30'>
    <div class="flex fs-15 ai-c">
      <span class="w-90">考生类型</span>
      <div class="flex">
        <!-- <span @click="changeExam(3)" :class="[info.examType==3?'rank-bc':'bc-d']" class="w-150 hand h-35 centent lh-35">三位一体</span> -->
        <span @click="changeExam(1)" :class="[info.examType==1?'rank-bc':'bc-d']" class="w-150 hand h-35 centent lh-35">普通模似考生</span>
        <span @click="changeExam(2)" :class="[info.examType==2?'rank-bc':'bc-d']" class="w-150 hand h-35 centent lh-35">艺体考生</span>
      </div>
    </div>

    <div class="mt25 fs-13 red">请务必填写全部真实信息，因为很多专业是有选考科目要求的，你的填写会影响后面我们推 荐的专业。</div>

    <div v-if="userinfo.changeCount == 0 && userinfo.type == 102" class="flex ai-c mt5">
      <span class="fs-13 red mr20">您是体验用户，已经没有修改成绩的机会！</span>
      <i class="iconfont rank-fc fb fs-32 iconiconfontzhizuobiaozhun47"></i>
      <div @click="goPay()" class="jb-bc h-22 lh-22 pl10 ra-3 pr10 hand ml5">去购买</div>
    </div>
    <div v-if="userinfo.changeCount > 0 && userinfo.type == 102" class="flex ai-c mt5">
      <span class="fs-13 red mr20">您是体验用户，还有{{userinfo.changeCount}}次修改成绩的机会！</span>
      <i class="iconfont rank-fc fb fs-32 iconiconfontzhizuobiaozhun47"></i>
      <div @click="goPay()" class="jb-bc h-22 lh-22 pl10 ra-3 pr10 hand ml5">去购买</div>
    </div>

    <div v-if="info.examType==2" class="mt20 flex ai-c">
      <span class="fs-15 w-90 h-all">专业科目</span>
      <div class="flex jc-s fw flex-1">
        <div @click="changeSubject(item,index)" :class="{'rank-bc':info.artSubject==item}" class="w-90 h-40 lh-40 hand bc-d mr10 mb10 centent" v-for="(item, index) in artList" :key="index">{{item}}</div>
      </div>
    </div>

    <div v-if="info.examType!=3">
      <div v-if="info.examType==2" class="mt20 flex ai-c">
        <span class="fs-15 w-90 h-all">专业分数</span>
        <div class="w-350 h-30 bc-d rel">
          <input maxlength="3" id="artscore" @keyup="clearNumber(artSubject)" @blur="getCheck(artSubject)" v-model="artSubject.score" v-if="artSubject.select" class="h-all w-all bc-ff b-a pl12 zx-100 rel" type="text">
          <div v-if="!artSubject.select" :style="{'width':((artSubject.score||0)/artSubject.max*100+'%')}" class="h-all abs rank-bc at0 zx-120 wb-30"></div>
          <div @click="setCheck(artSubject,index)" v-if="!artSubject.select" class="h-all bc-t hand fc-fff abs w-all lh-30 pl12 zx-130 at0 al0 flex">
            <span v-if="artSubject.isDis" class="w-60">{{(artSubject.score||artSubject.max)}}分</span>
            <span v-if="artSubject.isDis">(点击编辑分数)</span>
            <span v-if="!artSubject.isDis">请点击输入您的专业分数</span>
          </div>
        </div>
        <div class="ml10">100分</div>
      </div>

      <div v-for="(item, index) in subject" :key="index" class="mt20 flex ai-c">
        <span @click="setCheck(item,index,true)" :class="[item.bx?'fc-aaa':'fc-333 hand',(item.bx || item.isDis)?'iconxuanzhong':'iconweixuanzhong']" class="iconfont fs-25 mr5"></span>
        <span class="fs-15 w-60 h-all">{{item.name}}</span>
        <div :class="[item.bx?'w-450':'w-350']" class=" h-30 bc-c rel">
          <input maxlength="3" :id="'sub'+index" @keyup="clearNumber(item)" @blur="getCheck(item,index)" v-model="item.score" v-if="item.select" class="h-all w-all bc-ff b-a pl12 zx-100 rel" type="text">
          <div v-if="item.isDis && !item.select" :style="{'width':((item.score||item.max)/item.max*100+'%')}" :class="[(item.bx)?'rank-bc-b':'rank-bc']" class="h-all abs at0 zx-120 wb-30"></div>
          <div @click="setCheck(item,index)" v-if="!item.select" class="h-all bc-t hand fc-fff abs w-all lh-30 pl12 zx-130 at0 al0 flex">
            <span v-if="item.isDis" class="w-60">{{(item.score||item.max)}}分</span>
            <span v-if="item.isDis">(点击编辑分数)</span>
            <span v-if="!item.isDis&&subject.filter(v=>{return v.isDis}).length<6">请点击输入你的成绩</span>
          </div>
        </div>
        <div class="ml10">{{item.max}}分</div>
      </div>

      <div class="mt20 flex ai-c">
        <span class="fs-15 w-90 h-all">政策加分</span>
        <input @keyup="autoCount()" v-model="info.plusScore" class="b-a w-200 h-35 pl10 pr10" type="number">
      </div>

      <div class="mt20 flex ai-c">
        <span class="fs-15 w-90 h-all">模似总分</span>
        <div class="w-200 h-35 lh-35 pl10 pr10 bc-c fc-fff">{{info.score}}</div>
        <span class="fs-13 fc-888 ml10">模似总分将根据各科成绩以及政策加分自动计算</span>
      </div>

      <div class="mt20 flex ai-c">
        <span class="fs-15 w-90 h-all">模似位次</span>
        <input @blur="changeRank('rank')" class="b-a w-200 h-35 pl10 pr10" v-model="info.rank" type="text">
        <span class="fs-13 fc-333 ml10 fb">请输入您位次号“-”后的数字</span>
      </div>

      <div class="mt20 flex ai-c">
        <span class="fs-15 w-90 h-all">2019成绩</span>
        <div class="w-200 h-35 lh-35 pl10 pr10 bc-c fc-fff">{{info.rankScore[2]}}</div>
        <span class="fs-13 fc-888 ml10">模似位次匹配2019年数据得出</span>
      </div>
      <div class="mt20 flex ai-c">
        <span class="fs-15 w-90 h-all">2018成绩</span>
        <div class="w-200 h-35 lh-35 pl10 pr10 bc-c fc-fff">{{info.rankScore[1]}}</div>
        <span class="fs-13 fc-888 ml10">模似位次匹配2018年数据得出</span>
      </div>

      <div class="mt20 flex ai-c">
        <span class="fs-15 w-90 h-all">2017成绩</span>
        <div class="w-200 h-35 lh-35 pl10 pr10 bc-c fc-fff">{{info.rankScore[0]}}</div>
        <span class="fs-13 fc-888 ml10">模似位次匹配2017年数据得出</span>
      </div>

      <div class="mt20 flex ai-c">
        <span class="fs-15 w-90 "></span>
        <div @click="saveRank" v-if="userinfo.changeCount>0" class="w-200 h-40 lh-40 hand centent fs-18 jb-bc">确定</div>
      </div>
    </div>

    <div v-if="info.examType==3" class="mt20">
      <div class="flex ai-c">
        <span class="fs-15 w-80 h-all right">七选三：</span>
        <div class="flex">
          <div @click="threeSelect(item,0,index)" :class="{'jb-fc':item.select,'fc-999':!item.select}" v-for="(item, index) in threeList" :key="index" class="flex fd-c jc-c hand mr30 jc-c ai-c">
            <div class="flex ai-c h-50">
              <span :class="[item.icon]" class="iconfont"></span>
            </div>
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>

      <div class="flex mt20 red">请选择您的十门选考成绩。</div>

      <div v-for="(item, index) in tenList" :key="index" class="flex ai-c mt20">
        <span class="fs-15 w-80 h-all right" v-html="item.name+'：'"></span>
        <div class="flex ai-c pl10">
          <span @click="threeSelect(val,1,index)" :class="{'bc-ff5295':val.s,'bc-d':!val.s}" class="w-60 h-30 lh-30 center mr37 hand" v-for="(val, i) in item.child" :key="i">{{val.v}}</span>
        </div>
      </div>

      <div class="flex w-all ai-c jc-c mt30">
        <button @click="threeSelect(1,2,1)" class="jb-bc w-100 pt6 pb6 fs-16 ra-5 mr100">保存</button>
        <button @click="threeSelect(1,3,1)" class="jb-bc w-100 pt6 pb6 fs-16 ra-5">查看结果</button>
      </div>
    </div>

    <div class="h-50"></div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['userinfo'])
  },
  data() {
    return {
      artList: ['美术类', '音乐类', '舞蹈类', '影视类', '时装类', '播音类', '编导类', '摄制类', '体育类'],
      info: {
        scores: [],
        plusScore: 0,
        examType: 1,
        rank: '',
        artSubject: '美术类',
        artScore: '',
        score: '',
        rankScore: ['-', '-', '-'],
        wltype: ''
      },
      autoRank: 0,
      artSubject: { name: '专业分数', score: '', bx: true, select: false, isDis: false, max: 100, old: 0 },
      subject: [
        { name: '语文', score: '', bx: true, select: false, isDis: true, max: 150, old: 0 },
        { name: '数学', score: '', bx: true, select: false, isDis: true, max: 150, old: 0 },
        { name: '外语', score: '', bx: true, select: false, isDis: true, max: 150, old: 0 },
        { name: '化学', score: '', bx: false, select: false, isDis: false, max: 100, old: 0 },
        { name: '历史', score: '', bx: false, select: false, isDis: false, max: 100, old: 0 },
        { name: '地理', score: '', bx: false, select: false, isDis: false, max: 100, old: 0 },
        { name: '政治', score: '', bx: false, select: false, isDis: false, max: 100, old: 0 },
        { name: '技术', score: '', bx: false, select: false, isDis: false, max: 100, old: 0 },
        { name: '物理', score: '', bx: false, select: false, isDis: false, max: 100, old: 0 },
        { name: '生物', score: '', bx: false, select: false, isDis: false, max: 100, old: 0 }
      ],
      threeList: [
        { name: '物理', select: false, icon: 'icontianping fs-45' },
        { name: '化学', select: false, icon: 'iconjingxihuaxuepin fs-35' },
        { name: '生物', select: false, icon: 'iconshengwukexue fs-45' },
        { name: '政治', select: false, icon: 'iconcloud-government fs-45' },
        { name: '历史', select: false, icon: 'iconlishi fs-35' },
        { name: '地理', select: false, icon: 'icondilixuanzhong fs-36' },
        { name: '科学', select: false, icon: 'iconkexuehua fs-36' },
      ],
      tenList: [
        { name: '语文', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '数学', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '外语', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '物理', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '化学', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '生物', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '政治', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '历史', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '地理', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '技术', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '综合评价', child: [{ v: 'A', s: true }, { v: 'B', s: false }, { v: 'C', s: false }, { v: 'D', s: false }, { v: 'E', s: false }] },
        { name: '<i class="red">*</i>特长生', child: [{ v: '否', s: true }, { v: '是', s: false }] },

      ]
    }
  },
  methods: {
    ...mapActions(['getScoreAdvice', 'getRankAdvice', 'getScoreRankSave', 'getSaveTrinityInfo', 'getUnicomLogin']),
    goPay() {
      if (this.userinfo.userSource == 1) {
        this.getUnicomLogin().then(res => {
          if (res.code == 20000) {
            window.location.href = res.message;
          }
        })
        return;
      }
      if (this.userinfo.userSource == 3) {
        this.$alert('请回到主平台，进行付费升级', '', {
          confirmButtonText: '好的，我知道了',
        })
        return;
      }
      this.$router.push({ name: 'pay' });
    },
    threeSelect(item, type, index) {
      if (type == 0) {
        if (this.threeList.filter(v => { return v.select && v.name != item.name }).length > 2) {
          this.$message.error('七选三只能选择三项');
          return;
        }
        item.select = !item.select;
      } else if (type == 1) {
        this.tenList[index].child.forEach(v => { v.s = false });
        item.s = true;
      } else if (type == 2) {
        if (this.threeList.filter(v => { return v.select }).length != 3) {
          this.$message.error('七选三需选择三项');
          return;
        }
        let trinity = [];
        this.tenList.forEach((v, index) => {
          v.child.forEach((c, i) => {
            if (c.s && v.child.length > 2) {
              trinity.push(c.v);
            }
            if (c.s && v.child.length == 2) {
              trinity.push(c.v == '是' ? 'A' : 'B');
            }
          })
        })
        let sqlData = {
          trinitySubject: this.threeList.map(v => { return v.select ? 1 : 0 }).toString(),
          trinityScore: trinity.toString()
        }
        if (!this.userinfo.isTrinity && this.info.examType == 3) {
          this.$message.error('免费体验次数已用尽，购买三位一休套餐后即可享受无限次使用权');
          return;
        }
        this.getSaveTrinityInfo(sqlData).then(res => {
          if (res.code == 20000) {
            this.$message.success('保存成功');
          }
        })
      } else if (type == 3) {
        if (this.userinfo.trinityScore) {
          this.href('#/trinity');
        } else {
          this.$message.error('请先保存三位一体选项');
        }
      }
    },
    changeExam(type) {
      if (this.userinfo.type == 102 && this.userinfo.changeCount < 1) return false
      if (this.info.examType != type) {
        this.info.examType = type;
        this.autoCount();
      }
    },
    changeSubject(value, index) {
      this.info.artSubject = value;
      this.autoCount();
    },
    setCheck(item, index, bl) {

      if (index != undefined) {
        if (item.bx && bl) { return; }
        let isFirst = !this.userinfo.score;
        let sect = this.subject.filter(v => { return v.isDis }).length;

        //不是首次与非vip用户，不能在次勾选
        if (!isFirst && this.userinfo.type == 102 && bl) {
          return;
        }

        if (this.userinfo.subjectChangeCount <= 0) {
          return;
        }

        sect += item.isDis ? 0 : 1;
        if (sect > 6) {
          if (bl) {
            this.$message.error('最多选择3门科目，如需更改，请先取消勾选其他科目')
          }
          return;
        }

        if (bl) {
          item.isDis = !item.isDis;
          if (!item.isDis) {
            item.old = item.score;
            item.score = '';
          } else {
            item.score = item.old == 0 ? '' : item.old;
          }
        } else {
          item.select = !item.select;
          item.old = item.score;
          item.score = '';
          setTimeout(() => {
            document.getElementById('sub' + index).focus();
          }, 200);
        }
      } else {
        item.isDis = !item.isDis;
        item.select = !item.select;
        item.old = item.score;
        item.score = '';
        setTimeout(() => {
          document.getElementById('artscore').focus();
        }, 200);
      }
      this.autoCount();
    },
    ruleScore(v, max) {
      if (isNaN(v)) {
        v = max;
      }
      if (v == 0) {
        v = max;
      }
      let min = 40;
      let curr = [];
      for (let i = 40; i <= max;) {
        curr.push(i);
        i += 3;
      }
      return curr.find(value => { return value == v })
    },
    getCheck(item, index) {
      if (isNaN(item.score)) {
        item.score = '';
      }
      if (index != undefined) {
        if (item) {
          if (item.score == 0) {
            item.isDis = true;
            item.select = false;
            item.score = '';
          }
          if (parseInt(item.score) && parseInt(item.score) > 0) {
            item.isDis = true;
            item.select = false;
          }
          if (!item.score) {
            item.select = false;
          }
        }
        if (item.score) {
          item.score = parseInt(item.score);
        } else {
          item.score = item.old;
        }

        if (!item.bx && item.score && !this.ruleScore(parseInt(item.score), item.max)) {
          this.$message.error(item.name + '选考成绩输入错误请重新输入');
        }
      } else {
        if (item.score) {
          item.score = parseInt(item.score);
        } else {
          item.score = item.old;
        }
        if (item.score) {
          item.select = false;
          item.isDis = true;

          item.score = parseInt(item.score);
        } else {
          item.select = false;
          item.isDis = false;
        }
      }
      this.autoCount();
    },
    autoCount() {
      //总分
      let allScore = 0;
      this.subject.forEach(v => {
        if (v.isDis) {
          allScore += parseInt(v.score || v.max)
        }
      })

      if (this.info.examType == 2) {
        switch (this.info.artSubject) {
          case '体育类':
          case '美术类':
          case '音乐类':
            allScore = allScore * 0.5 + (parseInt(this.artSubject.score || this.artSubject.max) || 0) * 7.5 * 0.5
            break
          case '舞蹈类':
          case '影视类':
          case '时装类':
            allScore = allScore * 0.4 + (parseInt(this.artSubject.score || this.artSubject.max) || 0) * 7.5 * 0.6
            break
          case '播音类':
            allScore = allScore * 0.8 + (parseInt(this.artSubject.score || this.artSubject.max) || 0) * 7.5 * 0.2
            break
          case '编导类':
          case '摄制类':
          default:
            allScore = allScore * 1
            break
        }
      }
      allScore += parseInt(this.info.plusScore) || 0;
      this.info.score = parseInt(allScore);

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
    clearNumber(item) {
      if (isNaN(item.score)) {
        item.score = '';
      }
      item.score = item.score.replace(/[^\d]/g, '');

      // 当大于自身最大值等于最大值
      if (parseInt(item.score) && parseInt(item.score) > item.max) {
        item.score = item.max;
      }

      // 当小于0时，等于0
      if ((parseInt(item.score) && parseInt(item.score) < 0)) {
        item.score = 0;
      }

    },
    changeRank(type) {
      let ranks = this.info.rank.toString().replace(/.+-|-/g, '');
      if (ranks && /[^\d]/.test(ranks) || !ranks) {
        this.$message.error('模似位次输入错误');
        return;
      }
      if (ranks && parseInt(ranks) >= 252055) {
        this.$message.error('模似位次不得大于252055');
        return;
      }
      if (!type) {
        this.autoCount();
      }

    },
    setScore() {
      let ranks = this.info.rank.toString().replace(/.+-|-/g, '');
      let qData = {
        type: this.info.examType == 2 ? this.info.artSubject : '普通类',
        rank: this.info.rank ? ranks : this.autoRank
      }
      this.getScoreAdvice(qData).then(dal => {
        if (dal.code == 20000) {
          if (dal.message) {
            this.info.rankScore = dal.message.split(',');
          }
        }
      })
    },
    saveRank() {
      if (this.info.score == 750) {
        this.$message.error('请认真填写分数！');
        return;
      }
      // 没有修改次数不操作
      if (this.userinfo.changeCount == 0) {
        return false
      }

      if (this.subject.filter(v => { return !v.bx && v.isDis }).length < 3) {
        this.$message.error('最少选中三门选考成绩');
        return;
      }

      let errorObj = this.subject.find(v => { return !v.bx && v.isDis && !this.ruleScore(parseInt(v.score), v.max) });

      if (errorObj) {
        this.$message.error(errorObj.name + '选考成绩输入错误请重新输入');
        return;
      }

      let ranks = this.info.rank.toString().replace(/.+-|-/g, '');
      if (ranks && /[^\d]/.test(ranks) || !ranks) {
        this.$message.error('模似位次输入错误');
        return;
      }

      this.info.rank = this.info.rank.toString().replace(/.+-|-/g, '');

      if (this.info.examType == 2) {
        if (!this.artSubject.score) {
          this.$message.error('请输入正确专业分数');
          return;
        } else {
          this.info.artScore = this.artSubject.score;
        }
      }

      this.info.historyScore = this.info.rankScore.toString();

      this.info.scores = this.subject.map(v => { if (v.isDis) { return v.score || v.max } else { return 0 } }).toString();

      this.info.wltype = this.info.scores.split(',')[3] == 0 ? '理工类' : '文史类';

      // 尊敬的用户您好！为了保障您志愿查询的准确性和双方权益，自2019年6月23日起修改高考成绩与位次号及选考科目有且只能修改一次，请仔细检查您输入各科成绩与位次号及选考是否与您高考确定成绩信息完全对应。确定后提交，提交后成绩与位次号及选考将不能再次修改。敬请您认真核对，谢谢！
      this.$confirm(
        '确定要保存吗？',
        '温馨提示', {
          confirmButtonText: '确认提交',
          cancelButtonText: '再检查一下',
          customClass: 'confirmBtn',
        }).then(s => {
          this.getScoreRankSave(this.info).then(res => {
            this.$message({ showClose: true, message: '保存成绩与位次成功', type: 'success' });
            if (this.$route.query.redirect) {
              setTimeout(() => {
                this.$router.push({ name: this.$route.query.redirect })
              }, 500);

            }
          })
        });

    }
  },
  created() {
    this.info.scores = this.userinfo.scores && this.userinfo.scores.split(',') || Array(10).fill(0);
    this.info.score = this.userinfo.score || '-';
    this.info.rank = this.userinfo.rank || '';
    this.autoRank = this.userinfo.rank;
    this.info.artSubject = this.userinfo.artSubject || '美术类';
    this.info.artScore = this.userinfo.artScore || '';
    this.info.examType = this.userinfo.examType || 1;
    this.info.plusScore = this.userinfo.plusScore || '';

    // this.userinfo.artScore = '';

    this.artSubject.score = this.userinfo.artScore || '';
    this.artSubject.isDis = !!this.userinfo.artScore;
    this.artSubject.old = this.userinfo.artScore || '';

    if (this.userinfo.examType == 2) {
      this.info.rank = this.userinfo.artRank || 0;
      this.autoRank = this.userinfo.artRank || 0;
      this.info.score = parseInt(this.userinfo.artFinalScore) + parseInt(this.info.plusScore) || 0;
    }

    if (this.userinfo.trinitySubject) {
      this.userinfo.trinitySubject.split(',').forEach((v, index) => {
        if (v == 1) {
          this.threeList[index].select = true;
        }
      })
    }

    if (this.userinfo.trinityScore) {
      this.userinfo.trinityScore.split(',').forEach((v, index) => {
        this.tenList[index].child.forEach(item => { item.s = false });
        if (this.tenList[index].child.length > 2) {
          this.tenList[index].child.find(val => { return val.v == v }).s = true;
        } else {
          this.tenList[index].child.find(val => { return val.v == (v == 'A' ? '是' : '否') }).s = true;
        }
      })
    }

    //2018/2017成绩
    if (this.userinfo.historyScore) {
      // [this.info.score2018, this.info.score2017] = [this.userinfo.score2018, this.userinfo.score2017];
      this.info.rankScore = this.userinfo.historyScore.split(',');
    } else {
      this.setScore();
    }

    //设置科目分数，与disable
    this.subject.forEach((v, index) => {
      v.score = this.info.scores[index] == 0 ? '' : this.info.scores[index];
      v.old = this.info.scores[index];
      //是否选中
      if (v.score) {
        v.isDis = true
      }
    })

    // this.autoCount();

  }
}
</script>

<style lang='less' scoped>
.rank-bc {
  background: #3cd1b5;
  color: #fff;
}
.rank-bc-b {
  background-color: #ff5295;
}
.bc-ff5295 {
  color: #fff;
  background-color: #ff5295;
}
.zx-100 {
  z-index: 100;
}
.zx-120 {
  z-index: 120;
}
.zx-130 {
  z-index: 130;
}
.zx-140 {
  z-index: 140;
}
.rank-fc {
  color: #3cd1b5;
}
</style>

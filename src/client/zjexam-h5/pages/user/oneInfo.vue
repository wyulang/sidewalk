<template>
  <div :class="{'isPop':isPop}" class="w-all fs-14">
    <div class="pl15 pr15">
      <div class="h-50 bb-e flex ai-c">
        <div class="flex ai-c w-90"><i class="red">*</i><span> 姓名：</span></div>
        <input v-model="user.name" class="input fs-14" maxlength="10" placeholder="请输入您的姓名" type="text">
      </div>

      <div class="h-50 bb-e flex ai-c">
        <div class="flex ai-c w-90"><i class="red">*</i><span> 性别：</span></div>
        <div class="flex ai-c">
          <div @click="setRadio('sex',item,sexList)" v-for="(item, index) in sexList" :key="index" class="flex ai-c mr20">
            <i :class="{'iconradio jb-fc':item.select,'iconradio02 c-aaa':!item.select}" class="icon iconfont  fs-18 mr10"></i><span>{{item.name}}</span>
          </div>
        </div>
      </div>

      <div class="h-50 bb-e flex ai-c">
        <div class="flex ai-c w-90"><i class="red">*</i><span> 民族：</span></div>
        <div class="flex ai-c">
          <div @click="setRadio('nation',item,nationList)" v-for="(item, index) in nationList" :key="index" class="flex ai-c mr20">
            <i :class="{'iconradio jb-fc':item.select,'iconradio02 c-aaa':!item.select}" class="icon iconfont  fs-18 mr10"></i><span>{{item.name}}</span>
          </div>
        </div>
      </div>

      <div class="h-50 bb-e flex ai-c">
        <div class="flex ai-c w-90"><i class="red">*</i><span> 年级：</span></div>
        <div class="flex ai-c">
          <div @click="setRadio('studentClass',item,classList)" v-for="(item, index) in classList" :key="index" class="flex ai-c mr20">
            <i :class="{'iconradio jb-fc':item.select,'iconradio02 c-aaa':!item.select}" class="icon iconfont  fs-18 mr10"></i><span>{{item.name}}</span>
          </div>
        </div>
      </div>

      <div class="h-50 bb-e flex ai-c">
        <div class="flex ai-c w-90"><i class="red">*</i><span> 手机号：</span></div>
        <input v-model="user.mailPhone" class="input fs-14" type="tel" maxlength="11" placeholder="请输入您的手机号码">
      </div>

      <div class="red mt15">注：请务必填写您的真实信息！</div>

      <div class="flex jc-c mt30">
        <div @click="btnSave" class="w-200 jb-bc flex h-40 ra-5 ai-c jc-c fs-15">保 存</div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      userinfo: {},
      isPop: false,
      popData: [],
      pkType: 1,
      user: {
        name: '',
        sex: 2,
        nation: 1,
        mailPhone: '',
        studentClass: '',
      },
      sexList: [
        { name: '男', select: false, value: 1 },
        { name: '女', select: false, value: 0 }
      ],
      nationList: [
        { name: '汉族', select: false, value: 1 },
        { name: '少数民族', select: false, value: 2 }
      ],
      classList: [
        { name: '高一', select: false, value: 1 },
        { name: '高二', select: false, value: 2 },
        { name: '高三', select: false, value: 3 }
      ],
      addrList: [
        { 'id': 34, 'name': '浙江', 'parent': 0 },
        { 'id': 345, 'name': '杭州市', 'parent': '浙江' },
        { 'id': 346, 'name': '宁波市', 'parent': '浙江' },
        { 'id': 347, 'name': '温州市', 'parent': '浙江' },
        { 'id': 348, 'name': '嘉兴市', 'parent': '浙江' },
        { 'id': 349, 'name': '湖州市', 'parent': '浙江' },
        { 'id': 350, 'name': '绍兴市', 'parent': '浙江' },
        { 'id': 351, 'name': '金华市', 'parent': '浙江' },
        { 'id': 352, 'name': '衢州市', 'parent': '浙江' },
        { 'id': 353, 'name': '舟山市', 'parent': '浙江' },
        { 'id': 354, 'name': '台州市', 'parent': '浙江' },
        { 'id': 355, 'name': '丽水市', 'parent': '浙江' },
        { 'id': 2866, 'name': '上城区', 'parent': '杭州市' },
        { 'id': 2867, 'name': '下城区', 'parent': '杭州市' },
        { 'id': 2868, 'name': '江干区', 'parent': '杭州市' },
        { 'id': 2869, 'name': '拱墅区', 'parent': '杭州市' },
        { 'id': 2870, 'name': '西湖区', 'parent': '杭州市' },
        { 'id': 2871, 'name': '滨江区', 'parent': '杭州市' },
        { 'id': 2872, 'name': '萧山区', 'parent': '杭州市' },
        { 'id': 2873, 'name': '余杭区', 'parent': '杭州市' },
        { 'id': 2874, 'name': '桐庐县', 'parent': '杭州市' },
        { 'id': 2875, 'name': '淳安县', 'parent': '杭州市' },
        { 'id': 2876, 'name': '建德市', 'parent': '杭州市' },
        { 'id': 2877, 'name': '富阳市', 'parent': '杭州市' },
        { 'id': 2878, 'name': '临安市', 'parent': '杭州市' },
        { 'id': 2879, 'name': '海曙区', 'parent': '宁波市' },
        { 'id': 2880, 'name': '江东区', 'parent': '宁波市' },
        { 'id': 2881, 'name': '江北区', 'parent': '宁波市' },
        { 'id': 2882, 'name': '北仑区', 'parent': '宁波市' },
        { 'id': 2883, 'name': '镇海区', 'parent': '宁波市' },
        { 'id': 2884, 'name': '鄞州区', 'parent': '宁波市' },
        { 'id': 2885, 'name': '象山县', 'parent': '宁波市' },
        { 'id': 2886, 'name': '宁海县', 'parent': '宁波市' },
        { 'id': 2887, 'name': '余姚市', 'parent': '宁波市' },
        { 'id': 2888, 'name': '慈溪市', 'parent': '宁波市' },
        { 'id': 2889, 'name': '奉化市', 'parent': '宁波市' },
        { 'id': 2890, 'name': '鹿城区', 'parent': '温州市' },
        { 'id': 2891, 'name': '龙湾区', 'parent': '温州市' },
        { 'id': 2892, 'name': '瓯海区', 'parent': '温州市' },
        { 'id': 2893, 'name': '洞头县', 'parent': '温州市' },
        { 'id': 2894, 'name': '永嘉县', 'parent': '温州市' },
        { 'id': 2895, 'name': '平阳县', 'parent': '温州市' },
        { 'id': 2896, 'name': '苍南县', 'parent': '温州市' },
        { 'id': 2897, 'name': '文成县', 'parent': '温州市' },
        { 'id': 2898, 'name': '泰顺县', 'parent': '温州市' },
        { 'id': 2899, 'name': '瑞安市', 'parent': '温州市' },
        { 'id': 2900, 'name': '乐清市', 'parent': '温州市' },
        { 'id': 2901, 'name': '南湖区', 'parent': '嘉兴市' },
        { 'id': 2902, 'name': '秀洲区', 'parent': '嘉兴市' },
        { 'id': 2903, 'name': '嘉善县', 'parent': '嘉兴市' },
        { 'id': 2904, 'name': '海盐县', 'parent': '嘉兴市' },
        { 'id': 2905, 'name': '海宁市', 'parent': '嘉兴市' },
        { 'id': 2906, 'name': '平湖市', 'parent': '嘉兴市' },
        { 'id': 2907, 'name': '桐乡市', 'parent': '嘉兴市' },
        { 'id': 2908, 'name': '吴兴区', 'parent': '湖州市' },
        { 'id': 2909, 'name': '南浔区', 'parent': '湖州市' },
        { 'id': 2910, 'name': '德清县', 'parent': '湖州市' },
        { 'id': 2911, 'name': '长兴县', 'parent': '湖州市' },
        { 'id': 2912, 'name': '安吉县', 'parent': '湖州市' },
        { 'id': 2913, 'name': '越城区', 'parent': '绍兴市' },
        { 'id': 2914, 'name': '绍兴县', 'parent': '绍兴市' },
        { 'id': 2915, 'name': '新昌县', 'parent': '绍兴市' },
        { 'id': 2916, 'name': '诸暨市', 'parent': '绍兴市' },
        { 'id': 2917, 'name': '上虞市', 'parent': '绍兴市' },
        { 'id': 2918, 'name': '嵊州市', 'parent': '绍兴市' },
        { 'id': 2919, 'name': '婺城区', 'parent': '金华市' },
        { 'id': 2920, 'name': '金东区', 'parent': '金华市' },
        { 'id': 2921, 'name': '武义县', 'parent': '金华市' },
        { 'id': 2922, 'name': '浦江县', 'parent': '金华市' },
        { 'id': 2923, 'name': '磐安县', 'parent': '金华市' },
        { 'id': 2924, 'name': '兰溪市', 'parent': '金华市' },
        { 'id': 2925, 'name': '义乌市', 'parent': '金华市' },
        { 'id': 2926, 'name': '东阳市', 'parent': '金华市' },
        { 'id': 2927, 'name': '永康市', 'parent': '金华市' },
        { 'id': 2928, 'name': '柯城区', 'parent': '衢州市' },
        { 'id': 2929, 'name': '衢江区', 'parent': '衢州市' },
        { 'id': 2930, 'name': '常山县', 'parent': '衢州市' },
        { 'id': 2931, 'name': '开化县', 'parent': '衢州市' },
        { 'id': 2932, 'name': '龙游县', 'parent': '衢州市' },
        { 'id': 2933, 'name': '江山市', 'parent': '衢州市' },
        { 'id': 2934, 'name': '定海区', 'parent': '舟山市' },
        { 'id': 2935, 'name': '普陀区', 'parent': '舟山市' },
        { 'id': 2936, 'name': '岱山县', 'parent': '舟山市' },
        { 'id': 2937, 'name': '嵊泗县', 'parent': '舟山市' },
        { 'id': 2938, 'name': '椒江区', 'parent': '台州市' },
        { 'id': 2939, 'name': '黄岩区', 'parent': '台州市' },
        { 'id': 2940, 'name': '路桥区', 'parent': '台州市' },
        { 'id': 2941, 'name': '玉环县', 'parent': '台州市' },
        { 'id': 2942, 'name': '三门县', 'parent': '台州市' },
        { 'id': 2943, 'name': '天台县', 'parent': '台州市' },
        { 'id': 2944, 'name': '仙居县', 'parent': '台州市' },
        { 'id': 2945, 'name': '温岭市', 'parent': '台州市' },
        { 'id': 2946, 'name': '临海市', 'parent': '台州市' },
        { 'id': 2947, 'name': '莲都区', 'parent': '丽水市' },
        { 'id': 2948, 'name': '青田县', 'parent': '丽水市' },
        { 'id': 2949, 'name': '缙云县', 'parent': '丽水市' },
        { 'id': 2950, 'name': '遂昌县', 'parent': '丽水市' },
        { 'id': 2951, 'name': '松阳县', 'parent': '丽水市' },
        { 'id': 2952, 'name': '云和县', 'parent': '丽水市' },
        { 'id': 2953, 'name': '庆元县', 'parent': '丽水市' },
        { 'id': 2954, 'name': '景宁畲族自治县', 'parent': '丽水市' },
        { 'id': 2955, 'name': '龙泉市', 'parent': '丽水市' }
      ],
      schoolList: [],
      address: []
    }
  },
  methods: {
    ...mapActions(['getUserInfo', 'saveUserinfo', 'getHighschoolList']),
    changPop(type) {
      this.pkType = type;
      if (type == 1) {
        this.setSoleData();
      } else {
        if (!this.user.districtId) {
          this.$toast('请先选择所在地区');
          return;
        }
        this.popData = [{
          flex: 1,
          values: this.schoolList.map(v => { return v.name }),
          textAlign: 'center'
        }];
        let id = this.user.highschool ? -1 : this.user.schoolId;
        this.popData[0].defaultIndex = this.schoolList.findIndex(v => { return v.id == id })
      }
      this.isPop = true;
    },
    getSchool(id, inits) {
      this.getHighschoolList({ districtId: id }).then(res => {
        if (res.code == 20000) {
          this.schoolList = res.data.array;
          this.schoolList.push({
            name: '其他学校',
            id: -1
          });
          if (inits) {
            this.user.schoolName = this.schoolList.find(v => { return v.id == inits }).name;
          }
          if (this.user.districtId != id) {
            this.user.schoolName = '';
          }
        }
      })
    },
    setSoleData() {
      this.popData = [
        { flex: 1, values: ['浙江'], textAlign: 'center' },
        { divider: true, content: '-', }, {
          flex: 1,
          values: this.addrList.filter(v => { return v.parent == (this.address[0] || '浙江') }).map(v => { return v.name }),
          textAlign: 'center',
        }, { divider: true, content: '-', }, {
          flex: 1,
          values: this.addrList.filter(v => { return v.parent == (this.address[1] || '杭州市') }).map(v => { return v.name }),
          textAlign: 'center'
        }
      ]
      this.popData[2].defaultIndex = this.popData[2].values.findIndex((v, index) => { return v == this.address[1] });
      this.popData[4].defaultIndex = this.popData[4].values.findIndex((v, index) => { return v == this.address[2] });
    },
    setRadio(model, item, obj) {
      obj.forEach(element => {
        element.select = false
      });
      item.select = true;
      this.user[model] = item.value;
    },
    btnSave() {
      if (!/^[\u4e00-\u9fa5]+$/.test(this.user.name)) {
        this.$toast('请输入中文姓名')
        return
      }
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.user.mailPhone)) {
        this.$toast('您输入的手机号格试有误')
        return
      }
      if (![0, 1].includes(this.user.sex)) {
        this.$toast('请选择性别')
        return
      }
      if (![1, 2, 3].includes(this.user.studentClass)) {
        this.$toast('请选择年级')
        return
      }

      this.$indicator.open({ spinnerType: 'fading-circle' });
      this.saveUserinfo(this.user).then(res => {
        this.$indicator.close();
        if (res.code == 20000) {
          this.$toast('保存成功');
          if (res.data.scores) {
            this.$router.push({ name: 'user' })
          } else {
            this.$router.push({ name: 'user-rank' })
          }
        }
      })

    }
  },
  created() {
    this.getUserInfo().then(res => {
      if (res.code == 20000) {
        this.userinfo = res.data;
        this.user.name = res.data.name || '';
        this.user.sex = res.data.sex;
        this.user.studentClass = res.data.studentClass || '';
        this.user.mailPhone = res.data.mailPhone || res.data.phone;
        this.user.nation = parseInt(res.data.nation) || 1;
        this.sexList.forEach(v => {
          if (v.value == res.data.sex) {
            v.select = true;
          }
        })
        this.classList.forEach(v => {
          if (v.value == res.data.studentClass) {
            v.select = true;
          }
        });

        this.nationList.forEach(v => {
          if (v.value == res.data.nation) {
            v.select = true;
          }
        })


      }
    })
  }
}
</script>
<style lang="less">
.isPop {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>

<template>
  <div class="w-all">

    <el-form :model="user" :rules="rules" ref="ruleForm" class="pt30 fs-13 pl10" label-width="100px">
      <div class="ml10 mb20">* 请务必正确填写全部信息</div>

      <el-form-item label="学生姓名：" prop="name">
        <el-input class="w-250" v-model="user.name"></el-input>
      </el-form-item>

      <el-form-item label="性别：" prop="name">
        <div class="flex-line">
          <div @click="sexList.forEach(v=>{v.select=false;});item.select=true" :class="{'jb-fc':item.select,'fc-666':!item.select}" v-for="(item, index) in sexList" :key="index" class="flex-line hand ai-c mr15">
            <span :class="{'iconradioboxmarked':item.select,'iconradiobuttonoff':!item.select}" class="iconfont fs-20  "></span>
            <span class="ml5 fs-14">{{item.name}}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="民族：" prop="name">
        <div class="flex-line">
          <div @click="nationList.forEach(v=>{v.select=false;});item.select=true" :class="{'jb-fc':item.select,'fc-666':!item.select}" v-for="(item, index) in nationList" :key="index" class="flex-line hand ai-c mr15">
            <span :class="{'iconradioboxmarked':item.select,'iconradiobuttonoff':!item.select}" class="iconfont fs-20  "></span>
            <span class="ml5 fs-14">{{item.name}}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="年级：" prop="name">
        <div class="flex-line">
          <div @click="classList.forEach(v=>{v.select=false;});item.select=true" :class="{'jb-fc':item.select,'fc-666':!item.select}" v-for="(item, index) in classList" :key="index" class="flex-line hand ai-c mr15">
            <span :class="{'iconradioboxmarked':item.select,'iconradiobuttonoff':!item.select}" class="iconfont fs-20  "></span>
            <span class="ml5 fs-14">{{item.name}}</span>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="电话：" prop="mailPhone">
        <el-input maxlength=11 class="w-250" placeholder="请输入电话" v-model="user.mailPhone"></el-input>
      </el-form-item>

      <el-form-item label="所在学校：">
        <!-- 省 -->
        <!-- <el-select v-model="user.provinceId" class="w-100 mr5" placeholder="请选择">
          <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select> -->
        <!-- 市 -->
        <el-select ref="rescity" v-model="user.cityId" @change="(v)=>{getAddress(v,'area')}" class="w-100 mr5" placeholder="请选择">
          <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <!-- 区 -->
        <el-select ref="resArea" v-model="user.districtId" @change="(v)=>{getAddress(v,'school')}" class="w-120 mr5" placeholder="请选择">
          <el-option v-for="item in districtList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <!-- 学校 -->
        <el-select ref="resSchool" v-model="user.schoolId" placeholder="请选择">
          <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <el-input v-if="user.schoolId==-1" class="w-250 mt10" placeholder="请输入您的学校名称" v-model="user.highschool"></el-input>
      </el-form-item>

      <el-form-item>
        <div @click="submitForm('ruleForm')" class="jb-btn mt10">保 存</div>
      </el-form-item>
    </el-form>

    <div class="h-20"></div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['userinfo'])
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    }
    return {
      sexList: [{ name: '男', value: 1, select: false }, { name: '女', value: 0, select: false }],
      nationList: [{ name: '汉族', value: 1, select: false }, { name: '少数民族', value: 2, select: false }],
      classList: [{ name: '高一', value: 1, select: false }, { name: '高二', value: 2, select: false }, { name: '高三', value: 3, select: false }],
      user: {
        address: '',
        provinceId: 34, //省份ID
        cityId: null, //城市ID
        districtId: null, //区域ID
        highschool: '',//高中学校
        name: '',//学生姓名
        schoolId: '',//学校ID
        sex: '',
        mailPhone: '',
        studentClass: '',
        nation: 1
      },
      rules: {
        name: [{ required: true, message: '请输入您的名字', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        studentClass: [{ required: true, message: '请选择年级', trigger: 'change' }],
        schoolId: [{ required: true, message: '请选择学校', trigger: 'change' }],
        mailPhone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
      },
      provinceList: [{ id: 34, name: "浙江" }],
      cityList: [],
      districtList: [],
      schoolList: [],
      isShowNav: false
    };
  },
  methods: {
    ...mapActions([
      'getProvinceList',
      'getCityList',
      'getDistrictList',
      'getHighschoolList',
      'getInfoSave',
      'getUserInfo'
    ]),
    submitForm(formName) {
      if (this.user.schoolId == -1 && this.user.highschool.length < 2) {
        this.$message.error('请输入学校名称');
        return;
      }

      this.user.sex = this.sexList.find(v => { return v.select }) && this.sexList.find(v => { return v.select }).value;
      this.user.nation = this.nationList.find(v => { return v.select }) && this.nationList.find(v => { return v.select }).value;
      this.user.studentClass = this.classList.find(v => { return v.select }) && this.classList.find(v => { return v.select }).value;

      if (!/^[\u4e00-\u9fa5]+$/.test(this.user.name)) {
        this.$message.error('请输入中文姓名')
        return
      }
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.user.mailPhone)) {
        this.$message.error('您输入的手机号格试有误')
        return
      }
      if (![0, 1].includes(parseInt(this.user.sex))) {
        this.$message.error('请选择性别')
        return
      }
      if (![1, 2, 3].includes(parseInt(this.user.studentClass))) {
        this.$message.error('请选择年级')
        return
      }

      if (!this.user.schoolId && this.user.schoolId != -1) {
        this.$message.error('请选择所在学校');
        return;
      }

      if (this.user.schoolId == -1) {
        this.user.schoolId = "";
      } else {
        this.user.highschool = "";
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.user.schoolId = this.user.schoolId == -1 ? null : this.user.schoolId;
          this.getInfoSave(this.user).then(res => {
            if (res.code == 20000) {
              if (this.userinfo.sex == 2) {
                Object.assign(this.userinfo, this.user);
                this.userinfo.sex = 2;
              } else {
                Object.assign(this.userinfo, this.user);
              }
              this.$store.commit('setUserinfo', this.userinfo);
              if (this.userinfo.examType == 0) {
                this.$router.push({ name: 'user-rank', query: { sex: this.isShowNav } });
              }
              this.$message.success('保存成功！！');
              if (!this.user.schoolId) {
                this.user.schoolId = -1;
              }

            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAddress(val, type, bl) {
      if (type == 'city') {
        this.getCityList({ provinceId: 34 }).then(res => {
          if (res.code == 20000) {
            this.cityList = res.data.array;
          }
        })
      } else if (type == 'area') {
        this.districtList = [];
        this.getDistrictList({ cityId: val }).then(res => {
          if (res.code == 20000) {
            if (!bl) {
              this.user.districtId = '';
              this.user.schoolId = '';
            }
            this.districtList = res.data.array;
            this.$refs.resSchool.value = "";
            this.$refs.resSchool.selectedLabel = "";
            this.$refs.resArea.value = "";
            this.$refs.resArea.selectedLabel = "";
          }
        })
      } else if (type == 'school') {
        this.schoolList = [];
        this.getHighschoolList({ districtId: val }).then(res => {
          if (res.code == 20000) {
            if (!bl) {
              this.user.schoolId = '';
            }
            this.schoolList = res.data.array;
            this.schoolList.push({ id: -1, name: '其他学校' });
            this.$refs.resSchool.value = "";
            this.$refs.resSchool.selectedLabel = "";
          }
        })
      }
    },
    getUser() {
      this.getUserInfo().then(res => {
        this.isShowNav = this.userinfo.sex;
        this.user.address = this.userinfo.address;
        this.user.sex = this.userinfo.sex;
        this.user.name = this.userinfo.name;
        this.user.mailPhone = this.userinfo.mailPhone || this.userinfo.phone;
        this.user.studentClass = this.userinfo.studentClass;
        this.user.cityId = this.userinfo.cityId || '';
        this.user.nation = parseInt(this.userinfo.nation || 1);
        this.user.highschool = this.userinfo.highschool || '';

        if (this.sexList.filter(v => { return v.value == this.user.sex }).length > 0) {
          this.sexList.find(v => { return v.value == this.user.sex }).select = true;
        }
        if (this.nationList.filter(v => { return v.value == this.user.nation }).length > 0) {
          this.nationList.find(v => { return v.value == this.user.nation }).select = true;
        }
        if (this.classList.filter(v => { return v.value == this.user.studentClass }).length > 0) {
          this.classList.find(v => { return v.value == this.user.studentClass }).select = true;
        }

        if (this.userinfo.cityId) {
          this.getAddress(this.user.cityId, 'area', 'no');
          this.user.districtId = this.userinfo.districtId || '';
        }
        if (this.userinfo.districtId) {
          this.getAddress(this.user.districtId, 'school', 'no');
          setTimeout(() => {
            if (res.data.highschool) {
              this.user.schoolId = -1;
            } else {
              this.user.schoolId = this.userinfo.schoolId;
            }
          }, 500);
        }
      })
    }
  },
  created() {
    this.getAddress('', 'city');
    this.getUser();
  }
}
</script>

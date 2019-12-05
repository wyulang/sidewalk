<template>
  <div class='w-all'>
    <div class="w-all bc-fff pt10 pb10 sha-7 ra-4 pl10 pr10">
      <span>用户名：</span>
      <el-input size="small" class="w-200" v-model="serch.name" placeholder="输入用户名"></el-input>
      <span class="ml20">手机：</span>
      <el-input size="small" class="w-200" v-model="serch.name" placeholder="输入用户名"></el-input>
      <span class="ml20">邮箱：</span>
      <el-input size="small" class="w-200" v-model="serch.name" placeholder="输入用户名"></el-input>
      <el-button class="ml20" type="primary" size="small">查询</el-button>
    </div>

    <div class="w-all bc-fff ra-4 pl10 pr10 pb10 sha-7 mt10">
      <div class="pt10 flex pb10">
        <el-button @click="btnAdd()" icon="icon icontianjia" size="small">新增</el-button>
        <el-button class="ml10" icon="icon iconshanchu" size="small">批量删除</el-button>
      </div>
      <div>
        <table class="table w-all">
          <thead>
            <tr class="bt-e">
              <td class="wb-1">
                <el-checkbox></el-checkbox>
              </td>
              <td>用户名</td>
              <td>电话</td>
              <td>邮箱</td>
              <td>管理类型</td>
              <td>登录次数</td>
              <td>上次登录时间</td>
              <td>创建时间</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr class="bt-e" v-for="(item, index) in list" :key="index">
              <td>
                <el-checkbox></el-checkbox>
              </td>
              <td>{{item.name}}</td>
              <td>{{item.phone}}</td>
              <td>{{item.email}}</td>
              <td>{{[,"普通管理员","超级管理员"][parseInt(item.type)]}}</td>
              <td>{{item.lgCount || 0}}次</td>
              <td>{{item.lgTime}}</td>
              <td>{{parseInt(item.createTime) | date}}</td>
              <td class="w-150">
                <div @click="btnAdd(item)" class="flex-line active ai-c hand mr10">
                  <span class="icon fs-14 mr2 iconbianji hand "></span>
                  <span>编辑</span>
                </div>
                <div @click="btnDelete(item)" class="flex-line active ai-c hand mr10">
                  <span class="icon fs-14 mr2 iconshanchu hand "></span>
                  <span>删除</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <el-dialog title="提示" class="module-dialog" :visible.sync="isModel" width="700px">
      <table class="dialog-table ra-4 w-all">
        <tr>
          <td class="w-90 nowrap right">用户名：</td>
          <td>
            <el-input size="small" v-model="user.name" placeholder="输入用户名"></el-input>
          </td>
          <td class="w-90 nowrap right">手机号：</td>
          <td>
            <el-input size="small" v-model="user.phone" placeholder="输入手机号"></el-input>
          </td>
        </tr>
        <tr>
          <td class="w-90 nowrap right">邮箱：</td>
          <td>
            <el-input size="small" v-model="user.email" placeholder="输入邮箱"></el-input>
          </td>
          <td class="w-90 nowrap right">性别：</td>
          <td>
            <radio :data="[{label:'男',value:1},{label:'女',value:2}]" v-model="user.sex"></radio>
          </td>
        </tr>
        <tr>
          <td class="w-90 nowrap right">密码：</td>
          <td>
            <el-input size="small" v-model="user.password" placeholder="输入密码"></el-input>
          </td>
          <td class="w-90 nowrap right">类型：</td>
          <td>
            <radio :data="[{label:'普通管理员',value:1},{label:'超级管理员',value:2}]" v-model="user.type"></radio>
          </td>
        </tr>
        <tr>
          <td class="nowrap right">所在城市：</td>
          <td colspan="3">
            <el-cascader class="w-230" size="small" v-model="user.city" :options="cityList" :props="{ expandTrigger: 'click' }" @change="handleChange"></el-cascader>
          </td>
        </tr>
        <tr>
          <td class="nowrap right">个人说明：</td>
          <td colspan="3">
            <el-input type="textarea" class="w-all" size="small" v-model="user.remark" placeholder="个人说明"></el-input>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="isModel = false">取 消</el-button>
        <el-button size="small" type="primary" @click="btnSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import radio from "@component/radio.vue";
import city from "lib/city.js";
import { mapActions } from "vuex";
export default {
  components: {
    radio
  },
  data() {
    return {
      cityList: city,
      list: [],
      isModel: false,
      user: {
        name: "",
        phone: "",
        email: "",
        sex: 1,
        type: 1,
        remark: "",
        city: [],
        password: ""
      },
      serch: {
        name: ""
      }
    };
  },
  methods: {
    ...mapActions(["updateUser", "getUserList","getUserDelete"]),
    btnAdd(item) {
      if (item) {
        item.password="";
        this.user = item;
      } else {
        this.user = {
          name: "",
          phone: "",
          email: "",
          sex: 1,
          type: 1,
          remark: "",
          city: [],
          password: ""
        };
      }
      this.isModel = true;
    },
    btnSave() {
      if (!this.user.name) {
        this.$message.error("用户名不为空");
        return;
      }
      if (!this.user.phone) {
        this.$message.error("手机号不为空");
        return;
      }
      if (!this.user.email) {
        this.$message.error("邮箱不为空");
        return;
      }
      if (!this.user.password &&!this.user.id) {
        this.$message.error("密码不为空");
        return;
      }
      if (!this.user.city.length) {
        this.$message.error("城市不为空");
        return;
      }
      let sqlData = {
        city: this.user.city.toString(),
        name: this.user.name,
        phone: this.user.phone,
        email: this.user.email,
        sex: this.user.sex,
        type: this.user.type,
        remark: this.user.remark
      };
      if (this.user.id) {
        sqlData.id = this.user.id;
      }
      if (this.user.password) {
        sqlData.password = this.user.password;
      }


      this.updateUser(sqlData).then(res => {
        this.isModel = false;
        if (res.code == 2000) {
          sqlData = null;
          this.$message.success(res.message);
          this.initData();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    btnDelete(item){
      this.getUserDelete({id:item.id}).then(res=>{
        if (res.code == 2000) {
          this.$message.success(res.message);
          this.initData();
        } else {
          this.$message.error(res.message);
        }
      })
    },
    initData() {
      this.getUserList({}).then(res => {
        if (res.code == 2000) {
          this.list = res.data;
          this.list.forEach(v => {
            v.city = v.city.split(",");
          });
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang='less' scoped>
</style>

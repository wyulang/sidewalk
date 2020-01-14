<template>
  <div class='w-all'>
    <div class="w-all bc-fff pt10 pb10 sha-7 ra-4 pl10 pr10">
      <el-input size="small" class="w-200" clearable v-model="serch.value" placeholder="输入用户名/手机号/邮箱"></el-input>
      <el-select size="small" clearable class="ml20" v-model="serch.type" placeholder="请选择用户类型">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button class="ml20" @click="initData()" type="primary" size="small">查询</el-button>
    </div>

    <div class="w-all bc-fff pt10 pb10 mt10 sha-7 ra-4 pl10 pr10">
      <div v-pop:foo="user.name">dddd</div>
    </div>

    <div class="w-all bc-fff ra-4 pl10 pr10 pb10 sha-7 mt10">
      <div class="pt10 flex pb10">
        <el-button @click="btnAdd()" icon="icon icontianjia" size="small">新增</el-button>
        <el-button class="ml10" @click="btnDelete(selectList)" icon="icon iconshanchu" size="small">批量删除</el-button>
      </div>
      <div class="sha-3 mt5">
        <table class="table w-all">
          <thead>
            <tr>
              <td class="wb-1">
                <el-checkbox :value="selectList.length==list.length&&selectList.length>0" @change="v=>{v?(selectList=list.map(d=>{return d.id})):(selectList=[])}"></el-checkbox>
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
                <el-checkbox :value="selectList.includes(item.id)" @change="(v)=>{v?selectList.push(item.id):selectList.splice(selectList.indexOf(item.id),1)}"></el-checkbox>
              </td>
              <td>{{item.name}}</td>
              <td>{{item.phone}}</td>
              <td>{{item.email}}</td>
              <td>{{[,"普通管理员","超级管理员"][parseInt(item.type)]}}</td>
              <td>{{item.lgCount || 0}}次</td>
              <td>{{item.lgTime ||'未登录'}}</td>
              <td>{{parseInt(item.createTime) | date}}</td>
              <td class="w-150">
                <div @click="btnAdd(item)" class="flex-line active ai-c hand mr10">
                  <span class="icon fs-14 mr2 iconbianji hand "></span>
                  <span>编辑</span>
                </div>
                <div @click="btnDelete([item.id])" class="flex-line active ai-c hand mr10">
                  <span class="icon fs-14 mr2 iconshanchu hand "></span>
                  <span>删除</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex jc-s mt15 mb5">
        <el-pagination background @current-change="changPage" hide-on-single-page="true" :current-page="serch.page" :page-size="serch.size" layout="prev, pager, next" :total="serch.total">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="user.id?'用户编辑':'新增用户'" class="module-dialog" :visible.sync="isModel" width="500px">
      <table class="dialog-table ra-4 w-all">
        <tr>
          <td class="w-90 nowrap right">用户名：</td>
          <td>
            <el-input size="small" v-model="user.name" placeholder="输入用户名"></el-input>
          </td>
        </tr>
        <tr>
          <td class="w-90 nowrap right">邮箱：</td>
          <td>
            <el-input autocomplete="new-password" size="small" v-model="user.email" placeholder="输入邮箱"></el-input>
          </td>

        </tr>
        <tr>
          <td class="w-90 nowrap right">密码：</td>
          <td>
            <el-input autocomplete="new-password" size="small" v-model="user.password" placeholder="请输入密码" show-password></el-input>
          </td>

        </tr>
        <tr>
          <td class="w-90 nowrap right">类型：</td>
          <td>
            <radio :data="typeList" v-model="user.type"></radio>
          </td>
        </tr>
        <tr>
          <td class="w-90 nowrap right">手机号：</td>
          <td>
            <el-input size="small" v-model="user.phone" placeholder="输入手机号"></el-input>
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
import api from '../../store/webapi';
export default {
  components: {
    radio
  },
  data() {
    return {
      cityList: city,
      list: [],
      typeList: [{ label: '普通管理员', value: 1 }, { label: '超级管理员', value: 2 }],
      fileList: [],
      selectList:[],
      isModel: false,
      uploadUrl: api.env('envUrl') + '/api/base/upload',
      uploadData: {},
      headerUrl: api.env('envUrl') + '/assets/',
      user: {
        name: "",
        phone: "",
        email: "",
        type: 1,
        remark: "",
        city: [],
        password: "",
        header: ""
      },
      serch: {
        value: "",
        type: "",
        page: 1,
        size: 10,
        total: 0
      }
    };
  },
  methods: {
    ...mapActions(["getAdminList", "updateAdmin", "getAdminDelete"]),
    btnAdd(item) {
      if (item) {
        item.password = "";
        this.user = JSON.parse(JSON.stringify(item));
        this.user.oldHeader=item.header;
      } else {
        this.user = {
          name: "",
          phone: "",
          email: "",
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
      if (!this.user.password && !this.user.id) {
        this.$message.error("密码不为空");
        return;
      }
      if (!this.user.city.length) {
        this.$message.error("城市不为空");
        return;
      }
      let sqlData = {
        city: this.user.city[this.user.city.length - 1],
        name: this.user.name,
        phone: this.user.phone,
        email: this.user.email,
        type: this.user.type,
        remark: this.user.remark
      };
      if (this.user.id) {
        sqlData.id = this.user.id;
      }
      if (this.user.password) {
        sqlData.password = this.user.password;
      }
      this.updateAdmin(sqlData).then(res => {
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
    btnDelete(item) {
      if (item.length == 0) {
        this.$message.error("请选择要删除的项")
        return;
      }
      this.getAdminDelete({ id: item }).then(res => {
        if (res.code == 2000) {
          this.selectList = this.selectList.filter(v => { return !item.includes(v) });
          this.$message.success(res.message);
          this.initData();
        } else {
          this.$message.error(res.message);
        }
      })
    },
    initData() {
      this.spinner.show();
      this.getAdminList(this.serch).then(res => {
        this.spinner.close();
        if (res.code == 2000) {
          this.list = res.data;
          this.serch.total = res.total;
          this.selectList = [];
          this.list.forEach(v => {
            let city = [];
            for (let i = 0; i < (v.city.length / 3); i++) {
              city.push(v.city.substr(0, (i + 1) * 3));
            }
            v.city = city;
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    changPage(page) {
      this.serch.page = page;
      this.initData();
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 2000) {
        this.$set(this.user,"header",res.data.url);
        this.$set(this.uploadData,"header",res.data.url);
      }
    }
  },
  created() {
    this.initData();
    this.uploadData = this.session('userinfo');
    this.uploadData.uploadDir = "header";
  }
};
</script>

<style lang='less' scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  &:hover {
    border: 1px dashed #1976d2;
    span {
      color: #1976d2;
    }
  }
}
</style>

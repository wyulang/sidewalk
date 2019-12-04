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

    <div class="w-all bc-fff ra-4 pl10 pr10 sha-7 mt10">
      <div class="pt10 flex pb10">
        <el-button @click="btnAdd" icon="icon icontianjia" size="small">新增</el-button>
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
              <td>上次登录IP</td>
              <td>创建时间</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr class="bt-e" v-for="(item, index) in new Array(100)" :key="index">
              <td>
                <el-checkbox></el-checkbox>
              </td>
              <td>用户名</td>
              <td>电话</td>
              <td>邮箱</td>
              <td>管理类型</td>
              <td>登录次数</td>
              <td>上次登录时间</td>
              <td>上次登录IP</td>
              <td>创建时间</td>
              <td class="w-150">
                <div class="flex-line active ai-c hand mr10">
                  <span class="icon fs-14 mr2 iconbianji hand "></span>
                  <span>编辑</span>
                </div>
                <div class="flex-line active ai-c hand mr10">
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
      <!-- <div class="w-all flex">
        <div class="flex ai-c">
          <span class="w-90">用户名：</span>
          <el-input size="small" v-model="user.name" placeholder="输入用户名"></el-input>
        </div>
        <div class="flex ai-c ml10">
          <span class="w-90">手机号：</span>
          <el-input size="small" v-model="user.phone" placeholder="输入手机号"></el-input>
        </div>
      </div> -->
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
            <el-input size="small" v-model="user.email" placeholder="输入密码"></el-input>
          </td>
          <td class="w-90 nowrap right">类型：</td>
          <td>
            <radio :data="[{label:'普通管理员',value:1},{label:'超级管理员',value:2}]" v-model="user.type"></radio>
          </td>
        </tr>
        <tr>
          <td>个人说明：</td>
          <td colspan="3">
            <el-input type="textarea" class="w-all" size="small" v-model="user.email" placeholder="输入密码"></el-input>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import radio from "@component/radio.vue";
export default {
  components: {
    radio
  },
  data() {
    return {
      isModel: false,
      user: {
        name: "",
        phone: "",
        email: "",
        sex: 1,
        type: 1,
        remark:""
      },
      serch: {
        name: ""
      }
    };
  },
  methods: {
    btnAdd() {
      this.isModel = true;
    }
  }
};
</script>

<style lang='less' scoped>
</style>

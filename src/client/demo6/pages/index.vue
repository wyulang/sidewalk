<template>
  <div class="passwords">
    <!-- <el-steps :active="stepActive" align-center>
      <el-step title="验证身份" description="验证身份"></el-step>
      <el-step title="重置密码" description="重置密码"></el-step>
      <el-step title="重置密码成功" description="重置密码成功"></el-step>
    </el-steps> -->
    <el-steps :active="1">
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      <el-step title="步骤 3" icon="el-icon-picture"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepActive: 1,
    }
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
.passwords {
  width: 100%;
}
</style>

<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="./logo.png" alt="">
          </div>
        </el-col>
        <el-col :offset="16" :span="4"><div class="grid-content bg-purple">
          <a
            href="#"
            @click.prevent="logout">退出</a>
        </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <el-aside class="aside" width="250px">Aside</el-aside> <!--侧边栏-->
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: { // 用户退出
    logout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确认执行 resolve 函数
        // 1. 删除本地存储中的 Token 身份标识
        window.localStorage.removeItem('admin-token')
        // 2. 跳转到登陆视图
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        // 点击取消的处理
      })
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #B3C0D1;
  line-height: 60px;
}
.aside {
  background-color: #D3DCE6;
}
.main {
  background-color: #E9EEF3;
  height: 100%;
}
</style>

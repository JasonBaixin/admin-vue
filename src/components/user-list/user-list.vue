<template>
<div class="user-list-wrap">
  <el-row>
    <el-col :span="24">
      <el-breadcrumb class="user-list-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-row class="user-list-search">
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"></el-button>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="success" plain>添加用户</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      label="用户状态"
      width="100">
      <template slot-scope="scope">
        <!-- 我们在这里可以通过 scope.row 拿到当前遍历行对象 -->
        <el-switch
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--
    你要做的就是告诉这个分页组件：
    每页多大
        :page-sizes="[1, 2, 3, 4]" 每页大小
        一共有多少条记录 :total="10"
    分页组件的页码发生改变的时候会自动调用 handleCurrentChange
    所以我们要做的就是在页码发生改变的时候 handleCurrentChange 方法中加载对应页码的数据
    当用户选择切换页码改变的时候，就会触发 handleSizeChange 方法执行
    我们要做的就是在 handleSizeChange 方法中发请求拿到对应的页码数据
        loadUsersByPage(1, 每页大小)
    current-page 用来配置指定页码高亮
   -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="[5, 8]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalSize">
  </el-pagination>
</div>
</template>

<script>
export default {
  async created () {
    // 第一次进来请求分页数据：第1页，每页2条
    this.loadUsersByPage(1)
  },
  data () {
    return {
      searchText: '',
      tableData: [], // 表格列表数据
      totalSize: 0, // 总记录数据
      currentPage: 1, // 当前页码
      pageSize: 5 // 当前每页大小
    }
  },
  methods: {
    async handleSizeChange (pageSize) {
      this.pageSize = pageSize

      this.loadUsersByPage(1, pageSize)
      // 页码改变之后，不仅让数据到了第1页
      // 同时也要让页码高亮状态也跑到第1页
      // 我们这里就可以使用 this.currentPage 来控制
      this.currentPage = 1
    },
    async handleCurrentChange (currentPage) {
      this.loadUsersByPage(currentPage)
    },
    handleSearch () {
      this.loadUsersByPage(1)
    },
    async loadUsersByPage (page) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: this.pageSize,
          query: this.searchText // 根据搜索文本框的内容来搜索
        }
      })
      const {users, total} = res.data.data
      this.tableData = users
      // 把真实的总记录交给分页插件
      // 分页插件会根据总记录数和每页大小自动完成分页效果
      this.totalSize = total
    }
  }
}
</script>

<style>
.user-list-breadcrumb {
  line-height: 3;
}
.user-list-search {
  margin-bottom: 10px;
}
</style>

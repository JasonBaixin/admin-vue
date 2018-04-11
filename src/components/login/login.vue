<template>
  <div>
    <p>登录组件</p>
    <form @submit.prevent="login">
        <div>
            <label for="username">用户名</label>
            <input
              type="text"
              id="username"
              v-model="userForm.username">
        </div>
        <div>
            <label for="password">密码</label>
            <input
              type="password"
              id="password"
              v-model="userForm.password">
        </div>
        <div>
            <button>点击登录</button>
        </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const res = await axios.post('http://localhost:8888/api/private/v1/login', this.userForm)
      const data = res.data
      if (data.meta.status === 200) {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>

<style>
</style>

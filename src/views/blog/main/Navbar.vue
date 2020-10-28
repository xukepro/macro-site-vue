<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/pic/logo.png" alt="logo" style="height:80px">
    </div>
    <span>MacroSite</span>
    <div class="navbar-header">
      <!-- <span><a href="/" title="Home">Home</a></span>
      <span><a href="/" title="Home">Article</a></span> -->
      <span><a href="/chat" title="Chat">Chat</a></span>
      <div class="avatar">
        <el-dropdown placement="bottom" fit="fill">
          <el-avatar class="avatar-img" :size="50" :src="user.avatarUrl" @error="errorAvatarHandler" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    // Hamburger
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    this.print1()
  },
  methods: {
    print1() {
      setTimeout(() => {
        console.log(this.user)
      }, 3000)
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    errorAvatarHandler() {
      this.user.avatarUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100px;
  overflow: hidden;
  // background-image: linear-gradient(to bottom right, rgba(162, 188, 177, 0.76) , rgba(55, 186, 233, 0.788));
  background-color: transparent;
  line-height: 100px;
  padding: 0 50px;
  .logo {
    height: 100%;
    float: left;
    img {
      vertical-align: middle;
    }
  }

  span {
    color: rgb(184, 157, 38);
    font-size: 40px;
  }

  .navbar-header {
    float: right;

    span {
      color: white;
      font-size: 20px;
      margin: 0 10px;
      transition: 0.25s;

      &:hover {
        color: rgb(255, 196, 0);
      }
    }

    .avatar {
      display: inline;

      .avatar-img {
        vertical-align: middle;
      }
    }

    img {
      cursor: pointer;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>

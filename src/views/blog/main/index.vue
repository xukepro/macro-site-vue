<template>
  <!-- <div class="app-container"> -->
  <div class="main">
    <div class="cover">
      <div class="header">
        <navbar />
      </div>
      <div class="container">
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="search">
              <Search />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="content">
              <router-view :key="key" />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="category">
              <Category />
            </div>
          </el-col>
        </el-row>

      </div>
      <div class="footer">
        <span>this is footer</span>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Category from './Category'
import Search from './Search'

export default {
  name: 'Main',
  components: {
    Navbar,
    Category,
    Search
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {},
    start() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.main {

  /* width: 100%;
  height: 100%; */
  background-image: url("https://w.wallhaven.cc/full/96/wallhaven-96jx2w.png");
  background-position: center 0;
  background-repeat: no-repeat;
  background-attachment:fixed;
  background-size: cover;
}

.cover {
  min-height: 100%;
  /* background-color: rgba(253, 253, 253, 0.1); */
}

.container {
  padding: 5px;
}

</style>

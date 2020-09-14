<template>
  <!-- <div class="app-container"> -->
  <div>
    <div>
      <navbar />
    </div>
    <div class="content">
      <router-view :key="key" />
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'

export default {
  name: 'Main',
  components: {
    Navbar
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
    fetchData() {
    },
    start() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.content {
  margin: 10px 300px;
}
</style>

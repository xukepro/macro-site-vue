<template>
  <div class="app-container">
    <ul>
      <li
        is="articleItem"
        v-for="article in list"
        :key="article.id"
        :article="article"
      />
    </ul>
  </div>
</template>

<script>
import { getArticles } from '@/api/admin'
import ArticleItem from './articleItem'

export default {
  components: {
    ArticleItem
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
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getArticles().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    start() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="articleList">
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
import { getArticleList } from '@/api/article'
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
      getArticleList().then(response => {
        this.list = response.data.list
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
/* .app-container {
  margin: 0 auto;
  padding: 0;
} */

ul {
  padding-left: 0;
}
</style>

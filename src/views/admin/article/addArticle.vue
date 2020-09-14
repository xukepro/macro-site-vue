<template>
  <div class="app-container">
    <div id="editor">
      <!-- <mavon-editor
        ref="md"
        v-model="article.mdContent"
        style="height: 100%;width: 100%;"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
      /> -->
    </div>
  </div>
</template>

<script>
import { getArticles } from '@/api/admin'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  components: {
    mavonEditor
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
        // console.log(this.list)
        this.listLoading = false
      })
    },
    openArticle(row, column, event) {
      // console.log(row)
    }
  }
}
</script>

<style>
.el-table__body-wrapper {
    cursor: pointer;
}
</style>

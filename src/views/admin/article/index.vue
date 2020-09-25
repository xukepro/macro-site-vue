<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-dblclick="editArticle"
    >
      <el-table-column label="ID" prop="id" align="center" width="50" />
      <el-table-column label="Author" prop="author" align="center" width="100" />
      <el-table-column label="Title" prop="title" align="center" />
      <el-table-column label="Description" prop="description" align="center" />
      <!-- <el-table-column label="Picture" prop="picture" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.picture" alt="picture" style="height:5rem">
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Author" prop="content" /> -->
      <el-table-column label="PageViews" prop="pageViews" align="center" width="80" />
      <el-table-column label="Like" prop="like" align="center" width="80" />
      <el-table-column label="Collect" prop="collect" align="center" width="80" />
      <el-table-column label="Comment" prop="comment" align="center" width="100" />
      <el-table-column label="CreatedAt" prop="createdAt" align="center" width="100" />
      <el-table-column label="UpdatedAt" prop="updatedAt" align="center" width="100" />

      <!-- <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import { mavonEditor } from 'mavon-editor'

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
      getArticleList().then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    editArticle(row, column, event) {
      this.$router.push('/admin/article/edit/' + row.id)
    }
  }
}
</script>

<style>
.el-table__body-wrapper {
    cursor: pointer;
}
</style>

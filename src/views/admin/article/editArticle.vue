<template>
  <div class="app-container">
    <el-header class="header">
      <el-select v-model="article.cid" placeholder="请选择文章栏目" style="width: 150px;">
        <el-option
          v-for="item in categories"
          :key="item.id"
          :label="item.cateName"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="article.title" placeholder="请输入标题..." style="width: 400px;margin-left: 10px" />
      <el-tag
        v-for="tag in article.dynamicTags"
        :key="tag"
        closable
        :disable-transitions="false"
        style="margin-left: 10px"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        v-if="tagInputVisible"
        ref="saveTagInput"
        v-model="tagValue"
        class="input-new-tag"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag" type="primary" size="small" @click="showInput">+Tag</el-button>
    </el-header>
    <el-main class="main">
      <div class="editor">
        <mavon-editor
          ref="md"
          v-model="article.content"
          style="height: 100%;width: 100%;"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
        />
      </div>
      <div style="display: flex;align-items: center;margin-top: 15px;justify-content: flex-end">
        <el-button v-if="from!=undefined" @click="cancelEdit">放弃修改</el-button>
        <template v-if="from==undefined || from=='draft'">
          <el-button @click="saveBlog(0)">保存到草稿箱</el-button>
          <el-button type="primary" @click="saveBlog(1)">发表文章</el-button>
        </template>
        <template v-else="from==post">
          <el-button type="primary" @click="saveBlog(1)">保存修改</el-button>
        </template>
      </div>
    </el-main>
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
      categories: [],
      tagInputVisible: false,
      tagValue: '',
      loading: false,
      from: '',
      article: {
        content: '',
        dynamicTags: []
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getArticles().then(response => {
        this.article = response.data[0]
      })
    },
    cancelEdit() {
      this.$router.go(-1)
    },
    saveBlog(state) {},
    imgAdd() {},
    imgDel() {},
    getCategories() {
    //   const _this = this
    //   getRequest('/admin/category/all').then(resp => {
    //     _this.categories = resp.data
    //   })
    },
    handleClose(tag) {
      this.article.dynamicTags.splice(this.article.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.tagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const tagValue = this.tagValue
      if (tagValue) {
        console.log(this.article.dynamicTags)
        this.article.dynamicTags.push(tagValue)
      }
      this.tagInputVisible = false
      this.tagValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
// .el-table__body-wrapper {
//     cursor: pointer;
// }
.header {
    display: flex;
    align-items: center;;
}

.el-tag {
    margin-left: 10px;
}

.input-new-tag {
    width: 100px;
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;;
}

.editor {
    width: 100%;
    height: 500px;
}
</style>

<template>
  <div class="viewer">
    <div class="header">
      <el-tabs v-model="curTabsValue" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
          v-for="item in articleTabs"
          :key="item.title"
          :label="item.title"
          :name="item.title"
        />
      </el-tabs>
    </div>
    <div v-if="curArticle" class="article-container">
      <div class="back-home">
        <a href="/main"><i class="el-icon-s-home" /></a>
      </div>
      <div class="article-header">
        <div class="title">
          <span>{{ curArticle.title }}</span>
        </div>
        <div class="info">
          <div class="info-author">
            <span>{{ curArticle.author }}</span>
          </div>
          <div class="info-detail">
            <span>
              <i class="el-icon-view" />
              {{ curArticle.pageViews }}
            </span>
            <span>
              <i class="el-icon-star-off" />
              {{ curArticle.like }}
            </span>
            <span>
              <i class="el-icon-collection-tag" />
              {{ curArticle.collect }}
            </span>
            <span>
              <i class="el-icon-s-comment" />
              {{ curArticle.comment }}
            </span>
          </div>
        </div>
      </div>
      <div class="article-content markdown-body">
        <!-- <VueMarkdown
          v-highlight
          :source="curArticle.content"
          toc
        /> -->
        <mavon-editor
          v-model="curArticle.content"
        />
        <!-- <MarkdownItVue class="md-body" :content="curArticle.content" /> -->
      </div>
    </div>
    <div class="article-nav" :class="{ closeANav: !articleNavVisible }">
      <!-- <el-input v-model="input" placeholder="请输入内容" />
      <el-button type="primary" icon="el-icon-search" /> -->
      <el-input v-model="searchInput" placeholder="请输入内容" class="input-with-select">
        <!-- <el-select slot="prepend" v-model="selectCategory">
          <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.categoryName"
            :value="category.id"
          />
        </el-select> -->
        <el-button slot="append" class="el-btn" icon="el-icon-search" />
      </el-input>
      <div class="article-list">
        <div v-for="a in articleList" :key="a.id" class="article-item" @click="addTab(a)">
          <span>{{ a.title }}</span>
        </div>
      </div>
      <div class="btn">
        <i v-if="articleNavVisible" class="el-icon-arrow-left" @click="toggleArticleNavVisible" />
        <i v-if="!articleNavVisible" class="el-icon-arrow-right" @click="toggleArticleNavVisible" />
      </div>
    </div>
    <div class="catalogue-nav" :class="{ closeCNav: !categoryNavVisible }">
      <div class="title">
        <span>导航</span>
      </div>
      <div v-for="t1 in toc" :key="t1.title" class="anchor" :class="t1.class">
        <a :href="'#' + t1.title"> {{ t1.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleContent, getArticleList } from '@/api/article'
import { getCategories } from '@/api/category'
import VueMarkdown from 'vue-markdown'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

export default {
  name: 'Article',
  components: {
    VueMarkdown,
    MarkdownItVue
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['id'],
  data() {
    return {
      article: {},
      curTabsValue: '',
      articleTabs: [],
      searchInput: '',
      categories: [],
      articleList: [],
      selectCategory: '',
      articleNavVisible: true,
      categoryNavVisible: true,
      toc: []
    }
  },
  computed: {
    curArticle: function() {
      for (const at of this.articleTabs) {
        if (at.title === this.curTabsValue) {
          this.setTOC(at.content)
          return at
        }
      }
      return ''
    }
  },
  created() {
    this.getArticle(this.id)
    this.getCategories()
    this.getArticleList()
  },
  mounted() {
  },
  methods: {
    getArticle(id) {
      getArticleContent(id).then(response => {
        this.article = response.data
        this.setTOC(response.data.content)
        this.articleTabs.push(this.article)
        this.curTabsValue = this.article.title
      })
    },
    getCategories() {
      getCategories().then(res => {
        this.categories = res.data
      })
    },
    getArticleList() {
      getArticleList().then(res => {
        this.articleList = res.data.list
      })
    },
    setTOC(content) {
      const rows = content.split('\n')
      this.toc = []
      for (const row of rows) {
        if (row.indexOf('###') === 0) {
          this.toc.push({ title: row.substring(row.lastIndexOf('###') + 4).replace(/ /g, '-').toLowerCase(), class: 'l3' })
          continue
        }
        if (row.indexOf('##') === 0) {
          this.toc.push({ title: row.substring(row.lastIndexOf('##') + 3).replace(/ /g, '-').toLowerCase(), class: 'l2' })
          continue
        }
        if (row.indexOf('#') === 0) {
          this.toc.push({ title: row.substring(row.lastIndexOf('#') + 2).replace(/ /g, '-').toLowerCase(), class: 'l1' })
        }
      }
    },
    toggleArticleNavVisible() {
      this.articleNavVisible = !this.articleNavVisible
    },
    toggleCategoryNavVisible() {
      this.categoryNavVisible = !this.categoryNavVisible
    },
    async addTab(article) {
      for (const a of this.articleTabs) {
        if (a.id === article.id) {
          this.curTabsValue = a.title
          return
        }
      }
      const { data } = await getArticleContent(article.id)
      this.articleTabs.push(data)
      this.curTabsValue = article.title
    },
    removeTab(targetValue) {
      const tabs = this.articleTabs
      let activeValue = this.curTabsValue
      if (activeValue === targetValue) {
        tabs.forEach((tab, index) => {
          if (tab.title === targetValue) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeValue = nextTab.title
            }
          }
        })
      }

      this.curTabsValue = activeValue
      this.articleTabs = tabs.filter(tab => tab.title !== targetValue)
    }
  }
}
</script>

<style lang="scss" scoped>
$shadow: #818181;

.viewer {
  position: relative;
  padding: 10px;
  // background-image: linear-gradient(to bottom right, rgba(134, 202, 174, 0.76) , rgba(113, 190, 218, 0.788));

  // ::v-deep .el-tabs__content {
  //   transition: .2s;
  //   color: #0051ff;
  // }
}

.header {
  position: fixed;
  height: 20px;
  background-color: #ffffff8f;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-attachment: fixed;
    backdrop-filter: blur(20px);
    margin: -30px;
  }
}

.article-container {
  width: 60%;
  margin: 60px auto;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 0 10px $shadow;
  background-color: rgba(255, 255, 255, 0.521);
}

.back-home {
  a {
    font-size: 20px;
  }
}

.article-header {
  .title {
    text-align: center;
    margin: 10px;

    span {
      font-size: 40px;
      font-weight: 800;
    }
  }

  .info {
    text-align: center;
    line-height: 30px;
    color: gray;
    span {
      margin: 0 5px;
    }
  }
}

.article-content {
  line-height: 30px;
}

.article-nav {
  position: fixed;
  width: 15%;
  top: 100px;
  left: 10px;
  padding: 10px;
  transition: .2s;
  // box-shadow: 0 0 5px $shadow;

  .btn {
    position: absolute;
    top: calc(50% - 50px / 2);
    left: 100%;
    width: 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    background-color: rgb(152, 200, 231);

    &:hover {
      cursor: pointer;
      background-color: rgb(21, 140, 219);;
    }
  }

  .article-list {
    border-left: 1px solid #6d6d6d;
    margin-top: 20px;
    padding: 0px 15px;
    transition: .2s;
    max-height: 20%;
    overflow: auto;

    .article-item {
      margin: 10px auto;
      cursor: pointer;
      line-height: 20px;
      transition: .2s;

      &:hover {
        color: #0051ff;
        font-size: 17px;
      }
    }
  }
}

.closeANav {
  transform: translate(calc(-10px - 100%), 0);
}

.el-input {
  width: 100%;
}

.catalogue-nav {
  position: fixed;
  top: 100px;
  right: 50px;
  width: 15%;
  height: 500px;
  // box-shadow: 0 0 5px $shadow;
  padding: 10px;
  transition: .2s;

  .title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 20px;
  }

  .anchor {
    margin: 10px auto;

    &:hover {
      color: #dd9b21;
    }
  }

  .l1 {
    padding-left: 0;
    color: #133261;
  }

  .l2 {
    padding-left: 15px;
    color: #4679a8;
  }

  .l3 {
    margin-left: 30px;
    color: #82b3ca;
  }

  .btn {
    position: absolute;
    top: calc(50% - 50px / 2);
    right: 100%;
    width: 20px;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    background-color: rgb(152, 200, 231);

    &:hover {
      cursor: pointer;
      background-color: rgb(21, 140, 219);;
    }
  }
}

.closeCNav {
  transform: translate(calc(+10px + 100%), 0);
}

// ::v-deep .v-note-navigation-wrapper {
//   position: fixed;
//   background-color: #0051ff;
// }

</style>

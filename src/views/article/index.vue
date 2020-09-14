<template>
  <div class="markdown-body">
    <div>
      <VueMarkdown v-highlight :source="article.content" />
    </div>
    <div class="mark-nav" />
  </div>
</template>

<script>
import { getArticles } from '@/api/admin'
import VueMarkdown from 'vue-markdown'
// import mavonEditor from 'mavon-editor'

export default {
  name: 'Article',
  components: {
    VueMarkdown
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['id'],
  data() {
    return {
      article: {
        content: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    fetchData() {
      getArticles().then(response => {
        // console.log(response.data[0])
        this.article = response.data[2]
      })
    }
  }
}
</script>

<style scoped>
</style>

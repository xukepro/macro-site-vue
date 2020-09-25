<template>
  <div>
    <MarkdownItVue class="md-body" :content="content" />
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
  components: {
    MarkdownItVue
  },
  data() {
    return {
      content: '[TOC]\r\n\r\n# Mysql常用命令\r\n```java\r\npublic void test(){\r\n    private int age;\r\n    private String name;\r\n}\r\n```\r\n\r\n## 数据定义语句(DDL)\r\n\r\n### 数据库操作\r\n\r\n- 登录数据'
    }
  }
}
</script>

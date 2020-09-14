<template>
  <div>
    <mytuieditor ref="myQuillEditor" v-model="content" />
    <div v-html="content" />
  </div>
  <!-- tui-editor 富文本编辑器   -->

</template>

<script>
// tuieditor富文本编辑器
import mytuieditor from '@/components/tuieditor.vue' // 导入tuieditor富文本编辑器组件
export default {
  name: 'App',
  components: {
    mytuieditor // 注册tuieditor富文本编辑器组件
  },
  data() {
    return {
      content: '# tuieditor富文本编辑器初始值'
    }
  }
}
</script>

<style scoped>
</style>

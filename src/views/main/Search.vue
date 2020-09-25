<template>
  <div class="search">
    <div class="search-input">
      <el-select
        v-model="value"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择文章标签"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="input3" placeholder="请输入内容" class="input-with-select">
        <el-select
          slot="prepend"
          v-model="select"
          multiple
          filterable
          placeholder="请选择"
        >
          <el-option label="餐厅名" value="1" />
          <el-option label="订单号" value="2" />
          <el-option label="用户电话" value="3" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" />
      </el-input>
    </div>
    <div class="tags">
      <!-- <el-checkbox-group v-model="choosedTags" size="medium" border="true">
        <el-checkbox-button v-for="tag in tags" :key="tag" class="tag" :label="tag">
          {{ tag.tagName }}
        </el-checkbox-button>
      </el-checkbox-group> -->
      <el-badge v-for="tag in tags" :key="tag" :value="tag.totalArticle" class="tag">
        <el-tag
          class="tag"
          effect="dark"
        >
          {{ tag.tagName }}
        </el-tag>
      </el-badge>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'
import { getTags } from '@/api/tag'

export default {
  components: {
    // Breadcrumb,
    // Hamburger
  },
  data() {
    return {
      tags: [],
      choosedTags: [],
      options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      value: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getTags()
  },
  methods: {
    async getTags() {
      const { data } = await getTags()
      this.tags = data
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding: 20px;
}

.tags {
  padding: 20px 10px;
}

.tag {
  margin: 0 5px;
}
</style>

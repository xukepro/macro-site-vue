<template>
  <div class="category">
    <div class="category-list">
      <div
        v-for="category in categories"
        :key="category"
        size="mini"
        class="category-item"
        effect="dark"
      >
        <div class="category-title">
          <span>{{ category.categoryName }}</span>
        </div>
        <div class="category-info">
          <span>这里是分类的介绍</span>
        </div>
        <div class="category-article" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCategories } from '@/api/category'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    // Hamburger
  },
  data() {
    return {
      categories: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      const { data } = await getCategories()
      this.categories = data
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  padding: 20px;
}

.category-item {
  margin-bottom: 10px;
  // height: 200px;
  text-align: center;
  padding: 2px;
  box-shadow: 0 0 10px #a0a0a0;
  border-radius: 10px;
}

.category-title {
  height: 120px;
  line-height: 120px;
  background-image: url('../../../assets/pic/tri-green.png');
  background-position: center;
  background-size: 100%;
  border-radius: 10px;
  // background-image: linear-gradient(to bottom right,rgba(106, 255, 181, 0.692),rgba(49, 160, 211, 0.699));
  span {
    font-size: 20px;
    font-weight: 600;
  }
}

.category-info {
  span {
    font-size: 14px;
    color: #3b3b3b;
  }
}

</style>

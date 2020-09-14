<template>
  <div class="app">
    <div class="item">
      <!-- <div class="pic">
      <img :src="article.picture" alt="">
    </div> -->
      <!-- <div class="info">
      <div class="info-title">{{ article.title }}</div>
      <div class="info-desc">{{ article.description }}</div>
    </div> -->

      <!-- <div class="info-title"> -->
      <a :href="'/article/'+article.id">
        {{ article.title }}
      </a>
      <!-- <button type="button">
        {{ article.title }}
      </button> -->
      <!-- </div> -->
      <div class="info-desc">
        {{ article.description }}
      </div>
      <div class="info-meta">
        <span>star: {{ article.star }}</span>
        <span>collect: {{ article.collect }}</span>
        <span>comment: {{ article.comment }}</span>
      </div>
    </div>
    <!-- <hr> -->
  </div>
</template>

<script>
// import Navbar from './Navbar'

export default {
  components: {
    // Navbar
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['article'],
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
    },
    start() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>

.app {
  // margin-bottom: 0;
}

.item {
    height: 100px;
    padding: 10px;
    margin: 10px auto 0;
    // background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px rgb(194, 194, 194);
    transition: 0.2s;

    &:hover {
      box-shadow: 0 0 50px rgb(194, 194, 194);
    }
}

.pic {
    // width: 100px;
    // display: inline;
}

// button {
//     height: 20px;
//     color: rgb(38, 111, 139);
//     margin: 10px 0;
//     font-family: "微软雅黑";
//     font-weight: 1000;
//     font-size: 20px;
//     line-height: 20px;
//     transition: 1s;
//     border: 0;
//     background-color: transparent;

//     &:hover {
//       color: rgb(14, 29, 226);
//     }
// }

a {
    height: 20px;
    color: rgb(38, 111, 139);
    margin: 10px 0;
    font-family: "微软雅黑";
    font-weight: 1000;
    font-size: 20px;
    line-height: 20px;
    transition: 1s;

    &:hover {
      color: rgb(0, 194, 253);
    }
}

.info-desc {
    height: 20px;
    color: rgb(78, 78, 78);
    margin: 10px 0;
    font-size: 12px;
    line-height: 20px;
}

.info-meta {
    height: 20px;
    color: #919191;
    font-size: 12px;
    margin: 10px 0;
    line-height: 20px;

    span {
      margin-right: 10px;
    }
}
</style>

<template>
  <!-- <div class="articleItem" :style="{backgroundImage: 'url(' + article.picture + ')'}"> -->
  <div class="articleItem">
    <div class="shan" />
    <div class="item">
      <!-- <div class="pic">
        <img :src="article.picture" alt>
      </div>-->

      <!-- <div class="info-title"> -->
      <a :href="'/article/'+article.id">{{ article.title }}</a>
      <!-- <button type="button">
        {{ article.title }}
      </button>-->
      <!-- </div> -->
      <div class="info-author">
        <span>{{ article.author }}</span>
      </div>
      <div class="info-desc">{{ article.description }}</div>
      <div class="info-tags">
        <el-tag
          v-for="tag in article.tags"
          :key="tag"
          size="mini"
          class="tag"
          effect="dark"
        >{{ tag }}</el-tag>
      </div>
      <div class="info-meta">
        <span>
          <i class="el-icon-view" />
          {{ article.pageViews }}
        </span>
        <span>
          <i class="el-icon-star-off" />
          {{ article.like }}
        </span>
        <span>
          <i class="el-icon-collection-tag" />
          {{ article.collect }}
        </span>
        <span>
          <i class="el-icon-s-comment" />
          {{ article.comment }}
        </span>
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
      img: 'https://w.wallhaven.cc/full/2e/wallhaven-2eroxm.jpg',
      color: [
        'linear-gradient(to bottom right,rgba(255,235,209, 0.9),rgba(251,195,187, 0.9))',
        'linear-gradient(to bottom right,rgba(255,134,122, 0.9),rgba(182,48,94, 0.9))',
        'linear-gradient(to bottom right,rgba(247,201,107, 0.9),rgba(252,170,127, 0.9))',
        'linear-gradient(to bottom right,rgba(168,193,237, 0.9),rgba(249,194,235, 0.9))',
        'linear-gradient(to bottom right,rgba(254,205,236, 0.9),rgba(255,155,160, 0.9))'
      ]
    }
  },
  computed: {
    randomColor: function() {
      const n = Math.floor(Math.random() * 3)
      console.log(n)
      return this.color[n]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {},
    start() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.articleItem {
  position: relative;
  // width: 500px;
  width: 100%;
  height: 300px;
  padding: 20px;
  margin: 10px auto;
  border-radius: 10px;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 0 10px rgb(100, 100, 100);
  transition: 0.2s;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 50px rgb(83, 83, 83);
  }

  &:after {
    position: absolute;
    left: -100%;
    /*改变left的值，让其相对box影藏*/
    top: 0;
    width: 30%;
    height: 100%;
    content: "";
    /* Safari 5.1 - 6.0 */
    background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .3) 50%, rgba(255, 255, 255, 0) 100%);
    /* Opera 11.1 - 12.0 */
    background: -o-linear-gradient(left, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .3) 50%, rgba(255, 255, 255, 0) 100%);
    /* Firefox 3.6 - 15 */
    background: -moz-linear-gradient(left, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .3) 50%, rgba(255, 255, 255, 0) 100%);
    /* 标准的语法 */
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .3) 50%, rgba(255, 255, 255, 0) 100%);
    transform: skewX(-45deg);
  }

  &:hover:after {
    left: 150%;
    transition: 1s ease;
  }
}

.item {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  // background-color: rgba(255, 255, 255, 0.3);

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-attachment: fixed;
    backdrop-filter: blur(15px);
    margin: -30px;
  }
}

a {
  color: rgb(255, 255, 255);
  margin: 10px 0;
  font-family: "微软雅黑";
  font-weight: 1000;
  font-size: 30px;
  line-height: 20px;
  transition: 0.2s;

  &:hover {
    color: rgb(62, 214, 214);
  }
}

.info-author {
  color: rgb(0, 0, 0);
  margin: 10px 0;
  font-size: 16px;
  line-height: 20px;
  font-family: "微软雅黑";
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    color: rgb(240, 72, 72);
  }
}

.info-desc {
  color: rgb(235, 235, 235);
  margin: 10px 0;
  font-size: 13px;
  line-height: 20px;
}

.info-tags {
  margin: 5px 0;
}

.info-meta {
  color: #e7e7e7;
  font-size: 14px;
  margin: 10px 0;
  line-height: 20px;

  span {
    margin-right: 10px;
  }
}

.tag {
  margin: 0 2px;
}
</style>

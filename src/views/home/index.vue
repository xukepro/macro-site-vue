<template>
  <div class="app-container">
    <!-- <img src="https://w.wallhaven.cc/full/wy/wallhaven-wyzxvr.jpg" alt="picture"> -->
    <!-- <img src="https://w.wallhaven.cc/full/wy/wallhaven-wyzxvr.jpg" alt="picture" style="height:50rem"> -->
    <div class="center-box">
      <div class="title">MacroSite</div>
      <br>
      <div>
        <button type="button" @click="start">start</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
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

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
    },
    start() {
      this.$router.push('/main')
    }
  }
}
</script>

<style scoped>
.app-container {
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    background-image: url("https://w.wallhaven.cc/full/wy/wallhaven-wyzxvr.jpg");
    background-position: center 0;
    background-repeat: no-repeat;
    background-attachment:fixed;
    background-size: cover;
}

.center-box {
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);
    z-index: 1;
    border-radius: 5px;
    /* background-color: rgba(255, 255, 255, 0); */
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    /* background-position: center top; */
    /* background-size: cover; */

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.center-box::after {
    content: '';
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

.title {
    color: white;
    font-size: 100px;
}

button {
  width: 100px;
  height: 30px;
  cursor: pointer;
  background: transparent;
  color: #4FA1D9;
  border: 1px solid #4FA1D9;
  border-radius: 10px;
  transition: all 0.2s;
  outline: none;
}

button:hover {
  color: white;
  background: #4FA1D9;
}
</style>

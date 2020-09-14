<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="avatar">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <!-- <img v-if="model.avatar" :src="model.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
        <!-- </el-upload> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getProfile } from '@/api/admin'
export default {
  data() {
    return {
      form: {
        username: '',
        avatar: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getProfile().then(response => {
        // console.log(response)
        this.form = response.data
      })
    },
    handleAvatarSuccess(res, file) {
      // console.log(file)
      this.form.avatar = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // console.log(file)
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
/* .line{
  text-align: center;
} */
.avatar-uploader .el-upload {
    border: 1px dashed #8b2d2d;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #060c13;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #000000;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


<template>
  <div class="app-container">
    <div class="profile">
      <div class="avatar row">
        <img v-if="info.avatar" :src="info.avatar" style="width:200px">
      </div>
      <div v-if="!isEditNickname" class="nickname row">
        <span>{{ info.nickname }}</span>
        <el-button type="text" icon="el-icon-edit" size="small" @click="editNickname" />
      </div>
      <div v-if="isEditNickname" class="nickname-edit row">
        <el-input v-model="info.nickname" />
        <div>
          <el-button type="text" icon="el-icon-check" @click="updateNickname" />
          <el-button type="text" icon="el-icon-close" @click="cancelEditNickname" />
        </div>
      </div>
      <div class="email row">
        <span>{{ info.email }}</span>
      </div>
      <div class="role row">
        <el-tag
          v-for="role in info.roles"
          :key="role"
          type="warning"
          class="tag"
        >
          {{ role }}
        </el-tag>
      </div>
      <div class="total row">
        <el-tag class="tag" type="success" effect="light">
          <i class="el-icon-document" />文章：{{ info.totalArticles }}
        </el-tag>
        <el-tag class="tag" type="" effect="light">
          <i class="el-icon-s-comment" />评论：{{ info.totalComment }}
        </el-tag>
        <el-tag class="tag" type="" effect="light">
          <i class="el-icon-star-off" />获赞：{{ info.totalLike }}
        </el-tag>
        <el-tag class="tag" type="" effect="light">
          <i class="el-icon-collection-tag" />收藏：{{ info.totalCollect }}
        </el-tag>
        <el-tag class="tag" type="" effect="light">
          <i class="el-icon-view" />浏览量：{{ info.totalPageViews }}
        </el-tag>
      </div>
    </div>

    <!-- <el-info ref="info" :model="info" label-width="120px">
      <el-info-item label="username">
        <el-input v-model="info.username" />
      </el-info-item>
      <el-info-item label="avatar">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="info.avatar" :src="info.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-info-item>
    </el-info> -->
  </div>
</template>

<script>
import { getInfo, updateUser } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      info: {
        'id': 0,
        'username': '',
        'nickname': '',
        'email': '',
        'avatar': '',
        'totalComment': 0,
        'totalArticles': 0,
        'totalLike': 0,
        'totalCollect': 0,
        'totalPageViews': 0,
        'roles': [],
        'lastLoginDate': '',
        'createdAt': '',
        'updatedAt': ''
      },
      isEditNickname: false,
      nicknameTemp: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      console.log(this.user.id)
      const { data } = await getInfo(this.user.id)
      console.log(data)
      this.info = data
    },
    handleAvatarSuccess(res, file) {
      // console.log(file)
      this.info.avatar = URL.createObjectURL(file.raw)
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
    },
    editNickname() {
      this.isEditNickname = true
      this.nicknameTemp = this.info.nickname
      console.log(this.nicknameTemp)
    },
    cancelEditNickname() {
      console.log('cancel')
      this.isEditNickname = false
      this.info.nickname = this.nicknameTemp
    },
    async updateNickname() {
      console.log('updateNickname')
      await updateUser({ id: this.info.id, nickname: this.info.nickname })
      this.isEditNickname = false
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* .line{
  text-align: center;
} */
/* .avatar-uploader .el-upload {
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
} */
.profile {
  text-align: center;

  .avatar {
    text-align: center;
    img {
      border-radius: 20px;
    }
  }

  .nickname {
    height: 50px;
    text-align: center;
    font-size: 30px;
    // font-family: STHeiti Light [STXihei];
    font-weight: 1000;
    line-height: 50px;
  }

  .nickname-edit {
    ::v-deep .el-input {
      width: 500px;
      border-radius: 100px;

      .el-input__inner {
        text-align: center;
        font-size: 30px;
        // font-family: STHeiti Light [STXihei];
        font-weight: 1000;
        border: 0;
      }
    }
  }

  .email {
    height: 30px;
    font-size: 20px;
    color: rgb(36, 36, 36);
    line-height: 30px;
  }

  .total {
    font-size: 18px;
    color: rgb(36, 36, 36);
  }
}

.tag {
  margin: 0 2px;
}

.row {
  margin: 20px;
}
</style>


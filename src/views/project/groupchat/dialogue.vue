<template>
  <div class="message">
    <div class="im-chat-msg-box" :class="isRight ? 'im-chat-msg-mine' : ''">
      <div class="im-chat-msg-user">
        <div class="im-chat-msg-user-avatar">
          <img :src="avatar">
        </div>
        <div v-if="isRight" class="im-chat-msg-user-remark">
          <!-- <span>{{ item.createdAt }}</span> -->
          <span>{{ remark }}</span>
        </div>
        <div v-else class="im-chat-msg-user-remark">
          <span>{{ remark }}</span>
          <!-- <span>{{ item.createdAt }}</span> -->
        </div>
      </div>
      <div class="im-chat-msg-text" v-html="item.msgContent" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialogue',
  props: {
    item: {
      type: Object,
      default: null
    },
    isRight: {
      type: Boolean,
      default: false
    },
    remark: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tags: []
    }
  }
}
</script>

<style lang="scss" scoped>
.im-chat-main {
  position: absolute;
  top: 80px;
  bottom: 140px;
  width: 100%;
  padding: 15px 15px 5px;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.9);
}
.im-chat-msg-box {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  padding-left: 60px;
  min-height: 68px;
  font-size: 0;
  overflow: hidden;
}
.im-chat-msg-emoji {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.im-chat-msg-mine {
  text-align: right;
  padding-left: 0;
  padding-right: 60px;
}
.im-chat-msg-user {
  display: inline-block;
  position: absolute;
  left: 3px;
  font-size: 14px;
  vertical-align: top;
  width: 100%;

  // img {
  //   width: 60px;
  //   // height: 60px;
  //   border-radius: 10px;
  // }
}

.im-chat-msg-user-avatar {
  height: 60px;
  // width: 60px;
  position: absolute;
  left: 0px;
  top: 0px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 60px;
    // height: 60px;
  }
}

.im-chat-msg-user-remark {
  position: absolute;
  left: 80px;
  top: -5px;
  line-height: 24px;
  font-size: 12px;
  color: rgb(102, 102, 102);
  text-align: left;
  span {
    display: inline-block;
    vertical-align: middle;
    max-width: 170px;
    // @include text-overflow();
  }
  i {
    display: inline-block;
    vertical-align: middle;
    padding-left: 15px;
    font-style: normal;
  }
}
.im-chat-msg-text {
  position: relative;
  display: inline-block;
  max-width: 60%;
  line-height: 22px;
  margin-top: 25px;
  margin-left: 20px;
  padding: 8px 15px;
  background-color: #ffffff;
  border-radius: 5px;
  color: rgb(0, 0, 0);
  word-break: break-all;
  font-size: 14px;
  img {
    max-width: 100%;
    vertical-align: middle;
  }
}
.im-chat-msg-text::after {
  content: "";
  position: absolute;
  left: -15px;
  top: 5px;
  width: 0;
  height: 0;
  border-style: solid dashed dashed;
  border-color: #ffffff transparent transparent;
  overflow: hidden;
  border-width: 10px;
  border-top: 6px solid transparent;
  border-left: 6px solid transparent;
  border-right: 10px solid #ffffff;
  border-bottom: 6px solid transparent;
}
.im-chat-msg-mine .im-chat-msg-text::after {
  left: auto;
  right: -15px;
  // border-top-color:#9EEA6A;
  border-left: 10px solid #9eea6a;
  border-right: 6px solid transparent;
}
.im-chat-msg-mine {
  .im-chat-msg-user {
    left: auto;
    right: 3px;
  }

  .im-chat-msg-user-avatar {
    position: absolute;
    left: auto;
    right: 0px;
  }

  .im-chat-msg-user-remark {
    left: auto;
    right: 80px;
    text-align: right;
    i {
      padding-left: 0;
      padding-right: 15px;
    }
  }
  .im-chat-msg-text {
    margin-left: 0;
    text-align: left;
    margin-right: 20px;
    background-color: #9eea6a;
    /*background-color: rgba(255, 255, 255, 0.9);*/
    color: rgb(0, 0, 0);
  }
}
</style>

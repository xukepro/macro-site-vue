<template>
  <main id="chatMsgList" class="im-chat-main">
    <!-- <a class="im-list-more" @click="getChatMsgList">{{
      chatMsgListHandleMoreText
    }}</a>
    <template v-for="(item, index) in chatMsgList">
      <div
        :key="index"
        class="im-chat-msg-box"
        :class="item.isMine ? 'im-chat-msg-mine' : ''"
      >
        <div class="im-chat-msg-user">
          <img :src="item.user.avatar | getDefaultAvatar">
          <div v-if="item.isMine" class="im-chat-msg-user-remark">
            <i>{{ item.createTime }}</i><span>{{ item.user.name }}</span>
          </div>
          <div v-else class="im-chat-msg-user-remark">
            <span>{{ item.user.name }}</span><i>{{ item.createTime }}</i>
          </div>
        </div>
        <div class="im-chat-msg-text" v-html="item.msgContent" />
      </div>
    </template> -->
  </main>
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
      chatMsgList: [
        {

        }
      ]
    }
  }
}
</script>

<style lang="scss">
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
  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
}
.im-chat-msg-user-remark {
  position: absolute;
  left: 60px;
  top: -2px;
  line-height: 24px;
  font-size: 12px;
  color: #999;
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
  line-height: 22px;
  margin-top: 25px;
  padding: 8px 15px;
  background-color: #e2e2e2;
  border-radius: 3px;
  color: #333;
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
  left: -10px;
  top: 13px;
  width: 0;
  height: 0;
  border-style: solid dashed dashed;
  border-color: #e2e2e2 transparent transparent;
  overflow: hidden;
  border-width: 10px;
}
.im-chat-msg-mine .im-chat-msg-text::after {
  left: auto;
  right: -10px;
  border-top-color: #5fb878;
}
.im-chat-msg-mine {
  .im-chat-msg-user {
    left: auto;
    right: 3px;
  }
  .im-chat-msg-user-remark {
    left: auto;
    right: 60px;
    text-align: right;
    i {
      padding-left: 0;
      padding-right: 15px;
    }
  }
  .im-chat-msg-text {
    margin-left: 0;
    text-align: left;
    background-color: #5fb878;
    /*background-color: rgba(255, 255, 255, 0.9);*/
    color: #fff;
  }
}
</style>

<template>
  <div class="chat-fnc">
    <div class="nav">
      <div class="search">
        <input type="text" placeholder="搜索">
        <div class="add" @click="handleClickAddBtn"><i class="el-icon-plus" /></div>
      </div>
      <div class="nav-list">
        <div
          v-for="navItem in chatArr"
          :key="getKeyByType(navItem)"
          class="nav-item"
          :class="{choosed: navItem === choosedChatItem}"
          @click="choose(navItem)"
        >
          <div v-if="navItem.type === ChatMsgType.FRIEND || navItem.type === ChatMsgType.GROUP">
            <div class="avatar">
              <el-badge :value="navItem.unReadMsgCount" class="badge" :hidden="navItem.unReadMsgCount === 0 ">
                <img :src="navItem.avatar" alt="avatar">
              </el-badge>
            </div>
            <div class="info">
              <div class="row">
                <span class="remark">{{ getNameByType(navItem) }}</span>
                <span class="date">{{ timeUntilNow(navItem) }}</span>
              </div>
              <div class="message">{{ navItem.recentMessage.length > 0 ? navItem.recentMessage[0].content : '' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--------------------------------------- 聊天窗口 ------------------------------------->
    <div class="window">
      <div v-if="showChatWindow" class="header">
        <div class="title">{{ getNameByType(choosedChatItem) }}</div>
        <div class="operation">
          <el-dropdown
            placement="bottom"
            size="small"
            @command="handleOperation"
          >
            <i class="el-icon-more" />
            <span class="el-dropdown-link" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="deleteFriend">删除好友</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>
      <div v-if="showChatWindow" id="window" class="chat-message">
        <div class="more-message">查看更多消息</div>
        <div v-for="message in reverseChatMsgList" id="content" :key="message.id" class="message-item">
          <Dialogue
            :item="message"
            :is-right="message.sid === user.id"
            :avatar="message.sid === user.id ? user.avatarUrl : leftAvatar(message)"
            :remark="message.sid === user.id ? user.nickname : leftName(message)"
          />
        </div>
      </div>
      <div v-if="showChatWindow" class="send-message">
        <div class="tools">
          <div class="left-tools">
            <i class="iconfont icon-xiaolian" />
            <i class="iconfont icon-wenjianchuansong" />
          </div>
          <div class="right-tools">
            <i class="iconfont icon-yuyin-" />
            <i class="iconfont icon-shipin-" />
          </div>
        </div>
        <div class="content">
          <textarea
            id="textarea"
            v-model="content"
            class="mytextarea"
            name="textarea"
            @keypress.enter="sendMsg"
          />
        </div>
        <div class="btn">
          <button @click="sendMsg">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChatMsgType, ChatContentType } from '@/utils/constant'

import {
  getFriends as getFriendsApi,
  getGroups as getGroupsApi,
  markFriendReadMsg as markFriendReadMsgApi,
  markGroupReadMsg as markGroupReadMsgApi,
  getAllGroups as getAllGroupsApi,
  addFriend as addFriendApi,
  delFriend as delFriendApi,
  getFriendAsk as getFriendAskApi,
  getGroupAsk as getGroupAskApi,
  getGroupInvite as getGroupInviteApi
} from '@/api/chat'

import { getChatServer as getChatServerApi, sendChatMsg as sendChatMsgApi } from '@/api/route'
import { getAllUser as getAllUserApi } from '@/api/user'
import { getUser as getUserFromCookie } from '@/utils/auth'

import Dialogue from './dialogue'

const FRIEND_PREFIX = 'friend:'
const GROUP_PREFIX = 'group:'
const FRIEND_ASK_PREFIX = 'friendAsk:'
const FRIEND_ACCEPT_PREFIX = 'friendAccept:'
// const FRIEND_REFUSE_PREFIX = 'friendRefuse:'
const GROUP_ASK_PREFIX = 'groupAsk:'
const GROUP_ACCEPT_PREFIX = 'groupAccept:'

export default {
  name: 'Chat',
  components: {
    Dialogue
  },
  props: {
    user: {
      type: Object,
      default: null
    },
    chatArr: {
      type: Array,
      default: null
    },
    chatMap: {
      type: Object,
      default: null
    },
    choosedChatItem: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      content: '',
      ChatMsgType: ChatMsgType,
      ChatContentType: ChatContentType
    }
  },
  computed: {
    reverseChatMsgList() {
      if (!this.choosedChatItem || !this.choosedChatItem.recentMessage) {
        return []
      }
      return [...this.choosedChatItem.recentMessage].reverse()
    },
    showChatWindow() {
      return this.choosedChatItem && (this.choosedChatItem.type === ChatMsgType.FRIEND || this.choosedChatItem.type === ChatMsgType.GROUP)
    }
  },
  created() {
  },
  methods: {
    /**
     * 点击发送触发，发送聊天数据
     */
    async sendMsg() {
      const event = event || window.event
      event.preventDefault()
      if (event.keyCode === 13) {
        event.returnValue = false
      }
      if (!this.content) {
        this.$message.warning('输入为空')
        this.content = ''
        return
      }
      const chatMsgVO = {
        type: this.choosedChatItem.type,
        uid: this.user.id,
        chatContent: {
          // rid: this.getIdByType(this.choosedChatItem),
          type: ChatContentType.TEXT,
          content: this.content
        },
        sendTime: new Date()
      }
      switch (this.choosedChatItem.type) {
        case ChatMsgType.FRIEND:
          chatMsgVO.chatContent['rid'] = this.choosedChatItem.fid
          break
        case ChatMsgType.GROUP:
          chatMsgVO.chatContent['gid'] = this.choosedChatItem.gid
          break
        default:
      }
      console.log(chatMsgVO)
      const { data } = await sendChatMsgApi(chatMsgVO)
      if (data) {
        console.log('聊天信息发送成功', chatMsgVO)
      }

      /* 添加聊天信息到聊天窗口 */
      const msgItem = {
        'sid': this.user.id,
        'type': ChatContentType.TEXT,
        'content': this.content,
        'createdAt': new Date()
      }
      if (this.choosedChatItem.type === ChatMsgType.FRIEND) {
        msgItem['fid'] = this.choosedChatItem.fid
      } else if (this.choosedChatItem.type === ChatMsgType.GROUP) {
        msgItem['gid'] = this.choosedChatItem.gid
      }
      console.log(msgItem)
      this.choosedChatItem.recentMessage.unshift(msgItem)
      this.$emit('scrollToBottom')
      this.content = ''
    },
    handleClickAddBtn() {
      this.$emit('handleClickAddBtn')
    },
    // 侧边栏选中触发
    choose(navItem) {
      this.$emit('choose', navItem)
      this.$emit('scrollToBottom')
      this.markReadMsg(navItem)
    },

    leftAvatar(message) {
      return this.choosedChatItem.type === ChatMsgType.FRIEND ? this.choosedChatItem.avatar : this.choosedChatItem.userMap[message.sid].avatar
    },
    leftName(message) {
      return this.choosedChatItem.type === ChatMsgType.FRIEND ? this.getNameByType(this.choosedChatItem) : (this.choosedChatItem.userMap[message.sid].nickname || this.choosedChatItem.userMap[message.uid].remark)
    },
    timeUntilNow(item) {
      const timestamp = item.updatedAt
      const date = new Date(timestamp)
      const curTimestamp = new Date().getTime()
      const timeInterval = (curTimestamp - timestamp) / 1000
      if (timeInterval < 60) return 'now'
      else if (timeInterval > 60 && timeInterval < 3600 * 24) return date.getHours() + ':' + date.getMinutes()
      else if (timeInterval > 3600 * 24 && timeInterval < 3600 * 48) return '昨天'
      else return date.getMonth() + '月' + date.getDate() + '日'
    },
    async initAvailableUserAndGroups() {
      const userListResult = await getAllUserApi()
      const userList = userListResult.data.list
      this.availableUsers = []
      for (const user of userList) {
        /* 排除已有好友和自己 */
        if (user.id !== this.user.id && !this.chatMap[FRIEND_PREFIX + user.id]) {
          this.availableUsers.push(user)
        }
      }
      const groupListResult = await getAllGroupsApi()
      const groupList = groupListResult.data.list
      this.availableGroups = []
      for (const group of groupList) {
        /* 排除已有群 */
        if (!this.chatMap[GROUP_PREFIX + group.gid]) {
          this.availableGroups.push(group)
        }
      }
    },
    /*, 适配函数 */
    getIdByType(item) {
      switch (item.type) {
        case ChatMsgType.FRIEND:
          return item.fid
        case ChatMsgType.GROUP:
          return item.gid
        default:
          return null
      }
    },
    getKeyByType(item) {
      switch (item.type) {
        case ChatMsgType.FRIEND:
          return FRIEND_PREFIX + item.fid
        case ChatMsgType.GROUP:
          return GROUP_PREFIX + item.gid
        default:
          return null
      }
    },
    getNameByType(item) {
      switch (item.type) {
        case ChatMsgType.FRIEND:
          return item.nickname || item.remark
        case ChatMsgType.GROUP:
          return item.name + '(' + item.userList.length + ')'
        default:
          return null
      }
    },
    async markReadMsg(item) {
      console.log('markReadMsg')
      console.log(this.choosedChatItem)
      if (item.unReadMsgCount > 0) {
        if (item.type === ChatMsgType.FRIEND) {
          await markFriendReadMsgApi({ uid: this.user.id, fid: item.fid })
        } else if (item.type === ChatMsgType.GROUP) {
          await markGroupReadMsgApi({ gid: item.gid, uid: this.user.id })
        }
        item.unReadMsgCount = 0
        console.log('markReadMsg over')
      }
    },
    async handleOperation(command) {
      if (command === 'deleteFriend') {
        const { data } = await delFriendApi(this.user.id, this.choosedChatItem.fid)
        if (data) {
          this.$message.success('删除成功')
          console.log('删除好友成功')
          this.$emit('initNav')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import './chat.scss';
</style>

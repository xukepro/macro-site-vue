<template>
  <div class="chat-fnc">
    <div class="nav">
      <div class="search">
        <input type="text" placeholder="搜索">
        <div class="add" @click="handleClickAddBtn"><i class="el-icon-plus" /></div>
      </div>
      <div class="nav-list">
        <div
          v-for="item in contactArr"
          :key="item.fid"
          class="nav-item"
          :class="{choosed: item === chooseContactItem}"
          @click="choose(item)"
        >
          <div v-if="item.type === ChatMsgType.FRIEND_ASK">
            <div class="avatar">
              <img :src="item.avatar" alt="avatar">
            </div>
            <div class="info">
              <div class="row">
                <span class="remark">{{ item.nickname }}请求加您好友</span>
              </div>
              <div class="message">
                <button class="agree-btn" @click="agree(item)">同意</button>&nbsp;
                <button class="refuse-btn" @click="refuse(item)">拒绝</button>
              </div>
            </div>
          </div>

          <div v-else-if="item.type === ChatMsgType.GROUP_ASK">
            <div class="avatar">
              <img :src="item.avatar" alt="avatar">
            </div>
            <div class="info">
              <div class="row">
                <span class="remark">{{ item.nickname }}请求加入</span>
                <span class="group-name">{{ item.name }}</span>
              </div>
              <div class="message">
                <button class="agree-btn" @click="agree(item)">同意</button>&nbsp;
                <button class="refuse-btn" @click="refuse(item)">拒绝</button>
              </div>
            </div>
          </div>

          <div v-else-if="item.type === ChatMsgType.GROUP_INVITE">
            <div class="avatar">
              <img :src="item.avatar" alt="avatar">
            </div>
            <div class="info">
              <div class="row">
                <span class="remark">{{ item.nickname }}请求加您好友</span>
              </div>
              <div class="message">
                <button class="agree-btn" @click="agree(item)">同意</button>&nbsp;
                <button class="refuse-btn" @click="refuse(item)">拒绝</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="window">
      <h1>123</h1>
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

const FRIEND_PREFIX = 'friend:'
const GROUP_PREFIX = 'group:'
const FRIEND_ASK_PREFIX = 'friendAsk:'
const FRIEND_ACCEPT_PREFIX = 'friendAccept:'
// const FRIEND_REFUSE_PREFIX = 'friendRefuse:'
const GROUP_ASK_PREFIX = 'groupAsk:'
const GROUP_ACCEPT_PREFIX = 'groupAccept:'

export default {
  name: 'Contact',
  props: {
    user: {
      type: Object,
      default: null
    },
    contactArr: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      chooseContactItem: {},
      ChatMsgType: ChatMsgType,
      ChatContentType: ChatContentType
    }
  },
  methods: {
    async handleClickAddBtn() {
      this.$emit('handleClickAddBtn')
    },
    choose(item) {
      this.chooseContactItem = item
    },
    async agree(item) {
      const chatMsgVO = {
        type: item.type === ChatMsgType.FRIEND_ASK ? ChatMsgType.FRIEND_ACCEPT : ChatMsgType.GROUP_ACCEPT,
        uid: this.user.id,
        chatContent: {
          rid: item.fid, // 申请要加的用户id
          type: 0,
          content: ''
        },
        sendTime: new Date()
      }
      console.log(chatMsgVO)

      const { data } = await addFriendApi({ uid: item.fid, fid: this.user.id }) /* item.uid是加好友的发起者 */
      console.log('res', data)
      if (data) {
        console.log('添加好友成功')

        const { data } = await sendChatMsgApi(chatMsgVO)
        if (data) console.log('同意添加好友信息发送成功', chatMsgVO)
        this.$emit('initNav')
      }

      // const index = this.chatArr.indexOf(item)
      // this.chatArr.splice(index, 1)
    },
    async refuse(item) {
      const chatMsgVO = {
        type: item.type === ChatMsgType.FRIEND_ASK ? ChatMsgType.FRIEND_REFUSE : ChatMsgType.GROUP_REFUSE,
        uid: this.user.id,
        chatContent: {
          rid: item.fid, // 申请要加好友的用户id
          type: 0,
          content: ''
        },
        sendTime: new Date()
      }
      console.log(chatMsgVO)
      const { data } = await sendChatMsgApi(chatMsgVO)

      if (data) {
        console.log('拒绝添加好友信息发送成功', chatMsgVO)
        this.$emit('initNav')
      }
      // const { data } = await refuseFriendApi({ uid: item.uid, fid: this.user.id }) /* item.uid是加好友的发起者 */
      // if (data) {
      //   console.log('拒绝添加好友成功')
      //   const index = this.chatArr.indexOf(item)
      //   this.chatArr.splice(index, 1)
      //   delete this.chatMap[FRIEND_ASK_PREFIX + item.uid]
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import './contact.scss'
</style>


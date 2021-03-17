<template>
  <div class="background-container">
    <div class="chat-main-container">
      <!-------------------------------------- 功能导航栏 ------------------------------------>
      <div class="fnc-nav">
        <div class="logo">
          <div class="logo-wrapper">
            <img :src="user.avatarUrl" alt="logo">
          </div>
        </div>
        <div class="fncs">
          <div class="icon" @click="choosedFnc=FNC.CHAT">
            <el-badge is-dot :hidden="fncDotHidden.CHAT" class="item">
              <i class="iconfont icon-duihua" :class="{choosed: choosedFnc === FNC.CHAT}" />
            </el-badge>
          </div>
          <div class="icon" @click="choosedFnc=FNC.CONTACT">
            <el-badge is-dot :hidden="fncDotHidden.CONTACT" class="item">
              <i class="iconfont icon-tongxunlu" :class="{choosed: choosedFnc === FNC.CONTACT}" />
            </el-badge>
          </div>
          <div class="icon" @click="choosedFnc=FNC.SHOUCANG">
            <i class="iconfont icon-shoucang" :class="{choosed: choosedFnc === FNC.SHOUCANG}" />
          </div>
          <div class="icon" @click="choosedFnc=FNC.PENGYOUQUAN">
            <i class="iconfont icon-pengyouquan" :class="{choosed: choosedFnc === FNC.PENGYOUQUAN}" />
          </div>
          <div class="icon" @click="choosedFnc=FNC.GOUWU">
            <i class="iconfont icon-gouwu" :class="{choosed: choosedFnc === FNC.GOUWU}" />
          </div>
          <div class="icon" @click="choosedFnc=FNC.YOUXI">
            <i class="iconfont icon-youxi" :class="{choosed: choosedFnc === FNC.YOUXI}" />
          </div>
        </div>
      </div>
      <!--------------------------------------- 好友、群导航列表 ------------------------------------->
      <div :hidden="choosedFnc !== FNC.CHAT">
        <chat
          :user="user"
          :chat-arr="chatArr"
          :chat-map="chatMap"
          :choosed-chat-item="choosedChatItem"
          @initNav="initNav"
          @choose="choose"
          @handleClickAddBtn="handleClickAddBtn"
          @scrollToBottom="scrollToBottom"
        />
      </div>
      <div :hidden="choosedFnc !== FNC.CONTACT">
        <contact
          :user="user"
          :contact-arr="contactArr"
          @initNav="initNav"
          @handleClickAddBtn="handleClickAddBtn"
        />
      </div>
      <div :hidden="choosedFnc !== FNC.SHOUCANG">
        shoucang
      </div>
      <!-----------------------------------------添加好友/群 model框---------------------------->
      <modal title="添加好友/群" :visible.sync="addDialogVisible">
        <div slot="content">
          <div class="dialog-content">
            <input type="text" placeholder="搜索">
            <span>用户</span>
            <div v-if="availableUsers.length === 0" class="tips">无</div>
            <div v-for="u in availableUsers" :key="'friend:' + u.id" class="item">
              <div class="avatar">
                <img :src="u.avatar" alt="avatar">
              </div>
              <div class="info">
                <span>{{ u.nickname }}</span>
              </div>
              <div class="add-btn" @click="addFriend(u)">添加</div>
            </div>
            <span>群</span>
            <div v-if="availableGroups.length === 0" class="tips">无</div>
            <div v-for="g in availableGroups" :key="'group:' + g.gid" class="item">
              <div class="avatar">
                <img :src="g.avatar" alt="avatar">
              </div>
              <div class="info">
                <span>{{ g.name }}</span>
              </div>
              <div class="add-btn" @click="addGroup(g)">添加</div>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
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

import Chat from './chat'
import Contact from './contact'

import { ChatMsgType, ChatContentType } from '@/utils/constant'
import Dialogue from './dialogue'
import Modal from '@/components/modal'
import { mergeKLists } from '@/utils/merge'

import protoRoot from '@/proto/proto'
// import { parse } from 'path-to-regexp'
const ChatMsgReq = protoRoot.lookup('protocol.ChatMsgReq') // 用于发送数据
const ChatMsgRes = protoRoot.lookup('protocol.ChatMsgRes') // 用于接收数据
// const ChatContentRes = protoRoot.lookup('protocol.ChatContentRes')

const FRIEND_PREFIX = 'friend:'
const GROUP_PREFIX = 'group:'
const FRIEND_ASK_PREFIX = 'friendAsk:'
const FRIEND_ACCEPT_PREFIX = 'friendAccept:'
// const FRIEND_REFUSE_PREFIX = 'friendRefuse:'
const GROUP_ASK_PREFIX = 'groupAsk:'
const GROUP_ACCEPT_PREFIX = 'groupAccept:'

const FNC = {
  CHAT: 'CHAT',
  CONTACT: 'CONTACT',
  SHOUCANG: 'SHOUCANG',
  PENGYOUQUAN: 'PENGYOUQUAN',
  GOUWU: 'GOUWU',
  YOUXI: 'YOUXI'
}

export default {
  name: 'GroupChat',
  components: {
    Chat,
    Contact,
    Dialogue,
    Modal
  },
  data() {
    return {
      choosedFnc: '',
      fncDotHidden: {
        CHAT: true,
        CONTACT: true,
        shoucang: true,
        PENGYOUQUAN: true,
        GOUWU: true,
        YOUXI: true
      },

      user: {}, // 当前登录用户信息
      content: '', // 聊天内容
      chatArr: [],
      /*
      chatArr: [
        {
          "type": ChatMsgType.FRIEND,
          "id": 1,
          "uid": 1,
          "fid": 2,
          "remark": "佐伊",
          "nickname": "佐伊",
          "avatar": "https://pic4.zhimg.com/80/v2-ee53da271c2b52407dcbc41c09935039_720w.jpg?source=1940ef5c",
          "unReadMsgCount": 0,
          "createdAt": "2020-9-28 02:43:26",
          "updatedAt": 1603781870590,
          "badgeHidden": true
          "recentMessage": [
            {
              "id": "5f97c4ee37ef103840b73b85",
              "sid": 1,
              "rid": 2,
              "type": 0,
              "content": "牛皮",
              "read": true,
              "createdAt": 1603781870590
            }
          ]
        },
        {
          "type": ChatMsgType.GROUP,
          "id": 1,
          "uid": 1,
          "name": "测试群",
          "avatar": "https://pic1.zhimg.com/80/v2-85d9a3ccdbdee32f6f82dee80cb8a8ec_720w.jpg?source=1940ef5c",
          "remark": "这是一个测试群",
          "unReadMsgCount": 0,
          "createdAt": "2020-9-28 02:45:13",
          "updatedAt": 1603530548130,
          "userList": [
            {
              "id": 1,
              "gid": 1,
              "uid": 1,
              "nickname": "卡特琳娜",
              "remark": "卡特琳娜",
              "avatar": "https://pic3.zhimg.com/80/v2-704889a186bb088262ecd8afec566c80_720w.jpg?source=1940ef5c",
              "rank": 1,
              "createdAt": "2020-9-28 02:45:29",
              "updatedAt": "2020-9-28 02:45:29"
            }
          ],
          "userMap": {
            "1": {
              "id": 1,
              "gid": 1,
              "uid": 1,
              "nickname": "卡特琳娜",
              "remark": "卡特琳娜",
              "avatar": "https://pic3.zhimg.com/80/v2-704889a186bb088262ecd8afec566c80_720w.jpg?source=1940ef5c",
              "rank": 1,
              "createdAt": "2020-9-28 02:45:29",
              "updatedAt": "2020-9-28 02:45:29"
            }
          },
          "recentMessage": [
            {
              "id": "5f93ef340c7a87596071019e",
              "uid": 1,
              "gid": 1,
              "type": 1,
              "content": "unread",
              "userReadMap": {
                "2": false,
                "3": true
              },
              "createdAt": 1603530548130
            }
          ]
        },
        {
          "type": 11,
          "uid": 2,
          "fid": 7,
          "nickname": "亚索",
          "avatar": "https://img2.woyaogexing.com/2020/10/29/13c5206d2a934916968e6ad4f111f0d5!400x400.jpeg",
          "updatedAt": 1604043489008
        }
      ]
      */
      chatMap: {},
      /*
      chatMap: {
        "friends:1": friend1 obj,
        "groups:1": group1 obj
      },
      */
      choosedChatItem: null,
      contactArr: [],
      contactMap: {},

      /* websocket相关 */
      webSocket: null,
      webSocketUrl: 'ws://10.128.207.76:8081/ws',
      webSocketReconnectCount: 0, // 重连次数
      webSocketIsReconnect: true, // 是否重连
      webSocketWarningText: "连接断开,正在尝试重连 <i class='dotting'></i>",
      webSocketIsOpen: false,
      webSocketPingTimer: null, // 心跳定时器
      webSocketPingTime: 10000, // 心跳的间隔，当前为 10秒,

      availableUsers: [],
      availableGroups: [],
      addDialogVisible: false,

      ChatMsgType: ChatMsgType,
      FNC: FNC
    }
  },
  computed: {

  },
  watch: {
    choosedFnc() {
      console.log('watch')
      this.fncDotHidden[this.choosedFnc] = true
    }
  },
  created() {
    this.init()
    this.initAvailableUserAndGroups()
  },
  mounted() {
  },
  destroyed() {
    this.webSocketClose()
  },
  methods: {
    // 获得好友信息，显示页面
    async init() {
      const user = getUserFromCookie()
      if (!user) {
        this.$message.warning('请先登录')
        this.$router.push({ path: '/login' })
        return
      }
      this.user = JSON.parse(user)

      this.webSocketInit()
      this.initNav()

      this.choosedFnc = FNC.CHAT
    },
    async initNav() {
      this.chatMap = {}
      this.chatArr = []
      this.contactArr = []
      this.contactMap = {}

      /* --------------------处理chat数据--------------------- */
      const friendsResult = await getFriendsApi(this.user.id)
      const friends = friendsResult.data.list
      console.log('friends', friends)

      const groupsResult = await getGroupsApi(this.user.id)
      const groups = groupsResult.data.list
      console.log('groups', groups)

      /* 将数据填到this.info map中 */
      for (const friend of friends) this.chatMap[FRIEND_PREFIX + friend.fid] = friend
      for (const group of groups) this.chatMap[GROUP_PREFIX + group.gid] = group

      /* 将数据按照时间倒序加到this.chatArr数组中 */
      const chatList = [friends, groups]
      this.chatArr = mergeKLists(chatList)

      if (this.chatArr.length > 0) {
        this.choosedChatItem = this.chatArr[0]
        console.log('this.choosedChatItem', this.choosedChatItem)
        this.scrollToBottom()
      }

      console.log('chatArr', this.chatArr)
      console.log('chatMap', this.chatMap)

      /* --------------------处理contact数据--------------------- */
      const friendAsksResult = await getFriendAskApi(this.user.id)
      const friendAsks = friendAsksResult.data.list
      console.log('friendAsk', friendAsks)

      const groupAskResult = await getGroupAskApi(this.user.id)
      const groupAsks = groupAskResult.data.list
      console.log('groupAsks', groupAsks)

      const groupInviteResult = await getGroupInviteApi(this.user.id)
      const groupInvites = groupInviteResult.data.list
      console.log('groupInvites', groupInvites)

      for (const friendAsk of friendAsks) this.contactMap[FRIEND_ASK_PREFIX + friendAsk.fid] = friendAsk
      for (const groupAsk of groupAsks) this.contactMap[GROUP_ASK_PREFIX + groupAsk.gid + ':' + groupAsk.sid] = groupAsk
      for (const groupInvite of groupInvites) this.contactMap[GROUP_ASK_PREFIX + groupInvite.gid + ':' + groupInvite.sid] = groupInvite

      const contactList = [friendAsks, groupAsks, groupInvites]
      this.contactArr = mergeKLists(contactList)

      console.log('contactArr', this.contactArr)
      console.log('contactMap', this.contactMap)

      /* --------------------处理...数据--------------------- */
    },
    // 侧边栏选中触发
    choose(navItem) {
      this.choosedChatItem = navItem
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
    async handleClickAddBtn() {
      this.addDialogVisible = true
      this.initAvailableUserAndGroups()
    },
    /* ----------------------------------------WebSocket------------------------------------------------- */
    // WebSocket 初始化
    async webSocketInit() {
      if (!this.user.id) return
      const { data: routeInfo } = await getChatServerApi({ uid: this.user.id })
      console.log(routeInfo)
      // webSocketUrl: 'ws://10.128.207.76:8081/ws',
      this.webSocketUrl = `ws://${routeInfo.ip}:${routeInfo.wsPort}/ws`

      this.webSocket = new WebSocket(this.webSocketUrl)
      this.webSocket.onopen = this.webSocketHandleOpen
      this.webSocket.onmessage = this.webSocketHandleMessage
      this.webSocket.onerror = this.webSocketHandleError
      this.webSocket.onclose = this.webSocketHandleClose
    },
    // WebSocket 开启，发送登录数据
    webSocketHandleOpen() {
      console.log('连接成功')
      this.$message.success('连接成功')
      this.webSocketIsOpen = true
      // 清空重连的次数
      this.webSocketReconnectCount = 0
      // 发送登录信息, chat server接收并保存用户与channel关系
      this.webSocketSend({ type: ChatMsgType.LOGIN })
      // 开启定时心跳
      this.webSocketPing()
    },
    // WebSocket 处理接收数据
    webSocketHandleMessage(event) {
      console.log('收到推送消息')
      // 响应体的message
      const data = event.data
      console.log(data)
      this.WSResDecode(data, response => {
        console.log('服务端消息:', response)
        const type = response.type || 0
        switch (type) {
          case ChatMsgType.LOGIN_OUT: // 登录异常
            // 退出登录
            // this.userOut()
            break
          case ChatMsgType.WS_OUT: // 异地登录
            // 通知下线
            // this.wsOut()
            break
          case ChatMsgType.PING: // 心跳
            // 通知下线
            // this.wsOut()
            break
          case ChatMsgType.FRIEND: // 好友消息
            this.wsFriendMsgHandle(response)
            break
          case ChatMsgType.GROUP: // 群消息
            this.wsGroupMsgHandle(response)
            break
          case ChatMsgType.FRIEND_ASK: // 加好友请求
            this.wsFriendAskHandle(response)
            break
          case ChatMsgType.FRIEND_ACCEPT: // 好友同意消息
            this.wsFriendAcceptHandle(response)
            break
          case ChatMsgType.GROUP_ASK: // 请求入群
            this.wsGroupAskHandle(response)
            break
          case ChatMsgType.GROUP_ACCEPT: // 加入群消息
            this.wsGroupAcceptHandle(response)
            break
        }
      })
    },
    // WebSocket 关闭
    webSocketHandleClose() {
      console.log('连接断开')
      // 关闭心跳
      this.webSocketClose()
    },
    // WebSocket 发生错误时
    webSocketHandleError(err) {
      console.log('连接报错：', err)
      // 关闭心跳
      this.webSocketClose()
    },
    // WebSocket 重连
    webSocketReconnect() {
      if (this.webSocketIsOpen) {
        return false
      }
      this.webSocketReconnectCount += 1
      // 判断是否到了最大重连次数
      if (this.webSocketReconnectCount >= this.webSocketReconnectMaxCount) {
        this.webSocketWarningText = '重连次数超限'
        return false
      }
      // 初始化
      this.webSocketInit()

      // 每过 5 秒尝试一次，检查是否连接成功，直到超过最大重连次数
      const timer = setTimeout(() => {
        this.webSocketReconnect()
        clearTimeout(timer)
      }, 5000)
    },
    // WebSocket 发送数据
    webSocketSend(payload) {
      // 加入登录验证
      payload.uid = this.user.id
      // payload.sid = this.getSid()
      const buffer = this.WSResEncode(payload)
      this.webSocket.send(buffer)
    },
    // WebSocket 编码
    WSResEncode(payload) {
      // Create a new message
      const errMsg = ChatMsgReq.verify(payload)
      if (errMsg) {
        console.log('buff 解析错误信息：', errMsg)
      }
      const wsData = ChatMsgReq.create(payload)
      // console.log(wsData)
      // Encode a message to an Uint8Array (browser) or Buffer (node)
      return ChatMsgReq.encode(wsData).finish()
    },
    // WebSocket 解码
    WSResDecode(data, cb) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(data)
      reader.onload = () => {
        const buf = new Uint8Array(reader.result)
        const response = ChatMsgRes.decode(buf)
        cb(response)
      }
    },
    // 定时心跳
    webSocketPing() {
      this.webSocketPingTimer = setTimeout(() => {
        if (!this.webSocketIsOpen) {
          return false
        }
        // console.log('心跳')
        this.webSocketSend({ type: ChatMsgType.PING })
        clearTimeout(this.webSocketPingTimer)
        // 重新执行
        this.webSocketPing()
      }, this.webSocketPingTime)
    },
    // 断开连接时
    webSocketClose() {
      // this.$message.error('断开连接')
      // 修改状态为未连接
      this.webSocketIsOpen = false
      this.webSocket = null
      // 判断是否重连
      if (
        this.webSocketIsReconnect &&
        this.webSocketReconnectCount === 0
      ) {
        // 第一次直接尝试重连
        this.webSocketReconnect()
      }
    },
    // 将聊天数据显示在页面上
    wsFriendMsgHandle(response) {
      const senderId = response.uid
      const friend = this.chatMap[FRIEND_PREFIX + senderId]
      if (!friend) console.log('接收了消息，但是没有这个好友')
      const msgItem = {
        'uid': senderId, // 这条数据的发送者，也就是朋友
        'fid': this.user.id, // 接收者，就是自己
        'type': response.chatContent.type,
        'content': response.chatContent.content,
        'read': true,
        'createdAt': parseInt(response.sendTime)
      }
      console.log(msgItem)
      friend.recentMessage.unshift(msgItem)
      if (this.choosedFnc !== FNC.CHAT) this.fncDotHidden.CHAT = false
      this.navMoveToTop(friend)
    },
    wsGroupMsgHandle(response) {
      const senderId = response.uid
      const gid = response.chatContent.rid
      const group = this.chatMap[GROUP_PREFIX + gid]
      if (!group) console.log('接收到了消息，但是没有这个群')
      const msgItem = {
        'uid': senderId,
        'gid': gid,
        'type': response.chatContent.type,
        'content': response.chatContent.content,
        'read': true,
        'createdAt': response.sendTime
      }
      group.recentMessage.unshift(msgItem)
      if (this.choosedFnc !== FNC.CHAT) this.fncDotHidden.CHAT = false
      this.navMoveToTop(group)
    },
    wsFriendAskHandle(response) {
      const senderId = response.uid
      let sender = null
      for (const user of this.availableUsers) {
        if (user.id === senderId) sender = user
      }
      if (!sender) console.log('sender不存在')
      const navItem = {
        'type': ChatMsgType.FRIEND_ASK,
        'uid': this.user.id,
        'fid': senderId,
        'nickname': sender.nickname,
        'avatar': sender.avatar,
        'updatedAt': parseInt(response.sendTime)
      }
      console.log(navItem)
      this.contactArr.unshift(navItem)
      this.contactMap[FRIEND_ASK_PREFIX + senderId] = navItem
      if (this.choosedFnc !== FNC.CONTACT) this.fncDotHidden.CONTACT = false
    },
    wsFriendAcceptHandle(response) {
      const senderId = response.uid
      let sender = null
      for (const user of this.availableUsers) {
        if (user.id === senderId) sender = user
      }
      if (!sender) console.log('sender不存在')
      this.$message.success(`${sender.nickname}同意了您的请求`)
      this.initNav()
    },
    wsGroupAskHandle(response) {

    },
    wsGroupAcceptHandle(response) {

    },
    navMoveToTop(item) {
      const index = this.chatArr.indexOf(item)
      this.chatArr.splice(index, 1)
      this.chatArr.unshift(item)

      if (this.choosedChatItem !== item) {
        item.unReadMsgCount += 1
      } else {
        this.scrollToBottom()
      }
    },
    scrollToBottom() {
      const timer = setTimeout(() => {
        var window = document.getElementById('window')
        if (!window) return
        window.scrollTop = window.scrollHeight
        clearTimeout(timer)
      }, 0)
    },
    async addFriend(user) {
      const chatMsgVO = {
        type: ChatMsgType.FRIEND_ASK,
        uid: this.user.id,
        chatContent: {
          rid: user.id, // 申请要加的用户id
          type: 0,
          content: ''
        },
        sendTime: new Date()
      }
      console.log(chatMsgVO)
      const { data } = await sendChatMsgApi(chatMsgVO)
      if (data) {
        this.$message.success('发送成功')
        console.log('申请添加好友信息发送成功', chatMsgVO)
        this.addDialogVisible = false
      }
    },
    async addGroup(group) {
      const chatMsgVO = {
        type: ChatMsgType.GROUP_ASK,
        uid: this.user.id,
        chatContent: {
          gid: group.gid, // 申请要加的用户id
          type: 0,
          content: ''
        },
        sendTime: new Date()
      }
      console.log(chatMsgVO)
      const { data } = await sendChatMsgApi(chatMsgVO)
      if (data) {
        this.$message.success('发送成功')
        console.log('申请入群信息发送成功', chatMsgVO)
        this.addDialogVisible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';

/* ---------------------------------添加好友用户model框--------------------------*/
.dialog-content {
  max-height: 400px;
  width: 250px;
  overflow-y: auto;
  font-size: 13px;
  padding: 10px;

  input {
    width: 100%;
    height: 30px;
    border: 0;
    outline: 0;
    padding-left: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #dfdfdf94;
  }

  .tips {
    text-align: center;
  }

  .item {
    height: 30px;
    margin: 15px 0px;

    .avatar {
      position: relative;
      float: left;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      text-align: center;
      overflow: hidden;

      img {
        border-radius: 5px;
        width: 30px;
        vertical-align: middle;
      }
    }

    .info {
      position: relative;
      float: left;
      width: 100px;
      padding-left: 10px;
      line-height: 30px;
    }

    .add-btn {
      float: right;
      height: 30px;
      width: 50px;
      line-height: 30px;
      text-align: center;
      background-color: rgb(158,234,106);
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: rgb(102, 206, 33);
      }
    }
  }
}
</style>

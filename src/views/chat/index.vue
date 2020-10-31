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
          <div class="icon" @click="choosedFnc='duihua'">
            <i class="iconfont icon-duihua" :class="{choosed: choosedFnc === 'duihua'}" /></div>
          <div class="icon" @click="choosedFnc='tongxunlu'"><i class="iconfont icon-tongxunlu" :class="{choosed: choosedFnc === 'tongxunlu'}" />
          </div>
          <div class="icon" @click="choosedFnc='shoucang'">
            <i class="iconfont icon-shoucang" :class="{choosed: choosedFnc === 'shoucang'}" />
          </div>
          <div class="icon" @click="choosedFnc='pengyouquan'">
            <i class="iconfont icon-pengyouquan" :class="{choosed: choosedFnc === 'pengyouquan'}" />
          </div>
          <div class="icon" @click="choosedFnc='gouwu'">
            <i class="iconfont icon-gouwu" :class="{choosed: choosedFnc === 'gouwu'}" />
          </div>
          <div class="icon" @click="choosedFnc='youxi'">
            <i class="iconfont icon-youxi" :class="{choosed: choosedFnc === 'youxi'}" />
          </div>
        </div>
      </div>
      <!--------------------------------------- 好友、群导航列表 ------------------------------------->
      <div class="nav">
        <div class="search">
          <input type="text" placeholder="搜索">
          <div class="add" @click="handleClickAddBtn"><i class="el-icon-plus" /></div>
        </div>
        <div class="nav-list">
          <div
            v-for="navItem in chatBarArr"
            :key="getKeyByType(navItem)"
            class="nav-item"
            :class="{choosed: navItem === choosedItem}"
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

            <div v-else-if="navItem.type === ChatMsgType.FRIEND_ASK">
              <div class="avatar">
                <img :src="navItem.avatar" alt="avatar">
              </div>
              <div class="info">
                <div class="row">
                  <span class="remark">{{ navItem.nickname }}请求加您好友</span>
                  <span class="date">{{ timeUntilNow(navItem) }}</span>
                </div>
                <div class="message">
                  <button class="agree-btn" @click="agree(navItem)">同意</button>&nbsp;
                  <button class="refuse-btn" @click="refuse(navItem)">拒绝</button>
                </div>
              </div>
            </div>
            <!--
            <div v-else-if="navItem.type === ChatMsgType.GROUP_ASK">
              <div class="avatar">
                <img :src="navItem.avatar" alt="avatar">
              </div>
              <div class="info">
                <div class="row">
                  <span class="remark">{{ navItem.nickname }}申请入群</span>
                  <span class="date">{{ timeUntilNow(navItem) }}</span>
                </div>
                <div class="message">
                  <button class="agree-btn" @click="agree(navItem)">同意</button>&nbsp;
                  <button class="refuse-btn" @click="refuse(navItem)">拒绝</button>
                </div>
              </div>
            </div> -->

            <div v-else-if="navItem.type === ChatMsgType.GRROUP_ASK">
              SDF
            </div>
          </div>
        </div>
      </div>
      <!--------------------------------------- 聊天窗口 ------------------------------------->
      <div class="chat-window">
        <div v-if="showChatWindow" class="header">
          <div class="title">{{ getNameByType(choosedItem) }}</div>
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
      <!-- <div slot="ft" class="ft">
        <a class="btn btn-primary" @click="sure">确定</a>
        <a class="btn btn-default" @click="isVisible=false">取消</a>
      </div> -->
    </modal>
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

import { ChatMsgType, ChatContentType } from '@/utils/constant'
import Dialogue from './dialogue'
import Modal from '@/components/modal'
import { mergeKLists } from '@/utils/merge'

import protoRoot from '@/proto/proto'
import { parse } from 'path-to-regexp'
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

export default {
  name: 'GroupChat',
  components: {
    Dialogue,
    Modal
  },
  data() {
    return {
      choosedFnc: '',
      user: {}, // 当前登录用户信息
      content: '', // 聊天内容
      chatBarArr: [],
      /*
      chatBarArr: [
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
      chatBarMap: {},
      /*
      chatBarMap: {
        "friends:1": friend1 obj,
        "groups:1": group1 obj
      },
      */
      choosedItem: null,

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

      ChatMsgType: ChatMsgType
    }
  },
  computed: {
    reverseChatMsgList() {
      if (!this.choosedItem || !this.choosedItem.recentMessage) {
        return []
      }
      return [...this.choosedItem.recentMessage].reverse()
    },
    showChatWindow() {
      return this.choosedItem && (this.choosedItem.type === ChatMsgType.FRIEND || this.choosedItem.type === ChatMsgType.GROUP)
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
    },
    async initNav() {
      this.chatBarMap = {}
      this.chatBarArr = []

      /* 获取数据 */
      const friendsResult = await getFriendsApi(this.user.id)
      const friends = friendsResult.data.list
      console.log('friends', friends)

      const friendAsksResult = await getFriendAskApi(this.user.id)
      const friendAsks = friendAsksResult.data.list
      console.log('friendAsk', friendAsks)

      const groupsResult = await getGroupsApi(this.user.id)
      const groups = groupsResult.data.list
      console.log('groups', groups)

      const groupAskResult = await getGroupAskApi(this.user.id)
      const groupAsks = groupAskResult.data.list
      console.log('groupAsks', groupAsks)

      const groupInviteResult = await getGroupInviteApi(this.user.id)
      const groupInvites = groupInviteResult.data.list
      console.log('groupInvites', groupInvites)

      /* 将数据填到this.info map中 */
      for (const friend of friends) this.chatBarMap[FRIEND_PREFIX + friend.fid] = friend
      for (const friendAsk of friendAsks) this.chatBarMap[FRIEND_ASK_PREFIX + friendAsk.fid] = friendAsk
      for (const group of groups) this.chatBarMap[GROUP_PREFIX + group.gid] = group
      // for (const groupAsk of groupAsks) this.chatBarMap[GROUP_ASK_PREFIX + groupAsk.gid + ':' + groupAsk.sid] = groupAsk
      // for (const groupInvite of groupInvites) this.chatBarMap[GROUP_ASK_PREFIX + groupInvite.gid + ':' + groupInvite.sid] = groupInvite

      /* 将数据按照时间倒序加到this.chatBarArr数组中 */
      const lists = [friends, groups, friendAsks]
      this.chatBarArr = mergeKLists(lists)

      if (this.chatBarArr.length > 0) {
        this.choosedItem = this.chatBarArr[0]
        this.scrollToBottom()
      }

      console.log('chatBarArr', this.chatBarArr)
      console.log('chatBarMap', this.chatBarMap)
    },
    // 侧边栏选中触发
    choose(navItem) {
      this.choosedItem = navItem
      this.scrollToBottom()
      this.markReadMsg()
    },
    /**
     * 点击发送触发，发送聊天数据
     */
    async sendMsg() {
      const chatMsgVO = {
        type: this.choosedItem.type,
        uid: this.user.id,
        chatContent: {
          // rid: this.getIdByType(this.choosedItem),
          type: ChatContentType.TEXT,
          content: this.content
        },
        sendTime: new Date()
      }
      switch (this.choosedItem.type) {
        case ChatMsgType.FRIEND:
          chatMsgVO.chatContent['rid'] = this.choosedItem.fid
          break
        case ChatMsgType.GROUP:
          chatMsgVO.chatContent['gid'] = this.choosedItem.gid
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
        'uid': this.user.id,
        'type': ChatContentType.TEXT,
        'content': this.content,
        'createdAt': new Date()
      }
      if (this.choosedItem.type === ChatMsgType.FRIEND) {
        msgItem['fid'] = this.choosedItem.fid
      } else if (this.choosedItem.type === ChatMsgType.GROUP) {
        msgItem['gid'] = this.choosedItem.gid
      }
      console.log(msgItem)
      this.choosedItem.recentMessage.unshift(msgItem)
      this.scrollToBottom()
      this.content = ''
    },
    async initAvailableUserAndGroups() {
      const userListResult = await getAllUserApi()
      const userList = userListResult.data.list
      this.availableUsers = []
      for (const user of userList) {
        /* 排除已有好友和自己 */
        if (user.id !== this.user.id && !this.chatBarMap[FRIEND_PREFIX + user.id]) {
          this.availableUsers.push(user)
        }
      }
      const groupListResult = await getAllGroupsApi()
      const groupList = groupListResult.data.list
      this.availableGroups = []
      for (const group of groupList) {
        /* 排除已有群 */
        if (!this.chatBarMap[GROUP_PREFIX + group.gid]) {
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
      const friend = this.chatBarMap[FRIEND_PREFIX + senderId]
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
      this.navMoveToTop(friend)
    },
    wsGroupMsgHandle(response) {
      const senderId = response.uid
      const gid = response.chatContent.rid
      const group = this.chatBarMap[GROUP_PREFIX + gid]
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
      this.chatBarArr.unshift(navItem)
      this.chatBarMap[FRIEND_ASK_PREFIX + senderId] = navItem
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
    /* -------------------------------------------------------------------------------------------- */
    scrollToBottom() {
      const timer = setTimeout(() => {
        var window = document.getElementById('window')
        if (!window) return
        window.scrollTop = window.scrollHeight
        clearTimeout(timer)
      }, 0)
    },
    leftAvatar(message) {
      return this.choosedItem.type === ChatMsgType.FRIEND ? this.choosedItem.avatar : this.choosedItem.userMap[message.sid].avatar
    },
    leftName(message) {
      return this.choosedItem.type === ChatMsgType.FRIEND ? this.getNameByType(this.choosedItem) : (this.choosedItem.userMap[message.sid].nickname || this.choosedItem.userMap[message.uid].remark)
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
    async markReadMsg() {
      if (this.choosedItem.unReadMsgCount > 0) {
        if (this.choosedItem.type === ChatMsgType.FRIEND) {
          await markFriendReadMsgApi({ uid: this.user.id, fid: this.choosedItem.fid })
        } else if (this.choosedItem.type === ChatMsgType.GROUP) {
          await markGroupReadMsgApi({ gid: this.choosedItem.gid, uid: this.user.id })
        }
        // this.choosedItem.badgeHidden = true
        this.choosedItem.unReadMsgCount = 0
      }
    },
    navMoveToTop(item) {
      const index = this.chatBarArr.indexOf(item)
      this.chatBarArr.splice(index, 1)
      this.chatBarArr.unshift(item)

      if (this.choosedItem !== item) {
        item.unReadMsgCount += 1
      } else {
        this.scrollToBottom()
      }
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
        this.initNav()
      }

      // const index = this.chatBarArr.indexOf(item)
      // this.chatBarArr.splice(index, 1)
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
        this.initNav()
      }
      // const { data } = await refuseFriendApi({ uid: item.uid, fid: this.user.id }) /* item.uid是加好友的发起者 */
      // if (data) {
      //   console.log('拒绝添加好友成功')
      //   const index = this.chatBarArr.indexOf(item)
      //   this.chatBarArr.splice(index, 1)
      //   delete this.chatBarMap[FRIEND_ASK_PREFIX + item.uid]
      // }
    },
    async handleOperation(command) {
      if (command === 'deleteFriend') {
        const { data } = await delFriendApi(this.user.id, this.choosedItem.fid)
        if (data) {
          this.$message.success('删除成功')
          console.log('删除好友成功')
          this.initNav()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

<template>
  <div class="main-container">
    <!-- 功能导航栏 -->
    <div class="fnc-nav">
      <div class="logo">
        <div class="logo-wrapper">
          <img :src="user.avatarUrl" alt="logo">
        </div>
      </div>
      <div class="fncs">
        <div class="icon"><i class="iconfont icon-duihua" /></div>
        <div class="icon"><i class="iconfont icon-tongxunlu" /></div>
        <div class="icon"><i class="iconfont icon-shoucang" /></div>
        <div class="icon"><i class="iconfont icon-pengyouquan" /></div>
        <div class="icon"><i class="iconfont icon-gouwu" /></div>
        <div class="icon"><i class="iconfont icon-youxi" /></div>
      </div>
    </div>
    <!-- 好友列表 -->
    <div class="friend-nav">
      <div class="search">
        <input type="text" placeholder="搜索">
      </div>
      <div class="friends">
        <div v-for="friend in friends" :key="friend.fid" class="friend-item" :class="{choosed: friend.fid === choosedFriend.fid}" @click="chooseFriend(friend)">
          <div class="avatar">
            <el-badge :value="friend.unReadMsgCount" class="badge" :hidden="friendsMap[friend.fid].badgeHidden">
              <img :src="friend.avatar" alt="avatar">
            </el-badge>
            <!-- <img :src="friend.avatar" alt="avatar"> -->
          </div>
          <div class="friend">
            <div class="row">
              <span class="remark">{{ friend.remark }}</span>
              <!-- <span class="date">{{ friend.recentMessage[0].createdAt }}</span> -->
            </div>
            <div class="message">{{ friend.recentMessage.length > 0 ? friend.recentMessage[0].msgContent : '' }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 聊天窗口 -->
    <div class="chat-window">
      <div class="header">
        {{ choosedFriend.remark }}
      </div>
      <div id="window" class="chat-message">
        <div v-for="message in reverseChatMsgList" id="content" :key="message.id" class="message-item">
          <Dialogue
            :item="message"
            :is-right="message.uid === user.id"
            :avatar="message.uid === user.id ? user.avatarUrl : choosedFriend.avatar"
            :remark="message.uid === user.id ? user.nickname : choosedFriend.remark"
          />
        </div>
      </div>
      <div class="send-message">
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
import { getFriends } from '@/api/chat'
import { getUser } from '@/utils/auth'
import Dialogue from './dialogue'

import protoRoot from '@/proto/proto'
const ChatMsg = protoRoot.lookup('protocol.ChatMsg')
const ChatContent = protoRoot.lookup('protocol.ChatContent')

export default {
  name: 'GroupChat',
  components: {
    Dialogue
  },
  data() {
    return {
      user: {},
      friends: [],
      content: '',
      choosedFriend: {},
      friendsMap: {},
      /* websocket相关 */
      webSocket: null,
      webSocketUrl: 'ws://10.128.207.76:8081/ws',
      webSocketReconnectCount: 0,
      webSocketIsReconnect: true, // 是否重连
      webSocketWarningText:
          "连接断开,正在尝试重连 <i class='dotting'></i>",
      webSocketIsOpen: false,
      // 心跳定时器
      webSocketPingTimer: null,
      webSocketPingTime: 10000 // 心跳的间隔，当前为 10秒,
    }
  },
  computed: {
    reverseChatMsgList() {
      if (!this.choosedFriend || !this.choosedFriend.recentMessage) {
        return []
      }
      return [...this.choosedFriend.recentMessage].reverse()
    }
  },
  watch: {
    // friends() {
    //   console.log('messageList change')
    //   this.$nextTick(() => {
    //     var window = document.getElementById('window')
    //     console.log(window)
    //     console.log(window.scrollHeight)
    //     window.scrollTop = window.scrollHeight
    //   })
    // }
  },
  created() {
    this.getFriends()
    this.webSocketInit()
  },
  mounted() {
  },
  destroyed() {
    this.webSocketClose()
  },
  methods: {
    async getFriends() {
      const user = getUser()
      this.user = JSON.parse(user)
      const { data } = await getFriends(this.user.id)
      this.friends = data
      for (const friend of data) {
        this.friendsMap[friend.fid] = friend
        this.friendsMap[friend.fid]['badgeHidden'] = false
      }

      if (this.friends.length > 0) {
        this.choosedFriend = this.friends[0]
        this.friendsMap[this.choosedFriend.fid].badgeHidden = true
        /* 标记已读 */
        this.markReadMsg()
      }

      this.scrollToBottom()
    },
    chooseFriend(friend) {
      this.choosedFriend = friend
      this.friendsMap[this.choosedFriend.fid].badgeHidden = true
      this.markReadMsg()
    },
    sendMsg() {
      const wsContent = ChatContent.create({ receiveId: this.choosedFriend.fid, msgType: 0, msgContent: this.content })
      console.log(wsContent)
      const playload = { type: 2, content: wsContent }
      this.webSocketSend(playload)
      const msgItem = {
        'uid': this.user.id,
        'fid': this.choosedFriend.fid,
        'msgType': 0,
        'msgContent': this.content,
        'state': 0,
        'createdAt': '2020-09-30T14:35:39.327+00:00'
      }
      console.log(msgItem)
      this.choosedFriend.recentMessage.unshift(msgItem)
      this.scrollToBottom()
      this.content = ''
    },
    // WebSocket 初始化
    webSocketInit() {
      this.webSocket = new WebSocket(this.webSocketUrl)
      this.webSocket.onopen = this.webSocketHandleOpen
      this.webSocket.onmessage = this.webSocketHandleMessage
      this.webSocket.onerror = this.webSocketHandleError
      this.webSocket.onclose = this.webSocketHandleClose
    },
    // WebSocket 开启，发送登录数据
    webSocketHandleOpen() {
      console.log('连接打开')
      this.$message.success('连接成功')
      this.webSocketIsOpen = true
      // 清空重连的次数
      this.webSocketReconnectCount = 0
      // 发送登录信息
      const payload = {
        type: 1
      }
      this.webSocketSend(payload)
      // 开启定时心跳
      this.webSocketPing()
    },
    // WebSocket 处理接收数据
    webSocketHandleMessage(event) {
      // 响应体的message
      const data = event.data
      this.WSResDecode(data, response => {
        console.log('服务端消息:', response)
        const type = response.type || 0
        switch (type) {
          case -2: // 登录异常
            // 退出登录
            // this.userOut()
            break
          case -1: // 异地登录
            // 通知下线
            // this.wsOut()
            break
          case 0: // 心跳
            // 通知下线
            // this.wsOut()
            break
          case 2: // 好友消息
            this.wsFriendMsgHandle(response)
            break
          case 3: // 群消息
            break
          case 4: // 好友请求
            // this.wsFriendAskHandle()
            break
          case 5: // 好友同意消息
            // this.wsFriendAckHandle(response)
            break
          case 6: // 请求入群
            // this.wsFriendAckHandle(response)
            break
          case 7: // 加入群消息
            // this.wsGroupMsgHandle(response)
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
      if (
        this.webSocketReconnectCount >= this.webSocketReconnectMaxCount
      ) {
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
      const errMsg = ChatMsg.verify(payload)
      if (errMsg) {
        console.log('buff 解析错误信息：', errMsg)
      }
      const wsData = ChatMsg.create(payload)
      console.log(wsData)
      // Encode a message to an Uint8Array (browser) or Buffer (node)
      return ChatMsg.encode(wsData).finish()
    },
    // WebSocket 解码
    WSResDecode(data, cb) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(data)
      reader.onload = () => {
        const buf = new Uint8Array(reader.result)
        const response = ChatMsg.decode(buf)
        cb(response)
      }
    },
    // 定时心跳
    webSocketPing() {
      this.webSocketPingTimer = setTimeout(() => {
        if (!this.webSocketIsOpen) {
          return false
        }
        console.log('心跳')
        const payload = {
          type: 0
        }
        this.webSocketSend(payload)
        clearTimeout(this.webSocketPingTimer)
        // 重新执行
        this.webSocketPing()
      }, this.webSocketPingTime)
    },
    // 断开连接时
    webSocketClose() {
      this.$message.error('断开连接')
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
    wsFriendMsgHandle(response) {
      const senderId = response.uid
      for (const friend of this.friends) {
        if (friend.fid === senderId) {
          const msgItem = {
            'uid': senderId, // 发送者
            'fid': this.user.id, // 接受者
            'msgType': 0,
            'msgContent': response.content.msgContent,
            'state': 0,
            'createdAt': ''
          }
          console.log(msgItem)
          friend.recentMessage.unshift(msgItem)
          this.scrollToBottom()
        }
      }
    },
    scrollToBottom() {
      const timer = setTimeout(() => {
        var window = document.getElementById('window')
        window.scrollTop = window.scrollHeight
        clearTimeout(timer)
      }, 0)
    },
    markReadMsg() {

    }
  }
}
</script>

<style lang="scss" scoped>
#app .main-container {
  padding: 0;
  margin-left: 0;
}

.fnc-nav {
  float: left;
  width: 120px;
  height: 100vh;
  background-color: #27292C;

  .logo {
    width: 120px;
    height: 120px;
    padding: 20px;
    text-align: center;

    .logo-wrapper {
      width: 80px;
      height: 80px;
      overflow: hidden;

      img {
      width: 80px;
      // max-width: 100%;
      vertical-align: middle;
    }
    }
  }

  .fncs {
    text-align: center;
    .icon {
      margin: 20px auto;
    }
    .iconfont {
      font-size: 50px;
      color: #8a8a8a;
    }
  }
}

.friend-nav {
  float: left;
  width: 300px;
  height: 100vh;
  background-color:#EDEAE8;

  .search {
    padding: 15px;

    input {
      width: 100%;
      height: 30px;
      border: 0;
      outline: 0;
      padding-left: 10px;
      border-radius: 5px;
      background-color: #F5F5F5;
    }
  }

  .friends {
    // padding: 0px 10px;

    .friend-item {
      padding: 10px 20px;
      height: 100px;

      .avatar {
        position: relative;
        float: left;
        width: 80px;
        height: 80px;
        border-radius: 10px;
        text-align: center;
        overflow: hidden;

        ::v-deep .el-badge__content.is-fixed {
          top: 10px;
          right: 18px;
          border: 0;
        }

        img {
          border-radius: 10px;
          width: 80px;
          vertical-align: middle;
        }
      }

      .friend {
        float: left;
        padding: 10px;
        line-height: 30px;

        .row {
          .remark {
            font-size: 20px;
            font-weight: 600;
          }
          .date {
            color: #696969;
          }
        }

        .message {
          height: 30px;
          width: 150px;
          color: #696969;
          overflow: hidden;
        }
      }

      &:hover {
        cursor: pointer;
        background-color: rgb(224, 224, 224);
      }
    }

    .choosed {
      background-color: #F5F5F5;
    }
  }
}

.chat-window {
  display: inline-block;
  width: calc(100% - 420px);
  height: 100vh;
  background-color: #F5F5F5;

  .header {
    height: 60px;
    padding-left: 30px;
    line-height: 60px;
    border-bottom: 1px solid #dfdfdf;
  }

  .chat-message {
    height: 700px;
    padding: 0 30px;
    overflow-y: auto;

    .message-item {
      padding: 5px;
    }
  }

  .send-message {
    height: calc(100% - 60px - 700px);
    padding: 10px 30px;
    background-color: #fff;

    .tools {
      height: 40px;
      line-height: 40px;
      .iconfont {
        font-size: 25px;
        color: #b3b3b3;
        margin: 10px;
      }

      .left-tools {
        float: left;
      }

      .right-tools {
        float: right;
      }
    }

    .content {
      height: calc(100% - 40px);

      ::v-deep .el-textarea {
        border: none;
        // background-color: #af4242;
      }

      .mytextarea {
        width: 100%;
        height: calc(100% - 40px);
        // height: 100px;
        border: none;
        resize: none;
        outline: 0;
        overflow-y: auto;
      }
    }

    .btn {
      position: absolute;
      bottom: 10px;
      right: 30px;

      button {
        padding: 5px 10px;
        outline: 0;
        border: 0;
        color: #686868;
        background-color: #F5F5F5;

        &:hover {
          cursor: pointer;
          background-color: rgb(223, 223, 223);
        }
      }
    }
  }
}

::-webkit-scrollbar {/*滚动条整体样式*/
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
  background: #d6d6d6;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {/*滚动条里面轨道*/
  border-radius: 10px;
  background: #e4e4e4;
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
}
</style>

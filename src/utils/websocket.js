// import { getChatServer } from '@/api/route'

// export async function webSocketInit() {
//   let { data: routeInfo } = await getChatServer({ uid: this.user.id });
//   console.log(routeInfo);
//   // webSocketUrl: 'ws://10.128.207.76:8081/ws',
//   this.webSocketUrl = `ws://${routeInfo.ip}:${routeInfo.wsPort}/ws`

//   this.webSocket = new WebSocket(this.webSocketUrl)
//   this.webSocket.onopen = this.webSocketHandleOpen
//   this.webSocket.onmessage = this.webSocketHandleMessage
//   this.webSocket.onerror = this.webSocketHandleError
//   this.webSocket.onclose = this.webSocketHandleClose
// };

// // WebSocket 开启，发送登录数据
// export function webSocketHandleOpen() {
//   console.log('连接打开')
//   this.$message.success('连接成功')
//   this.webSocketIsOpen = true
//   // 清空重连的次数
//   this.webSocketReconnectCount = 0
//   // 发送登录信息
//   const payload = {
//     type: 1
//   }
//   this.webSocketSend(payload)
//   // 开启定时心跳
//   this.webSocketPing()
// };

// // WebSocket 处理接收数据
// export function webSocketHandleMessage(event) {
//   // 响应体的message
//   const data = event.data
//   this.WSResDecode(data, response => {
//     console.log('服务端消息:', response)
//     const type = response.type || 0
//     switch (type) {
//       case -2: // 登录异常
//         // 退出登录
//         // this.userOut()
//         break
//       case -1: // 异地登录
//         // 通知下线
//         // this.wsOut()
//         break
//       case 0: // 心跳
//         // 通知下线
//         // this.wsOut()
//         break
//       case 2: // 好友消息
//         this.wsFriendMsgHandle(response)
//         break
//       case 3: // 群消息
//         break
//       case 4: // 好友请求
//         // this.wsFriendAskHandle()
//         break
//       case 5: // 好友同意消息
//         // this.wsFriendAckHandle(response)
//         break
//       case 6: // 请求入群
//         // this.wsFriendAckHandle(response)
//         break
//       case 7: // 加入群消息
//         // this.wsGroupMsgHandle(response)
//         break
//     }
//   })
// };

// // WebSocket 关闭
// export function webSocketHandleClose() {
//   console.log('连接断开')
//   // 关闭心跳
//   this.webSocketClose()
// };

// // WebSocket 发生错误时
// export function webSocketHandleError(err) {
//   console.log('连接报错：', err)
//   // 关闭心跳
//   this.webSocketClose()
// };

// // WebSocket 重连
// export function webSocketReconnect() {
//   if (this.webSocketIsOpen) {
//     return false
//   }
//   this.webSocketReconnectCount += 1
//   // 判断是否到了最大重连次数
//   if (
//     this.webSocketReconnectCount >= this.webSocketReconnectMaxCount
//   ) {
//     this.webSocketWarningText = '重连次数超限'
//     return false
//   }
//   // 初始化
//   this.webSocketInit()

//   // 每过 5 秒尝试一次，检查是否连接成功，直到超过最大重连次数
//   const timer = setTimeout(() => {
//     this.webSocketReconnect()
//     clearTimeout(timer)
//   }, 5000)
// };

// // WebSocket 发送数据
// webSocketSend(payload) {
//   // 加入登录验证
//   payload.uid = this.user.id
//   // payload.sid = this.getSid()
//   const buffer = this.WSResEncode(payload)
//   this.webSocket.send(buffer)
// };

// // WebSocket 编码
// export function WSResEncode(payload) {
//   // Create a new message
//   const errMsg = ChatMsg.verify(payload)
//   if (errMsg) {
//     console.log('buff 解析错误信息：', errMsg)
//   }
//   const wsData = ChatMsg.create(payload)
//   console.log(wsData)
//   // Encode a message to an Uint8Array (browser) or Buffer (node)
//   return ChatMsg.encode(wsData).finish()
// };

// // WebSocket 解码
// export function WSResDecode(data, cb) {
//   const reader = new FileReader()
//   reader.readAsArrayBuffer(data)
//   reader.onload = () => {
//     const buf = new Uint8Array(reader.result)
//     const response = ChatMsg.decode(buf)
//     cb(response)
//   }
// };

// // 定时心跳
// export function webSocketPing() {
//   this.webSocketPingTimer = setTimeout(() => {
//     if (!this.webSocketIsOpen) {
//       return false
//     }
//     console.log('心跳')
//     const payload = {
//       type: 0
//     }
//     this.webSocketSend(payload)
//     clearTimeout(this.webSocketPingTimer)
//     // 重新执行
//     this.webSocketPing()
//   }, this.webSocketPingTime)
// };

// // 断开连接时
// export function webSocketClose() {
//   this.$message.error('断开连接')
//   // 修改状态为未连接
//   this.webSocketIsOpen = false
//   this.webSocket = null
//   // 判断是否重连
//   if (
//     this.webSocketIsReconnect &&
//     this.webSocketReconnectCount === 0
//   ) {
//     // 第一次直接尝试重连
//     this.webSocketReconnect()
//   }
// };

// wsFriendMsgHandle(response) {

// }
// import { getChatServer } from '@/api/route'

// export async function webSocketInit() {
//   let { data: routeInfo } = await getChatServer({ uid: this.user.id });
//   console.log(routeInfo);
//   // webSocketUrl: 'ws://10.128.207.76:8081/ws',
//   this.webSocketUrl = `ws://${routeInfo.ip}:${routeInfo.wsPort}/ws`

//   this.webSocket = new WebSocket(this.webSocketUrl)
//   this.webSocket.onopen = this.webSocketHandleOpen
//   this.webSocket.onmessage = this.webSocketHandleMessage
//   this.webSocket.onerror = this.webSocketHandleError
//   this.webSocket.onclose = this.webSocketHandleClose
// };

// // WebSocket 开启，发送登录数据
// export function webSocketHandleOpen() {
//   console.log('连接打开')
//   this.$message.success('连接成功')
//   this.webSocketIsOpen = true
//   // 清空重连的次数
//   this.webSocketReconnectCount = 0
//   // 发送登录信息
//   const payload = {
//     type: 1
//   }
//   this.webSocketSend(payload)
//   // 开启定时心跳
//   this.webSocketPing()
// };

// // WebSocket 处理接收数据
// export function webSocketHandleMessage(event) {
//   // 响应体的message
//   const data = event.data
//   this.WSResDecode(data, response => {
//     console.log('服务端消息:', response)
//     const type = response.type || 0
//     switch (type) {
//       case -2: // 登录异常
//         // 退出登录
//         // this.userOut()
//         break
//       case -1: // 异地登录
//         // 通知下线
//         // this.wsOut()
//         break
//       case 0: // 心跳
//         // 通知下线
//         // this.wsOut()
//         break
//       case 2: // 好友消息
//         this.wsFriendMsgHandle(response)
//         break
//       case 3: // 群消息
//         break
//       case 4: // 好友请求
//         // this.wsFriendAskHandle()
//         break
//       case 5: // 好友同意消息
//         // this.wsFriendAckHandle(response)
//         break
//       case 6: // 请求入群
//         // this.wsFriendAckHandle(response)
//         break
//       case 7: // 加入群消息
//         // this.wsGroupMsgHandle(response)
//         break
//     }
//   })
// };

// // WebSocket 关闭
// export function webSocketHandleClose() {
//   console.log('连接断开')
//   // 关闭心跳
//   this.webSocketClose()
// };

// // WebSocket 发生错误时
// export function webSocketHandleError(err) {
//   console.log('连接报错：', err)
//   // 关闭心跳
//   this.webSocketClose()
// };

// // WebSocket 重连
// export function webSocketReconnect() {
//   if (this.webSocketIsOpen) {
//     return false
//   }
//   this.webSocketReconnectCount += 1
//   // 判断是否到了最大重连次数
//   if (
//     this.webSocketReconnectCount >= this.webSocketReconnectMaxCount
//   ) {
//     this.webSocketWarningText = '重连次数超限'
//     return false
//   }
//   // 初始化
//   this.webSocketInit()

//   // 每过 5 秒尝试一次，检查是否连接成功，直到超过最大重连次数
//   const timer = setTimeout(() => {
//     this.webSocketReconnect()
//     clearTimeout(timer)
//   }, 5000)
// };

// // WebSocket 发送数据
// webSocketSend(payload) {
//   // 加入登录验证
//   payload.uid = this.user.id
//   // payload.sid = this.getSid()
//   const buffer = this.WSResEncode(payload)
//   this.webSocket.send(buffer)
// };

// // WebSocket 编码
// export function WSResEncode(payload) {
//   // Create a new message
//   const errMsg = ChatMsg.verify(payload)
//   if (errMsg) {
//     console.log('buff 解析错误信息：', errMsg)
//   }
//   const wsData = ChatMsg.create(payload)
//   console.log(wsData)
//   // Encode a message to an Uint8Array (browser) or Buffer (node)
//   return ChatMsg.encode(wsData).finish()
// };

// // WebSocket 解码
// export function WSResDecode(data, cb) {
//   const reader = new FileReader()
//   reader.readAsArrayBuffer(data)
//   reader.onload = () => {
//     const buf = new Uint8Array(reader.result)
//     const response = ChatMsg.decode(buf)
//     cb(response)
//   }
// };

// // 定时心跳
// export function webSocketPing() {
//   this.webSocketPingTimer = setTimeout(() => {
//     if (!this.webSocketIsOpen) {
//       return false
//     }
//     console.log('心跳')
//     const payload = {
//       type: 0
//     }
//     this.webSocketSend(payload)
//     clearTimeout(this.webSocketPingTimer)
//     // 重新执行
//     this.webSocketPing()
//   }, this.webSocketPingTime)
// };

// // 断开连接时
// export function webSocketClose() {
//   this.$message.error('断开连接')
//   // 修改状态为未连接
//   this.webSocketIsOpen = false
//   this.webSocket = null
//   // 判断是否重连
//   if (
//     this.webSocketIsReconnect &&
//     this.webSocketReconnectCount === 0
//   ) {
//     // 第一次直接尝试重连
//     this.webSocketReconnect()
//   }
// };

// wsFriendMsgHandle(response) {

// }
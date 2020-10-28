export const ChatMsgType = {
  LOGIN_OUT: -2, // 登录异常
  WS_OUT: -1, // 异地登录
  PING: 0, // 心跳
  LOGIN: 1, // 登录
  FRIEND: 2, // 好友消息
  GROUP: 3, // 群消息
  FRIEND_ASK: 4, // 请求加好友
  FRIEND_ACCEPT: 5, // 好友同意
  GROUP_ASK: 6, // 请求入群
  GROUP_ACCEPT: 7 // 同意入群
}

export const ChatContentType = {
  TEXT: 0, // 文本
  IMAGE: 1, // 图片
  FILE: 2, // 文件
  VOICE: 3, // 语音
  VIDEO: 4 // 视频
}

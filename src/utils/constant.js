export const ChatMsgType = {
  LOGIN_OUT: -2, // 登录异常
  WS_OUT: -1, // 异地登录

  PING: 0, // 心跳
  LOGIN: 1, // 登录

  FRIEND: 10, // 好友消息
  FRIEND_ASK: 11, // 请求加好友
  FRIEND_ACCEPT: 12, // 好友同意
  FRIEND_REFUSE: 13, // 拒绝加好友请求

  GROUP: 20, // 群消息
  GROUP_ASK: 21, // 请求入群
  GROUP_ACCEPT: 22, // 同意入群
  GROUP_REFUSE: 23, // 拒绝入群
  GROUP_INVITE: 24, // 邀请入群
  GROUP_INVITE_ACCEPT: 25, // 受邀同意入群
  GROUP_INVITE_REFUSE: 26 // 受邀拒绝入群
}

export const ChatContentType = {
  TEXT: 0, // 文本
  IMAGE: 1, // 图片
  FILE: 2, // 文件
  VOICE: 3, // 语音
  VIDEO: 4 // 视频
}

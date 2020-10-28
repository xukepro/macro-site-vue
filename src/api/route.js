import request from '@/utils/request'

export function getChatServer(data) {
  return request({
    url: '/route/route/login',
    method: 'post',
    data
  })
}

export function sendChatMsg(data) {
  return request({
    url: '/route/route/chat',
    method: 'post',
    data
  })
}


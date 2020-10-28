import request from '@/utils/request'

export function getFriends(id) {
  return request({
    url: '/api/friend/' + id,
    method: 'get'
  })
}

export function getGroups(id) {
  return request({
    url: '/api/group/byUser/' + id,
    method: 'get'
  })
}

export function markFriendReadMsg(data) {
  return request({
    url: '/api/friend/chat/read',
    method: 'put',
    data
  })
}

export function markGroupReadMsg(data) {
  return request({
    url: '/api/group/chat/read',
    method: 'put',
    data
  })
}


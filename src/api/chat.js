import request from '@/utils/request'

/* ---------------------------------friend------------------------------- */
export function getFriends(id) {
  return request({
    url: '/api/friend/' + id,
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

export function addFriend(data) {
  return request({
    url: '/api/friend',
    method: 'post',
    data
  })
}

export function delFriend(uid, fid) {
  return request({
    url: '/api/friend/' + uid + '/' + fid,
    method: 'delete'
  })
}

export function getFriendAsk(uid) {
  return request({
    url: '/api/friend/ask/' + uid,
    method: 'get'
  })
}

// export function refuseFriend(data) {
//   return request({
//     url: '/api/friend/refuse',
//     method: 'post',
//     data
//   })
// }

/* ---------------------------------group------------------------------- */

export function getGroups(id) {
  return request({
    url: '/api/group/byUser/' + id,
    method: 'get'
  })
}

export function getAllGroups() {
  return request({
    url: '/api/group',
    method: 'get'
  })
}

export function markGroupReadMsg(data) {
  return request({
    url: '/api/group/chat/read',
    method: 'put',
    data
  })
}

export function getGroupAsk(uid) {
  return request({
    url: '/api/group/ask/' + uid,
    method: 'get'
  })
}

export function getGroupInvite(uid) {
  return request({
    url: '/api/group/invite/' + uid,
    method: 'get'
  })
}

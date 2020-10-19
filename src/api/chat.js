import request from '@/utils/request'

export function getFriends(id) {
  return request({
    url: '/api/friend/' + id,
    method: 'get'
  })
}


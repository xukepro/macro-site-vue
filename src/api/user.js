import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: '/api/user/info/' + id,
    method: 'get'
  })
}

export function updateUser(data) {
  return request({
    url: '/api/user/info',
    method: 'put',
    data
  })
}

export function getAllUser() {
  return request({
    url: '/api/user/info/all',
    method: 'get'
  })
}

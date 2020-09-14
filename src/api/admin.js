import request from '@/utils/request'

export function getProfile() {
  return request({
    url: '/vue-admin-template/admin/profile',
    method: 'get'
  })
}

export function getArticles() {
  return request({
    url: '/vue-admin-template/admin/article',
    method: 'get'
  })
}

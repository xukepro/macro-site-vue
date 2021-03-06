import request from '@/utils/request'

export function getProfile() {
  return request({
    url: '/vue-admin-template/admin/profile',
    method: 'get'
  })
}

export function getArticleList() {
  return request({
    url: '/api/article/list',
    method: 'get'
  })
}

export function getArticleContent(params) {
  return request({
    url: '/api/article/content/' + params,
    method: 'get'
    // params
  })
}

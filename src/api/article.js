import request from '@/utils/request'

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

export function addArticle(data) {
  return request({
    url: '/api/article',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/article',
    method: 'put',
    data: data
  })
}

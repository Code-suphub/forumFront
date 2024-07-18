import request from '@/utils/request'

const base_url = 'articleComment/'
export function getAllArticleComments() {
  return request({
    url: base_url + 'getAllArticleComments',
    method: 'get',
  })
}
export function getAllArticleComment(id) {
  return request({
    url: base_url+'getAllArticleComment/' + id,
    method: 'get',
  })
}

export function addArticleComment(data) {
  return request({
    url: base_url+'addArticleComment',
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function getArticleCommentNum(id) {
  return request({
    url: base_url+'getArticleCommentNum/' + id,
    method: 'get',
  })
}

// 按照发布时间获取最新评论
export function getNewArticleComment(num) {
  return request({
    url: base_url+'getNewArticleComment/' + num,
    method: 'get',
  })
}

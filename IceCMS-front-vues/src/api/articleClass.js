import request from '@/utils/request'

const base_url = "articleClass/"
export function getArticleClassList() {
  return request({
    url: base_url+'getAll',
    method: 'get'
  })
}

export function newArticleClass(data) {
  return request({
    url: base_url+'new',
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function allArticleClass(query) {
  return request({
    url: base_url+'allArticleClass/' + query.page + '/' + query.limit,
    method: 'post'
  })
}

export function DeleteArticleClass(id) {
  return request({
    url: base_url+'delete/' + id,
    method: 'get'
  })
}

export function getAllClassName(data) {
  return request({
    url: base_url+'getAll',
    method: 'get',
    data
  })
}

export function getClassNameById(id) {
  return request({
    url: base_url+'getClassNameById/'+ id,
    method: 'get',
  })
}

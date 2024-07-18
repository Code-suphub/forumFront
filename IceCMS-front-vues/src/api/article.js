import request from '@/utils/request'

const base_url = "article/"
export function createArticle(data) {
  return request({
    url: base_url+'create',
    method: 'post',
    data: data,
    // dataType: 'json',
    // crossDomain: true,
    // processData: false,
    // contentType: false,
  })
}

export function updateArticle(id) {
  return request({
    url: base_url+'update/' + id,
    method: 'post',
    id
  })
}

// 根据文章id获取文章，实现文章跳转
export function getArticleById(id) {
  return request({
    url: base_url+'get/' + id,
    method: 'get'
  })
}
export function deleteArticleById(id) {
  return request({
    url: base_url+'delete/' + id,
    method: 'get'
  })
}

// 根据类别获取全部文章, 默认为0
export function getAllArticle(query) {
  return request({
    url: base_url+'getAllArticle/' + query.page + '/' + query.limit + '/' + query.class,
    method: 'get'
  })
}


// 暂未使用
export function getAllArticleByAuthor(author) {
  return request({
    url: base_url+'getAllArticleByAuthor/' + author,
    method: 'get'
  })
}

// 根据条件进行文章筛选排序
export function getArticleSortByCondition(num,action) {
  return request({
    url: base_url+'getArticleSortByCondition/' + num + '/' + action,
    method: 'get'
  })
}

// 获取所有文章数量
export function getAllArticleNumber() {
  return request({
    url: base_url+'getAllArticleNumber/',
    method: 'get'
  })
}

// 模糊查询
export function findAllArticle(query) {
  return request({
    url: base_url+'findAllArticle?content='+query.content + '&page=' + query.page + '&limit=' + query.limit,
    method: 'get'
  })
}

// 通过用户名获取用户头像
export function findAvatarByName(name) {
  return request({
    url: base_url+'findAvatarByName/'+name,
    method: 'get'
  })
}

// 目前支持点赞和浏览量的增加
export function changeArticle(id,action) {
  return request({
    url: base_url+'articles/'+ id +'/'+action,
    method: 'get',
  })
}

// 获取当前文章的id上一篇
export function getPreNewsArticle(id) {
  return request({
    url: base_url+'getPreNewsArticle/' + id,
    method: 'get',
  })
}

// 获取当前文章的id下一篇
export function getLastNewsArticle(id) {
  return request({
    url: base_url+'getLastNewsArticle/' + id,
    method: 'get',
  })
}






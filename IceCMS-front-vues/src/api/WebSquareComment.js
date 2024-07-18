import request from '@/utils/request'

const baseUrl = "webSquareComment/"
export function getPlanetIdComment(id) {
  return request({
    url: baseUrl+'getPlanetIdComment/' + id,
    method: 'get',
  })
}

export function getPlanetCommentNum(id) {
    return request({
      url: baseUrl+'getPlanetCommentNum/' + id,
      method: 'get',
    })
}

export function addPlanetComment(data) {
    return request({
      url: baseUrl+'addPlanetComment',
      method: 'post',
      data: data,
      dataType: 'json',
      crossDomain: true,
      processData: false,
      contentType: false,
    })
  }

export function likeClickComment(id) {
  return request({
    url: baseUrl+'likeClickComment/' + id,
    method: 'get',
  })
}

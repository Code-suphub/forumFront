import request from '@/utils/request'

export function createSquare(data,SortName) {
  return request({
    url: '/webSquare/create/' + SortName,
    method: 'post',
    data: data,
    dataType: 'json',
    crossDomain: true,
    processData: false,
    contentType: false,
  })
}

export function getAllSquare(squareId,page,limit) {
  return request({
    url: 'webSquare/getAllSquare/' + squareId + '/' + page + '/' + limit,
    method: 'get'
  })
}

export function likeClickComments(id) {
  return request({
    url: 'webSquare/likeClickComment/' + id,
    method: 'get',
  })
}

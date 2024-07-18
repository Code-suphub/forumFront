import request from '@/utils/request'

const baseUrl = 'webSquareClass/'
export function getSquareClassList() {
  return request({
    url: baseUrl+'getSquareClassList',
    method: 'get'
  })
}

export function getArticleClassByOtherName(classId) {
    return request({
      url: baseUrl+'getArticleClassByOtherName/' + classId,
      method: 'get'
    })
}


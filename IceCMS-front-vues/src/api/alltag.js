import request from '@/utils/request'

const base_url="tag/"
export function getAllTag() {
  return request({
    url: base_url+'getAllTag',
    method: 'get'
  })
}

export function getTagByList(keyword) {
  return request({
    url: base_url+'getTagByList/' + keyword,
    method: 'get',
  })
}

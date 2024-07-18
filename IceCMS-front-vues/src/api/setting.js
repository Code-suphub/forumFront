import request from '@/utils/request'

const base_url = "setting/"
export function getCarousel(params) {
  return request({
    url: base_url+'getCarousel',
    method: 'get',
    params
  })
}

export function getSetting(params) {
  return request({
    url: base_url+'getSetting',
    method: 'get',
    params
  })
}


import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/user/register',
    method: 'put',
    data: data
  })
}

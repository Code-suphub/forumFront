import request from '@/utils/request'

const baseUrl = '/role/'
export function getAllRole() {
  return request({
    url: baseUrl+'getAllRole',
    method: 'get',
  })
}

export function changeRoleStatus(id) {
  return request({
    url: baseUrl+'changeRoleStatus'+id,
    method: 'get',
  })
}

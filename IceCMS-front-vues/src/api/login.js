import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      "username":data.username,
      "password":data.password
    }
  })
}

export function loginAdmin(data) {
  return request({
    url: '/User/loginAdmin',
    method: 'get',
    params: data
  })
}

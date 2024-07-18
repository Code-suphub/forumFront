import request from '@/utils/request'

const baseUrl = '/user/'
// 获取所有用户名
export function getAllUserName() {
  return request({
    url: baseUrl+'getAllUserName',
    method: 'get',
  })
}

export function getAllUserRole() {
  return request({
    url: baseUrl+'getAllUserRole',
    method: 'get',
  })
}

// 获取用户信息
export function getUserInfoById(id) {
  return request({
    url: baseUrl+'getUserInfoById/'+ id,
    method: 'get',
  })
}

export function changeUser(jwt,form) {
  return request({
    url: baseUrl+'changeUser/'+ jwt,
    method: 'post',
    data: form
  })
}

export function changePassword(token,oldPassword,newPassword,userid) {
  return request({
    url: baseUrl+'changePassword',
    method: 'post',
    data:{
      "userId":userid,
      "token":token,
      "oldPassword":oldPassword,
      "newPassword":newPassword
    }
  })
}

export function createVip(id,payid,order) {
  return request({
    url: baseUrl+'createVip/'+ id + '/' + payid +'/' + order,
    method: 'get',
  })
}

export function updateIntegral(id,integral,order) {
  return request({
    url: baseUrl+'updateIntegral',
    method: 'post',
    data:{
      userId:id,
      integral:integral,
      order:order
    }
  })
}

export function checkVip(id) {
  return request({
    url: baseUrl+'checkVip/'+ id ,
    method: 'get'
  })
}


// 修改用户信息，但还没有在前端使用到
export function ChangeUser(form) {
  return request({
    url: baseUrl+'changeUser',
    method: 'post',
    data: form
  })
}

// 发送邮箱验证码
export function testEmail(email) {
  return request({
    url: baseUrl+'sendEmailCode',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ email: email })
  })
}

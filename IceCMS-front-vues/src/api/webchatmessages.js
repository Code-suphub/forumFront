import request from '@/utils/request'

const baseUrl = "chat/"
export function getChatMessages(sender, receiver) {
  return request({
    url: baseUrl+'getChatMessages/' + sender + '/' + receiver,
    method: 'get',
  })
}

export function sendChatMessage(fromUserId, toUserId, msg) {
    return request({
      url: baseUrl+'sendChatMessage',
      method: 'post',
      data: {
        fromUserId: fromUserId,
        toUserId: toUserId,
        msg: msg
      }
    })
  }

export function getMessageList(userid) {
  return request({
    url: baseUrl+'getMessageList/' + userid,
    method: 'get',
  })
}

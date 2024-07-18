import request from '@/utils/request'

export function follow(followerId, followeeId) {
  return request({
    url: 'follow/follow/' + followerId + '/' + followeeId,
    method: 'get',
  })
}

export function unfollow(followerId, followeeId) {
  return request({
    url: 'follow/unfollow/' + followerId + '/' + followeeId,
    method: 'get',
  })
}
export function followers(followerId) {
  return request({
    url: 'follow/followers/' + followerId,
    method: 'get',
  })
}

export function isFollower(followerId,followeeId) {
  return request({
    url: 'follow/isFollower/' + followerId+'/'+followeeId,
    method: 'get',
  })
}


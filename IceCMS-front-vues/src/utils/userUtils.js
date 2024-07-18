import {getResultRespData} from "@/utils/respUtils";

export function getUser() {
  return JSON.parse(window.localStorage.getItem('access-admin'))
}

export function removeUser() {
  window.localStorage.removeItem('access-admin')
}

export function setUser(resp) {
  window.localStorage.setItem('access-admin', JSON.stringify(getResultRespData(resp)))
}

export function setUserWithUser(user) {
  window.localStorage.setItem('access-admin', JSON.stringify(user))
}

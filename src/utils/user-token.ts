/**
 * @description 存储/获取 user token
 * @author 竟然是靖哥哥
 */

const KEY = 'USE_TOKEN'

export function setToken(token: string) {
  localStorage.setItem(KEY, token)
}

export function getToken() {
  return localStorage.getItem(KEY) || ''
}

export function removeToken() {
  localStorage.removeItem(KEY)
}

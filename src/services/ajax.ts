import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'
//import {IGNORE_MESSAGE_ERROR_LIST} from '../constants/index'

const instance = axios.create({
  baseURL: 'http://localhost:3005/',
  timeout: 10 * 1000,
  headers: {},
})

//request拦截--每次请求时带上token
//token 是前端主动通过请求头 Authorization 发送的
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

//response拦截--统一处理msg格式：把res中我们需要的res.data提取出来，从而在业务中使用更简洁，并对结构做类型保护。
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData
  //统一判断错误类型
  if (errno !== 0) {
    //错误提示
    if (msg) {
      message.error(msg)
    }

    throw new Error(msg)
  }

  return data as any
})

export default instance

//定义返回信息的格式
export type ResType = {
  errno: number //一定有
  data?: ResDataType //errno：0才有
  msg?: string //errno！= 0才有
}

export type ResDataType = {
  //定义一个属性只要是字符串string就行，值是any
  [key: string]: any
}

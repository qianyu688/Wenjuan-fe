import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useDispatch, UseDispatch } from 'react-redux'

import { LOGIN_PATHNAME } from '../router'
import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  //因为不需要传参数，所以就不用定义新的异步函数了
  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}

  const { username, nickname } = useGetUserInfo()

  function logout() {
    dispatch(logoutReducer())
    removeToken()
    message.success('已退出')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo

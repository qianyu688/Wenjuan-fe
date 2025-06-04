import React, { FC, useEffect } from 'react'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest, useTitle } from 'ahooks'

import styles from './Login.module.scss'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router/index'
import { loginService } from '../services/user'
import { setToken } from '../utils/user-token'

const { Title } = Typography

//这里是什么作用呢？
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

//这里利用js-webAPI里面浏览器本地存储数据的知识
function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  useTitle('卷迹问研 - 登录')
  const nav = useNavigate()

  const [form] = Form.useForm() //第三方hook--在下面需要引用

  //刷新页面--组件重新加载
  useEffect(() => {
    //当页面刷新了一次，选择“记住我”的数据已经存储在本地存储中，利用getItem获取出来
    const { username, password } = getUserInfoFromStorage()
    //将用户名和密码通过form与表单连接起来，把数据再次填充进表单里面
    form.setFieldsValue({ username, password })
  }, [])

  const { run: loginInfo } = useRequest(
    async (password: string, username: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        //获取服务端生成的密钥token，并存储
        const { token = '' } = result
        setToken(token)
        message.success('登录成功')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )

  const onFinish = (values: any) => {
    const { username, password, remember } = values || {}
    loginInfo(username, password)

    if (remember === true) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish} form={form}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在5-20之间' },
              // 这是一个正则表达式
              { pattern: /^\w+$/, message: '只能输入字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 16, offset: 6 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>还没有账号？去注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login

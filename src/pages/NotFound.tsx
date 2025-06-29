import React, { FC } from 'react'
import { Button, Result } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import { useNavigate } from 'react-router-dom'

const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在。"
      extra={
        <Button
          type="primary"
          onClick={() => {
            nav(MANAGE_INDEX_PATHNAME)
          }}
        >
          返回首页
        </Button>
      }
    />
  )
}
export default NotFound

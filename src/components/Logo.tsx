import React, { FC, useEffect, useState } from 'react'
import { Typography, Space } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import styles from './Logo.module.scss'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'

const { Title } = Typography

const Logo: FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState(HOME_PATHNAME)
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])

  return (
    <Link to={pathname}>
      <div className={styles.container}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>卷迹问研</Title>
        </Space>
      </div>
    </Link>
  )
}
export default Logo

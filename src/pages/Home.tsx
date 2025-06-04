import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Home.module.scss'
import axios from 'axios'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => console.log('fetch data', data))
  })
  // function clickHandler() {
  //   nav('/login')
  // }
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>卷迹。每一份问卷，都是思考的足迹</Paragraph>
        <div className={styles.button}>
          <Button
            type="primary"
            onClick={() => {
              nav(MANAGE_INDEX_PATHNAME)
            }}
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Home

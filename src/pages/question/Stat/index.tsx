import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result, Spin } from 'antd'
import { useTitle } from 'ahooks'

import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useLoadingQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'

const Stat: FC = () => {
  const { loading } = useLoadingQuestionData()
  const { isPublished, title } = useGetPageInfo()
  const nav = useNavigate()

  useTitle(`问卷统计 - ${title}`)

  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )

  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该问卷尚未发布"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  nav(-1)
                }}
              >
                返回
              </Button>
            }
          />
        </div>
      )
    }
    return (
      <>
        <div className={styles.left}>左侧</div>
        <div className={styles.main}>中间</div>
        <div className={styles.right}>右侧</div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div>header</div>
      <div className={styles['content-wrapper']}>
        {loading && LoadingElem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  )
}
export default Stat

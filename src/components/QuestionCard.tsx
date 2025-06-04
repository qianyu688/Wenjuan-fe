//表示每一张问卷卡片
import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'

import styles from './QuestionCard.module.scss'
import { duplicateQuestionService, UpdateQuestionService } from '../services/question'

//定义自定义类型
type PropsType = {
  _id: string //字符串类型
  title: string
  isStar: boolean
  isPublished: boolean //布尔类型
  answerCount: number
  createdAt: string
}

const { confirm } = Modal

//组件入口
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props

  const [isStarState, setIsStarState] = useState(isStar)

  // 切换标星
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await UpdateQuestionService(_id, { isStar: !isStarState }) //更新isStar，注意这里还没有切换isStarState的值
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState) //更新state
        message.success('已更新标星状态')
      },
    }
  )

  //复制操作
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    //两种关于大括号的写法
    // async () => await duplicateQuestionService(_id),
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`)
      },
    }
  )

  //假删除操作
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await UpdateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )

  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  //用前端模拟一个服务端的删除操作--已经删除（isDeleted=true）的不再渲染
  if (isDeletedState) return null
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStarState && <StarOutlined style={{ color: 'red' }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="processing">已发布</Tag> : <Tag color="error">未发布</Tag>}
              <span>答卷：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px 0' }} />
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => {
                  nav(`/question/edit/${_id}`)
                }}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => {
                  nav(`/question/stat/${_id}`)
                }}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? '取消标星' : '标星'}
              </Button>
              <Popconfirm
                title="是否复制该问卷？"
                okText="确定"
                cancelText="取消"
                onConfirm={duplicate}
                disabled={duplicateLoading}
              >
                <Button type="text" icon={<CopyOutlined />} size="small">
                  复制
                </Button>
              </Popconfirm>

              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                onClick={del}
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard

import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Button, Space, Divider, message } from 'antd'
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import { createQuestionService } from '../services/question'
import styles from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  //不需要参数就不用再封装一个load（）函数了
  const {
    loading,
    error,
    run: handlerCreateClick, //这里的handlerCreateClick是为了语义更好理解所以给run重命名了
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`)
      message.success('创建成功')
    },
  })
  // return { loading, data, error }

  // const [loading, setLoading] = useState(false)

  // async function handlerCreateClick() {
  //   setLoading(true)

  //   const data = await createQuestionService()
  //   const { id } = data || {}
  //   if (id) {
  //     nav(`/question/edit/${id}`)
  //     message.success('创建成功')
  //   }
  //   setLoading(false)
  // }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handlerCreateClick}
            disabled={loading === true ? true : false}
          >
            新建问卷
          </Button>
          {/* 为了让按钮之间加一个分割线，并且使分割线透明了 */}
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            onClick={() => {
              nav('/manage/list')
            }}
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
          >
            我的问卷
          </Button>

          <Button
            onClick={() => {
              nav('/manage/star')
            }}
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
          >
            星标问卷
          </Button>

          <Button
            onClick={() => {
              nav('/manage/trash')
            }}
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout

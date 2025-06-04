import React, { ChangeEvent, FC, useState } from 'react'
import { Button, Space, Typography, Input, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './EditHeader.module.scss'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { UpdateQuestionService } from '../../../services/question'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'

const { Title } = Typography

//头部标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()
  const [editState, setEditState] = useState(false)

  // 修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={changeTitle}
        onPressEnter={() => {
          setEditState(false)
        }}
        onBlur={() => {
          setEditState(false)
        }}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>

      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => {
          setEditState(true)
        }}
      />
    </Space>
  )
}

//保存按钮
const SaveButton: FC = () => {
  //components;  pageInfo; id
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()

  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault() //禁用网页的默认行为
    if (!loading) save()
  })

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      //为什么感觉这里没有传过去pageInfo//已经解决了，原因是useGetPageInfo忘记加（）调用了
      console.log('保存数据：', { ...pageInfo, componentList })
      await UpdateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
      onSuccess() {
        message.success('保存成功')
      },
    }
  )

  //自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

//发布按钮
const PublishButton: FC = () => {
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()
  const nav = useNavigate()

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      //为什么感觉这里没有传过去pageInfo//已经解决了，原因是useGetPageInfo忘记加（）调用了
      console.log('保存数据：', { ...pageInfo, componentList })
      await UpdateQuestionService(
        id,
        //标志着问卷已经被发布
        { ...pageInfo, componentList, isPublished: true }
      )
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        //发布成功后跳转的统计页面
        nav(`/question/stat/` + id)
      },
    }
  )
  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  )
}

//编辑器头部导航栏
const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          {/* 返回+标题 */}
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1)
              }}
            >
              返回
            </Button>
            {/* 把标题组件单独抽离出去 */}
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader

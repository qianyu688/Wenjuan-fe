import React, { FC, useState } from 'react'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useTitle, useRequest } from 'ahooks'

import styles from './common.module.scss'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { UpdateQuestionService, deleteQuestionsService } from '../../services/question'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('卷迹问研 - 回收站')

  const { data = {}, loading, refresh, error } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  //?记录选中id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const TableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      //循环列的key，他会默认取到dataIndex的值
      //key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      // render表示当前这一列根据数据源返回自定义的数据
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag color="error">未发布</Tag>
      },
    },
    {
      title: '答卷数量',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  //恢复
  const { loading: l, run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await UpdateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖和disabled：loading是一个效果
      onSuccess() {
        message.success('恢复成功')
        refresh() //手动刷新列表
        setSelectedIds([])
      },
    }
  )
  //彻底删除
  const { run: deletefunction } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success('已经彻底删除选中问卷')
        refresh()
        setSelectedIds([])
      },
    }
  )
  function del() {
    confirm({
      title: '确定要彻底删除该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后不可找回',
      onOk: deletefunction,
    })
  }

  //将某部分JSX片段抽离出来成为一个变量，在return中可以直接使用
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={TableColumns}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {/* 这里Table自带了分页效果，我们不需要所以把pagination=flase */}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}
export default Trash

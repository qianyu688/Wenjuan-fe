import React, { FC, use, useEffect, useMemo, useRef, useState } from 'react'
import { Spin, Typography } from 'antd'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'

import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant/index'

const { Title } = Typography

const List: FC = () => {
  useTitle('卷迹问研 - 我的问卷')

  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([]) //全部的数据累计起来，10+10+10这样，之前的依然存在还要显示出来
  const [total, setTotal] = useState(0)

  const haveMoreData = total > list.length //是否还存在未加载数据

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  //判断加载时机函数--防抖版
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect() // 获取元素在视口中的位置和尺寸
      if (domRect == null) return
      const { bottom } = domRect
      //如果该元素的底部 进入或低于可视区域底部，就说明滚动到了下方，应该加载更多数据
      if (bottom <= document.body.clientHeight) {
        load() //执行真正加载函数
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  //真正加载函数
  //y由于这里需要传参，所以不可以直接调用getQuestionListService，我们需要自己写一个异步函数
  const { loading, run: load } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })

      return data
    },
    {
      manual: true,
      onSuccess(result) {
        //list,total是调用getQuestionListService以后，后端返回的数据
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  //1.当页面加载，或者url参数发生变化，再次触发tryLoadMore（）
  useEffect(() => {
    tryLoadMore() //初始化--加载第一页内容
  }, [searchParams])

  //2.监听滑动事件,页面滚动时触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      //一定要解绑事件！！！有始有终才行
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <span>暂无数据</span>
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>加载中...</span>
  }, [started, loading, haveMoreData])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {/* 这是列表 */}
      <div className={styles.content}>
        {/* <div style={{ height: '2000px' }}></div> */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List

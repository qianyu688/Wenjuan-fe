import React, { FC, useEffect, useState } from 'react'
import { Input, Space } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import type { ChangeEvent } from 'react'
import { LIST_SEARCH_PARAM_KEY } from '../constant/index'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  //将它变成受控组件
  const [value, setValue] = useState('')
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  //获取url参数并设置到input value中
  const [searchParams] = useSearchParams()
  //每当searchParams的值发生变化，都会执行这个函数
  useEffect(() => {
    const culVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(culVal)
  }, [searchParams])

  //真正的搜索功能--改变页面的url，比如？keyword='hello'，页面会自己根据这个值来筛选结果
  function handleSearch(value: string) {
    nav({
      pathname,
      //keyword保存为常量，类似于常用路由那几个
      //这里为什么要给LIST_SEARCH_PARAM_KEY加上模版字符串：
      // 因为LIST_SEARCH_PARAM_KEY也只是一个常量的名称，它的背后也有赋值，我们需要的是他的赋值keyword
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <Search
      placeholder="请输入关键字"
      //   清空
      allowClear
      value={value}
      onSearch={handleSearch}
      onChange={handleChange}
      style={{ width: '260px' }}
      enterButton
    />
  )
}

export default ListSearch

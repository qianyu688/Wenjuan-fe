//将重复的逻辑复用包装
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

function useLoadQuestionData() {
  // useRequest用法，奈何react19不可用ahooks！！！
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  async function load(id: string) {
    if (!id) throw new Error('没有问题 id')
    const data = await getQuestionService(id)
    return data
  }
  //ajax加载数据--mock
  const {
    loading,
    data,
    error,
    run: ajaxLoading,
  } = useRequest(load, {
    manual: true,
  })

  //根据获取的data设置redux store
  useEffect(() => {
    if (!data) return
    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      isPublished = false,
      componentList = [],
    } = data

    //获取默认的selectedId，即实现刷新页面后默认选中页面第一个组件
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    //把componentsList存储到redux store中！！！
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))

    //把pageInfo存储到redux store里
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
  }, [data])

  //id变化重新加载数据
  useEffect(() => {
    ajaxLoading(id) //id变化了执行
  }, [id])

  return { loading, error } //data不用返回了，已经走捷径存在redux store中了
}

export default useLoadQuestionData

// const [loading, setLoading] = useState(true)
// const [questionData, setQuestionData] = useState({})
// const [error, setError] = useState<Error | null>(null)

// useEffect(() => {
//   async function fn() {
//     try {
//       const data = await getQuestionService(id)
//       setQuestionData(data)
//     } catch (err: any) {
//       setError(err)
//     } finally {
//       setLoading(false)
//     }
//   }
//   if (id) {
//     fn()
//   }
// }, [id])

// return { loading, questionData, error }

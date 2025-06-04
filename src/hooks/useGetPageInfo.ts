import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PageInfoType } from '../store/pageInfoReducer'

//获取前端Redux的信息
//从 Redux 中获取信息
function useGetPageInfo() {
  const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoType
  return pageInfo
}
export default useGetPageInfo

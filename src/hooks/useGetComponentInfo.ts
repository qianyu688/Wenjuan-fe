import { useSelector } from 'react-redux' //用来查询数据信息的
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer/index'

//获取前端Redux的信息
//从 Redux 中获取问卷列表
function useGetComponentInfo() {
  const components = useSelector<StateType>(
    state => state.components.present
  ) as ComponentsStateType
  const { componentList = [], selectedId, copiedComponent } = components
  const selectedComponent = componentList.find(c => c.fe_id === selectedId)
  return { componentList, selectedId, selectedComponent, copiedComponent }
}
export default useGetComponentInfo

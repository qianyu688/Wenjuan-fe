import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'

//获取前端Redux的信息
//从 Redux 中获取用户信息（username 和 nickname）
function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
  return { username, nickname }
}
export default useGetUserInfo

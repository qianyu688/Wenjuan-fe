import { useEffect, useState } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  //是否等待中（ajax加载
  const [waitingUserData, setWaitingUserData] = useState(true)
  const dispatch = useDispatch()

  const { run: ajaxLoading } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      //存储到store
      dispatch(loginReducer({ username, nickname }))
    },
    //不论成功还是失败都会执行的：
    onFinally() {
      setWaitingUserData(false)
    },
  })

  //看看Redux中是否有用户信息
  const { username, nickname } = useGetUserInfo()
  useEffect(() => {
    //如果已经存在，就不用重新加载
    if (username) {
      setWaitingUserData(false)
      return
    }
    //如果没有用户信息，就从ajax中加载获取
    ajaxLoading()
  }, [username])

  //最后需要return的也仅仅是这个waiting状态，因为我们请求ajax加载的数据都会放在Redux中统一管理
  return { waitingUserData }
}

export default useLoadUserData

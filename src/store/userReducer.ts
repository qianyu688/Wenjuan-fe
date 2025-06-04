import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//用户信息
export type UserStateType = {
  username: string
  nickname: string
}
//初始化
const INIT_STATE: UserStateType = { username: '', nickname: '' }

export const userSlice = createSlice({
  name: 'user', //模块名称
  initialState: INIT_STATE, //初始值
  //需要的actions
  reducers: {
    loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      return action.payload //设置username、nickname到redux store中
    },
    logoutReducer: () => INIT_STATE,
  },
})
export const { loginReducer, logoutReducer } = userSlice.actions
export default userSlice.reducer

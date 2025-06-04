import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//用户信息
export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}
//初始化
const INIT_STATE: PageInfoType = { title: '', desc: '', js: ' ', css: '' }

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,

  reducers: {
    //重置刷新页面
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload
    },
    //修改组件标题
    changePageTitle: (state: PageInfoType, action: PayloadAction<string>) => {
      state.title = action.payload
    },
  },
})
export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer

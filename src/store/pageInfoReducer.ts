import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//用户信息
export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
  // --- 教学场景绑定字段 ---
  courseName?: string
  teacherId?: string
  semester?: string
  isTemplate?: boolean
  // --- 新增：定向下发与匿名设置 ---
  isAnonymous?: boolean
  targetMajors?: string[]
}

//初始化
const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: ' ',
  css: '',
  isPublished: false,
  // --- 默认值 ---
  courseName: '',
  teacherId: '',
  semester: '',
  isTemplate: false,
  // --- 新增默认值 ---
  isAnonymous: false,
  targetMajors: [],
}

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,

  reducers: {
    //重置刷新页面
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload
    },
    //修改组件标题
    changePageTitle: (state: PageInfoType, action: PayloadAction<Partial<PageInfoType>>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})
export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer

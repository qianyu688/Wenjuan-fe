import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
// import produce from 'immer'
import cloneDeep from 'lodash.clonedeep'

import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'

//单个组件
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

//组件列表
export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType> //单个组件类型的数组
  copiedComponent: ComponentInfoType | null
}

//初始化
const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
  //其它扩展
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },

    //更新修改 selectedId
    // changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
    //   draft.selectedId = action.payload
    // }),
    changeSelectedId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    //添加新组件
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload

      insertNewComponent(state, newComponent)
    },
    //修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload

      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        }
      }
    },
    //删除选中组价--不用传payload直接删除
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = state

      const newSelectedId = getNextSelectedId(removeId, componentList)
      state.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id === removeId)
      componentList.splice(index, 1)
    },
    //隐藏/显示
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state
      const { fe_id, isHidden } = action.payload

      //执行完操作后的默认id
      let newSelectedId = ''
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList)
      } else {
        newSelectedId = fe_id
      }
      state.selectedId = newSelectedId

      const curComp = componentList.find(c => c.fe_id === fe_id) //在列表中找一下哪个组件的id，和界面传来的id一样，并返回这个组件
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },
    //锁定/解锁
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload
      const curComp = state.componentList.find(c => c.fe_id === fe_id) //在列表中找一下哪个组件的id，和界面传来的id一样，并返回这个组件
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    },
    //复制当前选中的组件存进来
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponent == null) return
      state.copiedComponent = cloneDeep(selectedComponent) //深拷贝
    },
    //粘贴组价
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state
      if (copiedComponent == null) return
      //粘贴的新的组件需要修改fe_id
      copiedComponent.fe_id = nanoid()
      //插入
      insertNewComponent(state, copiedComponent)
    },
    //选中上一个
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const selectIndex = componentList.findIndex(c => c.fe_id === selectedId)
      if (selectIndex < 0) return //未选中
      if (selectIndex <= 0) return //选的是第一个
      state.selectedId = componentList[selectIndex - 1].fe_id
    },
    //选中下一个
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const selectIndex = componentList.findIndex(c => c.fe_id === selectedId)
      if (selectIndex < 0) return //未选中
      if (selectIndex + 1 === componentList.length) return //选的是第一个
      state.selectedId = componentList[selectIndex + 1].fe_id
    },
    //修改组件标题
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      const { title, fe_id } = action.payload

      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.title = title
      }
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
} = componentsSlice.actions //15036739439
export default componentsSlice.reducer

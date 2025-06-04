import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer/index'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StateType = {
  user: UserStateType
  // components: ComponentsStateType
  components: StateWithHistory<ComponentsStateType> //增加了undo
  pageInfo: PageInfoType
}
//store管各个模块reducer的核心部分
export default configureStore({
  reducer: {
    //分模块
    user: userReducer,
    //撤销功能主要针对组件模块
    // components: componentsReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      //把不需要撤销的action写在里面
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),

    pageInfo: pageInfoReducer,
  },
})

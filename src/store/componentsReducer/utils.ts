import { ComponentInfoType, ComponentsStateType } from './index'

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = componentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''

  //重新计算更新后的默认选中组件
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    //就一个组件，删了就没有了，我们就不删
    newSelectedId = ''
  } else {
    //多个组件，可以正常删除
    //1.删除最后一个,然后默认选中倒数第二个
    if (index + 1 === length) {
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      //2.删的非最后一个，删除后默认选择下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}

//插入新组件
export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state
  const index = componentList.findIndex(c => c.fe_id === selectedId)
  //未选中任何组件--插入到最后
  if (index < 0) {
    state.componentList.push(newComponent)
  } else {
    //选中了组件，插入到index（选中组件）后面
    state.componentList.splice(index + 1, 0, newComponent)
  }
  state.selectedId = newComponent.fe_id
}

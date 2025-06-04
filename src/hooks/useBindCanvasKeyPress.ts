import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

import { removeSelectedComponent } from '../store/componentsReducer'
import { copySelectedComponent } from '../store/componentsReducer'
import { pasteCopiedComponent } from '../store/componentsReducer'
import { selectPrevComponent } from '../store/componentsReducer'
import { selectNextComponent } from '../store/componentsReducer'

//快捷键
function isActiveElementValid() {
  const activeElem = document.activeElement

  if (activeElem === document.body) return true //在input里面 返回false，不执行
  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  //删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  //复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  //粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  //选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  //选中下一个--一个也可以不写数组[]
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  //撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true, //严格匹配，多一个少一个键都不行
    }
  )

  //重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(UndoActionCreators.redo())
  })
}

export default useBindCanvasKeyPress

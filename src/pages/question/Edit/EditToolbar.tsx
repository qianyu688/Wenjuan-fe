import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
} from '@ant-design/icons'

import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {} //有undefine的风险，在后面加上

  const dispatch = useDispatch()

  //删除
  function handleDelete() {
    if (!selectedId) return //如果没有选中组件，就不进行删除
    dispatch(removeSelectedComponent())
  }

  //隐藏
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  //锁定
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }
  //复制
  function copy() {
    dispatch(copySelectedComponent())
  }
  //粘贴
  function paste() {
    dispatch(pasteCopiedComponent())
  }

  //上移下移

  //撤销
  function undo() {
    dispatch(UndoActionCreators.undo())
  }

  //重做
  function redo() {
    dispatch(UndoActionCreators.redo())
  }

  return (
    <div>
      <Space>
        <Tooltip title="删除">
          <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
        </Tooltip>
        <Tooltip title="隐藏">
          <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
        </Tooltip>
        <Tooltip title="锁定">
          <Button
            shape="circle"
            icon={<LockOutlined />}
            onClick={handleLock}
            type={isLocked ? 'primary' : 'default'}
          ></Button>
        </Tooltip>
        <Tooltip title="复制">
          <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Tooltip title="粘贴">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            onClick={paste}
            disabled={copiedComponent == null}
          ></Button>
        </Tooltip>
        <Tooltip title="撤销">
          <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
        </Tooltip>
        <Tooltip title="重做">
          <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
        </Tooltip>
      </Space>
    </div>
  )
}

export default EditToolbar

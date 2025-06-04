import React, { FC, use } from 'react'
import { nanoid } from 'nanoid'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'

import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'

const { Title } = Typography

const NoProp: FC = () => {
  //当未选中组件时，返回空
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  //首先，通过selectedId获取到当前选中的组件
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />

  //通过该组件的type获取它的其他属性配置
  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return

    const { fe_id } = selectedComponent

    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  const { PropComponent } = componentConf

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}

export default ComponentProp

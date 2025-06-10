/**
 * @description 问卷 单选
 */

import Component from './Component'
import { QuestionRadioDefaultProps } from './Interface'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'

export * from './Interface'

//Input组件的配置
export default {
  title: '单选',
  type: 'questionRadio', //要和后端统一好
  Component, //真正画布显示的组件
  PropComponent, //修改属性
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
}

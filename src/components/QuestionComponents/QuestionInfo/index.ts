/**
 * @description 问卷 段落
 */

import Component from './Component'
import { QuestionInfoDefaultProps } from './Interface'
import PropComponent from './PropComponent'

export * from './Interface'

//Info组件的配置
export default {
  title: '问卷信息',
  type: 'questionInfo', //要和后端统一好
  Component, //组件实体
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}

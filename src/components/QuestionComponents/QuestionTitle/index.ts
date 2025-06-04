/**
 * @description 问卷 标题
 */

import Component from './Component'
import { QuestionTitleDefaultProps } from './Interface'
import PropComponent from './PropComponent'

export * from './Interface'

//Title组件的配置
export default {
  title: '标题',
  type: 'questionTitle', //要和后端统一好
  Component, //组件实体
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
}

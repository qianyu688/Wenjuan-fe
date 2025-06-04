/**
 * @description 问卷 段落
 */

import Component from './Component'
import { QuestionParagraphDefaultProps } from './Interface'
import PropComponent from './PropComponent'

export * from './Interface'

//Paragraph组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', //要和后端统一好
  Component, //组件实体
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}

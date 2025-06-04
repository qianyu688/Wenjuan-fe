import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfohPropsType } from './QuestionInfo'
import QuestionTextareaConf, { QuestionTextAreaPropsType } from './QuestionTextarea'
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio'
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './QuestionCheckbox'

//统一----单一组件的属性类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfohPropsType &
  QuestionTextAreaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType //必须同时存在

//统一定义---组件的配置类型
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//全部组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]

//组件分组
export const componentConfGroup =
  //文本显示
  [
    {
      groupId: 'text',
      groupName: '1.文本显示',
      components: [QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf],
    },
    {
      groupId: 'input',
      groupName: '2.用户输入',
      components: [QuestionInputConf, QuestionTextareaConf],
    },
    {
      groupId: 'select',
      groupName: '3.用户选择',
      components: [QuestionRadioConf, QuestionCheckboxConf],
    },
  ]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type) //根据类型type 获取对应类型的组件配置
  //   return {
  //   title: '标题组件',
  //   type: 'questionTitle',
  //   Component: QuestionTitle,
  //   defaultProps: {
  //     text: '我是标题',
  //     level: 1
  //   }
  // }
}

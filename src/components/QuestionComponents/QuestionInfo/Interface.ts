//接口，定义组件所需要的属性的类型，以及组件的默认属性
export type QuestionInfohPropsType = {
  title?: string
  desc?: string

  //PropCpoment
  onChange?: (newProps: QuestionInfohPropsType) => void
  disabled?: boolean
}
export const QuestionInfoDefaultProps: QuestionInfohPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
}

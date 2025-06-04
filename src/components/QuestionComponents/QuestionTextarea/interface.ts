//接口，定义组件所需要的属性的类型，以及组件的默认属性
export type QuestionTextAreaPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QuestionTextAreaPropsType) => void
  disabled?: boolean
}
export const QuestionTextAreaDefaultProps: QuestionTextAreaPropsType = {
  title: '输入框标题',
  placeholder: '请输入...',
}

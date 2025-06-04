//接口，定义组件所需要的属性的类型，以及组件的默认属性
export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean

  //PropCpoment
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}
export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落内容',
  isCenter: false,
}

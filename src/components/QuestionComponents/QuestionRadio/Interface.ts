export type OptionType = {
  text: string
  value: string
}

//接口，定义组件所需要的属性的类型，以及组件的默认属性
export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string

  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}
export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
    { value: 'item4', text: '选项4' },
  ],
  value: '',
}

//统计组件的属性类型
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}

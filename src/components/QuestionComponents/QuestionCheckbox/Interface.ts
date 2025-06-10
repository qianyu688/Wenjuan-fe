export type OptionType = {
  text: string
  value: string
  checked: boolean
}

//接口，定义组件所需要的属性的类型，以及组件的默认属性
export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]

  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}
export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false },
    { value: 'item4', text: '选项4', checked: false },
  ],
}

//统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}

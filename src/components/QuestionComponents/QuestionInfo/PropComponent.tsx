import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfohPropsType } from './Interface'

const { TextArea } = Input

const PropComponent: FC<QuestionInfohPropsType> = (props: QuestionInfohPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    //三者有一个变化，重新form的值
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  function handleValueChange() {
    //同步更新的值
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={handleValueChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}
export default PropComponent

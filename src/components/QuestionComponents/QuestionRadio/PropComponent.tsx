import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { QuestionRadioPropsType, OptionType } from './Interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const { TextArea } = Input

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], value, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value })
  }, [title, isVertical, options, value])

  //同步到画布
  function handleValueChange() {
    if (onChange == null) return
    const newValues = form.getFieldsValue() as QuestionRadioPropsType

    //清除text：‘undefined’
    if (newValues.options) {
      newValues.options = newValues.options.filter(opt => !(opt.text == null))
    }

    const { options = [] } = newValues
    options.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5) //补齐新增选项的value
    })
    console.log(newValues)

    onChange(newValues)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历显示所有已有选项 */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入文字' },
                        // 手动写一个不重复的逻辑规则
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let number = 0
                            options.forEach((opt: OptionType) => {
                              if (opt.text == text) number++ //记录text相同的选项个数，预期只能有一个
                            })

                            if (number === 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他选项重复'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字" />
                    </Form.Item>

                    {/* {删除按钮} */}
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}

              {/* 新增选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
      <Form.Item label="默认选择" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
    </Form>
  )
}

export default PropComponent

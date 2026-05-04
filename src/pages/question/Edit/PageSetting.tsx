import React, { FC, useEffect } from 'react'
import { Form, Input, Select, Switch } from 'antd'
import { useDispatch } from 'react-redux'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const { TextArea } = Input

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  //实时更新
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="问卷标题" name="title" rules={[{ required: true }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <Input.TextArea placeholder="问卷描述..." />
      </Form.Item>

      {/* --- 新增：隐私与定向分发设置 --- */}
      <Form.Item
        label="隐私设置 (可选匿名)"
        name="isAnonymous"
        valuePropName="checked"
        tooltip="开启后，收集的数据中将不再强制展示学生具体学号，仅保留专业信息供统计分析"
      >
        <Switch checkedChildren="匿名收集" unCheckedChildren="实名收集" />
      </Form.Item>

      <Form.Item
        label="定向下发专业"
        name="targetMajors"
        tooltip="选择后，只有该专业的学生能在评教中心看到此问卷。留空则全校可见。"
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="请选择目标专业 (可多选)"
          options={[
            { value: '软件工程', label: '软件工程' },
            { value: '计算机科学', label: '计算机科学' },
            { value: '人工智能', label: '人工智能' },
            { value: '应用数学', label: '应用数学' },
            { value: '金融学', label: '金融学' },
            { value: '英语', label: '英语' },
          ]}
        />
      </Form.Item>
      {/* ------------------------- */}

      {/* --- 现有的业务属性设置 --- */}
      <Form.Item label="所属课程" name="courseName">
        <Input placeholder="例如：软件工程导论" />
      </Form.Item>

      <Form.Item label="评价学期" name="semester">
        <Select
          options={[
            { value: '2023-2024-1', label: '2023-2024 第一学期' },
            { value: '2023-2024-2', label: '2023-2024 第二学期' },
          ]}
        />
      </Form.Item>

      <Form.Item label="设为全校模板" name="isTemplate" valuePropName="checked">
        <Switch />
      </Form.Item>
      {/* ------------------------- */}
    </Form>
  )
}

export default PageSetting

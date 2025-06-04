import React, { FC } from 'react'
import { Typography } from 'antd'

import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './Interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props } //意思是在默认属性后面拼接传入的值

  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }

  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'start',
          marginBottom: '0',
          fontSize: genFontSize(level),
        }}
      >
        {text}
      </Title>
    </div>
  )
}

export default QuestionTitle

// import React, { FC } from 'react'

// const Q FC = () => {}

// export default

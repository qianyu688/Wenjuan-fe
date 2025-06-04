import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './Interface'

const { Paragraph } = Typography

const questionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  const textList = text.split('\n') //以\n来拆分数组,为一个一个字符串对象['123','456','789']

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start' }}>
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
      {/* <span
      // dangerouslySetInnerHTML={{ __html: t }} //把<br>变成功能性--灵活性太高，容易被恶意利用
      ></span> */}
    </Paragraph>
  )
}

export default questionParagraph

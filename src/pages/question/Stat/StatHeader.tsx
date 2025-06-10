import React, { FC, useRef } from 'react'
import styles from './StatHeader.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input, InputRef, message, Popover, Space, Tooltip, Typography } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { QRCodeCanvas } from 'qrcode.react'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()

  //拷贝链接
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    //拷贝
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select() //选中input内容
    document.execCommand('copy') //拷贝选中内容，删除线：该命令将来会被废弃
    message.success('拷贝成功')
  }

  function genLinkAndQRCodeElem() {
    if (!isPublished) return null

    //拼接url，需要参考c端
    const url = `http://localhost:3000/question/${id}`

    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCodeCanvas value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef}></Input>
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button onClick={() => nav(-1)} icon={<LeftOutlined />}>
              返回
            </Button>
            <Title style={{ fontSize: '18px', marginBottom: '0', lineHeight: '1' }}>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader

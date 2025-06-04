import axios, { ResDataType } from './ajax'

type searchOption = {
  keyword: string
  page: number
  pageSize: number
  isStar: boolean
  isDeleted: boolean
  //isPublished
}
//每一项都是针对于某一个功能api（）的请求函数
//获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}

//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = `/api/question`
  const data = (await axios.post(url)) as ResDataType
  return data
}

//获取查询问卷列表
export async function getQuestionListService(
  opt: Partial<searchOption> = {}
): Promise<ResDataType> {
  const url = `/api/question`
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

//更新问卷
export async function UpdateQuestionService(
  id: string, //定位元素
  opt: { [key: string]: any } //需要修改的信息
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType
  return data
}

//复制问卷
export async function duplicateQuestionService(
  id: string //定位元素
): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data
}

//批量彻底删除问卷
export async function deleteQuestionsService(
  ids: string[] //定位元素
): Promise<ResDataType> {
  const url = `/api/question`
  const data = (await axios.delete(url, { data: ids })) as ResDataType
  return data
}

import React from 'react'
//这是为了antd兼容React19的版本
// import '@ant-design/v5-patch-for-react-19'
import 'antd/dist/reset.css'

import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'

function App() {
  return <RouterProvider router={routerConfig}></RouterProvider>
}

export default App

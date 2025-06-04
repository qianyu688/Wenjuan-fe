//跨域配置，因为前端在3000端口，而服务端在3001
module.exports = {
  devServer: {
    port: 8000, //B端前端
    proxy: {
      // 所有以‘/api’开头url都指向3001端口
      '/api': 'http://localhost:3001', //Mock
    },
  },
}

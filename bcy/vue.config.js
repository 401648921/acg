module.exports = {
  outputDir: 'dist',   //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8081',
    https: false,   //是否使用https协议
    hotOnly: false, //是否开启热更新
    proxy: { //配置多个跨域
        "/api1": {
            target: "http://47.107.108.55:8006/oauth/",
            changeOrigin: true,
            ws: true,//websocket支持
            secure: false,
            pathRewrite: {
                "^/api1": ""
            }
        },
        "/api2": {
            target: "http://1.117.75.49:8003/acg/",
            changeOrigin: true,
            //ws: true,//websocket支持
            secure: false,
            pathRewrite: {
                "^/api2": "/"
            }
          },
        "/api3": {
          target: "http://1.117.75.49:8002/community/",
          changeOrigin: true,
          ws: true,//websocket支持
          secure: false,
          pathRewrite: {
              "^/api3": "/"
          }
        },
        "/api4": {
          target: "http://47.107.108.55:8001/user/",
          changeOrigin: true,
          //ws: true,//websocket支持
          secure: false,
          pathRewrite: {
              "^/api4": "/"
          }
        },
        "/api5": {
          target: "https://www.rat403.cn/",
          changeOrigin: true,
          //ws: true,//websocket支持
          secure: false,
          pathRewrite: {
              "^/api5": "/"
          }
        },
        "/api6": {
          target: "http://1.117.75.49:8008/es/",
          changeOrigin: true,
          //ws: true,//websocket支持
          secure: false,
          pathRewrite: {
              "^/api6": "/"
          }
        },
      }
  }
}

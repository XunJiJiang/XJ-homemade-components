// 引入path包 用于生成路径
const path = require('path');
// 引入html html-webpack-plugin 插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 配置位置
module.exports = {
  // 设置为开发模式
  mode: "development",
  // 指定入口文件
  entry: './src/index.js',
  // 指定打包文件 目录
  output: {
    // 使用path模块拼接路径
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件名
    filename: 'bundle.js',
    // 配置打包环境
    environment: {
      // 不使用箭头函数
      arrowFunction: false
    }
  },
  // 指定webpack打包时使用的模块
  module: {
    // 指定加载的规则
    rules: [
      {
        // 指定规则生效的文件 这里指定ts结尾的文件
        test: /\.ts$/,
        // 从后往前运行 ts-loader 写后面先运行
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: 'babel-loader',
            // 设置bable
            options: {
              // 设置预定义环境
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      'chrome': '88'
                    },
                    // 指定core-js版本
                    'corejs': '3',
                    // 使用core-js的方式 usage 表示按需加裁
                    'useBuiltIns': 'usage'
                  }
                ]
              ]
            }
          }
          , 'ts-loader'],
        // 要排除的文件
        exclude: /node-modules/
      },
      {
        test: /\.less$/,
        // 从下到上依次处理
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 兼容最新两个版本的浏览器
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  // 配置 webpack 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // html内title
      // title: 'app',
      // 设置模板 以这个文件为模板生成 而不是全自动生成
      template: './src/index.html'
    })
  ],
  // 用来设置可以被引用的模块
  resolve: {
    extensions: ['.ts', '.js', '.less']
  }
};
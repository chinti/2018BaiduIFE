var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 分离css

const uglify = require('uglifyjs-webpack-plugin'); //js代码压缩插件

const isDev = process.env.NODE_ENV === 'development'
// 这里用于判断环境变量是否是开发模式
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/bundle.js'
  }, 
  module: {
	 rules: [
	  {
		test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit:500000, // 是把小于500000B的文件打成Base64的格式，写入JS。
              name: 'images/[name]-[hash].[ext]'
            }
          }
        ]
	  },
	  {
        test: /\.js$/,            // 【1】 更改这里
        use: [
          'babel-loader'
        ],
        exclude: /(node_modules|bower_components)/  // 优化处理加快速度
      },
	  {
        test: /\.san$/,
        loader:	'san-loader'
      }
    ]
  }, 
  resolve: {
        alias: {
            san: process.env.NODE_ENV === 'production'
                ? 'san/dist/san.js'
                : 'san/dist/san.dev.js'
        }
    },

  plugins: [
		new HtmlWebpackPlugin({
			filename:	'index.html',	//生成文件名
			template:	'index.html',  //模板文件
			inject:		'body'    //js插入位置
		}),
		new webpack.HotModuleReplacementPlugin()
	  ]

}

if(isDev) {
  // 在开发模式下的配置
  config.devServer = {
    host: 'localhost',    // 服务器的IP地址，可以使用IP也可以使用localhost
    compress: true,    // 服务端压缩是否开启
    port: 4000, // 端口
    hot: true,
    open: true, // 自动打开浏览器
    overlay: {
        errors: true
    }
  }


  // 【1】 开发模式下使用style-loader,其实这个style-loader就是将我们的css打包到了style标签中，然后放在了head中
  config.module.rules.push(
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  )
  
} else {
  config.plugins.push(new uglify())
  // 【2】生产模式下：添加一个插件 
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  )
  // 【3】对loader也需要稍做修改
  config.module.rules.push(
    {
      test: /\.css$/,
      use: [ MiniCssExtractPlugin.loader, 'css-loader']
    }
  )
  config.module.rules.push(
    {
      test: /\.html$/,
      loader: 'html-withimg-loader'
    }
  )
  config.module.rules.push(
	{
		test: /\.html$/,
		use: [ {
		loader: 'html-loader',
		}]
	}
  )

}

module.exports = config;
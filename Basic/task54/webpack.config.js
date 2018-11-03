var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // ����css

const uglify = require('uglifyjs-webpack-plugin'); //js����ѹ�����

const isDev = process.env.NODE_ENV === 'development'
// ���������жϻ��������Ƿ��ǿ���ģʽ
const config = {
  entry: './src/app.js',
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
              limit:500000, // �ǰ�С��500000B���ļ����Base64�ĸ�ʽ��д��JS��
              name: 'images/[name]-[hash].[ext]'
            }
          }
        ]
	  },
	  {
        test: /\.js$/,            // ��1�� ��������
        use: [
          'babel-loader'
        ],
        exclude: /(node_modules|bower_components)/  // �Ż�����ӿ��ٶ�
      }
    ]
  }, 
  plugins: [
		new HtmlWebpackPlugin({
			filename:	'index.html',	//�����ļ���
			template:	'index.html',  //ģ���ļ�
			inject:		'body'    //js����λ��
		}),
		new webpack.HotModuleReplacementPlugin()
	  ]

}

if(isDev) {
  // �ڿ���ģʽ�µ�����
  config.devServer = {
    host: 'localhost',    // ��������IP��ַ������ʹ��IPҲ����ʹ��localhost
    compress: true,    // �����ѹ���Ƿ���
    port: 4000, // �˿�
    hot: true,
    open: true, // �Զ��������
    overlay: {
        errors: true
    }
  }


  // ��1�� ����ģʽ��ʹ��style-loader,��ʵ���style-loader���ǽ����ǵ�css�������style��ǩ�У�Ȼ�������head��
  config.module.rules.push(
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  )
} else {
  config.plugins.push(new uglify())
  // ��2������ģʽ�£����һ����� 
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  )
  // ��3����loaderҲ��Ҫ�����޸�
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
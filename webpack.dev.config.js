const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const commonCssLoader = [
    'style-loader',
    'css-loader',
    {
      // 还需要在package.json中定义browserslist
      loader: 'postcss-loader',
    }
  ];
module.exports = {
    // 文件的入口
    entry: './src/main.js',
    // 文件的出口
    output: {
        path: path.resolve(__dirname,'dist'),
        // publicPath:'/dev',
        filename: 'js/[name].[contenthash:6].js',
        clean:true
    },
    resolve: {
        extensions: [".js", ".json", ".mjs", ".vue", ".ts", ".jsx", ".tsx"],
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
    },
    // 使用的loader
    module:{
        rules:[
            {test: /\.vue$/, use: 'vue-loader'},
            {test: /\.css$/,use: [...commonCssLoader]},
            {test:/\.s[ca]ss$/,use:[...commonCssLoader,'sass-loader']},
            {
                test: /\.m?js$/,
                use:{
                    loader:'babel-loader'
                }
            },
            // webpack5 用法
            {
                test:/\.(png|jpe?g|gif)$/,
                type:'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:8].[ext]'
                  }
            },
            {
                test:/\.(eot|ttf|woff2?)$/,
                type:'asset/resource',
                generator: {
                    filename: 'font/[name].[hash:8].[ext]'
                  }
            }
        ]
    },
    mode: 'development',
    // 插件
    plugins: [
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://localhost:7072`]
              },
              // 是否每次都清空控制台
              clearConsole: true,
        }),
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            // title:'自定义安装vue'
        }),
        new Webpack.DefinePlugin({
            'process.env': require('./.env.development')
        }),
    ],
    devtool: 'source-map',
    target:'web',
    // 热更新
    devServer:{
        // static: path.resolve(__dirname,'dist'),
        contentBase: path.resolve(__dirname, 'dist'),
        watchOptions:{
            // 忽略文件
            ignored: /node_modules/
        },
        quiet: true,
        open:true,
        hot: true,
        port: '7072',
        compress:true,
        overlay: true,
        clientLogLevel: 'error'
    }
}